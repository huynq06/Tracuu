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
using Web.Portal.Upload;
using System.Text;

namespace Web.Portal.Controller
{
    public class KSULDController : GuestController
    {
        IFlightService _flightService;
        IULDByFlightService _uldByFlightService;
        ILocationService _locationService;
        IULD_TYPEService _uld_TypeService;
        IFlightConfigService _flightConfigService;
        ItblMissionService _missionService;
        private DateTime? fromDate;
        private DateTime? toDate;
        public KSULDController(IFlightService flightService, IULDByFlightService uldByFlightService,
            ILocationService locationService, IULD_TYPEService uld_TypeService, IFlightConfigService flightConfigService, ItblMissionService missionService)
        {
            this._flightService = flightService;
            this._uldByFlightService = uldByFlightService;
            this._locationService = locationService;
            this._uld_TypeService = uld_TypeService;
            this._flightConfigService = flightConfigService;
            this._missionService = missionService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        { 
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            DateTime dateCheck = DateTime.Now.AddHours(-6);
            //                                                                  ref total);
            var listFlight = _flightService.GetAll().Where(c=>c.LandedDate > dateCheck).ToList();
            ViewData["ListFlight"] = listFlight;
            return View();
        }
        public ActionResult ListULD()
        {
            int id = int.Parse(Request["id"]);
            string flight_int_number = Request["flightID"];
            Guid flightID = Guid.Parse(Request["flightGuid"]);
            var listULD = _uldByFlightService.GetListULDByFlightGuid(flightID);
            ViewData["listULD"] = listULD.ToList();
            return View();
        }
        public ActionResult ULDDetail()
        {
            string uldIns = Request["uldIns"];
            ULDByFlight uld = _uldByFlightService.GetByUldIns(uldIns);
            List<UldControlViewModel> listUldControl = new UldControlAccess().GetListUldByIns(uldIns, uld.Name);
            List<AwbuViewModel> listAwbByUldIns = new UldControlAccess().GetListMawbByIns(uldIns);
            List<UldControlViewModel> listUldControlReal = new List<UldControlViewModel>();
            foreach(var ffm in listAwbByUldIns)
            {
                if(listUldControl.Count(c=>c.LagiMasterID==ffm.LagiIdent)==0)
                {
                    UldControlViewModel objUld = new UldControlViewModel();
                    objUld.Mawb = ffm.Awb;
                    objUld.Hawb = "";
                    objUld.PiecesFFM = ffm.PiecesAwbu;
                    objUld.Check = false;
                    objUld.Compare = "NOT OK";
                    objUld.TotalPices = 0;
                    listUldControlReal.Add(objUld);
                }
            }
            foreach (var item in listUldControl)
            {
                if(listUldControlReal.Any(c=>c.Mawb==item.Mawb && c.Hawb==item.Hawb))
                {
                    continue;
                }
                item.TotalPices = listUldControl.Where(c => c.Mawb == item.Mawb).Sum(c => c.PiecesReceived);
                if (item.TotalPices == item.PiecesFFM)
                {
                    item.Check = true;
                    item.Compare = "OK";
                }
                else
                {
                    item.Check = false;
                    item.Compare = "CHECK";
                }
                item.TotalPiecesHawb = listUldControl.Where(c => c.Hawb == item.Hawb && c.Mawb == item.Mawb).Sum(c => c.PiecesReceived);
                if (!listUldControlReal.Any(c => c.Mawb == item.Mawb))
                {
                    listUldControlReal.Add(item);
              
                }
                else
                {
                    item.TotalPices = 0;
                    item.Mawb = "";
                    item.Compare = "";
                    item.Result = "";
                    item.PiecesFFM = 0;
                    listUldControlReal.Add(item);
                }
                   
                //listUldControlReal.Add(item);
                
            }
            ViewData["ListUld"] = listUldControlReal;
            return View(uld);
        }
        [DocumentExport("EXCEL", "PHIEU DO HANG TU ULD")]
        public ActionResult Export()
        {
            string uldIns = Request["uldIns"];
            ULDByFlight uld = _uldByFlightService.GetByUldIns(uldIns);
            var flight = _flightService.GetById(uld.Flight_ID);
            List<UldControlViewModel> listUldControlReal = new List<UldControlViewModel>();
            List<AwbuViewModel> listAwbByUldIns = new UldControlAccess().GetListMawbByIns(uldIns);
            List<UldControlViewModel> listUldControl = new UldControlAccess().GetListUldByIns(uldIns, uld.Name);
            foreach (var item in listUldControl)
            {
                if (listUldControlReal.Any(c => c.Mawb == item.Mawb && c.Hawb == item.Hawb))
                {
                    continue;
                }
                item.TotalPices = listUldControl.Where(c => c.Mawb == item.Mawb).Sum(c => c.PiecesReceived);
                if (item.TotalPices == item.PiecesFFM)
                {
                    item.Check = true;
                    item.Compare = "OK";
                }


                else
                {
                    item.Check = false;
                    item.Compare = "CHECK";
                }
                item.Result = item.TotalPices + "/" + item.PiecesFFM;
                item.Created = new UldControlAccess().GetCreatedTime(item.ID, item.GroupNo);
                item.LocationULD = GetLocation(uld.LocationID.Value);
                if (!listUldControlReal.Any(c => c.Mawb == item.Mawb))
                {
                    listUldControlReal.Add(item);

                }
                else
                {
                    item.TotalPices = 0;
                    item.Mawb = "";
                    item.Compare = "";
                    item.Result = "";
                    item.PiecesFFM = 0;
                    listUldControlReal.Add(item);
                }
            }
            ViewBag.FlightNo = flight.FlightNumber + " " + flight.Schedule.Value.ToString("dd/MM/yyyy");
            ViewBag.Location = GetLocation(uld.LocationID.Value);
            ViewBag.ULD = uld.Name;
            ViewBag.FirstMove = listUldControl.Where(c=>c.Created.HasValue).Min(c => c.Created).Value.ToString("dd/MM/yyyy HH:mm");
            ViewBag.LastMove = listUldControl.Where(c => c.Created.HasValue).Max(c => c.Created).Value.ToString("dd/MM/yyyy HH:mm");
            ViewData["UldListView"] = listUldControlReal;
            return View();
        }

        public ActionResult PrintByFlight(string id)
        {
            Guid flightID = Guid.Parse(id);
            var flight = _flightService.GetById(flightID);
            ViewBag.FlightNo = flight.FlightNumber + " " + flight.Schedule.Value.ToString("dd/MM/yyyy");
            List<ULDByFlight> listUld = new List<ULDByFlight>();
            listUld = _uldByFlightService.GetListULDByFlightGuid(flightID);
            List<ExportUldByFlightViewModel> ListUldExport = new List<ExportUldByFlightViewModel>();
            foreach(var uld in listUld)
            {
                ExportUldByFlightViewModel uldDetail = new ExportUldByFlightViewModel();
                List<UldControlViewModel> listUldControl = new UldControlAccess().GetListUldByIns(uld.ULD_ISN, uld.Name);
                List<UldControlViewModel> listUldControlReal = new List<UldControlViewModel>();
                foreach (var item in listUldControl)
                {
                    item.TotalPices = listUldControl.Where(c => c.Mawb == item.Mawb).Sum(c => c.PiecesReceived);
                    if (item.TotalPices == item.PiecesFFM)
                    {
                        item.Check = true;
                        item.Compare = "OK";
                    }


                    else
                    {
                        item.Check = false;
                        item.Compare = "CHECK";
                    }
                    item.Result = item.TotalPices + "/" + item.PiecesFFM;
                    //item.Created = new UldControlAccess().GetCreatedTime(item.ID, item.GroupNo);
                    item.LocationULD = GetLocation(uld.LocationID.Value);
                    if (listUldControlReal.Any(c => c.Mawb == item.Mawb))
                    {
                        item.Mawb = "";
                        item.Compare = "";
                        item.Result = "";
                        item.PiecesFFM = 0;
                        listUldControlReal.Add(item);
                    }
                    else
                        listUldControlReal.Add(item);


                }
                uldDetail.listUldControl = listUldControlReal;
                uldDetail.Location = GetLocation(uld.LocationID.Value);
                uldDetail.StartOperation = uld.StartTime.HasValue ? uld.StartTime.Value.ToString("dd/MM/yyyy HH:mm") : "";
                uldDetail.ULD = uld.Name;
                uldDetail.StopOperation = uld.FinishTime.HasValue ? uld.FinishTime.Value.ToString("dd/MM/yyyy HH:mm") : "";
                ListUldExport.Add(uldDetail);
            }
            ViewData["ListUld"] = ListUldExport;
            return View();
        }
        public ActionResult Print()
        {
            string uldIns = Request["uldIns"];
            ULDByFlight uld = _uldByFlightService.GetByUldIns(uldIns);
            var flight = _flightService.GetById(uld.Flight_ID);
            List<UldControlViewModel> listUldControl = new UldControlAccess().GetListUldByIns(uldIns, uld.Name);
            List<UldControlViewModel> listUldControlReal = new List<UldControlViewModel>();
            foreach (var item in listUldControl)
            {
                item.TotalPices = listUldControl.Where(c => c.Mawb == item.Mawb).Sum(c => c.PiecesReceived);
                if (item.TotalPices == item.PiecesFFM)
                {
                     item.Check = true;
                    item.Compare = "OK";
                }


                else
                {
                    item.Check = false;
                    item.Compare = "CHECK";
                }
                item.Result = item.TotalPices + "/" + item.PiecesFFM;
                item.Created = new UldControlAccess().GetCreatedTime(item.ID, item.GroupNo);
                item.LocationULD = GetLocation(uld.LocationID.Value);
                if (listUldControlReal.Any(c => c.Mawb == item.Mawb))
                {
                    item.Mawb = "";
                    item.Compare = "";
                    item.Result = "";
                    item.PiecesFFM = 0;
                    listUldControlReal.Add(item);
                }
                else
                    listUldControlReal.Add(item);


            }
          

            ViewBag.FlightNo = flight.FlightNumber + " " + flight.Schedule.Value.ToString("dd/MM/yyyy");
            ViewBag.Location = GetLocation(uld.LocationID.Value);
            ViewBag.ULD = uld.Name;
            ViewBag.FirstMove = listUldControl.Where(c => c.Created.HasValue).Min(c => c.Created).Value.ToString("dd/MM/yyyy HH:mm");
            ViewBag.LastMove = listUldControl.Where(c => c.Created.HasValue).Max(c => c.Created).Value.ToString("dd/MM/yyyy HH:mm");
            ViewData["UldListView"] = listUldControlReal;
            return View();
        }
        public string GetLocation(int id)
        {
            string location = "";
            if(id <= 12)
            {
                location = "IBD" + id;
            }
            else if(id==13)
            {
                location = "QL";
            }
            else if (id == 14)
            {
                location = "ICR";
            }
            else if (id == 15)
            {
                location = "FLOOR1";
            }
            return location;
        }
    }
}
