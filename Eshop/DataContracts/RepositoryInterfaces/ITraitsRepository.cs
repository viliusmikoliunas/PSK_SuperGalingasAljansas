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
        Trait Add(Trait newTrait);
        Trait Update(Trait traitToUpdate);
        Trait GetTrait(int id);
        void Delete(Trait trait);
    }
}
