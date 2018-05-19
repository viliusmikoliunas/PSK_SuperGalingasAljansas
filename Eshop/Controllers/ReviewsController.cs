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

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_reviewsRepository.GetAll());
        }
    }
}
