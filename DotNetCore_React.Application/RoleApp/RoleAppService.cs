using System;
using System.Collections.Generic;
using DotNetCore_React.Application.RoleApp.Dtos;

namespace DotNetCore_React.Application.RoleApp
{
    public class RoleAppService : IRoleAppService
    {
        private readonly IRoleAppService _repository;


        public RoleAppService(IRoleAppService repository)
        {
            _repository = repository;
        }


        public List<RoleDto> GetAllList()
        {
            return _repository.GetAllList();
        }
    }
}