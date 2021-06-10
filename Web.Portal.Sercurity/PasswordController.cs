using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Sercurity
{
    [AuthorizedBase(Roles = "ADMIN,MEMBER")]
    public class PasswordController : System.Web.Mvc.Controller
    {
        public ActionResult Change()
        {
            return View();
        }

        [ValidateInput(false)]
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {
                if (string.IsNullOrEmpty(formRequest["currentpassword"]) || string.IsNullOrEmpty(formRequest["password"]))
                    return Json(new { Message = string.Format(Web.Portal.Utils.DisplayMessage.MessageWarning, "Vui lòng nhập thông tin mật khẩu") }, JsonRequestBehavior.AllowGet);

                bool result = WebMatrix.WebData.WebSecurity.ChangePassword(WebMatrix.WebData.WebSecurity.CurrentUserName,
                                                                            formRequest["currentpassword"].Trim(),
                                                                            formRequest["password"].Trim());

                if (result == true)
                    return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeSuccess, Message = "Đã thay đổi thông tin mật khẩu", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                else
                    return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeWarning, Message = "Không đúng thông tin mật khẩu", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (System.Web.Security.MembershipCreateUserException ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
