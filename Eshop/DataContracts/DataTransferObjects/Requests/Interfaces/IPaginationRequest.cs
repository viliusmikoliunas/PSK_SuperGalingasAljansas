namespace Eshop.DataContracts.DataTransferObjects.Requests.Interfaces
{
    interface IPaginationRequest
    {
        int Page { get; set; }
        int Limit { get; set; }
    }
}
