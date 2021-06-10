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
  
    public class AwbExportDetailController : BaseController
    {
        ILabService _labService;
        ICargo_KVGSService _cargoService;
        ICARGO_INOUTService _cargoInoutService;
        ICARGO_OUTService _cargoOutService;
        IHermesInvoiceService _hermesInvoiceService;
        IVhld_vehicledetailService _vhldService;
        public AwbExportDetailController(ILabService labService, ICargo_KVGSService cargoService,
           ICARGO_INOUTService cargoInoutService, ICARGO_OUTService cargoOutService,
           IHermesInvoiceService hermesInvoiceService, IVhld_vehicledetailService vhldService)
        {
            this._labService = labService;
            this._cargoService = cargoService;
            this._cargoInoutService = cargoInoutService;
            this._cargoOutService = cargoOutService;
            this._vhldService = vhldService;
            this._hermesInvoiceService = hermesInvoiceService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            string awb = string.IsNullOrEmpty(Request["awb"]) ? "ALL" : Request["awb"].Replace("-", "").Trim();
            string sdd = string.IsNullOrEmpty(Request["sdd"]) ? string.Empty : Request["sdd"].Trim();
            string vct = string.IsNullOrEmpty(Request["vct"]) ? string.Empty : Request["vct"].Trim();
            string stk = string.IsNullOrEmpty(Request["stk"]) ? string.Empty : Request["stk"].Trim();
            if (!string.IsNullOrEmpty(sdd))
            {
                List<Cargo_KVGS> listKvgs = _cargoService.GetListCargo_KVGSBySDD(sdd).ToList();
                if (listKvgs.Count > 0)
                {
                    awb = listKvgs[0].EQ_MASTERBILLOFLADING;
                }

            }
            if (!string.IsNullOrEmpty(stk))
            {
                List<Cargo_KVGS> listKvgs = _cargoService.GetListCargo_KVGSBySDD(stk).ToList();
                if (listKvgs.Count > 0)
                {
                    awb = listKvgs[0].EQ_MASTERBILLOFLADING;
                }
            }
            if (!string.IsNullOrEmpty(vct))
            {
                Vhld_vehicledetail vhld = _vhldService.GetByVCTNumber(vct);
                awb = vhld.VHLD_AWBPREFIX + vhld.VHLD_AWBSERIAL;
            }

            Lab lab = _labService.GetByMawb(awb);
            AwbExpDetailViewModel awbViewModel = new AwbExpDetailViewModel();
            awbViewModel.Lab_ident = lab.LABS_IDENT_NO;
            awbViewModel.Mawb = lab.LABS_MAWB_PREFIX  + lab.LABS_MAWB_SERIAL_NO;
            awbViewModel.Quantity = lab.LABS_QUANTITY_BOOKED;
            awbViewModel.Weight = lab.LABS_WEIGHT_MANIF;

            if (lab.LABS_QUANTITY_DEL < lab.LABS_QUANTITY_BOOKED)
                awbViewModel.Status = 0;
            else
                awbViewModel.Status = 1;
            //tiep tuc kiem tra xem hang da roi kho hay chua
            if (new AWBDetailExportAccess().CheckDepartFlight(lab.LABS_IDENT_NO))
                awbViewModel.Status = 2;
            return View(awbViewModel);
        }
        public ActionResult MawbDetail()
        {
            string lab_ident = Request["lab_ident"].Trim();
         
            Lab lab = _labService.GetByLabIdentity(lab_ident);
            ViewBag.Mawb = Request["mawb"].Trim();
            ViewBag.Status = Request["status"].Trim();
            Session["Mawb"] = Request["mawb"].Trim();
            ViewBag.LabID = lab_ident;
            return View(lab);
        }
        public ActionResult FlightDetail()
        {
            string invoiceIsn = Request["lab_ident"].Trim();

            List<HawbInFlightViewModel> listFight = new HawbInFlightAccess().GetListMawbInFlight(invoiceIsn).ToList();
            ViewData["listFlight"] = listFight;
            return View();
        }
        public ActionResult VCTDetail()
        {
            string lab_ident = Request["lab_ident"].Trim();
            VCTViewModel vct = new VCTAccess().GetVCTExportDetail(lab_ident);
            return View(vct);
        }
        public ActionResult Invoice()
        {
            string lab_ident = Request["lab_ident"].Trim();

            Lab lab = _labService.GetByLabIdentity(lab_ident);
            bool check = new InvoiceAccess().CheckInvoiceType(int.Parse(lab_ident));
            // DateTime dt = _cargoInoutService.GetBySdd("2020" + (lagi.LAGI_MAWB_PREFIX + lagi.LAGI_MAWB_NO)+ lagi.LAGI_HAWB).CREATED;
            //  ViewBag.GetIn = dt;
            //List<Web.Portal.Layer.Invoice> invoices = new DataAccess.InvoiceAccess().GetInvoiceByAwb((lagi.LAGI_MAWB_PREFIX + lagi.LAGI_MAWB_NO), lagi.LAGI_HAWB);
            //ViewData["InvoiceLists"] = invoices;
            //List<InvoiceDetailAwbViewModel> listInvoiceDetail = new DataAccess.InvoiceLineAccess().GetAllInvoice(invoices);
            //ViewData["InvoiceDetails"] = listInvoiceDetail;
            TempData["Lab"] = lab;
            if (!check)
                return RedirectToAction("EInvoice", new { lagi = lab });

            else
            {
                return RedirectToAction("Debit");
            }
        }
        public ActionResult Debit()
        {
            Lab lab = (Lab)TempData["Lab"];
            //DateTime dt = _cargoInoutService.GetBySdd("2020" + (lagi.LAGI_MAWB_PREFIX + lagi.LAGI_MAWB_NO) + lagi.LAGI_HAWB).CREATED;
            //ViewBag.GetIn = dt;
            List<Web.Portal.Layer.Invoice> invoices = new DataAccess.InvoiceAccess().GetInvoiceExportByAwb((lab.LABS_MAWB_PREFIX + lab.LABS_MAWB_SERIAL_NO));
            ViewData["InvoiceLists"] = invoices;
            List<InvoiceDetailAwbViewModel> listInvoiceDetail = new DataAccess.InvoiceLineAccess().GetAllInvoice(invoices);
            ViewData["InvoiceDetails"] = listInvoiceDetail;
            return View();
        }
        public ActionResult EInvoice(string lagi)
        {
            string mawb = Session["Mawb"].ToString();
            List<HermesInvoice> listInvoice = _hermesInvoiceService.GetByMawb(mawb);
            ViewData["listInvoice"] = listInvoice;
            return View();
        }
        public ActionResult CustomDetail()
        {
            string mawb = Session["Mawb"].ToString();
            string hawb = "ALL";
            CustomDetailViewModel custom = new Common.ApiViewModel.CustomDetailViewModel();
            custom.GetIn = new CustomAccess().GetInCheck(mawb, hawb);
            custom.GetOut = new CustomAccess().GetOutCheck(mawb, hawb);
          //  custom.Dkxd = new CustomAccess().DKXDCheck(mawb, hawb);
            custom.Kvgs = new CustomAccess().KVGSCheck(mawb, hawb);
            return View(custom);
        }
    }
}
