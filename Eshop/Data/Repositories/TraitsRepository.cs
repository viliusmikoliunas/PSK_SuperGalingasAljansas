using System.Collections.Generic;
using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts.RepositoryInterfaces;

namespace Eshop.Data.Repositories
{
    public class TraitsRepository : ITraitsRepository
    {
        private readonly AppDbContext _dbContext;

        public TraitsRepository(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }

        public IEnumerable<Trait> GetAll()
        {
            return _dbContext.Traits.ToList();
        }

        public Trait Add(Trait newTrait)
        {
            _dbContext.Traits.Add(newTrait);
            _dbContext.SaveChanges();
            return newTrait;
        }

        public Trait Update(Trait traitToUpdate)
        {
            _dbContext.Traits.Update(traitToUpdate);
            _dbContext.SaveChanges();
            return traitToUpdate;
        }

        public void Delete(Trait traitToDelete)
        {
            _dbContext.Traits.Remove(traitToDelete);
            _dbContext.SaveChanges();
        }

        public Trait GetTrait(int id)
        {
            var selectedTrait = _dbContext.Traits.FirstOrDefault(trait => trait.Id == id);
            return selectedTrait;
        }
    }
}
