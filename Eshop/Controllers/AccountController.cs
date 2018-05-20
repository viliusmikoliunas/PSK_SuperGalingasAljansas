using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects.Requests;
using Eshop.DataContracts.DataTransferObjects.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Eshop.Controllers
{
    [Route("api/[controller]/[action]")]
    [AllowAnonymous]
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
        [Authorize(Roles = UserRoleString.User)]
        public async Task<IActionResult> Update([FromBody] AccountUpdateRequest model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = _userManager.Users.ToList().First(u => u.UserName == model.Username);

            if (model.Email != null)
                user.Email = model.Email;
            if (model.FirstName != null)
                user.Firstname = model.FirstName;
            if (model.LastName != null)
                user.Lastname = model.LastName;
            if (model.PhoneNumber != null)
                user.PhoneNumber = model.PhoneNumber;

            if (model.Password != null)
            {
                var result1 = await _userManager.RemovePasswordAsync(user);
                if (result1.Succeeded)
                {
                    var result2 = await _userManager.AddPasswordAsync(user, model.Password);
                    if (!result2.Succeeded)
                        return BadRequest("New password could not be set");
                }
                else
                    return BadRequest("Old password could not be removed");
            }

            var result3 = await _userManager.UpdateAsync(user);
            if (result3.Succeeded)
                return Ok("Account was successfully updated");

            return BadRequest(result3.Errors.First().Description);
        }
    }
}