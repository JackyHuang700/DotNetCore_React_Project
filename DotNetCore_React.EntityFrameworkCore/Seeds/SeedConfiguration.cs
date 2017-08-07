using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;
using System.Threading.Tasks;

namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedConfiguration
    {
        private static readonly string _jsonFile = "appsettings.json";
        private static readonly string _connectionName = "DefaultConnection";

        protected readonly DotNetCore_ReactDBContext _context;

        public SeedConfiguration()
        {
            _context = CreateDbContext();
        }

        /// <summary>
        /// Add Seed Method If you need.
        /// </summary>
        public void Seed()
        {
            //Seed Role
            RoleSeed();
        }

        /// <summary>
        /// Create DbContext
        /// </summary>
        /// <returns></returns>
        private DotNetCore_ReactDBContext CreateDbContext()
        {
            var config = new ConfigurationBuilder()
                   .SetBasePath(Directory.GetCurrentDirectory())
                   .AddJsonFile(_jsonFile)
                   .Build();

            var builder = new DbContextOptionsBuilder<DotNetCore_ReactDBContext>();
            builder.UseSqlServer(config.GetConnectionString(_connectionName));

            return new DotNetCore_ReactDBContext(builder.Options);
        }
    }
}