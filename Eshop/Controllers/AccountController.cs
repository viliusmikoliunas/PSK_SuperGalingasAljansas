using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

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
                if (appUser.IsBlocked) return Forbid("Your account is blocked for indefinite time");

                var userRoles = await _userManager.GetRolesAsync(appUser);
                var role =  userRoles.Contains(UserRoles.Admin.ToString())
                    ? UserRoles.Admin
                    : UserRoles.User;
                return Ok(JWTtoken.Generate(_configuration, model.Username, appUser, role));
            }

            return Unauthorized();
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
    }
}