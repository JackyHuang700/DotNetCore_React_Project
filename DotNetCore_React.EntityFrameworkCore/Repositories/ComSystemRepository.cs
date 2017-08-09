using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class ComSystemRepository : DotNetCore_ReactRepositoryBase<ComSystem>, IComSystemRepository
    {
        public ComSystemRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {

        }

        public ComSystem Get_ComSystem_By_sysName(string sysName)
        {
            return _dbContext.Set<ComSystem>().Where(c => c.sysName == sysName).FirstOrDefault();
        }
    }
}
