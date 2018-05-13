using Eshop.Data.Entities;
using Eshop.Data.Entities.JoinTables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DataContracts.DataTransferObjects
{
    public class UpdatedItemDto 
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Cost { get; set; }
        public string Description { get; set; }
        public string PictureLocation { get; set; }

        public ICollection<ItemCategory> ItemCategories { get; set; }

        public ICollection<ItemTrait> ItemTraits { get; set; }
    }
}
