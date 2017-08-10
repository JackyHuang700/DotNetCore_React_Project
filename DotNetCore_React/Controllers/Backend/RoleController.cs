using DotNetCore_React.Application.RoleApp;
using DotNetCore_React.Application.RoleApp.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCore_React.Controllers
{
    /// <summary>
    /// 角色
    /// </summary>
    [Route("api/[controller]")]
    public class RoleController : AuthorizedController
    {
        private readonly IRoleAppService _service;

        public RoleController(IRoleAppService service)
        {
            _service = service;
        }

        [HttpPost("[action]")]

        public ActionResult Create([FromBody] RoleDto role)
        {
            var myJson = _service.Create_Role(role);
            return Json(myJson);
        }

    }
}
