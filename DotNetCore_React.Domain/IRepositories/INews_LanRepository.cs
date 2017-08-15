using System;
using System.Collections.Generic;
using DotNetCore_React.Domain.Entities;


namespace DotNetCore_React.Domain.IRepositories
{
    public interface INews_LanRepository : IRepository<News_Lan>
    {
        //依照主表取的資料
        List<News_Lan> Getall_By_NewsId(Guid newsId);

    } 
}