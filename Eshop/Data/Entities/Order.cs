using Newtonsoft.Json;
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
        //public string PaymentId { get; set; } after successful transaction payment api sends back id of payment
        public bool Confirmed { get; set; }
        [Required]
        public decimal Cost { get; set; }

        public Review Review { get; set; }


        public ICollection<OrderedItem> OrderedItem { get; set; }

        public string UserId { get; set; }
        [JsonIgnore]
        public UserAccount User { get; set; }
    }
}
