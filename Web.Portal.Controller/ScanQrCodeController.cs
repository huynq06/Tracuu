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
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,MEMBER,HAIQUAN,KHOKEODAI,CUSTOMER,XEMUYQUYEN")]
    public class ScanQrCodeController : BaseController
    {
        private DateTime? fromDate;
        private DateTime? toDate;
        ItblTicketStatusService _ticketService;
        IDangKyVaoRaService _barieService;
        public ScanQrCodeController(ItblTicketStatusService ticketService, IDangKyVaoRaService barieService)
        {
            this._ticketService = ticketService;
            this._barieService = barieService;
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
        [DocumentExport("EXCEL", "BAO CAO SCAN QRCODE")]
        public ActionResult Export()
        {
            ShowData();
            return View();
        }
        public void ShowData()
        {
            string vitri = Request["location"];
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate.Value.AddDays(1) : Web.Portal.Utils.Format.ConvertDate(Request["tda"]).Value.AddDays(1);
            //    dateCheck = string.IsNullOrEmpty(Request["date"]) ? dateCheck : Web.Portal.Utils.Format.ConvertDate(Request["date"]);
            IEnumerable<Guid> listGuid = _ticketService.GetListTicket(fromDate, toDate, vitri);
            List<tblTicketStatus> listTrucks = _ticketService.GetVihicle(fromDate, toDate, vitri).ToList();

            List<TicketStatusViewModel> listTicketViewModel = new List<TicketStatusViewModel>();
            foreach (var item in listGuid)
            {
                //TicketStatusViewModel ticket = new TicketStatusViewModel();
                //ticket.TicketID = item;
                //IEnumerable<tblTicketStatus> listTicketFilter = listTrucks.Where(c => c.TicketUID == item);
                //tblDangKyVaoRa barie = _barieService.GetByGuid(item.ToString());
                //ticket.Created = listTicketFilter.ToList()[0].TicketCreatedAt.Value;        
                //ticket.Location = vitri;
                //ticket.BSX = listTicketFilter.ToList()[0].BienSoXe;
                //ticket.BarieIn = barie.NgayGioVaoThuc;
                //ticket.BarieOut = barie.NgayGioRa;
                //foreach (var obj in listTicketFilter)
                //{
                //    if(obj.ActionCode.Trim() == "CHECK_IN")
                //    {
                //        ticket.CheckIn = obj.ActionDateTime;
                //    }
                //    if (obj.ActionCode.Trim() == "CHECK_OUT")
                //    {
                //        ticket.CheckOut = obj.ActionDateTime;
                //    }
                //}
                //listTicketViewModel.Add(ticket);
            }

           
            ViewData["listTruck"] = listTicketViewModel;
            ViewBag.TitleReport = "BÁO CÁO ĐIỀU XE TẦNG " + vitri + " TỪ NGÀY " + fromDate.Value.ToString("dd/MM/yyyy") + " ĐẾN NGÀY " + toDate.Value.ToString("dd/MM/yyyy");
        }
    }
}
