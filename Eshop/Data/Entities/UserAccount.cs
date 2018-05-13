using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Eshop.Data.Entities
{
    public class UserAccount : IdentityUser
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public bool IsBlocked { get; set; }

        //public virtual ShoppingCart ShoppingCart { get; set; }

        //public ICollection<Order> Orders { get; set; }
    }
}
