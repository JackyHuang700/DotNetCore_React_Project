using System;
using System.Collections.Generic;
using System.Text;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.Domain.IRepositories
{
    public interface IComSystemRepository : IRepository<ComSystem>
    {
        //根據Key取得系統參數
        ComSystem Get_ComSystem_By_sysName(string sysName);
    }
}
