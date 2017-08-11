using DotNetCore_React.Application.UserApp;
using DotNetCore_React.Application.UserApp.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCore_React.Controllers.Backend
{
    /// <summary>
    /// ?�員
    /// </summary>
        [Route("api/[controller]")]

    public class UserController : AuthorizedController
    {
           private readonly IUserAppService _service;

        public UserController(IUserAppService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]

        public ActionResult Get_User(string id)
        {
            var myJson = _service.GetUser(id);
            return Json(myJson);
        }


        [HttpGet("[action]")]

        public ActionResult User_View()
        {
            var myJson = _service.GetAllList();
            return Json(myJson);
        }


        [HttpPost("[action]")]

        public ActionResult Create([FromBody] UserDto user)
        {
            var myJson = _service.Create_User(user);
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Edit([FromBody] UserDto user)
        {
            var myJson = _service.Update_User(user);
            return Json(myJson);
        }


        [HttpPost("[action]/{id}")]

        public ActionResult Delete(string id)
        {
            var myJson = _service.Delete_User(id);
            return Json(myJson);
        }
    }
}