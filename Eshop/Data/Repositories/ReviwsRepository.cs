using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;
using Eshop.DataContracts.RepositoryInterfaces;

namespace Eshop.Data.Repositories
{
    public class ReviewsRepository : IReviewsRepository
    {
        private readonly AppDbContext _dbContext;

        public ReviewsRepository(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }
        public IEnumerable<Review> GetAll()
        {
            return _dbContext.Reviews.ToList();
        }


        public IEnumerable<Review> Get(int startIndex, int reviewsToTake)
        {
            if (startIndex < 1)
                startIndex = 1;
            if (reviewsToTake > GetAll().Count())
                reviewsToTake = GetAll().Count();

            return _dbContext.Reviews.ToList().GetRange(startIndex - 1, reviewsToTake);
        }

        public IEnumerable<Review> GetFilteredByStars(int startIndex, int reviewsToTake, int stars)
        {
            var filteredReviews = _dbContext.Reviews.ToList().Where(s => s.Stars == stars);
            if (startIndex < 1)
                startIndex = 1;
            if (reviewsToTake > filteredReviews.Count())
                reviewsToTake = filteredReviews.Count();
            return filteredReviews.ToList().GetRange(startIndex - 1, reviewsToTake);
        }

        public IEnumerable<Review> GetFilteredByText(int startIndex, int reviewsToTake, bool hasReviewText)
        {
            var filteredReviews = hasReviewText ? 
                _dbContext.Reviews.ToList().Where(s => s.Description != null) : 
                _dbContext.Reviews.ToList().Where(s => s.Description == null);

            if (startIndex < 1)
                startIndex = 1;
            if (reviewsToTake > filteredReviews.Count())
                reviewsToTake = filteredReviews.Count();

            return filteredReviews.ToList().GetRange(startIndex - 1, reviewsToTake);
        }

        public IEnumerable<Review> GetFiltered(int startIndex, int reviewsToTake, bool hasReviewText, int stars)
        {
            var filteredReviews = _dbContext.Reviews.ToList().Where(s => s.Stars == stars);
            filteredReviews = hasReviewText ?
                filteredReviews.ToList().Where(s => s.Description != null) :
                filteredReviews.ToList().Where(s => s.Description == null);
            if (startIndex < 1)
                startIndex = 1;
            if (reviewsToTake > filteredReviews.Count())
                reviewsToTake = filteredReviews.Count();
            return filteredReviews.ToList().GetRange(startIndex - 1, reviewsToTake);
        }

        public Review GetById(int id)
        {
            return _dbContext.Reviews.FirstOrDefault(r => r.Id == id);
        }

        public Review Add(Review newReview)
        {
            if (_dbContext.Orders.ToList().All(o => o.Id != newReview.Id))
                return null;

            _dbContext.Reviews.Add(newReview);
            _dbContext.SaveChanges();
            return newReview;
        }

        public Review Update(Review reviewToUpdate)
        {
            _dbContext.Reviews.Update(reviewToUpdate);
            _dbContext.SaveChanges();
            return reviewToUpdate;
        }

        public void Delete(Review reviewToDelete)
        {
            _dbContext.Reviews.Remove(reviewToDelete);
            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            Delete(GetById(id));
        }
    }
}
