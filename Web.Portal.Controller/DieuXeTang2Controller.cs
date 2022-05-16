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
    public class DieuXeTang2Controller : GuestController
    {
        IDangKyGoiXeService _dkgxService;
        ICallTruckService _callTruckService;
        IDangKyVaoRaService _dkvrService;
        ItblTicketStatusService _ticketService;
        public DieuXeTang2Controller(IDangKyGoiXeService dkgxService, ICallTruckService callTruckService, IDangKyVaoRaService dkvrService, ItblTicketStatusService ticketService)
        {
            this._dkgxService = dkgxService;
            this._callTruckService = callTruckService;
            this._dkvrService = dkvrService;
            this._ticketService = ticketService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult DieuXe()
        {
            return View();
        }
        public ActionResult List(int id)
        {
            id = 2;
            //string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "" : Request["fno"].Trim();
            //ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Web.Portal.Utils.Format.ConvertDate(Request["ata"]);
            var listTruck = _callTruckService.GetByFloor(id);
            var listTruckCount = _callTruckService.GetAll();
            ViewData["listTruck"] = listTruck;
            ViewBag.EmptySpaceFloor2 = listTruckCount.Count > 0 ? listTruckCount[0].SpaceEmptyFloor2 : 0;
            ViewBag.EmptySpaceFloor1 = listTruckCount.Count > 0 ? listTruckCount[0].SpaceEmptyFloor1 : 0;
            ViewBag.Total = listTruck.Count;
            ViewBag.ID = id.ToString();
            return View();
        }
        public ActionResult ListDieuXe()
        {
            try
            {
                var listTruck = _callTruckService.GetByFloor(2);
                ViewData["listTruck"] = listTruck;
                ViewBag.EmptySpaceFloor2 = listTruck.Count > 0 ? listTruck[0].SpaceEmptyFloor2 : 0;
                ViewBag.EmptySpaceFloor1 = listTruck.Count > 0 ? listTruck[0].SpaceEmptyFloor1 : 0;
                ViewBag.Total = listTruck.Count;
                ViewBag.ID = 2.ToString();
                return View();
            }
            catch (Exception ex)
            {
                var listTruck = new List<CallTruck>();
                ViewData["listTruck"] = listTruck;
                return View();
            }
        
        }
        public ActionResult ListIndoor()
        {
            int id = 2;
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
                    else
                    {
                        var goixe = _dkgxService.GetBySynID(listTruckMonthlyCheckInT2[i].TicketUID);
                        if (goixe != null)
                        {
                            listTruckMonthlyCheckInT2[i].Note = goixe.SoCMND;
                            listTruckMonthlyCheckInT2[i].TrongTai = goixe.TenLaiXe;
                        }
                        else
                        {
                            goixe = _dkgxService.GetByBSXNewest(listTruckMonthlyCheckInT2[i].BienSoXe);
                            if (goixe != null)
                            {
                                listTruckMonthlyCheckInT2[i].Note = goixe.SoCMND;
                                listTruckMonthlyCheckInT2[i].TrongTai = goixe.TenLaiXe;
                            }
                            else
                            {
                                listTruckMonthlyCheckInT2[i].Note = "";
                                listTruckMonthlyCheckInT2[i].TrongTai = "";
                            }

                        }

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
            ViewData["listTruck"] = listTruckMonthlyCheckInT2.Where(c => c.ActionValue == location).OrderBy(c => c.ActionDateTime).ToList();
            return View();
        }
    }
}
