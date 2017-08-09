using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DotNetCore_React.Domain.Entities;


namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedConfiguration
    {
        private void UserSeed()
        {
            if (!_context.Set<User>().Any())
            {
                _context.Set<User>().Add(new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "jacky@gmail.com",
                    RoleId = Guid.NewGuid().ToString(),
                    Password = "jacky@gmail.com",
                    FirstName = "j",
                    LastName = "j",
                    Email = "jacky@gmail.com",
                    EmailConfirmed = false,
                    Status = 0,
                    CreateDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    CreateUser = "Admin",
                    UpdateUser = "Admin",
                    FailedCount = 0,
                    ChangedPassword = false,
                    PasswordHash = Guid.NewGuid().ToString(),
                });
            }
        }
    }
}
