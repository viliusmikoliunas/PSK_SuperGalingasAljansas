using Eshop.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            
        }
        //this is there you put tables to DB
        public DbSet<Item> Items { get; set; }

    }
}
