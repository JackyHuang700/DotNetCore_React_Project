using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedDataBase
    {
        private DotNetCore_ReactDBContext _context;

        public SeedDataBase(IServiceProvider serviceProvider)
        {
            _context = new DotNetCore_ReactDBContext(serviceProvider.GetRequiredService<DbContextOptions<DotNetCore_ReactDBContext>>());
        }

        public async Task Run()
        {
           await RoleSeed();
        }

    }
}