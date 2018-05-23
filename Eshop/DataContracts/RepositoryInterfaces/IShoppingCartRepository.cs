using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IShoppingCartRepository
    {
        ShoppingCart Get(string acc);
        void Add(ShoppingCart shoppingCart, int itemId, int itemQuantity);
        void Update(ShoppingCart shoppingCart);
        void Delete(string username);
    }
}
