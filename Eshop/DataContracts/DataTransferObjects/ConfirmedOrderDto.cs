using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DataContracts.DataTransferObjects
{
    public class ConfirmedOrderDto
    {
        public int Id { get; set; }
        public bool Confirmed { get; set; }
    }
}

