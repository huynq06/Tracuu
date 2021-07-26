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
using Web.Portal.Common.ApiViewModel;
using Web.Portal.Utils;
using System.Threading.Tasks;

namespace Web.Portal.Controller
{
    public class HolidayController : BaseController
    {
        private DateTime? ata;
        IHolidayConfigService _holidayService;
        ILocationConfigService _configService;
        public HolidayController(IHolidayConfigService holidayService,ILocationConfigService configService)
        {
            this._holidayService = holidayService;
            this._configService = configService;
        }
        public ActionResult Index()
        {
           
         //   string result = task.Result;
            //string message = "hello";
            //string forward = "";
            //string zalo = "";
            //bool send = false;
            //string contact = "";

            //    send = ZaloUtils.SendZalo("0977119533", message, ref zalo, ref forward);

            //string lagi_ident = "9853821";
            //List<HawbInFlightViewModel> listInvoice = new DataAccess.HawbInFlightAccess().GetListHawbInFlight(lagi_ident).ToList();
            return View();
        }
        public ActionResult List()
        {
            //string url = Server.MapPath("/SitaTemplate/temFligtRequest.xml");
            //Task<string> task = Task.Run<String>(async () => await Utils.FlightRequest.Command(url));
            //string result = task.Result;
           // string result = Utils.FlightRequest.CommandTest(url);
            //string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "" : Request["fno"].Trim();
            //ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Web.Portal.Utils.Format.ConvertDate(Request["ata"]);
            var listHoliday = _holidayService.GetAll().ToList();
            ViewData["ListHoliday"] = listHoliday;
            return View();
        }
        public ActionResult Edit(int? id)
        {
            var holiday = new HolidayConfig();
            if (id.HasValue && id.Value != 0)
                holiday = _holidayService.GetByID(id.Value);
            return View(holiday);
        }
        public ActionResult Delete(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            _holidayService.Delete(id);
            _holidayService.Save();
            message = "Đã xóa thông tin ngày lễ thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var holiday = new HolidayConfig();
                if (keyValue != 0)
                {
                    holiday = _holidayService.GetByID(keyValue);
                }
                holiday.Description = Utils.Format.GetNullString(formRequest["des"]).ToUpper();
                holiday.DateHoliday = Utils.Format.ConvertDate(formRequest["ata"]).Value.Date;
                holiday.Created = DateTime.Now;
                if (keyValue == 0)
                {
                    //var hawbDB = _hawbService.GetByCondition(hawb.Flight, hawb.Mawb, hawb.Hawb);
                    //if (hawbDB != null)
                    //{
                    //    message = "HAWB ĐÃ TỒN TẠI";
                    //    messageType = Utils.DisplayMessage.TypeError;
                    //    return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                    //}
                    _holidayService.Add(holiday);
                    _holidayService.Save();
                    message = "Đã thêm mới ngày lễ thành công!";
                }
                else
                {
                    _holidayService.Update(holiday);
                    _holidayService.Save();
                    message = "Đã sửa thông tin ngày lễ thành công!";
                }
                return Json(new {
                    Type = "success",
                    Message = message,
                    Title = "Thông báo",
                    Error = "OK",
                    Func = "hermesAction.downloadInvoice(" + 6 + ")"
                }, JsonRequestBehavior.AllowGet);
             //   return Json(new { Type = messageType, Message = message, Func = "hermesAction.downloadInvoice(6);", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string message = "Lỗi";
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult IndexConfig()
        {
            return View();
        }
        public ActionResult ListConfig()
        {
            var listConfig = _configService.GetAll().ToList();
            ViewData["ListConfig"] = listConfig;
            return View();
        }
        public ActionResult EditConfig(int? id)
        {
            var config = new LocationConfig();
            if (id.HasValue && id.Value != 0)
                config = _configService.GetByID(id.Value);
            return View(config);
        }
        public ActionResult ActionConfig(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var config = new LocationConfig();
                if (keyValue != 0)
                {
                    config = _configService.GetByID(keyValue);
                }
                config.TotalSpace = Utils.Format.GetNullInteger(formRequest["total"]);
                config.ThresholdPoint = Utils.Format.GetNullInteger(formRequest["threshold"]);
               // holiday.Created = DateTime.Now;
             
                    _configService.Update(config);
                    _configService.Save();
                    message = "Đã sửa thông tin thành công!";
                

                return Json(new {
                    Type = "success",
                    Message = "Thành công",
                    Title = "Thông báo",
                    Error = true,
                    Func = "configAction.downloadInvoice(7);"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
              //  string message = "Lỗi";
                string messageType = Utils.DisplayMessage.TypeError;

                return Json(new { Type = messageType, Message = "Error " + ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
