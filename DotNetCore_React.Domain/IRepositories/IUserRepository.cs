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

    }
}
