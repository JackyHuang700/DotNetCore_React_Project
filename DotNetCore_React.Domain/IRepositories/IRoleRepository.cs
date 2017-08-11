using System;
using System.Collections.Generic;
using DotNetCore_React.Domain.Entities;


namespace DotNetCore_React.Domain.IRepositories
{
    public interface IRoleRepository : IRepository<Role>
    {
        //根據帳號獲取權限
        List<Role> GetAllRole();

        Role GetRole(Guid id);


        //更新使用者資料
        Dictionary<string, object> Update(Role role);


        Dictionary<string, object> Create(Role role);

        Dictionary<string, object> Delete(Guid id);
    } 
}