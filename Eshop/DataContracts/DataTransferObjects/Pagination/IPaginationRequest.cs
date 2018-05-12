namespace Eshop.DataContracts.DataTransferObjects.Pagination
{
    public interface IPaginationRequest
    {
        string StartId { get; set; }
        int Limit { get; set; }
    }
}
