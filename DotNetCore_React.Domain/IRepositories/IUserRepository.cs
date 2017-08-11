using System;
using System.Collections.Generic;
using System.Text;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.Domain.IRepositories
{
    public interface IUserRepository : IRepository<User>
    {
        User GetUser(string userName);

        User GetUser(Guid id);

        List<User> GetAllUser();

        //更新使用者資料
        Dictionary<string, object> Update(User user);


        Dictionary<string, object> Create(User user);

        Dictionary<string, object> Delete(Guid id);
    }
}
