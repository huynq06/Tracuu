using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    public class InvoiceController : BaseController
    {
        DateTime? dateCheck;
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Exp()
        {
            return View();
        }
        public ActionResult List()
        {
            ShowData("IMPORT");
            return View();

        }
        public ActionResult ExpList()
        {
            ShowData("EXPORT");
            return View();

        }
        [DocumentExport("EXCEL", "IMP_BAOCAO_THANHTOAN")]
        public ActionResult Export()
        {
            ShowData("IMPORT");
            return View();

        }
        [DocumentExport("EXCEL", "EXP_BAOCAO_THANHTOAN")]
        public ActionResult ExpExport()
        {
            ShowData("EXPORT");
            return View();

        }

        // BANG THE
        public ActionResult IndexPos()
        {
            return View();
        }
        public ActionResult ExpP()
        {
            return View();
        }
        public ActionResult ListP()
        {
            ShowDataPos("IMPORT");
            return View();

        }
        public ActionResult ExpListP()
        {
            ShowDataPos("EXPORT");
            return View();

        }
        [DocumentExport("EXCEL", "IMP_BAOCAO_THANHTOAN")]
        public ActionResult ExportP()
        {
            ShowDataPos("IMPORT");
            return View();

        }
        [DocumentExport("EXCEL", "EXP_BAOCAO_THANHTOAN")]
        public ActionResult ExpExportP()
        {
            ShowDataPos("EXPORT");
            return View();

        }

        private void ShowData(string cargo)
        {
            

            string no = string.IsNullOrEmpty(Request["no"]) ? string.Empty : Request["no"].Trim();
            string awb = string.IsNullOrEmpty(Request["awb"]) ?string.Empty : Request["awb"].Trim();
            dateCheck = string.IsNullOrEmpty(Request["date"]) ? dateCheck : Web.Portal.Utils.Format.ConvertDate(Request["date"] );
            string type = string.IsNullOrEmpty(Request["ty"]) ? "ALL" : Request["ty"].Trim();


            List<Layer.Invoice> invoiceList = new List<Layer.Invoice>();
           
            invoiceList =cargo.Equals("EXPORT")? new DataAccess.InvoiceAccess().GetAllInvoiceExp(cargo, no, awb, type, dateCheck): new DataAccess.InvoiceAccess().GetAllInvoice(cargo,no, awb, type, dateCheck);
           
            ViewData["InvoiceLists"] = invoiceList;
            ViewBag.TotalRecord = invoiceList.Count;
            ViewBag.Date = Request["date"];
            ViewBag.Type = type.Equals("ALL")?"THANH TOÁN":type;
            ViewBag.TotalNoVat = invoiceList.Sum(x => x.Amount_No_Vat).ToString("N2");
            ViewBag.TotalVat= invoiceList.Sum(x => x.Amount_Vat).ToString("N2");
            ViewBag.Total= invoiceList.Where(x => !x.Payment.Trim().Equals("BANK TFR")).Sum(x => x.Amount_Total).ToString("N2");
            ViewBag.TotalBank=invoiceList.Where(x=>x.Payment.Trim().Equals("BANK TFR")).Sum(x => x.Amount_Total).ToString("N2");
            
            //ViewBag.TotalNoOK = messageList.Count(x => x.MSGCOMPLETED.Trim().Equals("0"));
            //ViewBag.TotalOK = messageList.Count(x => x.MSGCOMPLETED.Trim().Equals("1"));



        }

        private void ShowDataPos(string cargo)
        {


            string no = string.IsNullOrEmpty(Request["no"]) ? string.Empty : Request["no"].Trim();
            string awb = string.IsNullOrEmpty(Request["awb"]) ? string.Empty : Request["awb"].Trim();
            dateCheck = string.IsNullOrEmpty(Request["date"]) ? dateCheck : Web.Portal.Utils.Format.ConvertDate(Request["date"]);
            string type = string.IsNullOrEmpty(Request["ty"]) ? "ALL" : Request["ty"].Trim();


            List<Layer.Invoice> invoiceList = new List<Layer.Invoice>();

            invoiceList =cargo.Equals("EXPORT")? new DataAccess.InvoiceAccess().GetAllInvoicePosExp(cargo, no, awb, type, dateCheck): new DataAccess.InvoiceAccess().GetAllInvoicePos(cargo, no, awb, type, dateCheck);

            ViewData["InvoiceLists"] = invoiceList;
            ViewBag.TotalRecord = invoiceList.Count;
            ViewBag.Date = Request["date"];
            ViewBag.Type = type.Equals("ALL") ? "THANH TOÁN" : type;
            ViewBag.TotalNoVat = invoiceList.Sum(x => x.Amount_No_Vat).ToString("N2");
            ViewBag.TotalVat = invoiceList.Sum(x => x.Amount_Vat).ToString("N2");
            ViewBag.Total = invoiceList.Where(x => !x.Payment.Trim().Equals("BANK TFR")).Sum(x => x.Amount_Total).ToString("N2");
            ViewBag.TotalBank = invoiceList.Where(x => x.Payment.Trim().Equals("BANK TFR")).Sum(x => x.Amount_Total).ToString("N2");

            //ViewBag.TotalNoOK = messageList.Count(x => x.MSGCOMPLETED.Trim().Equals("0"));
            //ViewBag.TotalOK = messageList.Count(x => x.MSGCOMPLETED.Trim().Equals("1"));



        }
    }
}
