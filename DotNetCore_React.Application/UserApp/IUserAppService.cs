using DotNetCore_React.Application.UserApp.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.UserApp
{
    public interface IUserAppService
    {
        //獲取列表
        List<UserDto> GetAllList();
    }
}
