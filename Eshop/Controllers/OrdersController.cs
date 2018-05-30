using System;
using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.DataTransferObjects.Requests;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using Eshop.DataContracts.DataTransferObjects.Responses;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json.Linq;

namespace Eshop.Controllers
{
    [Route("api/orders")]
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
            if (!ModelState.IsValid) return BadRequest(ModelState);

            //validating body
            if (paymentInfo.Amount <= 0)
                return BadRequest("Amount to pay must is invalid"); //change request code
            if (!ValidCreditCardNumber(paymentInfo.Number))
                return BadRequest("Credit card info is invalid");
            if (paymentInfo.Holder.Length < 2 || paymentInfo.Holder.Length > 32)
                return BadRequest("Card holder name is invalid");
            if (paymentInfo.Exp_Year < 1970)
                return BadRequest("Card expiration year is invalid");
            if (paymentInfo.Exp_Month < 1 || paymentInfo.Exp_Month > 12)
                return BadRequest("Card expiration month is invalid");
            if (!ValidCvv(paymentInfo.Cvv))
                return BadRequest("Card cvv security code is invalid");


            //get user for further information
            var username = JWTtoken.GetUsernameFromToken(Request);
            var user = _ordersRepository.GetOrderingUser(username);

            //check if payment ammount matches shopping cart total amount
            decimal ammount = (decimal)paymentInfo.Amount / 100;
            if (!_ordersRepository.PaymentEqualsShoppingCartSum(user, ammount))
                return BadRequest("Payment ammount does not match the shopping cart total ammount");

            //Get current user items in the shopping cart
            var items = _ordersRepository.GetShoppingCartItems(user);


            //make payment
            //*****make payment*****
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://mock-payment-processor.appspot.com/v1/payment");
            httpWebRequest.Credentials = new NetworkCredential("technologines", "platformos");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = Newtonsoft.Json.JsonConvert.SerializeObject(paymentInfo);

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            PaymentResponse paymentResponseInfo = new PaymentResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                var paymentResponseJson = JObject.Parse(result);
                paymentResponseInfo.Created_At = (DateTime)paymentResponseJson["created_at"];
                paymentResponseInfo.Id = (string)paymentResponseJson["id"];
            }
            //*****payment made******


            //create new order with those items list
            Order newOrder = new Order
            {
                Cost = ammount,
                Date = DateTime.Now,
                UserId = user.Id,
                OrderedItem = items,
                PaymentId = paymentResponseInfo.Id,
                PaymentDate = DateTime.Now
            };

            //save order to the database
            newOrder = _ordersRepository.Add(newOrder);

            //add new orders id to the ordered items
            foreach (var orderedItem in items)
            {
                orderedItem.OrderId = newOrder.Id;
            }
            
            //clear shopping cart
            _ordersRepository.ClearUserShoppingCart(user);
            

            if (newOrder.PaymentId != null)
            {
                _ordersRepository.ClearUserShoppingCart(user);
                return Ok("Purchase successful");
            }

            return BadRequest("Something went wrong");
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

        private bool ValidCreditCardNumber(string number)
        {
            // accept only digits, dashes or spaces
            Regex regex = new Regex(@"^[(0-9)-/s]+$");
            if (!regex.IsMatch(number)) return false;

            number = number.Replace("/", "").Replace(" ", "").Replace("-", "");

            if (number.Length != 16) return false;

            // The Luhn Algorithm
            int sumOfDigits = number.Where((e) => e >= '0' && e <= '9')
                .Reverse()
                .Select((e, i) => ((int)e - 48) * (i % 2 == 0 ? 1 : 2))
                .Sum((e) => e / 10 + e % 10);

            return (sumOfDigits % 10) == 0;
        }

        private bool ValidCvv(string cvv)
        {
            Regex regex = new Regex(@"^\d{3}$");
            if (regex.IsMatch(cvv))
                return true;
            return false;
        }

        private bool ValidExpirationDate(int year, int month)
        {
            if (year < DateTime.Now.Year) return false;
            if (month < DateTime.Now.Month) return false;
            return true;
        }
    }

}
