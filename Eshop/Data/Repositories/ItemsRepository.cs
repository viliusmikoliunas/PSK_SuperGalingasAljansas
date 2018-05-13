﻿using System;
using System.Collections.Generic;
using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using Eshop.DataContracts.DataTransferObjects;

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

        public bool Delete(int itemId)
        {
            var item_ = _dbContext.Items.FirstOrDefault(item => item.Id == itemId); 
            if (item_ == null) return false;
            _dbContext.Items.Remove(item_);
            _dbContext.SaveChanges();
            return true;
        }      

        public Item Update(Item itemToUpdate)
        {         
            _dbContext.Items.Update(itemToUpdate);
            _dbContext.SaveChanges();
            return itemToUpdate;
        }

        public Item GetItem(int id)
        {
            // var selectedItem = _dbContext.Items.FirstOrDefault(item => item.Id == id);
            var selectedItem = _dbContext.Items.Include(item=>item.ItemTraits).Include(item =>item.ItemCategories).FirstOrDefault(item => item.Id == id);
            return selectedItem;
        }
    }
}
