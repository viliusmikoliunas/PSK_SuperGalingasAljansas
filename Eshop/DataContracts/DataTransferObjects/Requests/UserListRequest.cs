using Eshop.DataContracts.DataTransferObjects.Pagination;

namespace Eshop.DataContracts.DataTransferObjects.Requests
{
    public class UserListRequest : IPaginationRequest
    {
        public string StartId { get; set; }
        public int Limit { get; set; }
    }
}
