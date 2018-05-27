using System.Collections.Generic;
using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;

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
            return _dbContext.Items.Include(item => item.ItemTraits).Include("ItemTraits.Trait").Include(item => item.ItemCategories).Include("ItemCategories.Category").ToList();
        }

        public Item Add(Item newItem)
        {
            _dbContext.Items.Add(newItem);
            _dbContext.SaveChanges();
            return newItem;
        }

        public bool Delete(int itemId)
        {
            var item = _dbContext.Items.FirstOrDefault(i => i.Id == itemId); 
            if (item == null) return false;
            _dbContext.Items.Remove(item);
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
            var selectedItem = _dbContext.Items.Include(item=>item.ItemTraits).Include("ItemTraits.Trait").Include(item =>item.ItemCategories).Include("ItemCategories.Category").FirstOrDefault(item => item.Id == id);
            return selectedItem;
        }



        public IEnumerable<GetItemDto> GetAllDto()
        {
            var itemsList = from i in _dbContext.Items
                            select new GetItemDto
                            {
                                Id = i.Id,
                                Title = i.Title,
                                Cost = i.Cost,
                                Description = i.Description,
                                PictureLocation = i.PictureLocation,
                                ItemCategories = (from ic in i.ItemCategories select new CategoryDto { Id = ic.Category.Id, Title = ic.Category.Title }).ToList(),
                                ItemTraits = (from it in i.ItemTraits select new TraitDto { Id = it.Trait.Id, Title = it.Trait.Title }).ToList(),
                            };
            return itemsList;
        }

        public IQueryable<GetItemDto> GetItemDto(int id)
        {
            var selectedItem = from i in _dbContext.Items
                               where i.Id == id
                            select new GetItemDto
                            {
                                Id = i.Id,
                                Title = i.Title,
                                Cost = i.Cost,
                                Description = i.Description,
                                PictureLocation = i.PictureLocation,
                                ItemCategories = (from ic in i.ItemCategories select new CategoryDto { Id = ic.Category.Id, Title = ic.Category.Title }).ToList(),
                                ItemTraits = (from it in i.ItemTraits select new TraitDto { Id = it.Trait.Id, Title = it.Trait.Title }).ToList(),
                            };
            return selectedItem;
        }
    }
}
