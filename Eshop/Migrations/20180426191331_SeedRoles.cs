using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Eshop.DataContracts;
using Microsoft.AspNetCore.Identity;

namespace Eshop.Migrations
{
    public partial class SeedRoles : Migration
    {
        //first role has to be admin, other roles order doesn't matter
        private readonly IdentityRole[] _roles =
        {
            new IdentityRole{Id = "1", ConcurrencyStamp = Guid.NewGuid().ToString("D"),
                Name = UserRoles.Admin.ToString(), NormalizedName = UserRoles.Admin.ToString().ToUpper()},
            new IdentityRole{Id = "2", ConcurrencyStamp = Guid.NewGuid().ToString("D"),
                Name = UserRoles.User.ToString(), NormalizedName = UserRoles.User.ToString().ToUpper()}
        };

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var roleSeed = 
                "INSERT INTO [dbo].[AspNetRoles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName]) " +
                $"VALUES ('{_roles[0].Id}', '{_roles[0].ConcurrencyStamp}', '{_roles[0].Name}', '{_roles[0].NormalizedName}'), " +
                $"('{_roles[1].Id}', '{_roles[1].ConcurrencyStamp}', '{_roles[1].Name}', '{_roles[1].NormalizedName}')";

            migrationBuilder.Sql(roleSeed);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var purgeRolesString = "DELETE FROM [dbo].[AspNetRoles]";
            migrationBuilder.Sql(purgeRolesString);
        }
    }
}
