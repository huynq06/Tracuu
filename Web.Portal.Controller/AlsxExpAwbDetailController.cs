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
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,KHOKEODAI,CUSTOMER,XEMUYQUYEN,KTN,KTX,HAIQUAN")]
    public class AlsxExpAwbDetailController : BaseController
    {
        ILabService _labService;
        ICargo_KVGSService _cargoService;
        ICARGO_INOUTService _cargoInoutService;
        ICARGO_OUTService _cargoOutService;
        IHermesInvoiceService _hermesInvoiceService;
        IVhld_vehicledetailService _vhldService;
        private DateTime? fromDate;
        private DateTime? toDate;
        public AlsxExpAwbDetailController(ILabService labService, ICargo_KVGSService cargoService,
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
            string check = "true";
            string userName = WebMatrix.WebData.WebSecurity.CurrentUserName;
            if (userName.ToLower() != "admin")
            {
                check = "false";
            }
            ViewBag.CheckUserLogin = check;
            return View();
        }
        public ActionResult List()
        {
            string warehouse = "";
            string userName = WebMatrix.WebData.WebSecurity.CurrentUserName;
            if (userName.ToLower() == "admin")
            {
                warehouse = Request["warehouse"].Trim();
            }
            else
            {
                warehouse = userName.ToUpper();
            }
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            string code = "ALL";

            string flightNo = "ALL";

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            string hawb = string.IsNullOrEmpty(Request["hawb"]) ? "ALL" : Request["hawb"].Trim();
            List<AwbExpDetailViewModel> listAwbViewModel = new List<AwbExpDetailViewModel>();

            List<Lab> ExpAWBs = _labService.GetByDate(fromDate.Value, toDate.Value.AddDays(1),hawb,warehouse).ToList();
            int count = ExpAWBs.Count();
            foreach(var lab in ExpAWBs)
            {
                AwbExpDetailViewModel awbViewModel = new AwbExpDetailViewModel();
                awbViewModel.Lab_ident = lab.LABS_IDENT_NO;
                awbViewModel.Mawb = lab.LABS_MAWB_PREFIX + lab.LABS_MAWB_SERIAL_NO;
                awbViewModel.Quantity = lab.LABS_QUANTITY_BOOKED;
                awbViewModel.Weight = lab.LABS_WEIGHT_BOOKED;
                awbViewModel.Created = lab.LABS_CREATED_AT;
                awbViewModel.Agent = lab.LABS_AGENT_NAME;
                if (lab.LABS_QUANTITY_DEL < lab.LABS_QUANTITY_BOOKED)
                    awbViewModel.Status = 0;
                else
                    awbViewModel.Status = 1;
                //tiep tuc kiem tra xem hang da roi kho hay chua
                if (new AWBDetailExportAccess().CheckDepartFlight(lab.LABS_IDENT_NO))
                    awbViewModel.Status = 2;
                listAwbViewModel.Add(awbViewModel);
            }
            ViewData["ExpAWBLists"] = listAwbViewModel;
            ViewBag.TotalRecord = listAwbViewModel.Count;
            ViewBag.PageCurrent = (page - 1) * pageSize;
            return View();
        }
    }
}
