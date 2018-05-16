using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Eshop.Data.Entities
{
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public bool HasBeenPaidFor { get; set; }
        //public string PaymentId { get; set; } probably needed for then admin confirms order
        public bool Confirmed { get; set; }
        [Required]
        public decimal Cost { get; set; }

        public Review Review { get; set; }

        public ICollection<OrderedItem> OrderedItem { get; set; }

        public string UserId { get; set; }
        public UserAccount User { get; set; }
    }
}
