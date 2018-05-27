using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Eshop.Migrations
{
    public partial class ShoppingCartIdFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingCartItems_ShoppingCarts_ShoppingCartId1",
                table: "ShoppingCartItems");

            migrationBuilder.DropIndex(
                name: "IX_ShoppingCartItems_ShoppingCartId1",
                table: "ShoppingCartItems");

            migrationBuilder.DropColumn(
                name: "ShoppingCartId1",
                table: "ShoppingCartItems");

            migrationBuilder.DropColumn(
                name: "HasBeenPaidFor",
                table: "Orders");

            migrationBuilder.AlterColumn<string>(
                name: "ShoppingCartId",
                table: "ShoppingCartItems",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "PaymentId",
                table: "Orders",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCartItems_ShoppingCartId",
                table: "ShoppingCartItems",
                column: "ShoppingCartId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingCartItems_ShoppingCarts_ShoppingCartId",
                table: "ShoppingCartItems",
                column: "ShoppingCartId",
                principalTable: "ShoppingCarts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingCartItems_ShoppingCarts_ShoppingCartId",
                table: "ShoppingCartItems");

            migrationBuilder.DropIndex(
                name: "IX_ShoppingCartItems_ShoppingCartId",
                table: "ShoppingCartItems");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "ShoppingCartId",
                table: "ShoppingCartItems",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShoppingCartId1",
                table: "ShoppingCartItems",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasBeenPaidFor",
                table: "Orders",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCartItems_ShoppingCartId1",
                table: "ShoppingCartItems",
                column: "ShoppingCartId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingCartItems_ShoppingCarts_ShoppingCartId1",
                table: "ShoppingCartItems",
                column: "ShoppingCartId1",
                principalTable: "ShoppingCarts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
