using Eshop.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DataContracts.DataTransferObjects
{
    public class ShoppingCartDto
    {        
        public int itemId { get; set; }
        public int itemQuantity { get; set; }
    }
}
