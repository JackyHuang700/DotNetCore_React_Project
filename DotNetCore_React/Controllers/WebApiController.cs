using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetCore_React.Application.RoleApp;
using DotNetCore_React.Application.UserApp;
using Microsoft.AspNetCore.Mvc;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.UserApp.Dtos;

namespace DotNetCore_React.Controllers
{
    /// <summary>
    /// API (Front)
    /// </summary>
    [Route("api/[controller]")]
    public class WebApiController : BaseController
    {
        //private readonly IRoleAppService _service;
        private readonly IUserAppService _service;

        //public TestController(IRoleAppService service)
        //{
        //    _service = service;
        //}

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
        public ActionResult Login([FromBody] UserDto user)
        {
            var myJson =_service.Login(user.UserName, user.Password);
            return Json(myJson);
        }

    }
}
