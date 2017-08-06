using Microsoft.EntityFrameworkCore;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.EntityFrameworkCore
{
    public class DotNetCore_ReactDBContext : DbContext
    {

        public DotNetCore_ReactDBContext(DbContextOptions<DotNetCore_ReactDBContext> options) : base(options)
        {

        }


        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
        }
    }
}
