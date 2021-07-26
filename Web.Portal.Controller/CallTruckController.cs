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
        string[] dockListImp = { "DOCK_T2_D01", "DOCK_T2_D02", "DOCK_T2_D03", "DOCK_T2_D04", "DOCK_T2_D05", "DOCK_T2_D06", "DOCK_T2_D07", "DOCK_T2_D08", "DOCK_T2_D09", "DOCK_T2_D10", "DOCK_T2_KHAC" };
        string[] dockListExp = { "DOCK_T1_D05", "DOCK_T1_D06", "DOCK_T1_D07", "DOCK_T1_D08", "DOCK_T1_D09", "DOCK_T1_D10", "DOCK_T1_D11", "DOCK_T1_D12", "DOCK_T1_D13", "DOCK_T1_KHAC" };
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
            string location = vitri == 3 ? "ALSX" : "TẦNG " + vitri;
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate.Value.AddDays(1) : Web.Portal.Utils.Format.ConvertDate(Request["tda"]).Value.AddDays(1);
            //    dateCheck = string.IsNullOrEmpty(Request["date"]) ? dateCheck : Web.Portal.Utils.Format.ConvertDate(Request["date"]);
            List<tblDangKyGoiXe> listTrucks = _dkgxService.GetVihicle(fromDate, toDate, vitri).ToList();
            ViewData["listTruck"] = listTrucks;
            DateTime dateCheck = DateTime.Now.AddHours(-12);
            List<tblTicketStatus> listCheckIn = _ticketService.GetListTicketMonthyCheckIn(dateCheck).ToList();
            foreach (var item in listTrucks)
            {
                if (item.TruckStatus == 1 && !item.SynID.HasValue)
                {
                    var checkTruck = listCheckIn.FirstOrDefault(c => c.BienSoXe == item.BienSoXe);
                    if (checkTruck != null)
                    {
                        item.TruckStatus = 3;
                    }
                    //kta xem xe da vao chua

                }
            }
            ViewBag.TitleReport = "BÁO CÁO ĐIỀU XE " + location + " TỪ NGÀY " + fromDate.Value.ToString("dd/MM/yyyy") + " ĐẾN NGÀY " + toDate.Value.ToString("dd/MM/yyyy");
        }
        public void ShowDataList()
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
     
           
                List<tblDangKyVaoRa> listTrucks = _dkvrService.GetVihicle(fromDate, toDate, vitri).ToList();

                List<tblTicketStatus> listCheckIn = _ticketService.GetVihicleCheckIn(fromDate, toDate, location).ToList();
                List<tblTicketStatus> listCheckOut = _ticketService.GetVihicleCheckOut(fromDate, toDate, "GATEOUT").ToList();
             
               
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
                        if (obj.ActionCode.Trim() == "CHECK_IN" && (obj.ActionValue.Trim() == "GATEIN_T1" || obj.ActionValue.Trim() == "GATEIN_T2"))
                        {
                            ticketMonthly.Created = obj.ActionDateTime;
                            ticketMonthly.CheckIn = obj.ActionDateTime.ToString("HH:mm");
                           
                        }
                        if (obj.ActionCode.Trim() == "CHECK_OUT" && obj.ActionValue.Trim() == "GATEOUT")
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
            
                ViewBag.Total = total;
                ViewBag.NotCheckIn = notCheckIn;
                ViewBag.NotCheckOut = notCheckOut;
          
                ViewBag.PercentChecIn = percentCheckIn.ToString() + "%";
                ViewBag.PercentChecOut = percentCheckOut.ToString() + "%";
           
                listTicketViewModelFinal.AddRange(listTicketViewModelMonthly);
            
                ViewData["listTruck"] = listTicketViewModelFinal.OrderBy(c => c.Created).ToList();
            
            

        }
        public ActionResult ScanInOutList()
        {
           
            ShowDataList();
           
            return View();
        }
        public ActionResult ScanInOut()
        {
            return View();
        }
        [DocumentExport("EXCEL", "BAO CAO VAO RA")]
        public ActionResult ScanInOutExport()
        {
            ShowDataList();

            return View();
        }
        [DocumentExport("EXCEL", "BAO CAO GOI XE")]
        public ActionResult Export()
        {
            ShowData();
            return View();
        }

        public ActionResult IndexDockImp()
        {
            return View();
        }
        public ActionResult DockImpList()
        {
            foreach(var item in dockListImp)
            {

            }
            return View();
        }

        public ActionResult Truck()
        {
            return View();
        }
        public ActionResult TruckIndoorList()
        {
            int id = int.Parse(Request["location"].Trim());

            List<TicketStatusViewModel> listTicket = new List<TicketStatusViewModel>();
            List<TicketStatusViewModel> listTicketMonthly = new List<TicketStatusViewModel>();
            //List<tblDangKyVaoRa> listTruck = _dkvrService.GetTruckIndoor();
            string location = "GATEIN_T1";
            if (id == 2)
            {
                location = "GATEIN_T2";
            }
            DateTime dateCheck = DateTime.Now.AddHours(-12);
            //listTicket = listTicketViewModel.Where(c => c.CheckOut == "").ToList();
            List<tblTicketStatus> listCheckIn = _ticketService.GetListTicketMonthyCheckIn(dateCheck).ToList();
            List<tblTicketStatus> listTruckCheckIn = listCheckIn.Where(c => c.ActionValue == location).ToList();
            
            if (listTruckCheckIn.Count > 0)
            {
                for (int i = listTruckCheckIn.Count - 1; i >= 0; i--)
                {
                    string bsx = listCheckIn[i].TicketUID.ToString();
                    if (listCheckIn.Where(c => c.TicketUID == listTruckCheckIn[i].TicketUID && c.ActionValue == "GATEOUT").Count() > 0)
                    {
                        listTruckCheckIn.RemoveAt(i);
                    }
                }
            }
           
            ViewBag.Total = listTruckCheckIn.Count;
            ViewData["listTruck"] = listTruckCheckIn;
            return View();
        }
        public ActionResult CheckOut(Guid id)
        {
            var truck = _ticketService.GetByTicketID(id);
            tblTicketStatus ticket = new tblTicketStatus();
            ticket.TicketUID = id;
            ticket.TicketCreatedAt = truck.TicketCreatedAt;
            ticket.ActionCode = "CHECK_OUT";
            ticket.ActionValue = "GATEOUT";
            ticket.ActionDateTime = DateTime.Now;
            ticket.ActionMessage = "CHECK OUT MANUAL";
            ticket.BienSoXe= truck.BienSoXe;
            ticket.ActionStatus = 1;
            ticket.TicketType = truck.TicketType;
            _ticketService.Insert(ticket);
            _ticketService.Save();
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;

            message = "ĐÃ CHECK OUT XE RA KHỎI KHO!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Delete(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
          
            message = "Đã xóa thông tin ngày lễ thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
    }
}
