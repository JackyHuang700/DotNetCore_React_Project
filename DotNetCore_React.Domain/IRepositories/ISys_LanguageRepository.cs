using System;
using System.Collections.Generic;
using DotNetCore_React.Domain.Entities;


namespace DotNetCore_React.Domain.IRepositories
{
    public interface ISys_LanguageRepository : IRepository_Int<Sys_Language>
    {
        //根據帳號獲取權限
        List<Sys_Language> GetAll();

        Sys_Language GetSingle(int id);

    } 
}