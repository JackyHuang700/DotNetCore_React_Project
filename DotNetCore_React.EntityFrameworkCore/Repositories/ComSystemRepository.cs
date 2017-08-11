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

        public Dictionary<string, object> Create(ComSystem comsystem)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                _dbContext.Add<ComSystem>(comsystem);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", comsystem.Id);
                return myJson;

            }
            catch (Exception ex)
            {
                myJson.Add("success", false);
                myJson.Add("message", ex.Message);
                return myJson;
            }
        }

        public Dictionary<string, object> Delete(Guid id)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                var comSystem = this.GetComSystem(id);
                _dbContext.Remove<ComSystem>(comSystem);
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

        public List<ComSystem> GetAllComSystem()
        {
            return _dbContext.Set<ComSystem>().ToList();
        }


        public ComSystem GetComSystem(string sysName)
        {
            return _dbContext.Set<ComSystem>().Where(c => c.sysName == sysName).FirstOrDefault();
        }

        public ComSystem GetComSystem(Guid id)
        {
            return _dbContext.Set<ComSystem>().FirstOrDefault(C => C.Id == id);
        }

        public Dictionary<string, object> Update(ComSystem comsystem)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                //參考 https://stackoverflow.com/questions/15336248/entity-framework-5-updating-a-record
                _dbContext.ComSystem.Attach(comsystem);
                var entry = _dbContext.Entry(comsystem);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", comsystem.Id);
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
