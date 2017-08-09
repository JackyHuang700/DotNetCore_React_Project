using System;
using System.Collections.Generic;
using System.Text;

/// 
using AutoMapper;
using DotNetCore_React.Application.RoleApp.Dtos;
using DotNetCore_React.Application.ComSystemApp.Dtos;

using DotNetCore_React.Application.UserApp.Dtos;

using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.Application
{
    public class DotNetCore_ReactMapper
    {
        public static void Initialize()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Role, RoleDto>();
                cfg.CreateMap<RoleDto, Role>();

                cfg.CreateMap<User, UserDto>();
                cfg.CreateMap<UserDto, User>();

                cfg.CreateMap<ComSystem, ComSystemDto>();
                cfg.CreateMap<ComSystemDto, ComSystem>();
            });
        }
    }
}
