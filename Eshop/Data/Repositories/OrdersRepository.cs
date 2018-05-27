using Eshop.Data.Entities;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Data.Repositories
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly AppDbContext _dbContext;

        public OrdersRepository(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }

        public IEnumerable<OrderDto> GetByStatus(bool areOrdersConfirmed)
        {
            var ordersList = from o in _dbContext.Orders
                            where  o.Confirmed == areOrdersConfirmed
                            select new OrderDto
                            {
                                Id = o.Id,
                                UserId = o.UserId,
                                Date = o.Date,
                                Cost = o.Cost,
                                Confirmed = o.Confirmed,
                                Review = new ReviewDto { Stars = o.Review.Stars, Description = o.Review.Description },
                                Items = (from u in o.OrderedItem select new OrderedItemDto { Title = u.Item.Title, Quantity = u.Quantity }).ToList()
                            };
            return ordersList;
            // return (_dbContext.Orders.Include(order => order.OrderedItem).Include("OrderedItem.Item").Include(order => order.Review).Where(i => i.Confirmed == areOrdersConfirmed)).ToList();
        }

        public IEnumerable<OrderDto> GetByUserId(string userId)
        {
            var orderList = from o in _dbContext.Orders
                            where o.UserId == userId
                            select new OrderDto
                            {
                                Id = o.Id,
                                UserId = o.UserId,
                                Date = o.Date,
                                Cost = o.Cost,
                                Confirmed = o.Confirmed,
                                Review = new ReviewDto { Stars = o.Review.Stars, Description = o.Review.Description },
                                Items = (from u in o.OrderedItem select new OrderedItemDto { Title = u.Item.Title, Quantity = u.Quantity }).ToList()
                            };
            return orderList;
           // return (_dbContext.Orders.Include(order => order.OrderedItem).Include("OrderedItem.Item").Include(order => order.Review).Where(i => i.UserId == userId)).ToList();
        }

        public IEnumerable<OrderDto> GetAll()
        {
            var orders = _dbContext.Orders
                .Include(order => order.Review)
                .Include(order => order.OrderedItem)
                .ThenInclude(orderedItem => orderedItem.Item);
            var orderList = from o in orders
                            select new OrderDto
                            {
                                Id = o.Id,
                                UserId = o.UserId,
                                Date = o.Date,
                                Cost = o.Cost,
                                Confirmed = o.Confirmed,
                                //review is optional so null check is required
                                Review = o.Review != null ? new ReviewDto { Stars = o.Review.Stars, Description = o.Review.Description } : null, 
                                Items = (from u in o.OrderedItem select new OrderedItemDto  { Title = u.Item.Title, Quantity = u.Quantity }).ToList()              
                            };
            return orderList.ToList();
        }

        public Order Update(Order orderToUpdate)
        {
            _dbContext.Orders.Update(orderToUpdate);
            _dbContext.SaveChanges();
            return orderToUpdate;
        }


        public Order GetOrder(int id)
        {
            var selectedOrder = _dbContext.Orders.Include(order => order.OrderedItem).Include("OrderedItem.Item").Include(order => order.Review).FirstOrDefault(order => order.Id == id);
            return selectedOrder;
        }

        public IEnumerable<OrderDto> GetUserPurchaseHistory(string userId)
        {
            var orders = _dbContext.Orders
                .Include(order => order.Review)
                .Include(order => order.OrderedItem)
                .ThenInclude(orderedItem => orderedItem.Item);

            var orderList = from o in orders
                            where o.UserId == userId// && o.Confirmed
                            select new OrderDto
                            {
                                Id = o.Id,
                                UserId = o.UserId,
                                Date = o.Date,
                                Cost = o.Cost,
                                Confirmed = o.Confirmed,
                                //review is optional so null check is required
                                Review = o.Review != null ? new ReviewDto { Stars = o.Review.Stars, Description = o.Review.Description } : null,
                                Items = (from u in o.OrderedItem select new OrderedItemDto { Title = u.Item.Title, Quantity = u.Quantity }).ToList()
                            };
            return orderList.ToList();
        }
    }
}
