using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Sercurity
{
    public class AccessDeniedController : System.Web.Mvc.Controller
    {
        public System.Web.Mvc.ActionResult Index()
        {
            return View();
        }
        public System.Web.Mvc.ActionResult PageNotFound()
        {
            return View();
        }
    }
}
