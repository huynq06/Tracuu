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
using Web.Portal.Utils;
using System.Text;

namespace Web.Portal.Controller
{
    public class UldController : GuestController
    {
        private DateTime? ata;
        ILocationService _locationService;
        IULD_TYPEService _uld_TypeService;
        IULDByFlightService _uldByFlightService;
        IFlightService _flightService;
        IStatisticService _statisticService;
        IAWBByULDService _awbByULDService;
        INotifyAWBService _notifyService;
        IHawbInAwbService _hawbInAwbService;
        ItblMissionService _missionService;
        int NotifiFlightID = 0;
        public UldController(IFlightService flightService, IULDByFlightService uldByFlightService,
            ILocationService locationService, IULD_TYPEService uld_TypeService, IStatisticService statisticService,
            IAWBByULDService awbByULDService, INotifyAWBService notifyService, IHawbInAwbService hawbInAwbService, ItblMissionService missionService)
        {
            this._flightService = flightService;
            this._uldByFlightService = uldByFlightService;
            this._locationService = locationService;
            this._uld_TypeService = uld_TypeService;
            this._statisticService = statisticService;
            this._awbByULDService = awbByULDService;
            this._notifyService = notifyService;
            this._hawbInAwbService = hawbInAwbService;
            this._missionService = missionService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Format.ConvertDate(Request["ata"]);
            var listFlightProcess = _flightService.GetAll().Where(c => c.Status == false);
            List<FlightViewModel> listFlightViewModel = new List<FlightViewModel>();
            StringBuilder ms = new StringBuilder();
            foreach (var flight in listFlightProcess)
            {
                FlightViewModel flightViewModel = new FlightViewModel();
                flightViewModel.ID = flight.ID;
                flightViewModel.FlightNumber = flight.FlightNumber;
                flightViewModel.FlightID = flight.FlightID;
                flightViewModel.SopTime = flight.SOPTIME;
                flightViewModel.Type = flight.FlightType;
                flightViewModel.AcraftType = flight.FlightTypeOfAirCraft;
                flightViewModel.AlertTime1 = flight.AlertTime1;
                flightViewModel.AlertTime2 = flight.AlertTime2;
                flightViewModel.AlertTime3 = flight.AlertTime3;
                flightViewModel.ULDTotal = _uldByFlightService.TotalULDByFlight(flight.FlightID);
                flightViewModel.ULDProcessing = _uldByFlightService.ProcessingULDByFlight(flight.FlightID);
                flightViewModel.ULDRemain = _uldByFlightService.RemainULDByFlight(flight.FlightID);
                flightViewModel.ULDFinish = _uldByFlightService.FinishtULDByFlight(flight.FlightID);
                flightViewModel.LandedDate = flight.LandedDate;
                flightViewModel.TimeToFinish = flightViewModel.LandedDate.Value.AddMinutes(flightViewModel.SopTime.Value);
                flightViewModel.TimeToSop = DateTime.Compare(DateTime.Now, flightViewModel.TimeToFinish.Value) < 0 ? (int)Math.Round((flightViewModel.TimeToFinish.Value - DateTime.Now).TotalMinutes, 0) : 0;
                listFlightViewModel.Add(flightViewModel);
                int tc = CheckTime(flight);
                if (tc != 0)
                {
                    //kiem tra xem lo hang lanh duoc xu ly het chua
                    var checkProcessColAWB = _awbByULDService.GetListAWBOpenByFlightGuid(flight.FlightID);
                    if (checkProcessColAWB.Count > 0)
                    {
                        if (tc != 2)
                        {
                            ms.Append(string.Format(Utils.Constants.ALERT_COL, formatFlight(flight.FlightNumber), tc));
                            Log.WriteLog(ms.ToString(), "SHC Warning");
                        }
                        else
                        {
                            ms.Append(string.Format(Utils.Constants.ALERT_COL_Finish, formatFlight(flight.FlightNumber)));
                            Log.WriteLog(ms.ToString(), "SHC Warning");
                        }
                       
                    }

                }
            }
            ViewData["ListFlightViewModel"] = listFlightViewModel;
            ViewBag.Translate = ms.ToString();
            var listColAwb = _awbByULDService.GetColAWB();
            List<AWBByULDViewModel> awbByULDViewModel = new List<AWBByULDViewModel>();
            foreach (var awb in listColAwb)
            {
                AWBByULDViewModel awbViewModel = new AWBByULDViewModel();
                awbViewModel.AWB = awb.AWB.Insert(3, "-");
                awbViewModel.Flight_ID = awb.Flight_ID;
                awbViewModel.TimeFinish = DateTime.Compare(DateTime.Now, awb.TimeFinish.Value) < 0 ? (int)Math.Round((awb.TimeFinish.Value - DateTime.Now).TotalMinutes, 0) : 0;
                awbViewModel.AWB_ID = awb.AWB_ID;
                awbViewModel.HaveMultiHawb = awb.HaveMultiHawb;
                awbByULDViewModel.Add(awbViewModel);
            }
            var listHawbBQL = _hawbInAwbService.GetColHAWB().ToList();
            ViewData["ListHawbInAWB"] = listHawbBQL;
            ViewData["ListAwbByULDViewModel"] = awbByULDViewModel;

            var listLocation = _locationService.GetAll().Where(c => c.ID != 13 && c.ID != 14);
            var listULDProcess = _uldByFlightService.GetListULDProcessing();
            var listULDType = _uld_TypeService.GetAll();
            List<ULDViewModel> listULDViewModel = (from uld in listULDProcess
                                                   join uldTpye in listULDType on uld.ULD_TYPE equals uldTpye.ID
                                                   select new ULDViewModel
                                                   {
                                                       ULDName = uld.Name,
                                                       StatusMessage = uld.StatusMessage,
                                                       FlightNumber = uld.FlightNumber,
                                                       ULDType = uldTpye.Name,
                                                       StartTime = uld.StartTime.Value,
                                                       NotifyMessage = uld.NotifyMessage,
                                                       Note = uld.Note,
                                                       LocationID = uld.LocationID.Value,
                                                       UldOperation = uldTpye.TimeOperation,
                                                       UldNotify = uldTpye.TimeNotify.Value,
                                                       NotifyID = uld.NotifyID,
                                                       TimeOperation = uldTpye.TimeOperation
                                                   }).ToList();

            List<LocationViewModel> listLocationViewModel = listLocation.ToList().LeftJoin(                    /// Source Collection  
                    listULDViewModel,                        /// Inner Collection  
                    p => p.LocationID,                                /// PK  
                    a => a.LocationID,                                /// FK  
                    (p, a) => new { MyLocation = p, MyULD = a })   /// Result Collection  
                    .Select(a => new LocationViewModel
                    {
                        LocationID = a.MyLocation.LocationID,
                        LocationName = a.MyLocation.LocationName,
                        ULDName = a.MyULD != null ? a.MyULD.ULDName : "",
                        ULDType = a.MyULD != null ? a.MyULD.ULDType : "",
                        UldOperation = a.MyULD != null ? a.MyULD.UldOperation : 0,
                        UldNotify = a.MyULD != null ? a.MyULD.NotifyID : 0,
                        StartTime = a.MyULD != null ? a.MyULD.StartTime.Value : DateTime.Now,
                        TimeProcess = a.MyULD != null ? (int)Math.Round((DateTime.Now - a.MyULD.StartTime.Value).TotalMinutes, 0) : 0,
                        FlightNumber = a.MyULD != null ? a.MyULD.FlightNumber : "",
                        TimeOperation = a.MyULD != null ? a.MyULD.TimeOperation : 0
                    }).ToList();

            int count = listLocationViewModel.Count();
            ViewData["listLocation"] = listLocation.ToList();
            ViewData["listLocationViewModel"] = listLocationViewModel;
            int warning = 0;

            foreach (var flight in listFlightViewModel)
            {
                if (flight.Type == "C")
                {
                    if (((flight.TimeToSop == 120 || flight.TimeToSop == 119) && flight.ULDRemain > 30) || ((flight.TimeToSop == 90 || flight.TimeToSop == 89) && flight.ULDRemain > 20)
                        || ((flight.TimeToSop == 60 || flight.TimeToSop == 59) && flight.ULDRemain > 10))
                    {
                        warning = 1;
                        NotifiFlightID = flight.ID;
                    }
                }
                if (flight.Type == "P")
                {
                    if (((flight.TimeToSop == 60 || flight.TimeToSop == 59) && flight.ULDRemain > 5) || ((flight.TimeToSop == 30 || flight.TimeToSop == 29) && flight.ULDRemain > 2))
                    {
                        warning = 1;
                        NotifiFlightID = flight.ID;
                    }
                }
            }
            ViewBag.Number = warning;
            ViewBag.Flight = NotifiFlightID;
            List<tblMission> missionCheck1 = _missionService.GetByDate(ata.Value.Date).ToList();
            ViewData["checkerList1"] = missionCheck1;
            return View();
        }

