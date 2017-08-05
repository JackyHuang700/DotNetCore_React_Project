using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.EntityFrameworkCore
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DotNetCore_ReactContxt(serviceProvider.GetRequiredService<DbContextOptions<DotNetCore_ReactContxt>>()))
            {
                if (context.Roles.Any())
                {
                    //有資料就不進行初始化
                    return;
                }

                var departmentId = Guid.NewGuid();
                var datetime = DateTime.Now;
                var user = "Admin";
                context.Roles.Add(new Role {
                    Id = departmentId,
                    SysId= "Admin",
                    Name = "Group",
                    CreateDate = datetime,
                    CreateUser = user,
                    UpdateDate = datetime,
                    UpdateUser = user,
                    Priority = 0,
                    Status = 1,
                });

                context.SaveChanges();
            }
        }
    }
}
