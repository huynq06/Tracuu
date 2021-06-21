using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using System.Web.Mvc;
using Web.Portal.Common;
using Web.Portal.Common.ViewModel;
using System.Web.Script.Serialization;
using System.Xml.Linq;
using Web.Portal.DataAccess;
using Web.Portal.Common.ApiViewModel;
using System.IO;
using Web.Portal.Model;

namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,MEMBER,HAIQUAN,KHOKEODAI,CUSTOMER,XEMUYQUYEN")]
    public class CallTruckController : BaseController
    {
        IDangKyGoiXeService _dkgxService;
        IDangKyVaoRaService _dkvrService;
        ILocationConfigService _locationService;
        ItblTicketStatusService _ticketService;
        private DateTime? fromDate;
        private DateTime? toDate;
        public CallTruckController(IDangKyGoiXeService dkgxService, IDangKyVaoRaService dkvrService, ILocationConfigService locationService, ItblTicketStatusService ticketService)
        {
            this._dkgxService = dkgxService;
            this._dkvrService = dkvrService;
            this._locationService = locationService;
            this._ticketService = ticketService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {

            ShowData();
            return View();
        }
        public ActionResult InOut()
        {

            return View();
        }
        public void ShowData()
        {
            int vitri = int.Parse(Request["location"].Trim());
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate.Value.AddDays(1) : Web.Portal.Utils.Format.ConvertDate(Request["tda"]).Value.AddDays(1);
            //    dateCheck = string.IsNullOrEmpty(Request["date"]) ? dateCheck : Web.Portal.Utils.Format.ConvertDate(Request["date"]);
            List<tblDangKyGoiXe> listTrucks = _dkgxService.GetVihicle(fromDate, toDate, vitri).ToList();
            ViewData["listTruck"] = listTrucks;
            ViewBag.TitleReport = "BÁO CÁO ĐIỀU XE TẦNG " + vitri + " TỪ NGÀY " + fromDate.Value.ToString("dd/MM/yyyy") + " ĐẾN NGÀY " + toDate.Value.ToString("dd/MM/yyyy");
        }
        public void ShowDataList(int ticketType, int exportType)
        {
            string location = "GATEIN_T1";
            int vitri = int.Parse(Request["location"].Trim());

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = fromDate.Value.AddDays(1);
            if (vitri == 2)
            {
                location = "GATEIN_T2";
            }
            List<TicketStatusViewModel> listTicketViewModel = new List<TicketStatusViewModel>();
            List<TicketStatusViewModel> listTicketViewModelMonthly = new List<TicketStatusViewModel>();
            List<TicketStatusViewModel> listTicketViewModelFinal = new List<TicketStatusViewModel>();
            if (ticketType == 1)
            {
                List<tblDangKyVaoRa> listTrucks = _dkvrService.GetVihicle(fromDate, toDate, vitri).ToList();

                List<tblTicketStatus> listCheckIn = _ticketService.GetVihicleCheckIn(fromDate, toDate, location).ToList();
                List<tblTicketStatus> listCheckOut = _ticketService.GetVihicleCheckOut(fromDate, toDate, "GATEOUT").ToList();
                if (exportType == 1)
                {
                    listTicketViewModel = (from ticket in listTrucks
                                           join checkin in listCheckIn on ticket.SyncID equals checkin.TicketUID.ToString() into mma
                                           from checkin in mma.DefaultIfEmpty()
                                           join checkout in listCheckOut on ticket.SyncID equals checkout.TicketUID.ToString() into pma
                                           from checkout in pma.DefaultIfEmpty()
                                           select new TicketStatusViewModel
                                           {
                                               ID = (int)ticket.ID,
                                               BSX = ticket.BienSoXe,
                                               TicketID = Guid.Parse(ticket.SyncID),
                                               Created = ticket.NgayGioVao.Value,
                                               LoaiXe = ticket.LoaiXe == 2 ? "XE MÁY" : "ÔTÔ",
                                               LoaiVe = "VÉ NGÀY",
                                               CheckIn = checkin == null ? "" : Utils.TimeUtils.GetTime(ticket.NgayGioVao.Value, checkin.ActionDateTime),
                                               BarieIn = Utils.TimeUtils.GetTime(ticket.NgayGioVao.Value, ticket.NgayGioVaoThuc),
                                               BarieOut = Utils.TimeUtils.GetTime(ticket.NgayGioVao.Value, ticket.NgayGioRa),
                                               CheckOut = checkout == null ? "" : Utils.TimeUtils.GetTime(ticket.NgayGioVao.Value, checkout.ActionDateTime),
                                               WaitingTime = ticket.NgayGioVaoThuc.HasValue ? (int)Math.Round((ticket.NgayGioVaoThuc.Value - ticket.NgayGioVao.Value).TotalMinutes, 0) : 1000,
                                               SLA = Utils.TimeUtils.CheckConditionInOut(ticket.NgayGioVaoThuc, ticket.NgayGioVao.Value, vitri),
                                               Location = location
                                           }).ToList();
                    ViewBag.TitleReport = "BÁO CÁO XE VÀO RA TẦNG " + vitri + " NGÀY " + fromDate.Value.ToString("dd/MM/yyyy");
                    foreach (var item in listTicketViewModel)
                    {
                        TicketStatusViewModel ticketViewModel = listTicketViewModelFinal.FirstOrDefault(c => c.TicketID == item.TicketID);
                        if (ticketViewModel == null)
                        {
                            listTicketViewModelFinal.Add(item);
                        }
                    }
                }
                else
                {
                    listTicketViewModel = (from ticket in listTrucks
                                           join checkin in listCheckIn on ticket.SyncID equals checkin.TicketUID.ToString() into mma
                                           from checkin in mma.DefaultIfEmpty()
                                           join checkout in listCheckOut on ticket.SyncID equals checkout.TicketUID.ToString() into pma
                                           from checkout in pma.DefaultIfEmpty()
                                           select new TicketStatusViewModel
                                           {
                                               ID = (int)ticket.ID,
                                               BSX = ticket.BienSoXe,
                                               TicketID = Guid.Parse(ticket.SyncID),
                                               Created = ticket.NgayGioVao.Value,
                                               LoaiXe = ticket.LoaiXe == 2 ? "XE MÁY" : "ÔTÔ",
                                               LoaiVe = "VÉ NGÀY",
                                               CheckIn = checkin == null ? "" : Utils.TimeUtils.GetTime(ticket.NgayGioVao.Value, checkin.ActionDateTime),
                                               BarieIn = Utils.TimeUtils.GetTime(ticket.NgayGioVao.Value, ticket.NgayGioVaoThuc),
                                               BarieOut = Utils.TimeUtils.GetTime(ticket.NgayGioVao.Value, ticket.NgayGioRa),
                                               CheckOut = checkout == null ? "" : Utils.TimeUtils.GetTime(ticket.NgayGioVao.Value, checkout.ActionDateTime),
                                               WaitingTime = checkin != null ? (int)Math.Round((checkin.ActionDateTime - ticket.NgayGioVao.Value).TotalMinutes, 0) : 1000,
                                               SLA = checkin != null ? Utils.TimeUtils.CheckCondition(checkin.ActionDateTime, ticket.NgayGioVao.Value, vitri) : "N/A",
                                               Location = location
                                           }).ToList();
                    foreach (var item in listTicketViewModel)
                    {
                        TicketStatusViewModel ticketViewModel = listTicketViewModelFinal.FirstOrDefault(c => c.TicketID == item.TicketID);
                        if (ticketViewModel == null)
                        {
                            listTicketViewModelFinal.Add(item);
                        }
                    }
                    ViewBag.TitleReport = "BÁO CÁO SCAN QRCODE TẦNG " + vitri + " NGÀY " + fromDate.Value.ToString("dd/MM/yyyy");
                }
                #region vethang
                IEnumerable<Guid> listGuid = _ticketService.GetListTicketMonthy(fromDate, toDate, location);
                List<tblTicketStatus> listTrucksMonthly = _ticketService.GetVihicleMonthly(fromDate, toDate, location).ToList();
                foreach (var item in listGuid)
                {
                    TicketStatusViewModel ticketMonthly = new TicketStatusViewModel();
                    List<tblTicketStatus> listTicketFilter = listTrucksMonthly.Where(c => c.TicketUID == item).ToList();
                    foreach (var obj in listTicketFilter)
                    {
                        // ticketMonthly.BSX = obj.BienSoXe;
                        if (obj.ActionCode.Trim() == "CHECK_IN")
                        {
                            ticketMonthly.Created = obj.ActionDateTime;
                            ticketMonthly.CheckIn = obj.ActionDateTime.ToString("HH:mm");
                        }
                        if (obj.ActionCode.Trim() == "CHECK_OUT")
                        {
                            ticketMonthly.CheckOut = obj.ActionDateTime.ToString("HH:mm");
                        }
                    }
                 
                    ticketMonthly.LoaiVe = "VÉ THÁNG";
                    ticketMonthly.LoaiXe = "Ô TÔ";
                    ticketMonthly.TicketID = listTicketFilter[0].TicketUID;
                    ticketMonthly.Location = location;
                    ticketMonthly.BSX = listTicketFilter.ToList()[0].BienSoXe;
                    listTicketViewModelMonthly.Add(ticketMonthly);
                }
                int totalMonthly = listTicketViewModelMonthly.Count;
                ViewBag.TotalMonthly = totalMonthly;
                #endregion
             

                int total = listTicketViewModelFinal.Count;
                int notCheckIn = listTicketViewModelFinal.Where(c => c.CheckIn == "").Count();
                int notCheckOut = listTicketViewModelFinal.Where(c => c.CheckOut == "").Count();
                double percentCheckIn = Math.Round((double)(notCheckIn * 100 / total));
                double percentCheckOut = Math.Round((double)(notCheckOut * 100 / total));
                int ok = listTicketViewModelFinal.Where(c => c.SLA == "ĐẠT").Count();
                double percentOK = Math.Round((double)(ok * 100 / total));
                ViewBag.Total = total;
                ViewBag.NotCheckIn = notCheckIn;
                ViewBag.NotCheckOut = notCheckOut;
                ViewBag.OK = ok;
                ViewBag.PercentChecIn = percentCheckIn.ToString() + "%";
                ViewBag.PercentChecOut = percentCheckOut.ToString() + "%";
                ViewBag.PercentOK = percentOK.ToString() + "%";
                listTicketViewModelFinal.AddRange(listTicketViewModelMonthly);
                ViewData["listTruck"] = listTicketViewModelFinal.OrderBy(c => c.Created).ToList();
            }
            else
            {
                IEnumerable<Guid> listGuid = _ticketService.GetListTicketMonthy(fromDate, toDate, location);
                List<tblTicketStatus> listTrucksMonthly = _ticketService.GetVihicleMonthly(fromDate, toDate, location).ToList();
                foreach (var item in listGuid)
                {
                    TicketStatusViewModel ticketMonthly = new TicketStatusViewModel();
                    List<tblTicketStatus> listTicketFilter = listTrucksMonthly.Where(c => c.TicketUID == item).ToList();
                    foreach (var obj in listTicketFilter)
                    {
                        // ticketMonthly.BSX = obj.BienSoXe;
                        if (obj.ActionCode.Trim() == "CHECK_IN")
                        {
                            ticketMonthly.CheckIn = obj.ActionDateTime.ToString("HH:mm");
                        }
                        if (obj.ActionCode.Trim() == "CHECK_OUT")
                        {
                            ticketMonthly.CheckOut = obj.ActionDateTime.ToString("HH:mm");
                        }
                    }
                    ticketMonthly.LoaiVe = "VÉ THÁNG";
                    ticketMonthly.LoaiXe = "Ô TÔ";
                    ticketMonthly.TicketID = listTicketFilter[0].TicketUID;
                    ticketMonthly.Location = location;
                    ticketMonthly.BSX = listTicketFilter.ToList()[0].BienSoXe;
                    listTicketViewModelMonthly.Add(ticketMonthly);
                }
                int totalMonthly = listTicketViewModelMonthly.Count;
                ViewBag.Total = totalMonthly;
                ViewData["listTruck"] = listTicketViewModelMonthly.OrderBy(c => c.ID).ToList();
            }

        }
        [DocumentExport("EXCEL", "BAO CAO GOI XE")]
        public ActionResult Export()
        {
            ShowData();
            return View();
        }
        [DocumentExport("EXCEL", "BAO CAO VAO RA")]
        public ActionResult ExportList()
        {
            int ticketType = int.Parse(Request["ticket"].Trim());
            ShowDataList(ticketType, 1);
            if (ticketType == 2)
            {
                return View("~/Views/CallTruck/ExportListMonthly.cshtml");
            }
            return View();
        }
        //[DocumentExport("EXCEL", "BAO CAO VAO RA")]
        //public ActionResult ExportListScanQr()
        //{
        //    int ticketType = int.Parse(Request["ticket"].Trim());
        //    ShowDataList(ticketType, 2);
        //    if (ticketType == 2)
        //    {
        //        return View("~/Views/CallTruck/ExportListMonthly.cshtml");
        //    }
        //    return View();
        //}
        public ActionResult ListInOut()
        {
            int ticketType = int.Parse(Request["ticket"].Trim());
            ShowDataList(ticketType, 1);
            if (ticketType == 2)
            {
                return View("~/Views/CallTruck/ListInOutMonthly.cshtml");
            }
            return View();
        }

        public ActionResult Print()
        {
            return View();
        }

        public ActionResult ScanInOut()
        {
            return View();
        }
        public ActionResult ScanInOutList()
        {
            int ticketType = int.Parse(Request["ticket"].Trim());
            ShowDataList(ticketType, 2);
            if (ticketType == 2)
            {
                return View("~/Views/CallTruck/ListInOutMonthly.cshtml");
            }
            return View();
        }
        [DocumentExport("EXCEL", "BAO CAO VAO RA")]
        public ActionResult ScanInOutExport()
        {
            int ticketType = int.Parse(Request["ticket"].Trim());
            ShowDataList(ticketType, 2);
            if (ticketType == 2)
            {
                return View("~/Views/CallTruck/ExportListMonthly.cshtml");
            }
            return View();
        }
        public ActionResult ScanInOutShowData()
        {
            return View();
        }
    }
}
