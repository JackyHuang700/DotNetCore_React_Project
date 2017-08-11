using System;
using System.Collections.Generic;
using System.Text;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.Domain.IRepositories
{
    public interface IUserRepository : IRepository<User>
    {
        User GetUser(string userName);

        List<User> GetAllMenuListByUser();

        //更新使用者資料
        Dictionary<string, object> Update_User(User user);


        User GetUser(Guid id);
    }
}
