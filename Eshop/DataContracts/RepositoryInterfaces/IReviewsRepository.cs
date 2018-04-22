using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    interface IReviewsRepository
    {
        IEnumerable<Review> Get(int startIndex, int reviewsToTake);
        IEnumerable<Review> GetFilteredByStars(int startIndex, int reviewsToTake, int stars);
        IEnumerable<Review> GetFilteredByText(int startIndex, int reviewsToTake, bool hasReviewText);
        IEnumerable<Review> GetFiltered(int startIndex, int reviewsToTake, bool hasReviewText, int stars);
        Review Add(Review newReview);
    }
}
