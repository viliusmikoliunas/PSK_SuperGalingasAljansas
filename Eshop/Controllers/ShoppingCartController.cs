using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace Eshop.Controllers
{
    [Produces("application/json")]
    [Route("api/user/cart")]
    public class ShoppingCartController : Controller
    {
        private readonly IShoppingCartRepository _shoppingCartRepository;

        public ShoppingCartController(IShoppingCartRepository shoppingCartRepository)
        {
            _shoppingCartRepository = shoppingCartRepository;
        }


        [HttpPost]
        [Authorize(Roles = UserRoleString.User)]
        public IActionResult AddItem([FromBody] ShoppingCartDto itemData)
        {
            StringValues token = "";
            var userId = Request.Headers.TryGetValue("Authorization", out token);
            if (userId == false) return NotFound("Couldn't get token");

            var jwtEncodedString = token.ToString().Substring(7);

            var token_ = new JwtSecurityToken(jwtEncodedString: jwtEncodedString);
            var accName = token_.Claims.First(c => c.Type == "sub").Value;

            var userAcc = _shoppingCartRepository.GetAcc(accName);
            Data.Entities.ShoppingCart cart;     
                
            cart = _shoppingCartRepository.Add(_shoppingCartRepository.Get(userAcc));
            
            

            return Ok("Hello there!" + accName +

                "General Kenobi");
        }
    }
}
