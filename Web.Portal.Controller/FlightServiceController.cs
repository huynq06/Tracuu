using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using Web.Portal.DataAccess;
using Web.Portal.Utils;
namespace Web.Portal.Controller
{
    public class FlightServiceController : GuestController
    {
        IFLightFlupService _flightService;
        IFlightServiceConfigService _flightServiceConfigService;
        IFlightConfigService _flightConfigService;
        public FlightServiceController(IFLightFlupService flightService, IFlightServiceConfigService flightServiceConfigService, IFlightConfigService flightConfigService)
        {
            this._flightService = flightService;
            this._flightServiceConfigService = flightServiceConfigService;
            this._flightConfigService = flightConfigService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            List<FlightServiceConfig> listFlightService = _flightServiceConfigService.GetAll().ToList();
            FlightServiceConfig flightServiceConfig = _flightServiceConfigService.GetByID(1);
            List<FLightFlup> listFlight = _flightService.GetByOperationDays().ToList();
            List<FlightFlupViewModel> listFlightViewModel = new List<FlightFlupViewModel>();
            int totalSumULD = 0;
            int totalSumRemainULD = 0;
            int totalSumNeedPostion = 0;
            int totalSumMan = 0;
            foreach(var item in listFlight)
            {
                FlightFlupViewModel flight = new FlightFlupViewModel();
                FlightConfig flightConfig = _flightConfigService.GetType(item.FLightNumber.Substring(0, 2), item.FlightType.Substring(0, 1));
                if(flightConfig!=null)
                    flight.SLA = item.ETD.AddMinutes(-120);
                else
                    flight.SLA = item.ETD.AddMinutes(-flightConfig.FinalLoad.Value);
                int remainMinute = 0;
                if (DateTime.Compare(flight.SLA.Value, DateTime.Now) > 0)
               {
                     remainMinute = (int)Math.Round((flight.SLA.Value - DateTime.Now).TotalMinutes, 0);
                }
                else
                {
                    remainMinute = (int)Math.Round((DateTime.Now - flight.SLA.Value).TotalMinutes, 0);
                }
               
             
                flight.FLightNumber = item.FLightNumber;
                flight.ETD = item.ETD;
                flight.RemainTime = DateTime.Compare(flight.SLA.Value, DateTime.Now) > 0? TimeUtils.FomatDateTime(remainMinute) : "-" + TimeUtils.FomatDateTime(remainMinute);
                flight.TotalULD = item.TotalULD;
                flight.RemainULD = item.TotalULD - item.UldLoaded;
                flight.NeedPosition = flight.RemainULD != 0 ? (int)Math.Ceiling((double)flight.RemainULD.Value * flightServiceConfig.FinishTimePerUld / remainMinute) : 0;
                if (remainMinute <= flightServiceConfig.FinishTimePerUld)
                {
                    flight.NeedPosition = flight.RemainULD;
                }
                flight.ManPower = flight.RemainULD != 0 ? flight.NeedPosition * flightServiceConfig.ManPerUld : 0;
                flight.Remark = flight.RemainULD != 0 ? "CẦN " + flight.NeedPosition + " VỊ TRÍ B/U" : "";
                totalSumULD += item.TotalULD.Value;
                totalSumRemainULD += flight.RemainULD.Value;
                totalSumNeedPostion += flight.NeedPosition.Value;
                totalSumMan += flight.ManPower.Value;
                listFlightViewModel.Add(flight);
            }
           int count = listFlight.Count;
            ViewData["FlightList"] = listFlightViewModel.OrderBy(c=>c.SLA).ToList();
            ViewBag.TotalSumULD = totalSumULD;
            ViewBag.TotalSumRemainULD = totalSumRemainULD;
            ViewBag.TotalSumNeedPostion = totalSumNeedPostion;
            ViewBag.TotalSumMan = totalSumMan;
            return View(flightServiceConfig);
        }
    }
}
