using System;
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
    }
}
