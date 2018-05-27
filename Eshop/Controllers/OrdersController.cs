using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.DataTransferObjects.Requests;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Eshop.Controllers
{
    [Route("/api/orders")]
    [Produces("application/json")]
    public class OrdersController : Controller
    {
        private readonly IOrdersRepository _ordersRepository;

        public OrdersController(IOrdersRepository ordersRepository)
        {
            _ordersRepository = ordersRepository;
        }

        [HttpPost]
        [Authorize(Roles = UserRoleString.User)]
        public IActionResult HandlePurchase([FromBody] PaymentRequest paymentInfo)
        {
            if (paymentInfo == null) return BadRequest("Something bad happenned");
            return Ok("Purchase successful");
        }

        [HttpGet("confirmed")]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult GetOrdersByStatus(bool confirmed)
        {
            var list = _ordersRepository.GetByStatus(confirmed);
            if (list.Count() != 0)
                return Ok(list);
            else
                return NotFound("Orders not found!");
        }

        [HttpGet("userId")]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult GetOrdersByUserId( string userId)
        {
            var list = _ordersRepository.GetByUserId(userId);
            if (list.Count() != 0)
                return Ok(list);
            else
                return NotFound("User doesn't have orders!");
        }

        [HttpGet]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult GetAll()
        {
            var list = _ordersRepository.GetAll();
            if (list.Count() != 0)
                return Ok(list);
            else
                return NotFound("Orders not found!");
        }

        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            return Ok(_ordersRepository.GetOrder(id));
        }

        [HttpPut]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult ConfirmOrder([FromBody] ConfirmedOrderDto confirmedOrder)  
        {
            var orderToConfirm = _ordersRepository.GetOrder(confirmedOrder.Id);
            if (orderToConfirm != null)
            {
                if (orderToConfirm.Confirmed == confirmedOrder.Confirmed)
                {
                    return Ok($"Order {orderToConfirm.Id} confirmation status is already {orderToConfirm.Confirmed}");
                }

                orderToConfirm.Confirmed = confirmedOrder.Confirmed;
                _ordersRepository.Update(orderToConfirm);
                if (confirmedOrder.Confirmed)
                {
                    return Ok($"Order {orderToConfirm.Id} confirmed");
                }
                return Ok($"Order {orderToConfirm.Id} unconfirmed");
            }

            return NotFound($"Order {confirmedOrder.Id} does not exist in the database");
        }
    }

}
