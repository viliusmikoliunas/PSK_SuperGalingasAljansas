using Eshop.Data.Entities.JoinTables;
using System.Collections.Generic;

namespace Eshop.DataContracts.DataTransferObjects
{
    public class ItemDto
    {
        public string Title { get; set; }
        public decimal Cost { get; set; }
        public string Description { get; set; }
        public string PictureLocation { get; set; }

        public ICollection<ItemCategory> ItemCategories { get; set; }

        public ICollection<ItemTrait> ItemTraits { get; set; }
    }
}
