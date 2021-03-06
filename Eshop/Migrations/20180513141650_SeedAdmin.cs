﻿using Microsoft.EntityFrameworkCore.Migrations;
using System;
using Eshop.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace Eshop.Migrations
{
    public partial class SeedAdmin : Migration
    {
        private readonly int adminUserRoleId = 1;
        private readonly string adminPassword = "SuperPassword.9";
        private UserAccount _admin = new UserAccount
        {
            UserName = "Admin",
            NormalizedUserName = "ADMIN",
            Email = "superShop@gmail.com",
            NormalizedEmail = "SUPERSHOP@GMAIL.COM",
            Firstname = "Petras",
            Lastname = "Pavardenis",
            IsBlocked = false,
            Id = Guid.NewGuid().ToString("D"),
            ConcurrencyStamp = Guid.NewGuid().ToString("D"),
            SecurityStamp = Guid.NewGuid().ToString("D")
        };

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var password = new PasswordHasher<IdentityUser>();
            var hashed = password.HashPassword(_admin, adminPassword);
            _admin.PasswordHash = hashed;

            var adminAccSeed =
                "INSERT INTO [dbo].[AspNetUsers] ([Id], [ConcurrencyStamp], [Email], [NormalizedEmail], " +
                "[NormalizedUserName], [PasswordHash], [SecurityStamp], [UserName], " +
                "[Firstname], [IsBlocked], [Lastname], " +
                "[AccessFailedCount], [EmailConfirmed], [LockoutEnabled], [PhoneNumberConfirmed], [TwoFactorEnabled]) " +
                $"VALUES ('{_admin.Id}', '{_admin.ConcurrencyStamp}', '{_admin.Email}', '{_admin.NormalizedEmail}', " +
                $"'{_admin.NormalizedUserName}', '{_admin.PasswordHash}', '{_admin.SecurityStamp}', '{_admin.UserName}', " +
                $"'{_admin.Firstname}', '{_admin.IsBlocked}', '{_admin.Lastname}', " +
                $"0, 0, 0, 0, 0)";

            var userRolesSeed = "INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) " +
                                $"VALUES ('{_admin.Id}', '{adminUserRoleId}')";

            migrationBuilder.Sql(adminAccSeed);
            migrationBuilder.Sql(userRolesSeed);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var removeAdminFromUserRolesString = "DELETE FROM [dbo].[AspNetUserRoles]";
            var purgeAdminString = $"DELETE FROM [dbo].[AspNetUsers] WHERE Email='{_admin.Email}'";

            migrationBuilder.Sql(removeAdminFromUserRolesString);
            migrationBuilder.Sql(purgeAdminString);
        }
    }
}
