using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DataContracts.DataTransferObjects
{
    public class GetItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Cost { get; set; }
        public string Description { get; set; }
        public string PictureLocation { get; set; }

        public ICollection<CategoryDto> ItemCategories { get; set; }

        public ICollection<TraitDto> ItemTraits { get; set; }
    }
}
