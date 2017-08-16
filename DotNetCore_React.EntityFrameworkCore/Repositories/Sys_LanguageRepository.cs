using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class Sys_LanguageRepository : DotNetCore_ReactRepositoryBase_Int<Sys_Language>, ISys_LanguageRepository
    {
        public Sys_LanguageRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }


        public List<Sys_Language> GetAll()
        {
            return _dbContext.Set<Sys_Language>().Where(c => c.IsDisplay == true).ToList();
        }

        public Sys_Language GetSingle(int id)
        {
            return _dbContext.Set<Sys_Language>().FirstOrDefault(C => C.Id == id);
        }

    }
}
