using System.ComponentModel.DataAnnotations;

namespace Eshop.Data.Entities
{
    public class Item
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public decimal Cost { get; set; }
        public string Description { get; set; }
        public string PictureLocation { get; set; }


    }
}
