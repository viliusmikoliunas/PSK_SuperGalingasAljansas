using System.Collections.Generic;
using Eshop.Data.Entities;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IShoppingCartItemsRepository
    {
        ShoppingCartItem GetByShoppingCart(string shoppingCartId, int itemId);
        void DeleteOrphans();
        void RemoveRange(string shoppingCartId, List<int> itemId);
    }
}
