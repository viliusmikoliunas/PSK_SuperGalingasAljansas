using System.Collections.Generic;
using Eshop.Data.Entities.JoinTables;

namespace Eshop.Data.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public ICollection<ItemCategory> ItemCategories { get; set; }
    }
}
