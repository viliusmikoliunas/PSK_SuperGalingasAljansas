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
    }
}
