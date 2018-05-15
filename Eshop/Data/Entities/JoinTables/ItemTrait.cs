namespace Eshop.Data.Entities.JoinTables
{
    public class ItemTrait
    {
        public int ItemId { get; set; }
        public Item Item { get; set; }

        public int TraitId { get; set; }
        public Trait Trait { get; set; }
    }
}
