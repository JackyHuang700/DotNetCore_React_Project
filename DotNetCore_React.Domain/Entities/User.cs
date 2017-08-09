using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 會員
    /// </summary>
    public class User : Entity
    {

        public string Id { get; set; }
       
        public string SysId { get; set; }

        public string Name { get; set; }
        public int Priority { get; set; }
        public byte Status { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        
    }
}
