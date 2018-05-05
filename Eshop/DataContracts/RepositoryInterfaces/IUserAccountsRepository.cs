using Eshop.Data.Entities;

namespace Eshop.DataContracts.RepositoryInterfaces
{
    public interface IUserAccountsRepository
    {
        UserAccount Get(string username);
        UserAccount BlockUser(UserAccount userAccount);
    }
}
