using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        [Authorize(Roles = "User")]
        public IActionResult CreateShoppingCart([FromBody] ShoppingCartDto itemData)
        {

            return Ok("Hello there!" +

                "General Kenobi");
        }
    }
}
