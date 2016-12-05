using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace NABAKEM
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Id",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Main", id = UrlParameter.Optional }
            );

            routes.MapRoute(
               name: "ModeId",
               url: "{controller}/{action}/{mode}/{id}",
               defaults: new { controller = "Home", action = "Main", mode = UrlParameter.Optional, id = UrlParameter.Optional }
            );

            
        }
    }
}