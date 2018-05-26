using System.Collections.Generic;
using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts.DataTransferObjects;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IItemsRepository
    {
        IEnumerable<Item> GetAll();
        Item Add(Item newItem);
        bool Delete(int itemId);
        Item Update(Item itemToUpdate);
        Item GetItem(int id);

        IEnumerable<GetItemDto> GetAllDto();
        IQueryable<GetItemDto> GetItemDto(int id);
    }
}
