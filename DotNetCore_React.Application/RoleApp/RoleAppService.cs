using System;
using System.Collections.Generic;
using DotNetCore_React.Application.RoleApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;

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
            var a = _repository.GetAllRole();
            return Mapper.Map<List<RoleDto>>(a);
        }
        public RoleDto GetRole(string id)
        {
            //處理null狀況
            Guid guid;
            Guid.TryParse(id, out guid);
            var a = _repository.GetRole(guid);
            return Mapper.Map<RoleDto>(a);
        }

        public Dictionary<string, object> Create_Role(RoleDto role)
        {
            var myJson = new Dictionary<string, object>();

            var dateTime = DateTime.Now;
            var roleDB = new Role() {
                Id= Guid.NewGuid(),
                CreateDate = dateTime,
                UpdateDate = dateTime,
            };

            //儲存資料

            myJson.Add("success", true);
            myJson.Add("message", "");
            return myJson;
        }

        public Dictionary<string, object> Update_Role(RoleDto role)
        {
            var myJson = new Dictionary<string, object>();


            //儲存資料

            myJson.Add("success", true);
            myJson.Add("message", "");
            return myJson;
        }

        public Dictionary<string, object> Delete_Role(string id)
        {
            var myJson = new Dictionary<string, object>();

            //轉換Guid

            //刪除資料
            //var a = _repository

            myJson.Add("success", true);
            myJson.Add("message", "");
            return myJson;
        }
    }
}