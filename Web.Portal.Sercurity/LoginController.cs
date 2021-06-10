using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Web.Portal.Sercurity
{
    public class LoginController : System.Web.Mvc.Controller
    {
        [HttpGet]
        public ActionResult Index()
        {

            return View();
        }
        [ValidateInput(false)]
        public ActionResult Check(FormCollection formRequest)
        {
            try
            {
                string userName = formRequest["userName"].ToLower().Trim();
                string password = formRequest["password"].Trim();
                bool remember = string.IsNullOrEmpty(formRequest["remember"]) ? false : true;
                if (WebMatrix.WebData.WebSecurity.Login(userName, password, true))
                {

                    string returnUrl = string.IsNullOrEmpty(Request["ReturnUrl"]) ? "/home" : Request["ReturnUrl"].Trim();
                    return Json(new { Message = "", Error = true, Func = "window.location.href='/home';" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { Error = false, Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = "Không đúng tên đăng nhập hoặc mật khẩu", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception ex)
            {
                return Json(new { Error = false, Type =Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Avatar()
        {

            Web.Portal.Sercurity.Member memberCurrent = new  Web.Portal.Sercurity.MemberAccess().GetByUserID(WebMatrix.WebData.WebSecurity.CurrentUserId);
            ViewBag.MemberCurrent = memberCurrent != null ? memberCurrent : new Web.Portal.Sercurity.Member();
            return View();
        }
    }
}
