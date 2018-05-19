using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data.Entities;

namespace Eshop.DataContracts.DataTransferObjects
{
    public class ReviewDto
    {
        public int Stars { get; set; } 
        public string Description { get; set; }
        public Order Order { get; set; }
    }
}
