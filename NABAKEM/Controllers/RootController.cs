using NABAKEM.Models.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NABAKEM.Controllers
{
    public class RootController : Controller
    {
        public JsonResult GetNavigation()
        {
            MenuHelper menuHelper = new MenuHelper();
            var menus = menuHelper.GetAllMenus();
            return Json(menus, JsonRequestBehavior.AllowGet);
        }
    }
}
