﻿// <auto-generated />
using Eshop.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace Eshop.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Eshop.Data.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Eshop.Data.Entities.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Cost");

                    b.Property<string>("Description");

                    b.Property<string>("PictureLocation");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("Eshop.Data.Entities.JoinTables.ItemCategory", b =>
                {
                    b.Property<int>("ItemId");

                    b.Property<int>("CategoryId");

                    b.HasKey("ItemId", "CategoryId");

                    b.HasIndex("CategoryId");

                    b.ToTable("ItemCategory");
                });

            modelBuilder.Entity("Eshop.Data.Entities.JoinTables.ItemTrait", b =>
                {
                    b.Property<int>("ItemId");

                    b.Property<int>("TraitId");

                    b.HasKey("ItemId", "TraitId");

                    b.HasIndex("TraitId");

                    b.ToTable("ItemTrait");
                });

            modelBuilder.Entity("Eshop.Data.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Confirmed");

                    b.Property<decimal>("Cost");

                    b.Property<DateTime>("Date");

                    b.Property<DateTime?>("PaymentDate");

                    b.Property<string>("PaymentId");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Eshop.Data.Entities.OrderedItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ItemId");

                    b.Property<int>("OrderId");

                    b.Property<int>("Quantity");

                    b.HasKey("Id");

                    b.HasIndex("ItemId");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderedItems");
                });

            modelBuilder.Entity("Eshop.Data.Entities.Review", b =>
                {
                    b.Property<int>("Id");

                    b.Property<string>("Description");

                    b.Property<int>("Stars");

                    b.HasKey("Id");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("Eshop.Data.Entities.ShoppingCart", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("ShoppingCarts");
                });

            modelBuilder.Entity("Eshop.Data.Entities.ShoppingCartItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ItemId");

                    b.Property<int>("Quantity");

                    b.Property<string>("ShoppingCartId");

                    b.HasKey("Id");

                    b.HasIndex("ItemId");

                    b.HasIndex("ShoppingCartId");

                    b.ToTable("ShoppingCartItems");
                });

            modelBuilder.Entity("Eshop.Data.Entities.Trait", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Traits");
                });

            modelBuilder.Entity("Eshop.Data.Entities.UserAccount", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("Firstname");

                    b.Property<bool>("IsBlocked");

                    b.Property<string>("Lastname");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Eshop.Data.Entities.JoinTables.ItemCategory", b =>
                {
                    b.HasOne("Eshop.Data.Entities.Category", "Category")
                        .WithMany("ItemCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Eshop.Data.Entities.Item", "Item")
                        .WithMany("ItemCategories")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Eshop.Data.Entities.JoinTables.ItemTrait", b =>
                {
                    b.HasOne("Eshop.Data.Entities.Item", "Item")
                        .WithMany("ItemTraits")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Eshop.Data.Entities.Trait", "Trait")
                        .WithMany("ItemTraits")
                        .HasForeignKey("TraitId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Eshop.Data.Entities.Order", b =>
                {
                    b.HasOne("Eshop.Data.Entities.UserAccount", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Eshop.Data.Entities.OrderedItem", b =>
                {
                    b.HasOne("Eshop.Data.Entities.Item", "Item")
                        .WithMany("OrderedItems")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Eshop.Data.Entities.Order", "Order")
                        .WithMany("OrderedItem")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Eshop.Data.Entities.Review", b =>
                {
                    b.HasOne("Eshop.Data.Entities.Order", "Order")
                        .WithOne("Review")
                        .HasForeignKey("Eshop.Data.Entities.Review", "Id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Eshop.Data.Entities.ShoppingCart", b =>
                {
                    b.HasOne("Eshop.Data.Entities.UserAccount", "User")
                        .WithOne("ShoppingCart")
                        .HasForeignKey("Eshop.Data.Entities.ShoppingCart", "UserId");
                });

            modelBuilder.Entity("Eshop.Data.Entities.ShoppingCartItem", b =>
                {
                    b.HasOne("Eshop.Data.Entities.Item", "Item")
                        .WithMany("ShoppingCartItems")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Eshop.Data.Entities.ShoppingCart", "ShoppingCart")
                        .WithMany("ShoppingCartItems")
                        .HasForeignKey("ShoppingCartId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Eshop.Data.Entities.UserAccount")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Eshop.Data.Entities.UserAccount")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Eshop.Data.Entities.UserAccount")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Eshop.Data.Entities.UserAccount")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
