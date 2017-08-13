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

        public Dictionary<string, object> Update(User user)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                //參考 https://stackoverflow.com/questions/15336248/entity-framework-5-updating-a-record
                _dbContext.Users.Attach(user);
                _dbContext.Entry(user).State = EntityState.Modified;
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", user.Id);
                return myJson;

            }
            catch (Exception ex)
            {
                myJson.Add("success", false);
                myJson.Add("message", ex.Message);
                return myJson;
            }
        }

        public Dictionary<string, object> Create(User user)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                _dbContext.Add<User>(user);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", user.Id);
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
                var user = this.GetUser(id);
                _dbContext.Remove<User>(user);
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



    }
}
