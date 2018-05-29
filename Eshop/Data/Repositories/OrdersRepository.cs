using Eshop.Data.Entities;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

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
                                Username = _dbContext.Users.FirstOrDefault(user => user.Id.Equals(o.UserId)).UserName,
                                Date = o.Date,
                                Cost = o.Cost,
                                Confirmed = o.Confirmed,
                                Review = new ReviewDto { Stars = o.Review.Stars, Description = o.Review.Description },
                                Items = (from u in o.OrderedItem select new OrderedItemDto { Title = u.Item.Title, Quantity = u.Quantity }).ToList(),
                                PaymentDate = o.PaymentDate
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
                                Username = _dbContext.Users.FirstOrDefault(user => user.Id.Equals(o.UserId)).UserName,
                                Date = o.Date,
                                Cost = o.Cost,
                                Confirmed = o.Confirmed,
                                Review = new ReviewDto { Stars = o.Review.Stars, Description = o.Review.Description },
                                Items = (from u in o.OrderedItem select new OrderedItemDto { Title = u.Item.Title, Quantity = u.Quantity }).ToList(),
                                PaymentDate = o.PaymentDate
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
                                Username = _dbContext.Users.FirstOrDefault(user => user.Id.Equals(o.UserId)).UserName,
                                Date = o.Date,
                                Cost = o.Cost,
                                Confirmed = o.Confirmed,
                                //review is optional so null check is required
                                Review = o.Review != null ? new ReviewDto { Stars = o.Review.Stars, Description = o.Review.Description } : null, 
                                Items = (from u in o.OrderedItem select new OrderedItemDto  { Title = u.Item.Title, Quantity = u.Quantity }).ToList(),
                                PaymentDate = o.PaymentDate
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
                                Username = _dbContext.Users.FirstOrDefault(user => user.Id.Equals(o.UserId)).UserName,
                                Date = o.Date,
                                Cost = o.Cost,
                                Confirmed = o.Confirmed,
                                //review is optional so null check is required
                                Review = o.Review != null ? new ReviewDto { Stars = o.Review.Stars, Description = o.Review.Description } : null,
                                Items = (from u in o.OrderedItem select new OrderedItemDto { Title = u.Item.Title, Quantity = u.Quantity }).ToList(),
                                PaymentDate = o.PaymentDate
                            };
            return orderList.ToList();
        }

        public bool PaymentEqualsShoppingCartSum(UserAccount user, decimal ammount)
        {
            int centsAmount = (int)(ammount * 100);
            var userId = user.Id;
            
            var shoppingCart = _dbContext.ShoppingCarts.First(s => s.User.Id.Equals(userId));
            var shoppingCartId = shoppingCart.Id;

            var shoppingCartItems = _dbContext.ShoppingCartItems.Where(i => i.ShoppingCartId.Equals(shoppingCartId));
            int itemId;
            int sum = 0;
            foreach (var shoppingCartItem in shoppingCartItems)
            {
                itemId = shoppingCartItem.ItemId;
                var quantity = shoppingCartItem.Quantity;

                var item = _dbContext.Items.First(i => i.Id == itemId);
                var cost = item.Cost;
                int centsCost = (int) (cost * 100);

                sum += (quantity * centsCost);
            }

            if (sum == centsAmount)
                return true;
            return false;
        }

        public Order Add(Order order)
        {
            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();
            return order;
        }

       /* public ICollection<OrderedItem> GetOrderShoppingCartItems(UserAccount user, int orderId)
        {
            // is shoppimng crt'o gaunam item id ir quantity
            var order = GetOrder(orderId);
            var shoppingCart = _dbContext.ShoppingCarts.First(s => s.User.Id == user.Id);
            var shoppingCartItems = _dbContext.ShoppingCartItems.Where(i => i.ShoppingCartId == shoppingCart.Id);
            ICollection<OrderedItem> orderedItems = new List<OrderedItem>();
            foreach (var shoppingCartItem in shoppingCartItems)
            {
                var item = _dbContext.Items.First(i => i.Id == shoppingCartItem.ItemId);
                OrderedItem orderedItem = new OrderedItem
                {
                    Item = item,
                    ItemId = item.Id,
                    Order = order,
                    OrderId = orderId,
                    Quantity = shoppingCartItem.Quantity
                };
                orderedItems.Append(orderedItem);
            }
            return orderedItems;
        }*/

        public UserAccount GetOrderingUser(string username)
        {
            var user = _dbContext.Users.First(u => u.UserName == username);
            return user;
        }

        public ShoppingCart ClearUserShoppingCart(UserAccount user)
        {
            //gauti shopping cart pagal user id
            var shoppingCart = _dbContext.ShoppingCarts.First(s => s.User.Id == user.Id);
            
            //is lenteles shopping cart items istrinti visus yrasus kur yra shopping cart id
            //gauti shopping cart items lista
            var shoppingCartItems = _dbContext.ShoppingCartItems.Where(s => s.ShoppingCartId == shoppingCart.Id);
           
            //reikia tiesiog istrinti atfiltruota lista is bendro listo
            foreach (var shoppingCartItem in shoppingCartItems)
            {
                _dbContext.ShoppingCartItems.Remove(shoppingCartItem);
            }
            _dbContext.SaveChanges();

            return shoppingCart;
        }

        public ICollection<OrderedItem> AddOrderedItems(ICollection<OrderedItem> orderedItems)
        {
            foreach (var orderedItem in orderedItems)
            {
                _dbContext.OrderedItems.Add(orderedItem);
            }
            _dbContext.SaveChanges();
            return orderedItems;
        }

        public ICollection<OrderedItem> GetShoppingCartItems(UserAccount user)
        {
            
            //user has only one shopping cart 
            //get user shopping cart
            var shoppingCart = _dbContext.ShoppingCarts.First(s => s.User.Id == user.Id);

            //get items with that shoopping cart id
            var shoppingCartItems = _dbContext.ShoppingCartItems.Where(s => s.ShoppingCartId == shoppingCart.Id);

            //itterathe through items in the shopping cart and add them to the collection of ordered items
            ICollection<OrderedItem> orderedItems = new List<OrderedItem>();
            foreach (var shoppingCartItem in shoppingCartItems)
            {
                OrderedItem newOrderedItem = new OrderedItem
                {
                    ItemId = shoppingCartItem.ItemId,
                    Quantity = shoppingCartItem.Quantity
                };
                orderedItems.Add(newOrderedItem);
            }
             return orderedItems;
        }
    }
}
