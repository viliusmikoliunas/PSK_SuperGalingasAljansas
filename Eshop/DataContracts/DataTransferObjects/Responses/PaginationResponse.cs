using System.Collections.Generic;

namespace Eshop.DataContracts.DataTransferObjects.Responses
{
    public class PaginationResponse<T>
    {
        public IEnumerable<T> Items { get; set; }
        public int AllItemsCount { get; set; }
    }
}
