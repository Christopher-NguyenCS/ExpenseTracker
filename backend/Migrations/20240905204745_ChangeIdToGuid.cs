using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ExpenseTracker.Migrations
{
    public partial class ChangeIdToGuid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Step 1: Add a new UUID column
            migrationBuilder.AddColumn<Guid>(
                name: "NewId",
                table: "expenses",
                type: "uuid",
                nullable: false,
                defaultValueSql: "gen_random_uuid()");

            // Step 2: Drop the primary key constraint on the old Id column if it exists
            migrationBuilder.DropPrimaryKey(
                name: "PK_expenses",
                table: "expenses");

            // Step 3: Drop the old Id column
            migrationBuilder.DropColumn(
                name: "Id",
                table: "expenses");

            // Step 4: Rename the new UUID column to Id
            migrationBuilder.RenameColumn(
                name: "NewId",
                table: "expenses",
                newName: "Id");

            // Step 5: Add the primary key constraint back on the new Id column
            migrationBuilder.AddPrimaryKey(
                name: "PK_expenses",
                table: "expenses",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Step 1: Add a new integer column
            migrationBuilder.AddColumn<int>(
                name: "NewId",
                table: "expenses",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            // Step 2: Drop the primary key constraint on the UUID column if it exists
            migrationBuilder.DropPrimaryKey(
                name: "PK_expenses",
                table: "expenses");

            // Step 3: Drop the UUID column
            migrationBuilder.DropColumn(
                name: "Id",
                table: "expenses");

            // Step 4: Rename the integer column back to Id
            migrationBuilder.RenameColumn(
                name: "NewId",
                table: "expenses",
                newName: "Id");

            // Step 5: Add the primary key constraint back on the integer Id column
            migrationBuilder.AddPrimaryKey(
                name: "PK_expenses",
                table: "expenses",
                column: "Id");
        }
    }
}
