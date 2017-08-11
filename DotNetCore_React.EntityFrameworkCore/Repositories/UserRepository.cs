using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class UserRepository : DotNetCore_ReactRepositoryBase<User>, IUserRepository
    {
        public UserRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext) {

        }


        
        public List<User> GetAllMenuListByUser()
        {
            return _dbContext.Set<User>().ToList();
        }



        public User GetUser(string userName)
        {
            return GetAllMenuListByUser().Where(c => c.UserName == userName).FirstOrDefault();
        }

        public User GetUser(Guid id)
        {
            return _dbContext.Set<User>().FirstOrDefault(C => C.Id == id);
        }

        Dictionary<string, object> IUserRepository.Update_User(User user)
        {
            var myJson = new Dictionary<string, object>();
            try {
                //參考 https://stackoverflow.com/questions/15336248/entity-framework-5-updating-a-record
                _dbContext.Users.Attach(user);
                var entry = _dbContext.Entry(user);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
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
