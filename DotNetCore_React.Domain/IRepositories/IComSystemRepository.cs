using System;
using System.Collections.Generic;
using System.Text;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.Domain.IRepositories
{
    public interface IComSystemRepository : IRepository<ComSystem>
    {
        //根據Key取得系統參數
        ComSystem GetComSystem(string sysName);

        ComSystem GetComSystem(Guid id);


        List<ComSystem> GetAllComSystem();


        //更新使用者資料
        Dictionary<string, object> Update(ComSystem comsystem);


        Dictionary<string, object> Create(ComSystem comsystem);

        Dictionary<string, object> Delete(Guid id);
    }
}
