﻿using Eshop.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DataContracts.DataTransferObjects
{
    public class OrderedItemDto
    {
        public string Title { get; set; }
        public int Quantity { get; set; }
    }
}