        public int CheckTime(Flight flight)
        {
           
                DateTime limitTime = flight.LandedDate.Value.AddMinutes(flight.SHCTIME.Value);
                double rs = (double)Math.Round((limitTime - DateTime.Now).TotalMinutes, 0);
                if (rs <= flight.AlertSHC1 && rs >= flight.AlertSHC1)
                    return flight.AlertSHC1.Value;
                if (rs <= flight.AlertSHC2 && rs >=flight.AlertSHC2)
                    return flight.AlertSHC2.Value;
                if (rs <= 2 && rs >= 2)
                    return 2;
            return 0;
           
        }

        public ActionResult GetResult()
        {
            List<ChartItem> chartItems = new List<ChartItem>();
            // string UID = string.IsNullOrEmpty(Request["uid"]) ? "ALL" : Convert.ToString(Request["uid"]);
            // int Point = string.IsNullOrEmpty(Request["pid"]) ? 0 : Convert.ToInt32(Request["pid"]);
            IList<RemainStatisticViewModel> items = _statisticService.GetRemainTotalStatistic().ToList();
            foreach (var item in items)
            {
                chartItems.Add(new ChartItem { Id = item.ID, Label = item.Name, Value = item.Total.ToString() });
            }
            return Json(chartItems, JsonRequestBehavior.AllowGet);
        }
        private string formatFlight(string f)
        {
            char[] fl = f.ToCharArray();

            return string.Join(" ", fl);
        }
    }
}
