using Eshop.Data.Entities;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IShoppingCartItemsRepository
    {
        ShoppingCartItem GetByShoppingCart(string shoppingCartId, int itemId);
    }
}
