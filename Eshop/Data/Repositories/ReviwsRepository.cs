using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;
using Eshop.DataContracts.RepositoryInterfaces;

namespace Eshop.Data.Repositories
{
    public class ReviwsRepository : IReviewsRepository
    {
        private readonly AppDbContext _dbContext;

        public ReviwsRepository(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }
        public IEnumerable<Review> GetAll()
        {
            return _dbContext.Reviews.ToList();
        }

        public Review Add(Review newReview)
        {
            _dbContext.Reviews.Add(newReview);
            _dbContext.SaveChanges();
            return newReview;
        }
    }
}
