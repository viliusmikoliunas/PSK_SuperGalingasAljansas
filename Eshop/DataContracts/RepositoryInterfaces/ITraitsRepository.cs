using Eshop.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface ITraitsRepository
    {
        IEnumerable<Trait> GetAll();
        //IEnumerable<Trait> Get(int startIndex, int traitsToTake);
        Trait Add(Trait newTrait);
        //Item Trait(IEnumerable<Trait> trait);
        Trait Update(Trait traitToUpdate);
        Trait GetTrait(int id);
        void Delete(Trait trait);
    }
}
