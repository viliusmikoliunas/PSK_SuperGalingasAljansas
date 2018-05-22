using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;
using System.Linq;
using Eshop.DataContracts.DataTransferObjects.Responses;

namespace Eshop.Controllers
{
    [Produces("application/json")]
    [Route("api/user/cart")]
    [Authorize(Roles = UserRoleString.User)]
    public class ShoppingCartController : Controller
    {
        private readonly IShoppingCartRepository _shoppingCartRepository;
        private readonly IItemsRepository _itemsRepository;
        private readonly IShoppingCartItemsRepository _shoppingCartItemsRepository;

        public ShoppingCartController(IShoppingCartRepository shoppingCartRepository, IItemsRepository itemsRepository, IShoppingCartItemsRepository shoppingCartItemsRepository)
        {
            _shoppingCartRepository = shoppingCartRepository;
            _itemsRepository = itemsRepository;
            _shoppingCartItemsRepository = shoppingCartItemsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var userName = JWTtoken.GetTokenInfo(Request, "sub");
            if (userName == null) return NotFound("Wrong credentials");

            var shoppingCartItems = _shoppingCartRepository.Get(userName).ShoppingCartItems;
            var response = new List<ShoppingCartItemResponse>();
            foreach (var item in shoppingCartItems)
            {
                var newItem = new ShoppingCartItemResponse()
                {
                    Id = item.ItemId,
                    ImagePath = item.Item.PictureLocation,
                    Price = item.Item.Cost,
                    Quantity = item.Quantity,
                    Title = item.Item.Title
                };
                response.Add(newItem);
            }
            return Ok(response);
        }

        [HttpPost]
        public IActionResult AddItem([FromBody] ShoppingCartDto item)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = JWTtoken.GetTokenInfo(Request, "sub");
            if (userName == null) return NotFound("Could not get token");

            var itemFromDb = _itemsRepository.GetItem(item.itemId);
            if (itemFromDb == null) return NotFound("Item with given id not found");

            var shoppingCart = _shoppingCartRepository.Get(userName);
            _shoppingCartRepository.Add(shoppingCart, itemFromDb.Id, item.itemQuantity);

            return Ok("Item(s) added successfully");
        }

        [HttpPut]
        public IActionResult Update([FromBody] List<ShoppingCartDto> items)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = JWTtoken.GetTokenInfo(Request, "sub");
            if (username == null) return NotFound("Could not get token");

            ShoppingCart cart = _shoppingCartRepository.Get(username);
            foreach(var item in items)
            {
                var itemFromDb = _itemsRepository.GetItem(item.itemId);
                if (itemFromDb == null) return NotFound("Item with given id not found");

                var existingShoppingCartItem = _shoppingCartItemsRepository.GetByShoppingCart(cart.Id, itemFromDb.Id);
                if (existingShoppingCartItem != null)
                {
                    existingShoppingCartItem.Quantity = item.itemQuantity;
                }
                else
                {
                    var newShoopingCartItem = new ShoppingCartItem { ItemId = item.itemId, Quantity = item.itemQuantity };
                    if (cart.ShoppingCartItems == null)
                    {
                        var newItemList = new List<ShoppingCartItem>
                        {
                            newShoopingCartItem
                        };
                        cart.ShoppingCartItems = newItemList;
                    }
                    else cart.ShoppingCartItems.Add(newShoopingCartItem);
                }
            }
            _shoppingCartRepository.Update(cart);

            return Ok("Item(s) updated successfully");
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = JWTtoken.GetTokenInfo(Request, "sub");
            if (username == null) return NotFound("Could not get token");

            _shoppingCartRepository.Delete(username);

            return Ok("Item deleted successfully");
        }
    }
}
