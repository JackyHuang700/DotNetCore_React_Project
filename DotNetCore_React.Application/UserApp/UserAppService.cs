using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using DotNetCore_React.Application.UserApp.Dtos;
using DotNetCore_React.Domain.IRepositories;

namespace DotNetCore_React.Application.UserApp
{
    public class UserAppService : IUserAppService
    {
        private readonly IUserRepository _repository;

        public UserAppService(IUserRepository repository)
        {
            _repository = repository;
        }

        public List<UserDto> GetAllList()
        {
            var a =  _repository.GetAllMenuListByUser();
            return Mapper.Map<List<UserDto>>(a);
        }
    }
}
