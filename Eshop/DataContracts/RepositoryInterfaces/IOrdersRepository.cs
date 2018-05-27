using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;
using Eshop.DataContracts.DataTransferObjects;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IOrdersRepository
    {
        IEnumerable<OrderDto> GetByStatus(bool areOrdersConfirmed); //(int startIndex, int ordersToTake, bool areOrdersConfirmed);
        IEnumerable<OrderDto> GetByUserId(string userId); //(int startIndex, int ordersToTake, int userId);
        IEnumerable<OrderDto> GetAll();
        Order Update(Order order);
        Order GetOrder(int id);
        IEnumerable<OrderDto> GetUserPurchaseHistory(string userId);
        Boolean PaymentEqualsShoppingCartSum(UserAccount user, decimal amount);
        Order Add(Order order);
        ICollection<OrderedItem> GetOrderShoppingCartItems(UserAccount username, int orderId);
        UserAccount GetOrderingUser(string username);
        ShoppingCart ClearUserShoppingCart(UserAccount user);
        ICollection<OrderedItem> AddOrderedItems(ICollection<OrderedItem> orderedItems);
    }
}