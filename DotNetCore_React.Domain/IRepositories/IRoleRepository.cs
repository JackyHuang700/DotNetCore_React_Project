using System;
using System.Collections.Generic;
using DotNetCore_React.Domain.Entities;


namespace DotNetCore_React.Domain.IRepositories
{
    public interface IRoleRepository : IRepository<Role>
    {
        //根據帳號獲取權限
        List<Role> GetAllMenuListByRole();

        Role GetRole(Guid id);
    } 
}