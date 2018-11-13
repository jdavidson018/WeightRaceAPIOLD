using Microsoft.EntityFrameworkCore.Migrations;

namespace WeightRace.API.Migrations
{
    public partial class addedStartWeight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "StartWeight",
                table: "Users",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartWeight",
                table: "Users");
        }
    }
}
