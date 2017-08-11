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

        public Dictionary<string, object> Create(Role role)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                _dbContext.Add<Role>(role);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", role.Id);
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
                var role = this.GetRole(id);
                _dbContext.Remove<Role>(role);
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

        public List<Role> GetAllRole()
        {
            return _dbContext.Set<Role>().ToList();
        }

        public Role GetRole(Guid id)
        {
            return _dbContext.Set<Role>().FirstOrDefault(C => C.Id == id);
        }

        public Dictionary<string, object> Update(Role role)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                //參考 https://stackoverflow.com/questions/15336248/entity-framework-5-updating-a-record
                _dbContext.Roles.Attach(role);
                var entry = _dbContext.Entry(role);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", role.Id);
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
