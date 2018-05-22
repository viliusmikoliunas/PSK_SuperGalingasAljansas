using Eshop.Data.Entities;
using Eshop.DataContracts.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
            var addItem = _dbContext.ShoppingCartItems.FirstOrDefault(cartItem => cartItem.ItemId == itemId && cartItem.ShoppingCartId.Equals(shoppingCart.Id));
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
            var acc = _dbContext.Users.FirstOrDefault(user => user.UserName.Equals(accName));
            var cart = _dbContext.ShoppingCarts.FirstOrDefault(c => c.User.Id.Equals(acc.Id));
            if (cart != null) return cart;
            else
            {
                _dbContext.ShoppingCarts.Add(new ShoppingCart {User = acc});
                _dbContext.SaveChanges();
                return _dbContext.ShoppingCarts.FirstOrDefault(c => c.User == acc);
            }
        }

        public void Delete(string username)
        {
            //any of checked for null varibales shouldn't be null so no callback is needed
            var userId = _dbContext.UserAccounts.FirstOrDefault(user => user.UserName.Equals(username))?.Id;
            if (userId != null)
            {
                var shoppingCartToRemove = _dbContext.ShoppingCarts
                    .Include(c => c.ShoppingCartItems)
                    .FirstOrDefault(cart => cart.User.Id.Equals(userId));

                if (shoppingCartToRemove != null)
                {
                    //deep delete
                    _dbContext.ShoppingCartItems.RemoveRange(shoppingCartToRemove.ShoppingCartItems);

                    _dbContext.ShoppingCarts.Remove(shoppingCartToRemove);
                    _dbContext.SaveChanges();

                }
            }
        }

        public void Update(ShoppingCart shoppingCart)
        {
            _dbContext.ShoppingCarts.Update(shoppingCart);
            _dbContext.SaveChanges();
        }
    }
}
