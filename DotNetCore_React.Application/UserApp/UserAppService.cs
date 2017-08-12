using System;
using System.Collections.Generic;
using AutoMapper;
using DotNetCore_React.Application.UserApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;
using System.Security.Cryptography;
using System.Text;

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
                Password = this.PasswordToSHA256(user.Password),
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
            //是否登入成功
            var is_Login_Success = false;


            if (user == null)
            {
                myJson.Add("success", false);
                myJson.Add("message", "登入錯誤");
                return myJson;
            }

            //判斷狀態
            switch (user.Status)
            {
                case 1:
                    is_Login_Success = true;
                    myJson.Add("success", true);
                    myJson.Add("message", "");
                    break;
                case 2:
                    myJson.Add("success", false);
                    myJson.Add("message", "信箱未驗證，請立即驗證");
                    break;
                case 3:
                    is_Login_Success = true;
                    myJson.Add("success", true);
                    myJson.Add("message", "");
                    break;
                case 4:
                    myJson.Add("success", false);
                    myJson.Add("message", $"錯誤次數達{user.FailedCount}次，請聯絡管理員，或按下忘記密碼");
                    break;
                default:
                    myJson.Add("success", false);
                    myJson.Add("message", "登入失敗");
                    break;
            }


            if (is_Login_Success)
            {
                myJson.Add("user", user);
                user.FailedCount = 0;
            }
            else
            {
                user.FailedCount++;

                //失敗次數是否超過系統預設值
                var aa = _repository_comSystem.GetComSystem("AccessFailedCount");
                var sysFailedCount = int.Parse(aa.sysValue);
                if (user.FailedCount >= sysFailedCount)
                {
                    user.Status = 4;
                }
            }
            _repository_user.Update(user);

            return myJson;
        }


        public string PasswordToSHA256(string password)
        {
            // SHA256 is disposable by inheritance.  
            using (var sha256 = SHA256.Create())
            {
                // Send a sample text to hash.  
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                // Get the hashed string.  
                var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();

                return hash;
            }
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
