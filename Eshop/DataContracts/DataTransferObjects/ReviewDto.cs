﻿namespace Eshop.DataContracts.DataTransferObjects
{
    public class ReviewDto
    {
        public int Stars { get; set; } 
        public string Description { get; set; }
        public int OrderId { get; set; }
    }
}
