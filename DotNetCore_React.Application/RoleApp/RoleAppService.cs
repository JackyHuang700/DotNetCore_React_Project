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
            var a = _repository.GetAllList();
            return Mapper.Map<List<RoleDto>>(a);
        }
        public RoleDto GetRole(string id)
        {
            //�B�znull���p
            Guid guid;
            Guid.TryParse(id, out guid);
            var a = _repository.Get(guid);
            return Mapper.Map<RoleDto>(a);
        }

        public Dictionary<string, object> Create_Role(RoleDto role)
        {
            var myJson = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };

            var dateTime = DateTime.Now;
            //�P�_�O�_���s��ID����
            var is_Repeat = _repository.GetAllList(c => c.SysId.Contains(role.SysId)).Count != 0;


            if (is_Repeat)
            {
                myJson["success"] = false;
                myJson["message"] = "�ѧO��쭫��";
            }
            else {
                var roleDB = new Role()
                {
                    Id = Guid.NewGuid(),
                    Name = role.Name,
                    Priority = role.Priority,
                    Status = role.Status,
                    SysId = role.SysId,
                    CreateUser = role.CreateUser,
                    CreateDate = dateTime,
                    UpdateUser = role.UpdateUser,
                    UpdateDate = dateTime,
                };

                //�x�s���
                _repository.Insert(roleDB);
                var effort = _repository.Save();

                myJson["success"] = effort > 0;
                myJson["message"] = effort > 0 ? "�ާ@���\" : "�ާ@����";
            }

          
            return myJson;
        }

        public Dictionary<string, object> Update_Role(RoleDto role)
        {
            var myJson = new Dictionary<string, object>();

            var roleDB = Mapper.Map<Role>(role);

            //�x�s���
            _repository.Update(roleDB);
            var effort = _repository.Save();

            myJson.Add("success", effort > 0);
            myJson.Add("message", effort > 0 ? "�ާ@���\" : "�ާ@����");
            return myJson;
        }

        public Dictionary<string, object> Delete_Role(string id)
        {
            var myJson = new Dictionary<string, object>();

            //�ഫGuid
            Guid guid;
            Guid.TryParse(id, out guid);

            //�R�����
            _repository.Delete(guid);
            var effort = _repository.Save();

            myJson.Add("success", effort > 0);
            myJson.Add("message", effort > 0 ? "�ާ@���\" : "�ާ@����");
            return myJson;
        }
    }
}