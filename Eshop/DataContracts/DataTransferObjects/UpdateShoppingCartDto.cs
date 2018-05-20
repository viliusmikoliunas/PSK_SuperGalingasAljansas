using Eshop.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DataContracts.DataTransferObjects
{
    public class UpdateShoppingCartDto
    {
        public ShoppingCart newCart { get; set; }
    }
}
