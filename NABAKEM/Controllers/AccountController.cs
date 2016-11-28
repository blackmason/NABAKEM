using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NABAKEM.Controllers
{
    public class AccountController : RootController
    {
        //
        // GET: /Account/

        public ActionResult Login()
        {
            return View();
        }

    }
}
