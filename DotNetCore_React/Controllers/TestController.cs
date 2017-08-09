﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetCore_React.Application.RoleApp;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCore_React.Controllers
{
    /// <summary>
    /// API (Front)
    /// </summary>
    [Route("api/[controller]")]
    public class TestController : BaseController
    {
        private readonly IRoleAppService _service;

        public TestController(IRoleAppService service)
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

    }
}