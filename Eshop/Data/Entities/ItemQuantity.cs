using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Data.Entities
{
    public class ItemQuantity
    {
        public long Id { get; set; }
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
}
