using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Data
{
    public class ItemsRepository : IItemsRepository
    {
        private readonly AppDbContext _dbContext;

        public ItemsRepository(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }

        public IEnumerable<Item> GetAll()
        {
            using (_dbContext)
            {
                return _dbContext.Items.ToList();
            }
        }

        public void SaveSingleItem(Item newItem)
        {
            using (_dbContext)
            {
                _dbContext.Items.Add(newItem);
                _dbContext.SaveChanges();
            }
        }
    }
}
