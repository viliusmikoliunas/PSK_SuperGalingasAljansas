using System.Collections.Generic;

namespace Eshop.DataContracts.DataTransferObjects.Pagination
{
    public class PaginationResponse<T>
    {
        public IEnumerable<T> Items { get; set; }
        public string First { get; set; }
        public string Back2 { get; set; }
        public string Back1 { get; set; }

        public string Next1 { get; set; }
        public string Next2 { get; set; }
        public string Last { get; set; }
    }
}
