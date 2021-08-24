using System;
using System.Linq;
using System.Web.Mvc;
using Web.Portal.Service;
using Web.Portal.Model.Models;


namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN")]
    public class UserController : BaseController
    {
        ItblUserService _userService;
        public UserController(ItblUserService userService)
        {
            this._userService = userService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            var listUser = _userService.GetAll().ToList();
            ViewData["ListUser"] = listUser;
            return View();
        }
        public ActionResult Edit(int? id)
        {
            var user = new tblUser();
            if (id.HasValue && id.Value != 0)
                user = _userService.GetByID(id.Value);
            return View(user);
        }
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var user = new tblUser();
                if (keyValue != 0)
                {
                    user = _userService.GetByID(keyValue);
                }
                user.Name = Utils.Format.GetNullString(formRequest["name"]).ToUpper();
                user.Logins = Utils.Format.GetNullString(formRequest["login"]);
                user.Passwords = Utils.Format.GetNullString(formRequest["pass"]);
                user.Description = Utils.Format.GetNullString(formRequest["des"]);
                user.Levels = Utils.Format.GetNullInteger(formRequest["level"]);
                if (keyValue == 0)
                {
                    //var hawbDB = _hawbService.GetByCondition(hawb.Flight, hawb.Mawb, hawb.Hawb);
                    //if (hawbDB != null)
                    //{
                    //    message = "HAWB ĐÃ TỒN TẠI";
                    //    messageType = Utils.DisplayMessage.TypeError;
                    //    return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                    //}
                    user.Levels = 1;
                    _userService.Insert(user);
                    _userService.Save();
                    message = "Đã thêm mới User thành công!";
                }
                else
                {
                    _userService.Update(user);
                    _userService.Save();
                    message = "Đã sửa thông tin User thành công!";
                }
                //return Json(new
                //{
                //    Type = "success",
                //    Message = message,
                //    Title = "Thông báo",
                //    Error = "OK",
                //    Func = "hermesAction.downloadInvoice(" + 6 + ")"
                //}, JsonRequestBehavior.AllowGet);
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string message = "Lỗi";
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
