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

        public ShoppingCart Add(ShoppingCart shoppingCart)
        {
            throw new NotImplementedException();
        }       

        public UserAccount GetAcc(string accName)
        {
            var userAcc = _dbContext.Users.FirstOrDefault(user => user.UserName == accName);
            return userAcc;
        }

        public ShoppingCart Get(UserAccount acc)
        {
            var _cart = _dbContext.ShoppingCarts.FirstOrDefault(cart => cart.User == acc);
            if (_cart != null) return _cart;
            else
            {
                _dbContext.ShoppingCarts.Add(new ShoppingCart {User = acc});
                _dbContext.SaveChanges();
                return _dbContext.ShoppingCarts.FirstOrDefault(cart => cart.User == acc);
            }
        }
    }
}
