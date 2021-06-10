using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Sercurity
{
    public class LogOutController : System.Web.Mvc.Controller
    {
        public ActionResult Index()
        {
            WebMatrix.WebData.WebSecurity.Logout();
            return Redirect("/home");
        }
    }
}

