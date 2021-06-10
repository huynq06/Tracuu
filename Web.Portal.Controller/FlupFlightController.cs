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
    public class FlupFlightController :  BaseController
    {
        IFLightFlupService _flightService;
        IFlightServiceConfigService _flightConfigService;
        public FlupFlightController(IFLightFlupService flightService, IFlightServiceConfigService flightConfigService)
        {
            this._flightService = flightService;
            this._flightConfigService = flightConfigService;
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
        public ActionResult EditConfig(int? id)
        {
            var flightConfig = new FlightServiceConfig();
            if (id.HasValue && id.Value != 0)
                flightConfig = _flightConfigService.GetByID(id.Value);
            return View(flightConfig);
        }
        public ActionResult List()
        {
            List<FlightServiceConfig> listFlightService = _flightConfigService.GetAll().ToList();
            List<FLightFlup> listFlight = _flightService.GetByOperationDays().ToList();
            int count = listFlight.Count;
            ViewData["FlightList"] = listFlight;
            ViewData["FlightConfigList"] = listFlightService;
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
                flight.TotalULD = int.Parse(Request["uld"]);

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
        public ActionResult ActionConfig(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var flight = new FlightServiceConfig();
                if (keyValue != 0)
                {
                    flight = _flightConfigService.GetByID(keyValue);
                }
                flight.Position = int.Parse(Request["position"]);
                flight.FinishTimePerUld = int.Parse(Request["time"]);
                flight.ManPerUld = int.Parse(Request["man"]);

                _flightConfigService.Update(flight);
                _flightConfigService.Save();
                message = "Đã sửa thông tin cấu hình!";


                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string message = "Lỗi";
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message + ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult EditFlight(string id)
        {
            List<ContViewModel> listCont = new List<ContViewModel>();
            listCont = new ContAccess().GetListCont(id);
            ViewData["contList"] = listCont;

            return View();
        }
    }
}
