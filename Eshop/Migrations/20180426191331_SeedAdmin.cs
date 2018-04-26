using Microsoft.EntityFrameworkCore.Migrations;
using System;
using Eshop.DataContracts;
using Eshop.Extensions;

namespace Eshop.Migrations
{
    public partial class SeedAdmin : Migration
    {
        private string[][] roles = new string[][]
        {
             new string[]{"1", "55fb2793-4b89-4cfd-97fc-796b7b62df23",
                 UserRoles.Admin.ToString()},
             new string[]{"2", "5f4f1cb2-ba69-4195-92b9-2a4fe9a19f69",
                 UserRoles.User.ToString()}
        };

        private string[] adminData = new string[]
        {
            //username, password, email
            "Admin", "SuperPassword.9", "superShop@gmail.com",
            //id, concurrencyStamp, securityStamp
            "7a31dd72-36df-42e5-a052-f778b44397aa", "2f6a69cb-22b5-47aa-9844-24a5ad4fbc72", "5ba481d4-5b60-4812-9448-e526b5e6ecd3"
        };

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var roleSeed = 
                "INSERT INTO [dbo].[AspNetRoles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName]) " +
                $"VALUES ({roles[0][0]}, '{roles[0][1]}', '{roles[0][2]}', '{roles[0][2].ToUpper()}'), " +
                $"({roles[1][0]}, '{roles[1][1]}', '{roles[1][2]}', '{roles[1][2].ToUpper()}')";

            var hashedAdminPw = adminData[1].HashPassword();

            var adminAccSeed =
                "INSERT INTO [dbo].[AspNetUsers] ([Id], [ConcurrencyStamp], [Email], [NormalizedEmail], " +
                "[NormalizedUserName], [PasswordHash], [SecurityStamp], [UserName]) " +
                $"VALUES ({adminData[3]}, {adminData[4]}, {adminData[2]}, {adminData[2].ToUpper()}, " +
                $"{adminData[0].ToUpper()}, {hashedAdminPw}, {adminData[5]}, {adminData[0]})";

            var userRolesSeed = "INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) " +
                                $"VALUES ({adminData[3]}, {roles[0][0]})";

            migrationBuilder.Sql(roleSeed);
            migrationBuilder.Sql(adminAccSeed);
            migrationBuilder.Sql(userRolesSeed);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var removeAdminFromUserRolesString = $"DELETE FROM [dbo].[AspNetUserRoles] WHERE UserId={adminData[3]}";
            var purgeRolesString = $"DELETE FROM [dbo].[AspNetRoles]";
            var purgeAdminString = $"DELETE FROM [dbo].[AspNetUsers] WHERE Id={adminData[3]}";

            migrationBuilder.Sql(removeAdminFromUserRolesString);
            migrationBuilder.Sql(purgeRolesString);
            migrationBuilder.Sql(purgeAdminString);
        }
    }
}
