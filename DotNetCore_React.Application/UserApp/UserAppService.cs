using System;
using System.Collections.Generic;
using AutoMapper;
using DotNetCore_React.Application.UserApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;
using System.Security.Cryptography;
using System.Text;
using DotNetCore_React.Utility;

namespace DotNetCore_React.Application.UserApp
{
    public class UserAppService : IUserAppService
    {
        private readonly IUserRepository _repository_user;
        private readonly IComSystemRepository _repository_comSystem;

        public UserAppService(IUserRepository repository_usr, IComSystemRepository repository_comSystem)
        {
            _repository_user = repository_usr;
            _repository_comSystem = repository_comSystem;
        }

        public Dictionary<string, object> Create_User(UserDto user)
        {
            var myJson = new Dictionary<string, object>();

            var dateTime = DateTime.Now;
            var roleDB = new User()
            {
                Id = Guid.NewGuid(),
                Password = HashHelper.CreateSHA256(user.Password),
                RoleId = user.RoleId,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                EmailConfirmed = user.EmailConfirmed,
                Status = user.Status,
                CreateDate = dateTime,
                CreateUser = user.CreateUser,
                UpdateDate = dateTime,
                UpdateUser = user.RoleId,
                FailedCount = 0,
                ChangedPassword = false,
                PasswordHash = Guid.NewGuid().ToString(),
            };

            //儲存資料
            myJson = _repository_user.Create(roleDB);

            //myJson.Add("success", true);
            //myJson.Add("message", "");
            return myJson;
        }

        public Dictionary<string, object> Delete_User(string id)
        {
            var myJson = new Dictionary<string, object>();

            //轉換Guid
            Guid guid;
            Guid.TryParse(id, out guid);


            //刪除資料
            myJson = _repository_user.Delete(guid);

            //myJson.Add("success", true);
            //myJson.Add("message", "");
            return myJson;
        }

        public List<UserDto> GetAllList()
        {
            var a = _repository_user.GetAllUser();
            return Mapper.Map<List<UserDto>>(a);
        }

        public UserDto GetUser(string id)
        {
            //處理null狀況
            Guid guid;
            Guid.TryParse(id, out guid);
            var a = _repository_user.GetUser(guid);
            return Mapper.Map<UserDto>(a);
        }



        public Dictionary<string, object> Login(string userName, string password)
        {
            var myJson = new Dictionary<string, object>();
            var user = _repository_user.GetUser(userName);

            if (user == null)
            {
                myJson.Add("success", false);
                myJson.Add("message", "登入失敗");
                return myJson;
            }

            if (user.Password != HashHelper.CreateSHA256(password))
            {
                user.Status = 255;
                user.FailedCount++;

                //失敗次數是否超過系統預設值
                var AccessFailedCount = _repository_comSystem.GetComSystem("AccessFailedCount");
                var sysFailedCount = int.Parse(AccessFailedCount.sysValue);
                if (user.FailedCount >= sysFailedCount)
                {
                    user.Status = 4;
                }

                //更新狀態
                _repository_user.Update(user);
                //_repository_user.Save();
            }

            //判斷狀態
            switch (user.Status)
            {
                case 0:
                    myJson.Add("success", false);
                    myJson.Add("message", "您已被停權，請聯絡管理員。");
                    break;
                case 1:
                    myJson.Add("success", true);
                    myJson.Add("message", new
                    {
                        UserName = user.UserName,
                        Fname = user.FirstName,
                        Lname = user.LastName
                    });
                    myJson.Add("user", user);
                    break;
                case 2:
                    myJson.Add("success", false);
                    myJson.Add("message", "信箱未驗證，請立即驗證");
                    break;
                case 3:
                    myJson.Add("success", false);
                    myJson.Add("message", "第一次未更改密碼");
                    break;
                case 4:
                    myJson.Add("success", false);
                    myJson.Add("message", $"錯誤次數達{user.FailedCount}次，請聯絡管理員，或按下忘記密碼");
                    break;
                default:
                    myJson.Add("success", false);
                    myJson.Add("message", "帳號或密碼不正確");
                    break;
            }

            return myJson;
        }

        public Dictionary<string, object> Update_User(UserDto user)
        {
            var myJson = new Dictionary<string, object>();

            var userDB = Mapper.Map<User>(user);
            myJson = _repository_user.Update(userDB);

            //myJson.Add("success", true);
            //myJson.Add("message", "");
            return myJson;
        }
    }
}
