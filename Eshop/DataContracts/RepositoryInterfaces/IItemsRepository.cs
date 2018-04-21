using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IItemsRepository
    {
        IEnumerable<Item> GetAll();
        void SaveSingleItem(Item newItem);
    }
}
