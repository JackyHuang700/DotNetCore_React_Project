using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetCore_React.Application.RoleApp;
using DotNetCore_React.Application.UserApp;
using Microsoft.AspNetCore.Mvc;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.UserApp.Dtos;
using Newtonsoft.Json;
using DotNetCore_React.Utility;

namespace DotNetCore_React.Controllers
{
    /// <summary>
    /// API (Front)
    /// </summary>
    [Route("api/[controller]")]
    public class WebApiController : BaseController
    {
        private readonly IUserAppService _service;

        public WebApiController(IUserAppService service)
        {
            _service = service;
        }

        [HttpPost("[action]")]
        public IActionResult Login([FromBody] UserDto userDto)
        {

            var myJson = _service.Login(userDto.UserName, userDto.Password);

            var checkLogged = bool.Parse(myJson["success"].ToString());
            if (checkLogged)
            {
                //記錄Session
                User user = (DotNetCore_React.Domain.Entities.User)(myJson["user"]);
                HttpContext.Session.Set("CurrentUser", ByteConvertHelper.Object2Bytes(user));
            }

            return Json(new Dictionary<string, object> {
                { "success", myJson["success"]},
                { "message",  myJson["message"]}
            });
        }

        [HttpGet("[action]")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();

            return Json(new Dictionary<string, object> {
                { "success", true},
                { "message",  "Bye Bye!"}
            });
        }

        [HttpGet("[action]")]
        public IActionResult isLogin()
        {
            var myJson = new Dictionary<string, object>()
            {
                { "success",false },
                { "message",null }
            };

            byte[] userObject = null;

            HttpContext.Session.TryGetValue("CurrentUser", out userObject);

            if (userObject != null)
            {

                var user = ByteConvertHelper.Bytes2Object<User>(userObject);

                myJson["success"] = true;
                myJson["message"] = new
                {
                    UserName = user.UserName,
                    Fname = user.FirstName,
                    Lname = user.LastName
                };
            }
            return Json(myJson);
        }
    }
}
