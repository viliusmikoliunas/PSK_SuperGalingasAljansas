using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Controllers
{
    [Route("/api/orders")]
    [Produces("application/json")]
    public class OrdersController : Controller
    {
        [HttpPost]
        [Authorize(Roles = UserRoleString.User)]
        public IActionResult HandlePurchase([FromBody] PaymentRequest paymentInfo)
        {
            if (paymentInfo == null) return BadRequest("Something bad happenned");
            return Ok("Purchase successful");
        }
    }
}
