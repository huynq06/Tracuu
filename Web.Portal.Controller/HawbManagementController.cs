using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using Web.Portal.Common;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using Web.Portal.DataAccess;
using System.Web.Script.Serialization;
using MoralesLarios.Linq;

namespace Web.Portal.Controller
{
    public class HawbManagementController : BaseController
    {
        private DateTime? ata;
        IHawbManagementService _hawbService;
        public HawbManagementController(IHawbManagementService hawbService)
        {
            this._hawbService = hawbService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "" : Request["fno"].Trim();
            ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Web.Portal.Utils.Format.ConvertDate(Request["ata"]);
            var listHawb = _hawbService.GetAll(flightNo, ata.Value).OrderBy(c=>c.Mawb).ToList();
            ViewData["HawbInAwb"] = listHawb;
            return View();
        }
        public ActionResult Edit(int? id)
        {
            var hawb = new HawbManagement();
            if (id.HasValue && id.Value != 0)
                hawb = _hawbService.GetByID(id.Value);
            return View(hawb);
        }
        public ActionResult Delete(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            _hawbService.Delete(id);
            _hawbService.Save();
            message = "Đã xóa thông tin hàng nhanh thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var hawb = new HawbManagement();
                if (keyValue != 0)
                {
                    hawb = _hawbService.GetByID(keyValue);
                }
                hawb.Flight = Utils.Format.GetNullString(formRequest["flight"]).ToUpper();
                hawb.ATA = Utils.Format.ConvertDate(formRequest["ata"]);
                hawb.Mawb = Utils.Format.GetNullString(formRequest["mawb"]).Replace("-", "").Replace(" ", "").Trim();
                hawb.Hawb = Utils.Format.GetNullString(formRequest["hawb"]).Trim();
                hawb.Created = DateTime.Now;
                if (keyValue == 0)
                {
                    var hawbDB = _hawbService.GetByCondition(hawb.Flight, hawb.Mawb, hawb.Hawb);
                    if (hawbDB != null)
                    {
                        message = "HAWB ĐÃ TỒN TẠI";
                        messageType = Utils.DisplayMessage.TypeError;
                        return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                    }
                    _hawbService.Add(hawb);
                    _hawbService.Save();
                    message = "Đã thêm mới Hàng nhanh thành công!";
                }
                else
                {
                    _hawbService.UpdateFast(hawb);
                    _hawbService.Save();
                    message = "Đã sửa thông tin hàng nhanh thành công!";
                }

                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string message = "Lỗi";
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        [DocumentExport("EXCEL", "FastCargo")]
        public ActionResult Export()
        {
            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "" : Request["fno"].Trim();
            ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Web.Portal.Utils.Format.ConvertDate(Request["ata"]);
            var listHawb = _hawbService.GetAll(flightNo, ata.Value).OrderBy(c => c.Mawb).ToList();
            ViewBag.Flight = flightNo;
            ViewBag.ATA = ata.Value.ToString("dd-MM-yyyy");
            ViewData["HawbInAwb"] = listHawb;
            return View();
        }
    }
}
