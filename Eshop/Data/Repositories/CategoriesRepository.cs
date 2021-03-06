﻿using System.Collections.Generic;
using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts.RepositoryInterfaces;

namespace Eshop.Data.Repositories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly AppDbContext _dbContext;

        public CategoriesRepository(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }

        public IEnumerable<Category> GetAll()
        {
            return _dbContext.Categories.ToList();
        }

        public Category Add(Category newCategory)
        {
            _dbContext.Categories.Add(newCategory);
            _dbContext.SaveChanges();
            return newCategory;
        }

        public Category Update(Category categoryToUpdate)
        {
            _dbContext.Categories.Update(categoryToUpdate);
            _dbContext.SaveChanges();
            return categoryToUpdate;
        }

        public void Delete(Category categoryToDelete)
        {
            _dbContext.Categories.Remove(categoryToDelete);
            _dbContext.SaveChanges();
        }

        public Category GetCategory(int id)
        {
            return _dbContext.Categories.FirstOrDefault(category => category.Id == id);
        }
    }
}
