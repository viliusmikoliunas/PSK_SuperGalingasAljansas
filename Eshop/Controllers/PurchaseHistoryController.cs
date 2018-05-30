using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects.Responses;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Controllers
{
    [Produces("application/json")]
    [Route("api/purchase-history")]
    public class PurchaseHistoryController : Controller
    {
        private readonly IOrdersRepository _ordersRepository;
        private readonly UserManager<UserAccount> _accountManager;

        public PurchaseHistoryController(IOrdersRepository ordersRepository, UserManager<UserAccount> accountManager)
        {
            _ordersRepository = ordersRepository;
            _accountManager = accountManager;
        }

        [HttpGet]
        [Authorize(Roles = UserRoleString.User)]
        public async Task<IActionResult> GetPurchaseHistory()
        {
            var username = JWTtoken.GetUsernameFromToken(Request);
            if (username == null) return NotFound();

            var user = await _accountManager.FindByNameAsync(username);
            if (user == null) return NotFound();

            var list = _ordersRepository.GetUserPurchaseHistory(user.Id).ToList();
            if (list.Count() != 0)
            {
                List<ShoppingHistoryItemResponse> purchases = list.Select(order => new ShoppingHistoryItemResponse
                    {
                        Id = order.Id,
                        Date = order.Date,
                        Items = order.Items,
                        Cost = order.Cost
                    })
                    .ToList();

                return Ok(purchases);
            }
            else
                return NotFound("Purchase history is empty!");
        }
    }
}