namespace Eshop.DataContracts.DataTransferObjects.Responses
{
    public class ShoppingCartItemResponse
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string ImagePath { get; set; }
    }
}
