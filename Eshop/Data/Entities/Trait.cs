using System.Collections.Generic;
using Eshop.Data.Entities.JoinTables;
using Newtonsoft.Json;

namespace Eshop.Data.Entities
{
    public class Trait
    {
        public int Id { get; set; }
        public string Title { get; set; }
        [JsonIgnore]
        public ICollection<ItemTrait> ItemTraits { get; set; }
    }
}
