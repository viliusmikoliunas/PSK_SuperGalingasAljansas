namespace Eshop.DataContracts.DataTransferObjects.Responses
{
    public class UserInfoResponse
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public bool IsBlocked { get; set; }
    }
}
