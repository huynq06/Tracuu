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
            DateTime dateCheck = DateTime.Now.AddHours(-12);
            //listTicket = listTicketViewModel.Where(c => c.CheckOut == "").ToList();
            List<tblTicketStatus> listCheckIn = _ticketService.GetListTicketMonthyCheckIn(dateCheck).ToList();
            List<tblTicketStatus> listTruckMonthlyCheckInT2 = listCheckIn.Where(c => c.ActionValue == "GATEIN_T2").ToList();
            int countTruckMonthlyCheckInT2 = listTruckMonthlyCheckInT2.Count();
            if (countTruckMonthlyCheckInT2 > 0)
            {
                for (int i = listTruckMonthlyCheckInT2.Count - 1; i >= 0; i--)
                {
                    string bsx = listTruckMonthlyCheckInT2[i].TicketUID.ToString();
                    if (listCheckIn.Where(c => c.TicketUID == listTruckMonthlyCheckInT2[i].TicketUID && c.ActionValue == "GATEOUT").Count() > 0)
                    {
                        listTruckMonthlyCheckInT2.RemoveAt(i);
                    }
                }
            }
            List<tblTicketStatus> listTruckMonthlyCheckInT1 = listCheckIn.Where(c => c.ActionValue == "GATEIN_T1").ToList();
            int countTruckMonthlyCheckInT1 = listTruckMonthlyCheckInT1.Count();
            if (countTruckMonthlyCheckInT1 > 0)
            {
                for (int i = listTruckMonthlyCheckInT1.Count - 1; i >= 0; i--)
                {
                    // some code
                    // safePendingList.RemoveAt(i);
                    if (listCheckIn.Where(c => c.TicketUID == listTruckMonthlyCheckInT1[i].TicketUID && c.ActionValue == "GATEOUT").Count() > 0)
                    {
                        listTruckMonthlyCheckInT1.RemoveAt(i);
                    }
                }
            }
               
            listTruckMonthlyCheckInT2.AddRange(listTruckMonthlyCheckInT1);
            int countTruckFloor1 = listTruckMonthlyCheckInT2.Where(c => c.ActionValue == "GATEIN_T1").Count();
            int countTruckFloor2 = listTruckMonthlyCheckInT2.Where(c => c.ActionValue == "GATEIN_T2").Count();
            ViewBag.TruckFloor1 = countTruckFloor1;
            ViewBag.TruckFloor2 = countTruckFloor2;
            ViewData["listTruck"] = listTruckMonthlyCheckInT2.Where(c=>c.ActionValue == location).ToList();
            return View();
        }
    }
}
