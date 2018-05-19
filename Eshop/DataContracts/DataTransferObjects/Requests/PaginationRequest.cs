namespace Eshop.DataContracts.DataTransferObjects.Requests
{
    public class PaginationRequest
    {
        public int Page { get; set; } = 1;
        public int Limit { get; set; } = 20;
    }
}
