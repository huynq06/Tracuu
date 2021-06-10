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
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC")]
    public class FastCargoController : BaseController
    {


        IFlightService _flightService;

        IAWBByULDService _awbByULDService;

        IHawbInAwbService _hawbInAwbService;
     
        public FastCargoController(IFlightService flightService,
            IAWBByULDService awbByULDService, IHawbInAwbService hawbInAwbService)
        {
            this._flightService = flightService;

            this._awbByULDService = awbByULDService;

            this._hawbInAwbService = hawbInAwbService;
        }
        public ActionResult Index()
        {
            List<HawbInAwbViewModel> listHawbInAwbModel = new List<HawbInAwbViewModel>();
            List<Flight> FligtsCheck = _flightService.GetAll().Where(c => c.Created > DateTime.Now.AddHours(-12)).ToList();
            foreach (var flight in FligtsCheck)
            {
                List<HawbInAwb> listHawbInAwb = _hawbInAwbService.GetByFlight(flight).ToList();
                foreach (var hawb in listHawbInAwb)
                {
                    HawbInAwbViewModel hawbModel = new HawbInAwbViewModel();
                    hawbModel.ID = hawb.ID;
                    hawbModel.FlightNumeber = flight.FlightNumber;
                    hawbModel.AWB = _awbByULDService.GetByGuid(hawb.AWB_ID.Value).AWB;
                    hawbModel.Fast = hawb.Fast;
                    hawbModel.HAWB = hawb.HAWB;
                    hawbModel.FlightID = flight.FlightID;
                    if (!string.IsNullOrEmpty(hawbModel.HAWB.Trim()))
                    {
                        listHawbInAwbModel.Add(hawbModel);
                    }
                   
                }
            }
            //lay danh sach cac chuyen bay
            ViewData["HawbInAwb"] = listHawbInAwbModel;
            return View();
        }
        public ActionResult List()
        {
            return View();
        }
        public ActionResult SetFastCargo(int? id)
        {
            try
            {
                string message = "Vui lòng chọn Hawb!";
                string messageType = Utils.DisplayMessage.TypeSuccess;
                if (id.HasValue)
                {
                    HawbInAwb hawb = _hawbInAwbService.GetByID(id.Value);
                    hawb.Fast = true;
                    _hawbInAwbService.UpdateFast(hawb);
                    _hawbInAwbService.Save();
                    message = "Set hàng nhanh thành công!";
                }

                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult AsynFromHermes(Guid id)
        {
            string message = "";
            string messageType = Utils.DisplayMessage.TypeSuccess;
            var flight = _flightService.GetById(id);
            var listAWBs = _awbByULDService.GetByFlightGuid(flight.FlightID);
            var listHawbs = _hawbInAwbService.GetByFlight(flight);
            if (listAWBs.Count > 0)
            {
                foreach (var awb in listAWBs)
                {
                    List<HawbInAwb> hawbs = new HawbInAwbAccess().GetHawbInAwb(awb, flight);
                    foreach (var hawb in hawbs)
                    {
                        if (listHawbs.All(c => c.HAWB != hawb.HAWB))
                        {
                            HawbInAwb newHawb = new HawbInAwb();
                            newHawb.FlightID = flight.FlightID;
                            newHawb.AWB_ID = awb.AWB_ID;
                            newHawb.HAWB = hawb.HAWB;
                            newHawb.Lagi_Identity = hawb.Lagi_Identity;
                            newHawb.Bql = false;
                            newHawb.CheckValue = 0;
                            newHawb.Process = 0;
                            _hawbInAwbService.Add(newHawb);
                            _hawbInAwbService.Save();
                        }
                    }
                }
            }
            message = "Đồng bộ thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult Edit()
        {
            var hawb = new HawbInAwb();
           
            return View(hawb);
        }
    }
}
