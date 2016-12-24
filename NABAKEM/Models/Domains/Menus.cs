using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NABAKEM.Models.Domains
{
    public class Menus
    {
        public string Code { get; set; }
        public string ParentCode { get; set; }
        public string TypeCode { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string IsUse { get; set; }
        public string Ordering { get; set; }
        public string AuthLevel { get; set; }
        public string Comment { get; set; }
        public string Modified { get; set; }
        public string Registered { get; set; }
    }
}