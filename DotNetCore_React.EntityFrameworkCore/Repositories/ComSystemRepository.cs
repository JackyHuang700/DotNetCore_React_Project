using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class ComSystemRepository : DotNetCore_ReactRepositoryBase<ComSystem>, IComSystemRepository
    {
        public ComSystemRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {

        }
    }
}
