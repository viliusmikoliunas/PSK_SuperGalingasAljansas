using Newtonsoft.Json;

namespace Eshop.Data.Entities.JoinTables
{
    public class ItemCategory
    {
        [JsonIgnore]
        public int ItemId { get; set; }
        [JsonIgnore]
        public Item Item { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
