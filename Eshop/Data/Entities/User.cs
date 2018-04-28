using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Data.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public bool IsBlocked { get; set; }
        [Required]
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
