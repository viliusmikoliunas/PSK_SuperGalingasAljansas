namespace Eshop.Data.Entities
{
    public class ShoppingCartItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        public int ItemId { get; set; }
        public Item Item { get; set; }

        public string ShoppingCartId { get; set; }
        public ShoppingCart ShoppingCart { get; set; }
    }
}
