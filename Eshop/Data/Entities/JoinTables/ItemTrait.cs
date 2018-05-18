using Newtonsoft.Json;

namespace Eshop.Data.Entities.JoinTables
{
    public class ItemTrait
    {
        [JsonIgnore]
        public int ItemId { get; set; }
        [JsonIgnore]
        public Item Item { get; set; }

        public int TraitId { get; set; }
        public Trait Trait { get; set; }
    }
}
