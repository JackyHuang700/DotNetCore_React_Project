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

        [HttpGet("[action]")]
        public ActionResult TestAPI()
        {
            var myJson = new Dictionary<string, object>();

            myJson.Add("success", true);
            myJson.Add("message", _service.GetAllList());
            return Json(myJson);
            //return Json(myJson, "text/x-json");
        }


        [HttpPost("[action]")]
        public IActionResult TestAPI2()
        {
            var myJson = new Dictionary<string, object>();

            myJson.Add("success", true);
            myJson.Add("message", "Jacky2");
            return Json(myJson);
        }


        [HttpPost("[action]")]
        public IActionResult TestAPI3(int a)
        {
            var myJson = new Dictionary<string, object>();

            myJson.Add("success", true);
            myJson.Add("message", "Jacky3");
            return Json(myJson);
        }


        [HttpPost("[action]")]
        public IActionResult Post()
        {
            var myJson = new Dictionary<string, object>();

            myJson.Add("success", true);
            myJson.Add("message", "Jacky4");
            return Json(myJson);
        }


        [HttpPost("[action]")]
        public ActionResult Login([FromBody] UserDto userDto)
        {
            var myJson =_service.Login(userDto.UserName, userDto.Password);


            var a = bool.Parse(myJson["success"].ToString());
            if (a)
            {
                //记录Session
                User user = (DotNetCore_React.Domain.Entities.User)(myJson["user"]);
                HttpContext.Session.Set("CurrentUser", Object2Bytes(user));
                //跳转到系统首页
                //return RedirectToAction("", "");
            }

            return Json(new Dictionary<string, object> {
                { "success", myJson["success"]},
                { "message",  myJson["message"]}
            });
        }

        [HttpGet("[action]")]
        public IActionResult isLogin()
        {
            var myJson = new Dictionary<string, object>()
            {
                { "success",false },
                { "message",false }
            };

            byte[] userObject = null;

            HttpContext.Session.TryGetValue("currentUser",out userObject);

            var user = Bytes2Object<User>(userObject);

            if(user != null)
            {
                myJson["success"] = true;
                myJson["message"] = true;
            }

            return Json(myJson);
        }


        /// <summary>
        /// 将对象转换为byte数组
        /// </summary>
        /// <param name="obj">被转换对象</param>
        /// <returns>转换后byte数组</returns>
        public static byte[] Object2Bytes(object obj)
        {
            string json = JsonConvert.SerializeObject(obj);
            byte[] serializedResult = System.Text.Encoding.UTF8.GetBytes(json);
            return serializedResult;
        }

        /// <summary>
        /// 将byte数组转换成对象
        /// </summary>
        /// <param name="buff">被转换byte数组</param>
        /// <returns>转换完成后的对象</returns>
        public static object Bytes2Object(byte[] buff)
        {
            string json = System.Text.Encoding.UTF8.GetString(buff);
            return JsonConvert.DeserializeObject<object>(json);
        }

        /// <summary>
        /// 将byte数组转换成对象
        /// </summary>
        /// <param name="buff">被转换byte数组</param>
        /// <returns>转换完成后的对象</returns>
        public static T Bytes2Object<T>(byte[] buff)
        {
            string json = System.Text.Encoding.UTF8.GetString(buff);
            return JsonConvert.DeserializeObject<T>(json);
        }

    }
}
