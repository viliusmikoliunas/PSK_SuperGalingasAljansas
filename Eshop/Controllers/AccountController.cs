﻿using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects.Requests;
using Eshop.DataContracts.DataTransferObjects.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Eshop.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly SignInManager<UserAccount> _signInManager;
        private readonly UserManager<UserAccount> _userManager;
        private readonly IConfiguration _configuration;

        public AccountController(
            UserManager<UserAccount> userManager,
            SignInManager<UserAccount> signInManager,
            IConfiguration configuration
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, false);

            if (result.Succeeded)
            {
                var appUser =  _userManager.Users.SingleOrDefault(r => r.UserName == model.Username);
                if (appUser.IsBlocked)
                    return StatusCode((int)HttpStatusCode.Unauthorized, new ErrorResponse
                    {
                        Message = "Your account is blocked for indefinite ammount of time"
                    });

                var userRoles = await _userManager.GetRolesAsync(appUser);
                var role =  userRoles.Contains(UserRoles.Admin.ToString())
                    ? UserRoles.Admin
                    : UserRoles.User;
                return Ok(JWTtoken.Generate(_configuration, model.Username, appUser, role));
            }

            return StatusCode((int)HttpStatusCode.Unauthorized, new ErrorResponse
            {
                Message = "Username and password doesn't match"
            });
        }
        
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = new UserAccount
            {
                UserName = model.Username,
                Email = model.Email,
                IsBlocked = false,
                Firstname = model.FirstName,
                Lastname = model.LastName,
                PhoneNumber = model.PhoneNumber
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, UserRoleString.User);
                await _signInManager.SignInAsync(user, false);
                return Ok(JWTtoken.Generate(_configuration, model.Username, user));
            }

            return BadRequest(result.Errors.First().Description);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update_Info([FromBody] UpdateUserInfoRequest model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = JWTtoken.GetUsernameFromToken(Request);
            if (username == null) return NotFound();

            var emailIsUsed = _userManager.Users.Any(user => user.Email.Equals(model.Email) && !user.UserName.Equals(username));
            if (emailIsUsed) return BadRequest($"Email {model.Email} is already taken");

            var userAccount = await _userManager.FindByNameAsync(username);
            userAccount.Email = model.Email;
            userAccount.Firstname = model.FirstName;
            userAccount.Lastname = model.LastName;
            userAccount.PhoneNumber = model.PhoneNumber;
            var result = await _userManager.UpdateAsync(userAccount);

            if (result.Succeeded) return Ok("User updated successfully");
            return NotFound();
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Change_Password([FromBody] ChangePasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.CurrentPassword) || string.IsNullOrEmpty(request.NewPassword))
                return BadRequest("Please fill all the fields");

            var username = JWTtoken.GetUsernameFromToken(Request);
            if (username == null) return NotFound();

            var user = await _userManager.FindByNameAsync(username);
            var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);

            if (result.Succeeded) return Ok("Password changed successfully");
            return BadRequest(result.Errors.First().Description);
        }
    }
}
