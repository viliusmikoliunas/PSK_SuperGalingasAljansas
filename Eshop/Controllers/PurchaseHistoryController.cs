using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Controllers
{
    [Produces("application/json")]
    [Route("api/purchase-history")]
    public class PurchaseHistoryController : Controller
    {
        private readonly IOrdersRepository _ordersRepository;

        public PurchaseHistoryController(IOrdersRepository ordersRepository)
        {
            _ordersRepository = ordersRepository;
        }

        [HttpGet("userId")]
        //  [Authorize(Roles = UserRoleString.User)]
        public IActionResult GetPurchaseHistory(string userId)
        {
            var list = _ordersRepository.GetUserPurchaseHistory(userId);
            if (list.Count() != 0)
                return Ok(list);
            else
                return NotFound("Purchase history is empty!");
        }
    }
}