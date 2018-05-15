using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Eshop.Data.Entities
{
    public class Review
    {
        [ForeignKey("Order")]
        public int Id { get; set; }

        [Required]
        [Range(1,5)]
        public int Stars { get; set; }
        public string Description { get; set; }

        public Order Order { get; set; }
    }
}
