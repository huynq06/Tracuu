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
    public class IndoorController : GuestController
    {
        IDangKyVaoRaService _dkvrService;
        ItblTicketStatusService _ticketService;
        public IndoorController(IDangKyVaoRaService dkvrService, ItblTicketStatusService ticketService)
        {
            this._dkvrService = dkvrService;
            this._ticketService = ticketService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List(int id)
        {

            List<TicketStatusViewModel> listTicket = new List<TicketStatusViewModel>();
            List<TicketStatusViewModel> listTicketMonthly = new List<TicketStatusViewModel>();
            //List<tblDangKyVaoRa> listTruck = _dkvrService.GetTruckIndoor();
            string location = "GATEIN_T1";
            if (id == 2)
            {
                location = "GATEIN_T2";
            }
         
            //listTicket = listTicketViewModel.Where(c => c.CheckOut == "").ToList();
            List<tblTicketStatus> listCheckIn = _ticketService.GetListTicketMonthyCheckIn().ToList();
            List<tblTicketStatus> listTruckMonthlyCheckIn = listCheckIn.Where(c => c.ActionValue != "GATEOUT").ToList();
            List<tblTicketStatus> listToRemove = new List<tblTicketStatus>();
            foreach (var item in listTruckMonthlyCheckIn)
            {
                if (listCheckIn.Where(c => c.TicketUID == item.TicketUID && c.ActionValue == "GATEOUT").Count() > 0)
                {
                    item.ActionCode = "CHECK_OUT";
                }
            }
            listTruckMonthlyCheckIn = listTruckMonthlyCheckIn.Where(c => c.ActionCode == "CHECK_IN").ToList();
            //listTruckMonthlyCheckIn.RemoveAll(listToRemove);
            foreach (var item in listTruckMonthlyCheckIn)
            {
                tblTicketStatus ticketStatus = _ticketService.GetByTicketID(item.TicketUID);
                TicketStatusViewModel obj = new TicketStatusViewModel();
                if(item.ActionValue== "GATEIN_T1")
                {
                    obj.Location = "1";
                }
                else
                {
                    obj.Location = "2";
                }
                if(ticketStatus.TicketType==2)
                {
                    obj.LoaiVe = "VÉ THÁNG";
                }
                else
                {
                    obj.LoaiVe = "VÉ NGÀY";
                }
                obj.BSX = item.BienSoXe;
                obj.CheckIn = ticketStatus.ActionDateTime.ToString("dd/MM/yyyy HH:mm");
                obj.TicketID = item.TicketUID;
                listTicketMonthly.Add(obj);
            }
            listTicket.AddRange(listTicketMonthly);
            int countTruckFloor1 = listTicket.Where(c => c.Location == "1").Count();
            int countTruckFloor2 = listTicket.Where(c => c.Location == "2").Count();
            ViewBag.TruckFloor1 = countTruckFloor1;
            ViewBag.TruckFloor2 = countTruckFloor2;
            ViewData["listTruck"] = listTicket.Where(c=>c.Location == id.ToString()).ToList();
            return View();
        }
    }
}
