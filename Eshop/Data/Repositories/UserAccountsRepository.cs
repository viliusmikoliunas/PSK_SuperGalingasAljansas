using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts.RepositoryInterfaces;

namespace Eshop.Data.Repositories
{
    public class UserAccountsRepository : IUserAccountsRepository
    {
        private readonly AppDbContext _dbContext;

        public UserAccountsRepository(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }

        public UserAccount Get(string username)
        {
            var us = _dbContext.UserAccounts.FirstOrDefault(user => user.UserName.Equals(username));
            return us;
        }

        public UserAccount BlockUser(UserAccount userAccount)
        {
            userAccount.IsBlocked = true;
            _dbContext.SaveChanges();
            return userAccount;
        }
    }
}

