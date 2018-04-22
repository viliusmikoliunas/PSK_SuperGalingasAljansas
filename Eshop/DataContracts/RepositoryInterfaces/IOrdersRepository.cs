using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    interface IOrdersRepository
    {
        IEnumerable<Order> GetByStatus(int startIndex, int ordersToTake, bool areOrdersConfirmed);
        IEnumerable<Order> GetUserOrders(int startIndex, int ordersToTake, int userId);
        Order Update(Order order);
    }
}