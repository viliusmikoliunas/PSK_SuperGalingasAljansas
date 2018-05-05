using System.Linq;
using System.Threading.Tasks;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects.Requests;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Eshop.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        //username model
        public async Task<object> Login([FromBody] LoginRequest model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, false);

            if (result.Succeeded)
            {
                var appUser = _userManager.Users.SingleOrDefault(r => r.UserName == model.Username);
                var userRoles = await _userManager.GetRolesAsync(appUser);
                var role =  userRoles.Contains(UserRoles.Admin.ToString())
                    ? UserRoles.Admin
                    : UserRoles.User;
                return JWTtoken.Generate(_configuration, model.Username, appUser, role);
            }

            return Unauthorized();
        }
        
        [HttpPost]
        public async Task<object> Register([FromBody] RegisterRequest model)
        {
            var user = new UserAccount
            {
                UserName = model.Username,
                Email = model.Email,
                IsBlocked = false
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return JWTtoken.Generate(_configuration, model.Username, user);
            }

            return BadRequest(result.Errors.First().Description);
        }
    }
}