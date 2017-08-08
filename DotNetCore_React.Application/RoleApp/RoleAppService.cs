using System;
using System.Collections.Generic;
using DotNetCore_React.Application.RoleApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;

namespace DotNetCore_React.Application.RoleApp
{
    public class RoleAppService : IRoleAppService
    {
        private readonly IRoleRepository  _repository;


        public RoleAppService(IRoleRepository repository)
        {
            _repository = repository;
        }


        public List<RoleDto> GetAllList()
        {
            var a = _repository.GetAllMenuListByRole();
            return Mapper.Map<List<RoleDto>>(a);
        }
    }
}