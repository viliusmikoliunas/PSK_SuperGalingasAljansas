using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;

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
        public IActionResult AddItem([FromBody] ShoppingCartDto item)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var token = JWTtoken.GetTokenInfo(Request, "sub");
            if (token == null) return NotFound("Could not get token");

            _shoppingCartRepository.Add(_shoppingCartRepository.Get(token), item.itemId, item.itemQuantity);

            return Ok("Item(s) added successfully");
        }

        [HttpPut]
        [Authorize(Roles = UserRoleString.User)]
        public IActionResult Update([FromBody] List<ShoppingCartDto> items)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var token = JWTtoken.GetTokenInfo(Request, "sub");
            if (token == null) return NotFound("Could not get token");

            var userCart = _shoppingCartRepository.Get(token);

            ShoppingCart cart = userCart;
            List<ShoppingCartItem> cartList = new List<ShoppingCartItem>();
            foreach(var item in items)
            {
                var shoppingItems = new ShoppingCartItem { ItemId = item.itemId, Quantity = item.itemQuantity };
                cartList.Add(shoppingItems);
            }
            cart.ShoppingCartItems = cartList;

            _shoppingCartRepository.Update(cart);

            return Ok("Item(s) updated successfully");
        }

        [HttpDelete]
        [Authorize(Roles = UserRoleString.User)]
        public IActionResult Delete([FromBody] DeleteShoppingCartItemDto item)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var token = JWTtoken.GetTokenInfo(Request, "sub");
            if (token == null) return NotFound("Could not get token");

            _shoppingCartRepository.Delete(_shoppingCartRepository.Get(token));

            return Ok("Item deleted successfully");
        }
    }
}
