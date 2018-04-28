using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Eshop.DataContracts;
using Microsoft.AspNetCore.Identity;

namespace Eshop.Migrations
{
    public partial class SeedAdmin : Migration
    {
        //first role has to be admin, other roles order doesn't matter
        private readonly IdentityRole[] _roles =
        {
            new IdentityRole{Id = "1", ConcurrencyStamp = Guid.NewGuid().ToString("D"),
                Name = UserRoles.Admin.ToString(), NormalizedName = UserRoles.Admin.ToString().ToUpper()},
            new IdentityRole{Id = "2", ConcurrencyStamp = Guid.NewGuid().ToString("D"),
                Name = UserRoles.User.ToString(), NormalizedName = UserRoles.User.ToString().ToUpper()}
        };

        private readonly string adminPassword = "SuperPassword.9";
        private IdentityUser _admin = new IdentityUser
        {
            UserName = "Admin",
            NormalizedUserName = "ADMIN",
            Email = "superShop@gmail.com",
            NormalizedEmail = "SUPERSHOP@GMAIL.COM",
            Id = Guid.NewGuid().ToString("D"),
            ConcurrencyStamp = Guid.NewGuid().ToString("D"),
            SecurityStamp = Guid.NewGuid().ToString("D")
        };

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var roleSeed = 
                "INSERT INTO [dbo].[AspNetRoles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName]) " +
                $"VALUES ('{_roles[0].Id}', '{_roles[0].ConcurrencyStamp}', '{_roles[0].Name}', '{_roles[0].NormalizedName}'), " +
                $"('{_roles[1].Id}', '{_roles[1].ConcurrencyStamp}', '{_roles[1].Name}', '{_roles[1].NormalizedName}')";

            var password = new PasswordHasher<IdentityUser>();
            var hashed = password.HashPassword(_admin, adminPassword);
            _admin.PasswordHash = hashed;

            var adminAccSeed =
                "INSERT INTO [dbo].[AspNetUsers] ([Id], [ConcurrencyStamp], [Email], [NormalizedEmail], " +
                "[NormalizedUserName], [PasswordHash], [SecurityStamp], [UserName], " +
                "[AccessFailedCount], [EmailConfirmed], [LockoutEnabled], [PhoneNumberConfirmed], [TwoFactorEnabled]) " +
                $"VALUES ('{_admin.Id}', '{_admin.ConcurrencyStamp}', '{_admin.Email}', '{_admin.NormalizedEmail}', " +
                $"'{_admin.NormalizedUserName}', '{_admin.PasswordHash}', '{_admin.SecurityStamp}', '{_admin.UserName}', " +
                "0, 0, 0, 0, 0)";

            var userRolesSeed = "INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) " +
                                $"VALUES ('{_admin.Id}', '{_roles[0].Id}')";

            migrationBuilder.Sql(roleSeed);
            migrationBuilder.Sql(adminAccSeed);
            migrationBuilder.Sql(userRolesSeed);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var removeAdminFromUserRolesString = "DELETE FROM [dbo].[AspNetUserRoles]";
            var purgeRolesString = "DELETE FROM [dbo].[AspNetRoles]";
            var purgeAdminString = $"DELETE FROM [dbo].[AspNetUsers] WHERE Email='{_admin.Email}'";

            migrationBuilder.Sql(removeAdminFromUserRolesString);
            migrationBuilder.Sql(purgeRolesString);
            migrationBuilder.Sql(purgeAdminString);
        }
    }
}
