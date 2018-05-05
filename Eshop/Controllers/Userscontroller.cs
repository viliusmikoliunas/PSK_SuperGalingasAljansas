using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts.DataTransferObjects.Requests;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Controllers
{
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly IUserAccountsRepository _userAccountsRepository;
        private readonly UserManager<UserAccount> _userManager;

        public UsersController(IUserAccountsRepository userAccountsRepository, UserManager<UserAccount> userManager)
        {
            _userAccountsRepository = userAccountsRepository;
            _userManager = userManager;
        }

        [HttpPut]
        public UserAccount BlockUser([FromQuery] BlockRequest blockRequest)
        {
            //validation
            var kitas = _userManager.Users;//.First(user => user.UserName.Equals(blockRequest.Username));
            var apsdasd = _userAccountsRepository.Get(blockRequest.Username);
            _userAccountsRepository.BlockUser(apsdasd);

            return apsdasd;
        }
    }
}
