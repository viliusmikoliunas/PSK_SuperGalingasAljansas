using Eshop.DataContracts.DataTransferObjects.Requests.Interfaces;

namespace Eshop.DataContracts.DataTransferObjects.Requests
{
    public class PaginationRequest : IPaginationRequest
    {
        public int Page { get; set; } = 1;
        public int Limit { get; set; } = 20;
    }
}
