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

        UserDto GetUser(string id);

        Dictionary<string, object> Login(string userName, string password);

        Dictionary<string, object> Create_User(UserDto user);
        Dictionary<string, object> Delete_User(string id);
        Dictionary<string, object> Update_User(UserDto user);

    }
}
