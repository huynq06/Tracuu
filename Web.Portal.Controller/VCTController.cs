using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using Web.Portal.DataAccess;


namespace Web.Portal.Controller
{
    public class VCTController : GuestController
    {
        IVCTService _iVctService;
        public VCTController(IVCTService iVctService)
        {
            this._iVctService = iVctService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Edit(int? id)
        {
            //int? id = int.Parse(Request["id"]);
            //int check = int.Parse(Request["check"]);
            var vct = new VCT();
            if (id.HasValue && id.Value != 0)
                vct = _iVctService.GetByID(id.Value);
            return View(vct);
        }
        public ActionResult List(int id)
        {
            List<VCT> listVct = _iVctService.GetAllToday(id).ToList();
            ViewData["VCTList"] = listVct;
            if (id == 0)
                return View();
            else if (id == 1)
                return View("~/Views/VCT/Dim.cshtml");
            else if (id == 2)
                return View("~/Views/VCT/ScaleOne.cshtml");
            else
                return View("~/Views/VCT/ScaleSecond.cshtml");
        }
        public ActionResult Dim(int id)
        {
            var vct = _iVctService.GetByID(id);
            vct.AWB_STATUS = 1;
            vct.LABS_DIM_AT = DateTime.Now;
            _iVctService.Update(vct);
            _iVctService.Save();
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;

            message = "LÔ HÀNG ĐÃ HOÀN THÀNH ĐO DIM!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Transfer()
        {
            int? id = int.Parse(Request["id"]);
            int value = int.Parse(Request["value"]);
            var vct = _iVctService.GetByID(id.Value);
            vct.LOCATION = value;
            vct.AWB_STATUS = 2;
            vct.LABS_PROCESS_AT = DateTime.Now;
            _iVctService.Update(vct);
            _iVctService.Save();
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;

            message = "LÔ HÀNG ĐÃ CHUYỂN TỚI CÂN" + value.ToString() + "!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
     
    }
}
