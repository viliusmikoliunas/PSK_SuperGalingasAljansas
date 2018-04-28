using Eshop.Data.Entities;
using Eshop.Data.Entities.JoinTables;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Data
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            
        }
        //this is there you put tables to DB
        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderedItem> OrderedItems { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<ShoppingCartItem> ShoppingCartItems { get; set; }
        public DbSet<Trait> Traits { get; set; }
        public DbSet<UserAccount> UserAccounts { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Many-to-many Item - Category
            modelBuilder.Entity<ItemCategory>()
                .HasKey(ic => new {ic.ItemId, ic.CategoryId});

            modelBuilder.Entity<ItemCategory>()
                .HasOne(ic => ic.Item)
                .WithMany(i => i.ItemCategories)
                .HasForeignKey(ic => ic.ItemId);

            modelBuilder.Entity<ItemCategory>()
                .HasOne(ic => ic.Category)
                .WithMany(c => c.ItemCategories)
                .HasForeignKey(ic => ic.CategoryId);

            //Many-to-many Item - Trait
            modelBuilder.Entity<ItemTrait>()
                .HasKey(it => new {it.ItemId, it.TraitId});

            modelBuilder.Entity<ItemTrait>()
                .HasOne(it => it.Item)
                .WithMany(i => i.ItemTraits)
                .HasForeignKey(it => it.ItemId);

            modelBuilder.Entity<ItemTrait>()
                .HasOne(it => it.Trait)
                .WithMany(t => t.ItemTraits)
                .HasForeignKey(it => it.TraitId);
        }
    }
}
