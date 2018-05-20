using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Eshop.Controllers
{
    [Produces("application/json")]
    [Route("api/reviews")]
    public class ReviewsController : Controller
    {
        private readonly IReviewsRepository _reviewsRepository;

        public ReviewsController(IReviewsRepository reviewsRepository)
        {
            _reviewsRepository = reviewsRepository;
        }


        //kaip padaryt kelis HttpGet
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_reviewsRepository.GetAll());
        }

        [HttpGet("range")]
        public IActionResult GetRange(int startIndex, int reviewsToTake)
        {
            return Ok(_reviewsRepository.Get(startIndex, reviewsToTake));
        }

        [HttpGet("textFilter")]
        public IActionResult GetRange(int startIndex, int reviewsToTake, bool hasReviewText)
        {
            return Ok(_reviewsRepository.GetFilteredByText(startIndex, reviewsToTake, hasReviewText));
        }

        [HttpGet("starsFilter")]
        public IActionResult GetRange(int startIndex, int reviewsToTake, int stars)
        {
            return Ok(_reviewsRepository.GetFilteredByStars(startIndex, reviewsToTake, stars));
        }

        [HttpGet("fullFilter")]
        public IActionResult GetRange(int startIndex, int reviewsToTake, bool hasReviewText, int stars)
        {
            return Ok(_reviewsRepository.GetFiltered(startIndex, reviewsToTake, hasReviewText, stars));
        }

        [HttpPost]
        public IActionResult AddReview([FromBody] ReviewDto reviewData)
        {
            if (reviewData.Stars < 1 || reviewData.Stars > 5)
                return BadRequest("Star evaluation missing or is in incorrect format");
            
            if (_reviewsRepository.GetAll().Any(r => r.Id == reviewData.OrderId))
                return BadRequest("This order already has a review");

            Review newReview = new Review
            {
                Id = reviewData.OrderId,
                Description = reviewData.Description,
                Stars = reviewData.Stars
            };
            Review addedReview = _reviewsRepository.Add(newReview);
            if (addedReview == null)
                return BadRequest("Review could not be added");
            return Ok("Review added successfully");
        }

        [HttpPut]
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

        [HttpDelete]
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
