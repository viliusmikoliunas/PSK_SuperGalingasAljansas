using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Eshop.Data.Entities
{
    public class ShoppingCart
    {
        [ForeignKey("UserAccount")]
        public string Id { get; set; }

        public virtual UserAccount User { get; set; }

        public ICollection<ShoppingCartItem> ShoppingCartItems { get; set; }
    }
}
