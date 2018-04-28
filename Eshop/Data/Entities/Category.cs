﻿using System.Collections.Generic;

namespace Eshop.Data.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public virtual ICollection<Item> Items { get; set; }
    }
}
