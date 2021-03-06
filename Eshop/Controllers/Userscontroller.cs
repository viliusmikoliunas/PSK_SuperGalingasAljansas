﻿using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects.Requests;
using Eshop.DataContracts.DataTransferObjects.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Eshop.Controllers
{
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly UserManager<UserAccount> _userManager;

        public UsersController(UserManager<UserAccount> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("me")]
        [Authorize]
        [Produces("application/json")]
        public async Task<IActionResult> GetMe()
        {
            var accName = JWTtoken.GetUsernameFromToken(Request);
            if (accName == null) return Unauthorized();

            var account = await _userManager.FindByNameAsync(accName);
            if (account == null) return NotFound();

            var response = new UserSelfInfoResponse
            {
                Email = account.Email,
                Firstname = account.Firstname,
                Lastname = account.Lastname,
                PhoneNumber = account.PhoneNumber
            };

            return Ok(response);
        }

        [HttpGet]
        [Authorize(Roles = UserRoleString.Admin)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll()
        {
            List<UserInfoResponse> userInfoList = new List<UserInfoResponse>();
            var casualUsers = await _userManager.GetUsersInRoleAsync(UserRoleString.User);

            userInfoList.AddRange(casualUsers.Select(user => new UserInfoResponse
            {
                Email = user.Email,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                IsBlocked = user.IsBlocked,
                Username = user.UserName
            }));

            return Ok(userInfoList);
        }

        [HttpPut("block")]
        [Authorize(Roles = UserRoleString.Admin)]
        public async Task<IActionResult> BlockUser([FromBody] BlockRequest blockRequest)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userManager.FindByNameAsync(blockRequest.Username);
            if (user != null)
            {
                var isAdmin = await _userManager.IsInRoleAsync(user, UserRoleString.Admin);
                if (isAdmin) return Forbid("Admins cannot be blocked");

                user.IsBlocked = blockRequest.Block;
                await _userManager.UpdateAsync(user);
                if (blockRequest.Block) return Ok($"User \"{blockRequest.Username}\" blocked successfully");
                return Ok($"User \"{blockRequest.Username}\" unblocked successfully");
            }

            return BadRequest($"User with username - \"{blockRequest.Username}\" does not exist");
        }
    }
}
