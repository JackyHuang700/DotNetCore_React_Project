using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using DotNetCore_React.EntityFrameworkCore;
using DotNetCore_React.EntityFrameworkCore.Seeds;

namespace DotNetCore_React.EntityFrameworkCore.Migrations
{
    [DbContext(typeof(DotNetCore_ReactDBContext))]
    partial class DotNetCore_ReactDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("CreateUser");

                    b.Property<string>("Name");

                    b.Property<int>("Priority");

                    b.Property<int>("Status");

                    b.Property<string>("SysId");

                    b.Property<DateTime?>("UpdateDate");

                    b.Property<string>("UpdateUser");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });
        }
    }
}
