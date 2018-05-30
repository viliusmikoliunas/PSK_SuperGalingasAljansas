using System.Collections.Generic;
using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts.RepositoryInterfaces;

namespace Eshop.Data.Repositories
{
    public class ShoppingCartItemsRepository : IShoppingCartItemsRepository
    {
        private readonly AppDbContext _dbContext;

        public ShoppingCartItemsRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ShoppingCartItem GetByShoppingCart(string shoppingCartId, int itemId)
        {
            return _dbContext.ShoppingCartItems.FirstOrDefault(
                cartItem => cartItem.ShoppingCartId.Equals(shoppingCartId) && cartItem.ItemId == itemId);
        }

        public async void DeleteOrphans()
        {
            _dbContext.ShoppingCartItems
                .RemoveRange(_dbContext.ShoppingCartItems
                    .Where(cartItem => string.IsNullOrEmpty(cartItem.ShoppingCartId)));
            await _dbContext.SaveChangesAsync();
        }

        public void RemoveRange(string shoppingCartId, List<int> itemId)
        {
            _dbContext.ShoppingCartItems
                .RemoveRange(_dbContext.ShoppingCartItems
                    .Where(cartItem => cartItem.ShoppingCartId.Equals(shoppingCartId) 
                                    && itemId.Contains(cartItem.ItemId))
                );
            _dbContext.SaveChanges();
        }
    }
}

