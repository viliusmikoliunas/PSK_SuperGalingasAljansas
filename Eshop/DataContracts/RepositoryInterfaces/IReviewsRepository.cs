﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IReviewsRepository
    {
        IEnumerable<Review> GetAll();
        IEnumerable<Review> Get(int startIndex, int reviewsToTake);
        IEnumerable<Review> GetFilteredByStars(int startIndex, int reviewsToTake, int stars);
        IEnumerable<Review> GetFilteredByText(int startIndex, int reviewsToTake, bool hasReviewText);
        IEnumerable<Review> GetFiltered(int startIndex, int reviewsToTake, bool hasReviewText, int stars);
        Review GetById(int id);
        Review Add(Review newReview);
        Review Update(Review reviewToUpdate);
        void Delete(Review reviewToDelete);
        void Delete(int id);
    }
}
