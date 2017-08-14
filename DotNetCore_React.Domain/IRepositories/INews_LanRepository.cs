using System;
using System.Collections.Generic;
using DotNetCore_React.Domain.Entities;


namespace DotNetCore_React.Domain.IRepositories
{
    public interface INews_LanRepository : IRepository<News_Lan>
    {
        //根據帳號獲取權限
        List<News_Lan> GetAll();

        //依照主表取的資料
        List<News_Lan> Getall_By_NewsId(Guid newsId);

        News_Lan GetSingle(Guid id);


        //更新使用者資料
        Dictionary<string, object> Update(News_Lan News_Lan);


        Dictionary<string, object> Create(News_Lan News_Lan);

        Dictionary<string, object> Delete(Guid id);
    } 
}