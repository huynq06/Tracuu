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
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KTX")]
    public class FLUPController : BaseController
    {
        private DateTime? fromDate;
        private DateTime? toDate;
        IFLUPService _flupService;
        IFLightFlupService _flightService;
        public FLUPController(IFLUPService flupService, IFLightFlupService flightService)
        {
            this._flupService = flupService;
            this._flightService = flightService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Edit(int? id)
        {
            var flight = new FLightFlup();
            if (id.HasValue && id.Value != 0)
                flight = _flightService.GetByID(id.Value);
            return View(flight);
        }
        public ActionResult List()
        {
            fromDate = Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            List<FLightFlup> listFlight = _flightService.GetByDate(fromDate.Value, toDate.Value).ToList();
            int count = listFlight.Count;
            ViewData["FlightList"] = listFlight;
            return View();
        }
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var flight = new FLightFlup();
                if (keyValue != 0)
                {
                    flight = _flightService.GetByID(keyValue);
                }
                flight.LAT = Web.Portal.Utils.Format.ConvertDate(Request["lat"]);
                _flightService.Update(flight);
                _flightService.Save();
                message = "Đã sửa thông tin Cut Off thành công!";


                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string message = "Lỗi";
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message + ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult IndexFlup()
        {
            return View();
        }
        public ActionResult EditFlup(string id)
        {
            var flight = new FLUP();
            if (!string.IsNullOrEmpty(id))
                flight = _flupService.GetByID(id);
            return View(flight);
        }
        public ActionResult ListFlup()
        {
            string fda = Request["fda"].Trim();
            string tda = Request["fda"].Trim();
            List<FLUPViewModel> listFlight = new FLUPAccess().GetListFlight(fda, tda);
            int count = listFlight.Count;
            ViewData["FlightList"] = listFlight;
            return View();
        }
        public ActionResult ActionFlup(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                string keyValue = formRequest["keyValue"];
                var flight = new FLUP();
                if (!string.IsNullOrEmpty(keyValue))
                {
                    flight = _flupService.GetByID(keyValue);
                }
                flight.FLUP_FLIGHT_NO_LVG = Request["flight"].Trim().ToUpper();
                flight.FLUP_FLIGHT_NO = Request["code"].Trim();
                flight.FLUP_ACTUAL_DATE = double.Parse(Request["atd"].Trim());
                //flight.LAT = Web.Portal.Utils.Format.ConvertDate(Request["lat"]);
                _flupService.Update(flight);
                _flupService.Save();
                //_flightService.Update(flight);
                //_flightService.Save();
                message = "Đã sửa thông tin Chuyến bay thành công!";


                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string message = "Lỗi";
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message + ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
