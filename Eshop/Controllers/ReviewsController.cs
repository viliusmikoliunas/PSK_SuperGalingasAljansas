using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Eshop.Controllers
{
    [Produces("application/json")]
    [Route("api/reviews")]
    public class ReviewsController : Controller
    {
        private readonly IReviewsRepository _reviewsRepository;
        private readonly IOrdersRepository _ordersRepository;
        private readonly UserManager<UserAccount> _accountManager;

        public ReviewsController(IReviewsRepository reviewsRepository, IOrdersRepository ordersRepository, UserManager<UserAccount> accountManager)
        {
            _reviewsRepository = reviewsRepository;
            _ordersRepository = ordersRepository;
            _accountManager = accountManager;
        }

        
        [HttpGet("all")]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult GetAll()
        {
            return Ok(_reviewsRepository.GetAll());
        }

        [HttpGet("range")]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult GetRange(int startIndex, int reviewsToTake)
        {
            return Ok(_reviewsRepository.Get(startIndex, reviewsToTake));
        }

        [HttpGet("textFilter")]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult GetRange(int startIndex, int reviewsToTake, bool hasReviewText)
        {
            return Ok(_reviewsRepository.GetFilteredByText(startIndex, reviewsToTake, hasReviewText));
        }

        [HttpGet("starsFilter")]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult GetRange(int startIndex, int reviewsToTake, int stars)
        {
            return Ok(_reviewsRepository.GetFilteredByStars(startIndex, reviewsToTake, stars));
        }

        [HttpGet("fullFilter")]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult GetRange(int startIndex, int reviewsToTake, bool hasReviewText, int stars)
        {
            return Ok(_reviewsRepository.GetFiltered(startIndex, reviewsToTake, hasReviewText, stars));
        }

        [HttpPost]
        [Authorize(Roles = UserRoleString.User)]
        public async Task<IActionResult> AddReview([FromBody] ReviewDto reviewData)
        {
            //reviewData.orderId here will not be sent
            if (reviewData.Stars < 1 || reviewData.Stars > 5)
                return BadRequest("Star evaluation missing or is in incorrect format");

            var username = JWTtoken.GetUsernameFromToken(Request);
            if (username == null) return BadRequest();

            var acc = await _accountManager.FindByNameAsync(username);
            var newestOrder = _ordersRepository.GetUserPurchaseHistory(acc.Id)
                .OrderByDescending(order => order.Date)
                .FirstOrDefault();
            
            if (newestOrder == null) return BadRequest("Order not found");

            if (_reviewsRepository.GetById(newestOrder.Id) != null)
                return BadRequest("This order already has a review");

            Review newReview = new Review
            {
                Id = newestOrder.Id,
                Description = reviewData.Description,
                Stars = reviewData.Stars
            };
            Review addedReview = _reviewsRepository.Add(newReview);
            if (addedReview == null)
                return BadRequest("Review could not be added");
            return Ok("Review added successfully");
        }

        /* why we even have this? :D
        [HttpPut]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult UpdateReview([FromBody] ReviewDto reviewData)
        {
            //check if review exists
            if (_reviewsRepository.GetAll().All(r => r.Id != reviewData.OrderId))
                return BadRequest("Review you want to update does not exist");

            var reviewToUpdate = _reviewsRepository.GetAll().ToList().First(r => r.Id == reviewData.OrderId);
            if (reviewData.Stars < 1 || reviewData.Stars > 5)
                return BadRequest("Star evaluation missing");

            reviewToUpdate.Description = reviewData.Description;
            reviewToUpdate.Stars = reviewData.Stars;
            _reviewsRepository.Update(reviewToUpdate);
            return Ok("Review updated successfully");
        }
        */

        [HttpDelete]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult DeleteReview([FromBody] ReviewDto reviewData)
        {
            //check if review exists
            if (_reviewsRepository.GetAll().All(r => r.Id != reviewData.OrderId))
                return BadRequest("Review you want to update does not exist");

            var reviewToDelete = _reviewsRepository.GetAll().ToList().First(r => r.Id == reviewData.OrderId);

            _reviewsRepository.Delete(reviewToDelete);
            return Ok("Review has been deleted");
            
        }
    }
}
