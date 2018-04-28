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
        [Required]
        public decimal Cost { get; set; }

        public virtual Review Review { get; set; }

        public ICollection<OrderedItem> OrderedItem { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
