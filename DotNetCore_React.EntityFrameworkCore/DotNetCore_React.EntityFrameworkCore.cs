using Microsoft.EntityFrameworkCore;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.EntityFrameworkCore
{
    public class DotNetCore_ReactContxt: DbContext
    {
        public DotNetCore_ReactContxt(DbContextOptions<DotNetCore_ReactContxt> options) : base(options) {

        }


        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
        }
    }
}
