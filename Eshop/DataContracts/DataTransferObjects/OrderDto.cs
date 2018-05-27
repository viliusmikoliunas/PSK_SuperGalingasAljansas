using Eshop.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DataContracts.DataTransferObjects
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public ICollection<OrderedItemDto> Items { get; set; }
        public string UserId { get; set; }
        public decimal Cost { get; set; }
        public ReviewDto Review { get; set; }
        public bool Confirmed { get; set; }
    }
}
