using System.ComponentModel.DataAnnotations;

namespace Eshop.DataContracts.DataTransferObjects.Requests
{
    public class RegisterRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
    }
}
