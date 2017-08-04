
using System;
using System.Collections.Generic;

using DotNetCore_React.Application.RoleApp.Dtos;

namespace DotNetCore_React.Application.RoleApp
{
    public interface IRoleAppService
    {
        //獲取列表
        List<RoleDto> GetAllList();
    } 
}