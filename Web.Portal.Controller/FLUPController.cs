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
    public class FLUPController : BaseController
    {
        private DateTime? fromDate;
        private DateTime? toDate;
        IFLUPService _flupService;
        public FLUPController(IFLUPService flupService)
        {
            this._flupService = flupService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Edit(string id)
        {
            var flight = new FLUP();
            if (!string.IsNullOrEmpty(id))
                flight = _flupService.GetByID(id);
            return View(flight);
        }
        public ActionResult List()
        {
            string fda = Request["fda"].Trim();
            string tda = Request["fda"].Trim();
            List<FLUPViewModel> listFlight = new FLUPAccess().GetListFlight(fda, tda);
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
