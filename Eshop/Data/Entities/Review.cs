using System.ComponentModel.DataAnnotations;

namespace Eshop.Data.Entities
{
    public class Review
    {
        public int Id { get; set; }
        [Required]
        [Range(1,5)]
        public int Stars { get; set; }
        public string Description { get; set; }
    }
}
