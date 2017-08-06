using System;
using System.Collections.Generic;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class RoleRepository : DotNetCore_ReactRepositoryBase<Role>, IRoleRepository
    {
        public RoleRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }

        //public List<Guid> GetAllMenuListByRole(Guid roleid)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
