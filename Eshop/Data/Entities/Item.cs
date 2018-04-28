using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Eshop.Data.Entities.JoinTables;

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

        public ICollection<ItemCategory> ItemCategories { get; set; }

        public ICollection<ItemTrait> ItemTraits { get; set; }

        public ICollection<OrderedItem> OrderedItems { get; set; }

        public ICollection<ShoppingCartItem> ShoppingCartItems { get; set; }
    }
}
