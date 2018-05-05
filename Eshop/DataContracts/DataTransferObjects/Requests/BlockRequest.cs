using System.ComponentModel.DataAnnotations;

namespace Eshop.DataContracts.DataTransferObjects.Requests
{
    public class BlockRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public bool ShouldUserBeBlocked { get; set; }
    }
}
