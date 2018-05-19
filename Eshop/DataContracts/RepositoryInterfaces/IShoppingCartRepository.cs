using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IShoppingCartRepository
    {
        ShoppingCart Get(UserAccount acc);
        ShoppingCart Add(ShoppingCart shoppingCart);
        //ShoppingCart Update(ShoppingCart shoppingCart);
        //void Delete(ShoppingCart shoppingCart);
        UserAccount GetAcc(string accName);
    }
}
