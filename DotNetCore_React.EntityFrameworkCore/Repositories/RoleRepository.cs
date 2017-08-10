using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class RoleRepository : DotNetCore_ReactRepositoryBase<Role>, IRoleRepository
    {
        public RoleRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }

        public List<Role> GetAllMenuListByRole()
        {
            return _dbContext.Set<Role>().ToList();
        }

        public Role GetRole(string id)
        {
            return _dbContext.Set<Role>().Find(id);
        }
    }
}
