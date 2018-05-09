using System.ComponentModel.DataAnnotations;

namespace Eshop.DataContracts.DataTransferObjects.Requests
{
    public class BlockRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public bool Block { get; set; }
    }
}
