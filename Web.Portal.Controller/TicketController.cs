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
using QRCoder;
using System.Drawing;
using System.IO;
namespace Web.Portal.Controller
{
    public class TicketController : BaseController
    {
        ItblTicketService _ticketService;
        ItblCompanyService _companyService;
        public TicketController(ItblTicketService ticketService, ItblCompanyService companyService)
        {
            this._ticketService = ticketService;
            this._companyService = companyService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            List<tblTicket> listTicket = new List<tblTicket>();
            string id = Request["id"];
            string bsx = string.IsNullOrEmpty(Request["bsx"]) ? "ALL" : Request["bsx"].Trim();
            int ticketType = int.Parse(Request["ticketType"]);
                int total = 0;
                int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
                int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
                listTicket = _ticketService.GetGetByType(ticketType, page, pageSize, ref total, bsx).ToList();
                ViewBag.TotalRecord = total;
                ViewBag.PageCurrent = (page - 1) * pageSize;
                ViewData["TicketList"] = listTicket;
            ViewBag.Total = total;
            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingfl", total, page, pageSize);
                return View();
           

        }
        public ActionResult Print(int id)
        {
            try
            {
                var ticket = _ticketService.GetByID(id);
                ticket.PrintStatus = 1;
                _ticketService.Update(ticket);
                _ticketService.Save();
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;

                message = "ADD TO PRINT QUEUE SUCCESS!";
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Utils.DisplayMessage.MessageError, Message = ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                throw;
            }

        }
        public ActionResult PrintRemove(int id)
        {
            try
            {
                var ticket = _ticketService.GetByID(id);
                ticket.PrintStatus = 0;
                _ticketService.Update(ticket);
                _ticketService.Save();
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;

                message = "REMOVE FROM PRINT QUEUE SUCCESS!";
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Utils.DisplayMessage.MessageError, Message = ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                throw;
            }

        }
        public ActionResult PrintQueue()
        {
            List<tblTicket> listTicket = new List<tblTicket>();
            listTicket = _ticketService.GetPrintQueue(2).ToList();
            ViewData["TicketList"] = listTicket;
            ViewBag.Total = listTicket.Count;
                return View();
            
        }
       
        public ActionResult ProcessPrint()
        {
            List<tblTicket> listTicket = new List<tblTicket>();
            listTicket = _ticketService.GetPrintQueue(2).ToList();
            List<tblCompany>  listCompany = _companyService.GetAll().ToList();
            foreach (var item in listTicket)
            {
                item.PrintStatus = 2;
                _ticketService.Update(item);
            }
            _ticketService.Save();

            List<TicketViewModel> listTicketViewModel = (from ticket in listTicket
                                                         join company in listCompany on ticket.CompanyID equals company.ID
                                                   select new TicketViewModel
                                                   {
                                                       ID = ticket.ID,
                                                       BSX = ticket.PlateNumber1.Insert(ticket.PlateNumber1.Length-2,"."),
                                                       CompanyName = company.Name,
                                                       ExpiredDate = ticket.ExpiredDate,
                                                       TicketID = ticket.TicketID
                                                   }).ToList();
            foreach (var item in listTicketViewModel)
            {
                QRCodeGenerator qrGenerator = new QRCodeGenerator();
                QRCodeData data = qrGenerator.CreateQrCode(item.TicketID.ToString(), QRCodeGenerator.ECCLevel.Q);
                QRCode qrCode = new QRCode(data);

                System.Web.UI.WebControls.Image imgBarCode = new System.Web.UI.WebControls.Image();
                imgBarCode.Height = 50;
                imgBarCode.Width = 50;
                using (Bitmap bitMap = qrCode.GetGraphic(5))
                {
                    using (MemoryStream ms = new MemoryStream())
                    {
                        bitMap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                        byte[] byteImage = ms.ToArray();
                        imgBarCode.ImageUrl = "data:image/png;base64," + Convert.ToBase64String(byteImage);
                    }
                    item.PrintQrCode = imgBarCode.ImageUrl;
                }
            }
            if (listTicketViewModel.Count % 2 != 0)
            {
                listTicketViewModel.Add(listTicketViewModel[listTicketViewModel.Count - 1]);
            }
            //List<List<int>> dds = new List<List<int>>();
            List<PrintTicket> listPrint = new List<PrintTicket>();
            // Determine how many lists are required
            int numberOfLists = (listTicket.Count / 2);

            for (int i = 0; i < numberOfLists; i++)
            {
                PrintTicket print = new PrintTicket();
                print.listTicket = listTicketViewModel.Skip(i * 2).Take(2).ToList();
                listPrint.Add(print);
            }

            ViewData["listPrint"] = listPrint;
            return View("~/Views/Ticket/ProcessPrintTruck.cshtml");
        }
        public ActionResult PrintAction(string printViewModel)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            //List < string > = Request["listPrint"];
            var printlist = new JavaScriptSerializer().Deserialize<List<MessageViewModel>>(printViewModel);
            List<tblTicket> listTicket = new List<tblTicket>();
            foreach (var item in printlist)
            {
                tblTicket ticket = new tblTicket();
                ticket = _ticketService.GetByID(item.ID);
                ticket.PrintStatus = 1;
                _ticketService.Update(ticket);
                //listTicket.Add(ticket);
            }
            _ticketService.Save();
            ViewData["TicketList"] = listTicket;
            //listTicket = _ticketService.GetPrintQueue(2).ToList();
            message = "Đã xử lý thông tin thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetListBSXByName(string dataViewModel)
        {
            var data = new JavaScriptSerializer().Deserialize<ResultViewModel>(dataViewModel);
            //string data = Request["name"].Trim();
            var model = _ticketService.GetGetByName(data.keyword,data.type);
            return Json(new
            {
                data = model
            }, JsonRequestBehavior.AllowGet);
        }
    }
   
}
