using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Web.Portal.DataAccess;
using Web.Portal.Layer;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using System.Xml.Linq;

namespace Web.Portal.Controller
{
    public class AccountantReportController : BaseController
    {
        IALSC_H5_ERP_ZINT_CHECKService _zintService;
        string sql = "";
        string[] find;
        string[] column;
        string des = "";
        public AccountantReportController(IALSC_H5_ERP_ZINT_CHECKService zintService)
        {
            this._zintService = zintService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ReportERP()
        {
            return View();
        }
        public ActionResult ReportListERP()
        {
            string tt = string.IsNullOrEmpty(Request["tt"]) ? "(0,1)" : Request["tt"];
            string invoice = Request["invoice"] == "ALL" ? "('CASH','DEBIT NOTE','CREDITNOTE')" : Request["invoice"];
            string object_type = Request["object"] == "ALL" ? "('IMPORT AWB','EXPORT AWB')" : Request["object"];
            string fda = Web.Portal.Utils.Format.ConvertDate(Request["fda"]).Value.ToString("dd/MM/yyyy");
            string tda = Web.Portal.Utils.Format.ConvertDate(Request["tda"]).Value.ToString("dd/MM/yyyy");
            List<ErpChecking> listErp = new ERPCheckAccess().CheckDataErp(fda, tda, object_type, invoice, tt);
            ViewData["ErpList"] = listErp;
            ViewBag.Total = listErp.Count;
            return View();
        }
        public ActionResult MarkToAsyn()
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            string invoiceIsn = Request["invoiceIsn"].Trim();
            string date = Request["invoice-date"];
            DateTime invoice_date = Convert.ToDateTime(date);
            string invoice_type = Request["invoice-type"].Trim();
            ALSC_H5_ERP_ZINT_CHECK zint = new ALSC_H5_ERP_ZINT_CHECK();
            try
            {
                zint.INVOICE_ISN = invoiceIsn;
                zint.SALE_ORG = "1300";
                zint.EXISTED = -1;
                if(invoice_type =="CASH")
                {
                    zint.INVOICE_TYPE = "1";
                    zint.ZO_HEADER_ID = invoiceIsn;
                    zint.TYPE = invoice_type;
                    zint.DOC_DATE = invoice_date.ToString("yyyy-MM-dd");
                    
                }
                else if(invoice_type=="DEBIT NOTE")
                {
                    zint.INVOICE_TYPE = "2";
                    zint.ZO_HEADER_ID = invoiceIsn;
                    zint.TYPE = invoice_type;
                    zint.DOC_DATE = invoice_date.ToString("yyyy-MM-dd");
                }
                else
                {
                    zint.INVOICE_TYPE = "3";
                    zint.ZO_BILL_ID = invoiceIsn;
                    zint.TYPE = invoice_type;
                    zint.BILLING_DATE = invoice_date.ToString("yyyy-MM-dd");
                }
                _zintService.Add(zint);
                _zintService.Save();
                message = "Mark To Sync Success!";
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                messageType = Utils.DisplayMessage.TypeError;
                message = ex.ToString();
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
          

        }
        public ActionResult Recheck()
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            string invoiceIsn = Request["invoiceIsn"].Trim();
            var zintTest = _zintService.GetByID(invoiceIsn);
            string date = Request["invoice-date"];
            DateTime invoice_date = Convert.ToDateTime(date);
            string invoice_type = Request["invoice-type"].Trim();
            string type = "";
            if(invoice_type == "CASH")
            {
                type = "1";
            }
            else if(invoice_type =="DEBIT NOTE")
            {
                type = "2";
            }
            else
            {
                type = "3";
            }
            try
            {
                string url = Server.MapPath("/SitaTemplate/tem.xml");
                Task<string> task = Task.Run<String>(async () => await Utils.ErpRequest.Command(invoiceIsn, type, url));
                string result = task.Result;
                if(result.Contains("ZO_HEADER_ID"))
                {
                   // XElement xml = XElement.Parse(result);
                    XDocument doc = XDocument.Parse(result);
                    string doc_date  = doc.Descendants("DOC_DATE").FirstOrDefault().Value;
                    string billing_date = doc.Descendants("BILL_DATE").FirstOrDefault().Value;
                    string header_id = doc.Descendants("ZO_HEADER_ID").FirstOrDefault().Value;
                    string billing_id = doc.Descendants("ZO_BILL_ID").FirstOrDefault().Value;
                    message = "Đã cập nhật lại dữ liệu T-ID trên hệ thống ERP";
                    //cap nhat lai bang Zint check
                    ALSC_H5_ERP_ZINT_CHECK zint = _zintService.GetByID(invoiceIsn);
                    zint.EXISTED = 1;
                    zint.BILLING_DATE = billing_date;
                    zint.DOC_DATE = doc_date;
                    zint.ZO_HEADER_ID = header_id;
                    zint.ZO_BILL_ID = billing_id;
                    _zintService.Update(zint);
                    _zintService.Save();
                    return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    message = "Chưa tồn tại T-ID trên hệ thống ERP";
                    return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                }
              
              
            }
            catch (Exception ex)
            {

                messageType = Utils.DisplayMessage.TypeError;
                message = ex.ToString();
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Report()
        {
            string id = Request["id"];
            string des = Request["des"];
            string paging = Request["paging"];
            string fromDate = Request["fromDate"];
            string toDate = Request["toDate"];
            string flightNumber = Request["flightNumber"];
            string shc = Request["shc"];
            string mawb = Request["mawb"];
            ViewBag.Des = des;
            ViewBag.ID = id;
            ViewBag.Paging = paging;
            ViewBag.FromDate = fromDate;
            ViewBag.ToDate = toDate;
            ViewBag.FlightNumber = flightNumber;
            ViewBag.SHC = shc;
            ViewBag.Mawb = mawb;
            return View("~/Views/AccountantReport/DailyExport.cshtml");
        }

        public ActionResult ReportList()
        {
            string id = Request["id"];
            bool paging = Boolean.Parse(Request["paging"]);
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLKT.xml"), id, ref sql, ref find, ref column, ref des);
            string[] prRequest = new string[find.Length];
            for (int i = 0; i < find.Length; i++)
            {
                prRequest[i] = string.IsNullOrEmpty(Request[find[i]]) ? string.Empty : Request[find[i]].Trim();
            }
            string sqlComplete = string.Format(sql, prRequest);
            System.Data.DataTable table = reportAccess.GetData(sqlComplete).Tables[0];
            if (paging)
            {
                string total = table.Rows[2][1].ToString();
                ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingexpawb", int.Parse(total), int.Parse(prRequest[find.Length - 2]), int.Parse(prRequest[find.Length - 1]));
            }
            ViewData["DataList"] = table;
            ViewData["Column"] = column;
            ViewBag.TotalRecord = table.Rows.Count;
            if(id == "IMP_KT01")
            {
                return View("~/Views/AccountantReport/ReportListImp.cshtml");
            }
            else if (id == "HERMES01_1")
            {
                return View("~/Views/AccountantReport/ReportListERP.cshtml");
            }
            else
            {
                return View();
            }
          
        }
        [DocumentExport("EXCEL", "KT_")]
        public ActionResult Export()
        {
            string id = Request["id"];
            string fileTem = Request["fn"].Trim();
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLKT.xml"), id, ref sql, ref find, ref column, ref des);
            string[] prRequest = new string[find.Length];
            for (int i = 0; i < find.Length; i++)
            {
                if (i == 3)
                    prRequest[i] = Int32.MaxValue.ToString();
                else
                    prRequest[i] = string.IsNullOrEmpty(Request[find[i]]) ? string.Empty : Request[find[i]].Trim();
            }
            string sqlComplete = string.Format(sql, prRequest);
            System.Data.DataTable table = reportAccess.GetData(sqlComplete).Tables[0];

            ViewData["DataList"] = table;
            ViewData["Column"] = column;
            ViewBag.Des = des;
            ViewBag.TotalRecord = table.Rows.Count;
            if (id == "IMP_KT01")
            {
                return View("~/Views/AccountantReport/ExpReportImp.cshtml");
            }
            else if(id== "HERMES01_1")
            {
                return View("~/Views/AccountantReport/ExpReportERP.cshtml");
            }
            else
            {
                return View("~/Views/AccountantReport/ExpReport.cshtml");
            }
           
        }
        public ActionResult ReportListClass()
        {
            string id = Request["id"];
            bool paging = Boolean.Parse(Request["paging"]);
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLKT.xml"), id, ref sql, ref find, ref column, ref des);
            string[] prRequest = new string[find.Length];
            for (int i = 0; i < find.Length; i++)
            {
                prRequest[i] = string.IsNullOrEmpty(Request[find[i]]) ? string.Empty : Request[find[i]].Trim();
            }
            string sqlComplete = string.Format(sql, prRequest);
            System.Data.DataTable table = reportAccess.GetData(sqlComplete).Tables[0];
            if (paging)
            {
                string total = table.Rows[2][1].ToString();
                ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingexpawb", int.Parse(total), int.Parse(prRequest[find.Length - 2]), int.Parse(prRequest[find.Length - 1]));
            }
            ViewData["DataList"] = table;
            ViewData["Column"] = column;
            ViewBag.TotalRecord = table.Rows.Count;
            return View();
        }
        [DocumentExport("EXCEL", "KT_")]
        public ActionResult ExportClass()
        {
            string id = Request["id"];
            string fileTem = Request["fn"].Trim();
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLKT.xml"), id, ref sql, ref find, ref column, ref des);
            string[] prRequest = new string[find.Length];
            for (int i = 0; i < find.Length; i++)
            {
                if (i == 3)
                    prRequest[i] = Int32.MaxValue.ToString();
                else
                    prRequest[i] = string.IsNullOrEmpty(Request[find[i]]) ? string.Empty : Request[find[i]].Trim();
            }
            System.Data.DataTable table = reportAccess.GetData(string.Format(sql, prRequest)).Tables[0];

            ViewData["DataList"] = table;
            ViewData["Column"] = column;
            ViewBag.Des = des;
            ViewBag.TotalRecord = table.Rows.Count;
            return View("~/Views/AccountantReport/ExpReportClass.cshtml");
        }
        public ActionResult ReportClass()
        {
            string id = Request["id"];
            string des = Request["des"];
            string paging = Request["paging"];
            string fromDate = Request["fromDate"];
            string toDate = Request["toDate"];
            string flightNumber = Request["flightNumber"];
            string shc = Request["shc"];
            string mawb = Request["mawb"];
            ViewBag.Des = des;
            ViewBag.ID = id;
            ViewBag.Paging = paging;
            ViewBag.FromDate = fromDate;
            ViewBag.ToDate = toDate;
            ViewBag.FlightNumber = flightNumber;
            ViewBag.SHC = shc;
            ViewBag.Mawb = mawb;
            return View("~/Views/AccountantReport/DailyExportClass.cshtml");
        }
    }
}
