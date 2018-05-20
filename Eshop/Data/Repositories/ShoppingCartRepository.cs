using Eshop.Data.Entities;
using Eshop.DataContracts.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Data.Repositories
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {

        private readonly AppDbContext _dbContext;

        public ShoppingCartRepository(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }

        public void Add(ShoppingCart shoppingCart, int itemId, int itemQuantity)
        {
            var addItem = _dbContext.ShoppingCartItems.FirstOrDefault(cartItem => cartItem.ItemId == itemId);
            if (addItem == null)
            {
                var shoppingCartItem = new ShoppingCartItem
                {
                    ShoppingCartId = shoppingCart.Id,
                    ItemId = itemId, Quantity = itemQuantity
                };
                _dbContext.ShoppingCartItems.Add(shoppingCartItem);
                _dbContext.SaveChanges();
            }
            else
            {
                addItem.Quantity = addItem.Quantity + itemQuantity;
                _dbContext.ShoppingCartItems.Update(addItem);
                _dbContext.SaveChanges();
            }
        }           

        public ShoppingCart Get(string accName)
        {
            var acc = _dbContext.Users.FirstOrDefault(user => user.UserName == accName);
            var _cart = _dbContext.ShoppingCarts.FirstOrDefault(cart => cart.User == acc);
            if (_cart != null) return _cart;
            else
            {
                _dbContext.ShoppingCarts.Add(new ShoppingCart {User = acc});
                _dbContext.SaveChanges();
                return _dbContext.ShoppingCarts.FirstOrDefault(cart => cart.User == acc);
            }
        }

        public void Delete(ShoppingCart shoppingCart)
        {
            _dbContext.ShoppingCarts.Remove(shoppingCart);
            _dbContext.SaveChanges();
        }

        public void Update(ShoppingCart shoppingCart)
        {
            _dbContext.ShoppingCarts.Update(shoppingCart);
            _dbContext.SaveChanges();
        }
    }
}
