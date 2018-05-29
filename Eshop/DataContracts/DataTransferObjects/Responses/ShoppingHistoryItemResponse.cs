using System;
using System.Collections.Generic;
using Eshop.Data.Entities;

namespace Eshop.DataContracts.DataTransferObjects.Responses
{
    public class ShoppingHistoryItemResponse
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public IEnumerable<OrderedItemDto> Items { get; set; }
        public decimal Cost { get; set; }
    }
}
