using System;
using System.Collections.Generic;
using DotNetCore_React.Domain.Entities;


namespace DotNetCore_React.Domain.IRepositories
{
    public interface INewsRepository : IRepository<News>
    {
        //根據帳號獲取權限
        List<News> GetAll();

        News GetSingle(Guid id);


        //更新使用者資料
        Dictionary<string, object> Update(News News);


        Dictionary<string, object> Create(News News);

        Dictionary<string, object> Delete(Guid id);
    } 
}