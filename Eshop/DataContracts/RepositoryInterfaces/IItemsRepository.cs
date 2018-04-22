using System.Collections.Generic;
using Eshop.Data.Entities;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IItemsRepository
    {
        IEnumerable<Item> GetAll();
        void Add(Item newItem);
    }
}
