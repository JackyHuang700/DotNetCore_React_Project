using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class Sys_LanguageRepository : DotNetCore_ReactRepositoryBase<Sys_Language>, ISys_LanguageRepository
    {
        public Sys_LanguageRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }

        public Dictionary<string, object> Create(Sys_Language Sys_Language)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                _dbContext.Add<Sys_Language>(Sys_Language);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", Sys_Language.Id);
                return myJson;

            }
            catch (Exception ex)
            {
                myJson.Add("success", false);
                myJson.Add("message", ex.Message);
                return myJson;
            }
        }

        public Dictionary<string, object> Delete(int id)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                var Sys_Language = this.GetSingle(id);
                _dbContext.Remove<Sys_Language>(Sys_Language);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "動作完成");
                return myJson;

            }
            catch (Exception ex)
            {
                myJson.Add("success", false);
                myJson.Add("message", ex.Message);
                return myJson;
            }
        }

        public List<Sys_Language> GetAll()
        {
            return _dbContext.Set<Sys_Language>().ToList();
        }

        public Sys_Language GetSingle(int id)
        {
            return _dbContext.Set<Sys_Language>().FirstOrDefault(C => C.Id == id);
        }

        public Dictionary<string, object> Update(Sys_Language Sys_Language)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                //參考 https://stackoverflow.com/questions/15336248/entity-framework-5-updating-a-record
                _dbContext.Sys_Languages.Attach(Sys_Language);
                var entry = _dbContext.Entry(Sys_Language);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", Sys_Language.Id);
                return myJson;

            }
            catch (Exception ex)
            {
                myJson.Add("success", false);
                myJson.Add("message", ex.Message);
                return myJson;
            }
        }
    }
}
