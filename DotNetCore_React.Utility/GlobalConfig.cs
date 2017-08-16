using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Utility
{
    public class GlobalConfig
    {
        /// <summary>
        /// 站台位置
        /// </summary>
        public string Domain { get; set; }

        /// <summary>
        /// 郵件服務位置
        /// </summary>
        public string Mail_Address { get; set; }

        /// <summary>
        /// 郵件服務端口
        /// </summary>
        public int Mail_Port { get; set; }
    }
}
