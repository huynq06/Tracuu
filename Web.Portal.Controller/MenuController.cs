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
            if(WebMatrix.WebData.WebSecurity.CurrentUserName != "alsb" && WebMatrix.WebData.WebSecurity.CurrentUserName != "alse"
                && WebMatrix.WebData.WebSecurity.CurrentUserName != "alst" && WebMatrix.WebData.WebSecurity.CurrentUserName != "alsw"
                && WebMatrix.WebData.WebSecurity.CurrentUserName != "asg" && WebMatrix.WebData.WebSecurity.CurrentUserName != "clc")
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
