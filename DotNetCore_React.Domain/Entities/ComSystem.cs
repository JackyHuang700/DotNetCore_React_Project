using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 系統資料表
    /// </summary>
    public class ComSystem : Entity
    {
        public int AccessFailedCount { get; set; }
        public int Product_ListImage_MaxSize { get; set; }
        public string Product_ListImage_File { get; set; }
        public int Product_Image_MaxSize { get; set; }
        public string Product_Image_File { get; set; }
        public int Location_ListImage_MaxSize { get; set; }
        public string Location_ListImage_File { get; set; }


        public int Location_Image_MaxSize { get; set; }
        public string Location_Image_File { get; set; }
        public string System_Logo { get; set; }
        public string System_Logo_Text { get; set; }
    }
}
