using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class UserRepository : DotNetCore_ReactRepositoryBase<User>, IUserRepository
    {
        public UserRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {

        }

        public List<User> GetAllUser()
        {
            return _dbContext.Set<User>().ToList();
        }

        public User GetUser(string userName)
        {
            return GetAllUser().Where(c => c.UserName == userName).FirstOrDefault();
        }

        public User GetUser(Guid id)
        {
            return _dbContext.Set<User>().FirstOrDefault(C => C.Id == id);
        }

    }
}
