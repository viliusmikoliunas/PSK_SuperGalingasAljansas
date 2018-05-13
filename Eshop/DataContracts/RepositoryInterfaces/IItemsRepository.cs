using System.Collections.Generic;
using Eshop.Data.Entities;
using Eshop.DataContracts.DataTransferObjects;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IItemsRepository
    {
        IEnumerable<Item> GetAll();
        //IEnumerable<Item> Get(int startIndex, int itemsToTake);
        Item Add(Item newItem);
        //Item Add(IEnumerable<Item> items);
        bool Delete(int itemId);
        Item Update(Item itemToUpdate);
        Item GetItem(int id);
    }
}
