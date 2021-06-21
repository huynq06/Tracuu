using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,MEMBER,HAIQUAN,KHOKEODAI,CUSTOMER,XEMUYQUYEN")]
    public class MenuController : BaseController
    {
        public ActionResult Index()
        {
            if(WebMatrix.WebData.WebSecurity.CurrentUserName == "admin" || WebMatrix.WebData.WebSecurity.CurrentUserName == "annb" || WebMatrix.WebData.WebSecurity.CurrentUserName == "khaithacxuat" || WebMatrix.WebData.WebSecurity.CurrentUserName == "ktx.view")
            {
                ViewBag.CheckView = "true";
            }
            if (WebMatrix.WebData.WebSecurity.CurrentUserName == "hqgs")
            {
                ViewBag.CheckHQ = "true";
            }

            return View();
        }

        public ActionResult Top()
        {

            return View();
        }
    }
}
