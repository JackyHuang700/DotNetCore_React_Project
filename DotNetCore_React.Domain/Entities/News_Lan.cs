using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    public class News_Lan : Entity
    {
        public int LanguageId { get; set; }

        public string Title { get; set; }

        public string SubTitle { get; set; }
        public string Content { get; set; }
    }
}
