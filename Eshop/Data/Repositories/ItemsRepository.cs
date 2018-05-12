using System;
using System.Collections.Generic;
using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts.RepositoryInterfaces;

namespace Eshop.Data.Repositories
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
            return _dbContext.Items.ToList();
        }

        public Item Add(Item newItem)
        {
            _dbContext.Items.Add(newItem);
            _dbContext.SaveChanges();
            return newItem;
        }

        public Boolean Delete(int itemId)
        {
            try
            {
                var item = GetItem(itemId);
                if (item == null) throw new NullReferenceException();
                _dbContext.Items.Remove(GetItem(itemId));
                _dbContext.SaveChanges();
                return true;
            }
            catch (NullReferenceException)
            {
                return false;
            }
        }

        public Item GetItem(int id)
        {
            var item_ = _dbContext.Items.FirstOrDefault(item => item.Id == id);           
            return item_;
        }
    }
}
