using System.Collections.Generic;
using Eshop.Data.Entities;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IItemsRepository
    {
        IEnumerable<Item> GetAll();
        //IEnumerable<Item> Get(int startIndex, int itemsToTake);
        Item Add(Item newItem);
        //Item Add(IEnumerable<Item> items);
        //Item Update(Item updatedItem);
        bool Delete(int itemId);
        Item GetItem(int id);
    }
}
