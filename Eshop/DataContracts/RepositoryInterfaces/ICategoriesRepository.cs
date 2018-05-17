using Eshop.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface ICategoriesRepository
    {
        IEnumerable<Category> GetAll();
        //IEnumerable<Trait> Get(int startIndex, int traitsToTake);
        Category Add(Category newCategory);
        //Item Trait(IEnumerable<Trait> trait);
        Category Update(Category categoryToUpdate);
        Category GetCategory(int id);
        void Delete(Category category);
    }
}
