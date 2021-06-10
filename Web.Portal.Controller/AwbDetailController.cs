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

namespace Web.Portal.Controller
{
  
    public class AwbDetailController : BaseController
    {
        ILagiService _lagiService;
        ICargo_KVGSService _cargoService;
        ICARGO_INOUTService _cargoInoutService;
        ICARGO_OUTService _cargoOutService;
        IHermesInvoiceService _hermesInvoiceService;
        IVhld_vehicledetailService _vhldService;
        IIMP_AWBServiceService _impService;
        public AwbDetailController(ILagiService lagiService, ICargo_KVGSService cargoService,
           ICARGO_INOUTService cargoInoutService, ICARGO_OUTService cargoOutService,
           IHermesInvoiceService hermesInvoiceService, IVhld_vehicledetailService vhldService, IIMP_AWBServiceService impService)
        {
            this._lagiService = lagiService;
            this._cargoService = cargoService;
            this._cargoInoutService = cargoInoutService;
            this._cargoOutService = cargoOutService;
            this._vhldService = vhldService;
            this._hermesInvoiceService = hermesInvoiceService;
            this._impService = impService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult HawbDetail()
        {
            string lagi_ident = Request["lagi_ident"].Trim();
            bool check = false;
            if (Request["lagi_master_ident"].Trim() == "0")
                check = true;
            string lagi_master_ident = check ? lagi_ident : Request["lagi_master_ident"].Trim();
            Lagi lagi = _lagiService.GetByLagiIdentity(lagi_ident);
            Lagi lagiMaster = new Lagi();
            if (check)
                lagiMaster = lagi;
            else
                lagiMaster = _lagiService.GetByLagiIdentity(lagi_master_ident);
            ViewBag.Status = Request["status"].Trim();
            ViewBag.Alsx = Request["alsx"].Trim();
            ViewBag.Pieces = lagi.LAGI_QUANTITY_EXPECTED;
            ViewBag.WEIGHT = lagi.LAGI_WEIGHT_EXPECTED;
            ViewBag.Shipper = lagiMaster.LAGI_SHIPPER_NAME;
            ViewBag.ShipperAdd = lagiMaster.LAGI_SHIPPER_ADDRESS;
            ViewBag.WareHouse = "";
            ViewBag.Create = "";
            ViewBag.CheckTransfer = "";
            if (lagi.LAGI_TSO == "ALSW" || lagi.LAGI_TSO == "ALSE" || lagi.LAGI_TSO == "ALSB" || lagi.LAGI_TSO == "CLC" || lagi.LAGI_TSO == "ALST")
            {
                ViewBag.CheckTransfer = "true";
                ViewBag.WareHouse = lagi.LAGI_TSO;
                DateTime? dt = new AwbDetailAccess().GetTimeTransferLagi(lagi_ident);
                ViewBag.Create = (dt != DateTime.MinValue)? dt.Value.ToString("dd/MM/yy HH:mm") : "";
                //check thoi diem chuyen kho
            }
            ViewBag.LagiID = lagi_ident;
            ViewBag.Mawb = Request["mawb"].Trim();
            ViewBag.Hawb = Request["hawb"].Trim();
            Session["Mawb"] = Request["mawb"].Trim();
            Session["Hawb"] = Request["hawb"].Trim();
            return View(lagi);
        }
        public ActionResult List()
        {
            string awb = string.IsNullOrEmpty(Request["awb"]) ? "ALL" : Request["awb"].Replace("-", "").Trim();
            string hawb = string.IsNullOrEmpty(Request["hawb"]) ? "ALL" : Request["hawb"].Trim();
            string vct = string.IsNullOrEmpty(Request["vct"]) ? string.Empty : Request["vct"].Trim();
            string pxk = string.IsNullOrEmpty(Request["pxk"]) ? string.Empty : Request["pxk"].Trim();
            string sdd = string.IsNullOrEmpty(Request["sdd"]) ? string.Empty : Request["sdd"].Trim();
            string stk = string.IsNullOrEmpty(Request["stk"]) ? string.Empty : Request["stk"].Trim();
            if (!string.IsNullOrEmpty(vct))
            {
                Vhld_vehicledetail vhld = _vhldService.GetByVCTNumber(vct);
                awb = vhld.VHLD_AWBPREFIX + vhld.VHLD_AWBSERIAL;
            }
         

            if (!string.IsNullOrEmpty(pxk))
            {
                string result = new VCTAccess().GetAwbByPXK(pxk.Trim());
                string[] dataResult = result.Split(';');
                awb = dataResult[2];
                hawb = dataResult[3];
            }
            if (!string.IsNullOrEmpty(sdd))
            {
                List<Cargo_KVGS> listKvgs = _cargoService.GetListCargo_KVGSBySDD(sdd).ToList();
                if(listKvgs.Count >0)
                {
                    awb = listKvgs[0].EQ_MASTERBILLOFLADING;
                    hawb = listKvgs[0].EQ_HOUSEBILLOFLADING;
                }
               
            }
            if (!string.IsNullOrEmpty(stk))
            {
                List<Cargo_KVGS> listKvgs = _cargoService.GetListCargo_KVGSBySDD(stk).ToList();
                if (listKvgs.Count > 0)
                {
                    awb = listKvgs[0].EQ_MASTERBILLOFLADING;
                    hawb = listKvgs[0].EQ_HOUSEBILLOFLADING;
                }
            }
            List<AwbDetailViewModel> listAwb = new List<AwbDetailViewModel>();
            ViewBag.CheckMaster = false;
            ViewBag.ChechHawb = true;
            //if(string.IsNullOrEmpty(sdd))
            // //  List<Lagi> listLagi = _lagiService.GetByMawb(awb,);
            if (awb != "ALL")
            {
                listAwb = new AwbDetailAccess().GetAwbDetail(awb, "ALL");
                if(listAwb.Count ==0)
                {
                    ViewBag.Total = listAwb.Count;

                    ViewData["listAwb"] = listAwb;
                    return View();
                }
                else
                {
                    foreach (var item in listAwb)
                    {
                        if (listAwb.Count == 1)
                        {
                            item.ChecHawb = true;
                        }
                        else
                        {
                            if (item.Lagi_Master_Identity != "0")
                            {
                                item.ChecHawb = true;
                            }
                            else
                            {
                                item.ChecHawb = false;
                            }
                        }
                        if (item.Pieces_Received == 0)
                        {
                            item.Status = 0;
                        }
                        else if (item.Pieces_Received < item.Pieces_Expected)
                        {
                            item.Status = 1;
                        }
                        else if (item.Pieces_Received == item.Pieces_Expected && item.Pieces_Delivered < item.Pieces_Expected)
                        {
                            item.Status = 2;
                        }
                        else
                        {
                            item.Status = 3;
                        }
                    }
              

                }
                AwbDetailViewModel adv = listAwb.Single(c => string.IsNullOrEmpty(c.Hawb.Trim()));
                Session["Consignee"] = adv.Consignee;
                Session["ConsigneeAdd"] = adv.ConsigneeAdd;
                //foreach (var item in listLagi)
                //{
                //    AwbDetailViewModel awbViewModel = new AwbDetailViewModel();
                //    awbViewModel = new AwbDetailAccess().GetAwbDetailByLagiIdentity(item.LAGI_IDENT_NO);
                //    listAwb.Add(awbViewModel);
                //}
                if (listAwb.Count > 1)
                {
                    ViewBag.CheckMaster = true;
                }
                else
                {
                    ViewBag.CheckMaster = false;
                }
                if (hawb != "ALL")
                {
                    listAwb = listAwb.Where(c => c.Hawb == hawb).ToList();
                }
             
            }
            ViewBag.Total = listAwb.Count;

            ViewData["listAwb"] = listAwb;
            return View();
        }
        public ActionResult FlightDetail()
        {
            string invoiceIsn = Request["lagi_ident"].Trim();
            string alsx= Request["alsx"].Trim();
            List<HawbInFlightViewModel> listFight = new List<HawbInFlightViewModel>();
            if (alsx == "1")
            {
                IMP_AWB flightImp = _impService.GetByID(decimal.Parse(invoiceIsn));
                
                    HawbInFlightViewModel flight = new HawbInFlightViewModel();
                    flight.ScheduleDate = flightImp.SCHEDULE_DATE;
                    flight.ScheduleTime = flightImp.SCHEDULE_TIME;
                flight.ATADate = flightImp.LANDED_DATE;
                flight.ATATime = flightImp.LANDED_TIME;
                flight.EstimateDate = flightImp.EXPECTED_DATE;
                flight.EstimateTime = flightImp.EXPECTED_TIME;
                flight.ULD = "";
                    flight.WeightsReceive = (double)flightImp.EXPECTED_WEIGHT;
                flight.PiecesReceive = flightImp.EXPECTED_PIECES.Value;
                flight.GoodName = flightImp.NATURE;
                    listFight.Add(flight);
                
            }
            else
            {
                 listFight = new HawbInFlightAccess().GetListHawbInFlight(invoiceIsn).ToList();
            }
           
            ViewData["listFlight"] = listFight;
            return View();
        }
        public ActionResult LocationDetail()
        {
            string invoiceIsn = Request["lagi_ident"].Trim();
            List<LocationDetailViewModel> listLocation = new LocationDetailAccess().GetListLocation(invoiceIsn).ToList();
            ViewData["listLocation"] = listLocation;
            return View();
        }
        public ActionResult Invoice()
        {
            string lagi_ident = Request["lagi_ident"].Trim();
           
            Lagi lagi = _lagiService.GetByLagiIdentity(lagi_ident);
            bool check = new InvoiceAccess().CheckInvoiceType(int.Parse(lagi_ident));
            // DateTime dt = _cargoInoutService.GetBySdd("2020" + (lagi.LAGI_MAWB_PREFIX + lagi.LAGI_MAWB_NO)+ lagi.LAGI_HAWB).CREATED;
            //  ViewBag.GetIn = dt;
            //List<Web.Portal.Layer.Invoice> invoices = new DataAccess.InvoiceAccess().GetInvoiceByAwb((lagi.LAGI_MAWB_PREFIX + lagi.LAGI_MAWB_NO), lagi.LAGI_HAWB);
            //ViewData["InvoiceLists"] = invoices;
            //List<InvoiceDetailAwbViewModel> listInvoiceDetail = new DataAccess.InvoiceLineAccess().GetAllInvoice(invoices);
            //ViewData["InvoiceDetails"] = listInvoiceDetail;
            TempData["Lagi"] = lagi;
            if (!check)
                return RedirectToAction("EInvoice", new { lagi = lagi });
          
            else
            {
                return RedirectToAction("Debit");
            }
        }
        public ActionResult Debit()
        {
            Lagi lagi = (Lagi)TempData["Lagi"];
            //DateTime dt = _cargoInoutService.GetBySdd("2020" + (lagi.LAGI_MAWB_PREFIX + lagi.LAGI_MAWB_NO) + lagi.LAGI_HAWB).CREATED;
            //ViewBag.GetIn = dt;
            List<Web.Portal.Layer.Invoice> invoices = new DataAccess.InvoiceAccess().GetInvoiceByAwb((lagi.LAGI_MAWB_PREFIX + lagi.LAGI_MAWB_NO), lagi.LAGI_HAWB);
            ViewData["InvoiceLists"] = invoices;
            List<InvoiceDetailAwbViewModel> listInvoiceDetail = new DataAccess.InvoiceLineAccess().GetAllInvoice(invoices);
            ViewData["InvoiceDetails"] = listInvoiceDetail;
            return View();
        }
        public ActionResult CustomFormDetail()
        {
            string invoiceIsn = Request["lagi_ident"].Trim();
            ViewBag.ConsigneeName = Session["Consignee"];
            ViewBag.ConsigneeAdd = TempData["ConsigneeAdd"];
            List<CustomFormViewModel> listCustomForm = new CustomFormAccess().GetCustomFormDetail(invoiceIsn).ToList();
            ViewData["listPXK"] = listCustomForm;
            return View();
        }
        public ActionResult CustomDetail()
        {
            string mawb = Session["Mawb"].ToString();
            string hawb = Session["Hawb"].ToString() == "" ? "ALL" : Session["Hawb"].ToString();
            if(string.IsNullOrEmpty(mawb))
            {
                mawb = Request["awb"].Replace("-", "").Trim();
                hawb =Request["hawb"].Trim();
            }
            CustomDetailViewModel custom = new Common.ApiViewModel.CustomDetailViewModel();
            custom.GetIn = new CustomAccess().GetInCheck(mawb,hawb);
            custom.GetOut = new CustomAccess().GetOutCheck(mawb, hawb);
            custom.Dkxd = new CustomAccess().DKXDCheck(mawb, hawb);
            custom.Kvgs = new CustomAccess().KVGSCheck(mawb, hawb);
            return View(custom);
        }
        public ActionResult MessageDetail()
        {
            string invoiceIsn = Request["lagi_ident"].Trim();
            List<FFMViewModel> listFFM = new MessageAccess().GetFFMDetail(invoiceIsn);
            List<FSUViewModel> listFSU = new MessageAccess().GetFSUDetail(invoiceIsn);
            List<FHLViewModel> listFHL = new MessageAccess().GetFHLDetail(invoiceIsn);
            List<FWBViewModel> listFWB = new MessageAccess().GetFWBDetail(invoiceIsn);
            List<NOAViewModel> listNOA = new MessageAccess().GetNOADetail(invoiceIsn);
            ViewData["listFSU"] = listFSU;
            ViewData["listFFM"] = listFFM;
            ViewData["listFHL"] = listFHL;
            ViewData["listFWB"] = listFWB;
            ViewData["listNOA"] = listNOA;
            return View();
        }
        public ActionResult VCTDetail()
        {
            string lagi_ident = Request["lagi_ident"].Trim();
            VCTViewModel vct = new VCTAccess().GetVCTDetail(lagi_ident);
            return View(vct);
        }
        public ActionResult DlvDetail()
        {
            string lagi_ident = Request["lagi_ident"].Trim();
            List<DeliveryViewModel> listDlv = new DeliveryAccess().GetDeliveryDetail(lagi_ident).ToList();
            ViewData["listDlv"] = listDlv;
            return View();
        }
        public ActionResult OpenDoc()
        {
            string link = Request["link"].Trim();
            string lagi_ident = Request["invoiceins"].Trim();
            string fileName = Guid.NewGuid().ToString() + ".RCV";

            string filePath = Server.MapPath("~/invoiceHermes/") + fileName;
            FileInfo fileInfo = new FileInfo(filePath);
            if (!fileInfo.Exists)
            {
                System.IO.File.Copy(link, Server.MapPath("~/invoiceHermes/") + fileName);
            }
            if (!System.IO.File.Exists(filePath))
            {
                return HttpNotFound();
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var response = new FileContentResult(fileBytes, "application/octet-stream")
            {
                FileDownloadName = "invoiceH5.RCV"
            };
            return response;

            //return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult MessageContent()
        {
            string link = Request["link"].Trim();
            string contents = System.IO.File.ReadAllText(link);
            ViewBag.Content = contents;
            return View();
        }
        public ActionResult EInvoice(string lagi)
        {
            string mawb = Session["Mawb"].ToString();
            string hawb = Session["Hawb"].ToString();
            List<HermesInvoice> listInvoice = _hermesInvoiceService.GetByMawbHawb(mawb, hawb);
            ViewData["listInvoice"] = listInvoice;
            return View();
        }

    }
}
