using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;

namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,REPORT")]
    public class HandlingReportController : BaseController
    {
        string sql = "";
        string[] find;
        string[] column;
        string des = "";
        public ActionResult Index()
        {
            return View();
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
            if(id== "EXP_HANDLING05")
            {
                return View("~/Views/HandlingReport/DailyExportSkidCarton.cshtml");
            }
            return View("~/Views/HandlingReport/DailyExport.cshtml");
        }
        public ActionResult ReportList()
        {
            string id = Request["id"];
            bool paging = Boolean.Parse(Request["paging"]);
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLHANDLING.xml"), id, ref sql, ref find, ref column,ref des);
            string[] prRequest = new string[find.Length];
            for (int i = 0; i < find.Length; i++)
            {
                prRequest[i] = string.IsNullOrEmpty(Request[find[i]]) ? "ALL"    : Request[find[i]].Trim();
            }
            string sqlComplete = string.Format(sql, prRequest);
            System.Data.DataTable table = reportAccess.GetData(sqlComplete).Tables[0];
            List<HandlingReportViewModel> listHandlingReports = new List<HandlingReportViewModel>();
            if(id== "EXP_HANDLING04")
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    HandlingReportViewModel handlingReport = new HandlingReportViewModel();
                    handlingReport.AWB = table.Rows[i][2].ToString() + table.Rows[i][3].ToString();
                    handlingReport.Date = table.Rows[i][1].ToString();
                    handlingReport.Pieces = int.Parse(table.Rows[i][6].ToString());

                    handlingReport.Weight = double.Parse(table.Rows[i][5].ToString());
                    handlingReport.ChargeableWeigt = double.Parse(table.Rows[i][4].ToString());
                    handlingReport.ChargeableReal = double.Parse(table.Rows[i][7].ToString());
                    listHandlingReports.Add(handlingReport);
                }
                ViewData["listHandling"] = listHandlingReports;
                ViewBag.TotalRecord = table.Rows.Count;
                return View("~/Views/HandlingReport/ListEXP_HANDLING04.cshtml");
            }
            else if (id == "IMP_HANDLING04")
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    HandlingReportViewModel handlingReport = new HandlingReportViewModel();
                    handlingReport.AWB = table.Rows[i][1].ToString() + table.Rows[i][2].ToString();
                    handlingReport.Date = table.Rows[i][0].ToString();
                    handlingReport.Hawb = table.Rows[i][3].ToString();
                    handlingReport.Weight = double.Parse(table.Rows[i][6].ToString());
                    handlingReport.ChargeableWeigt = double.Parse(table.Rows[i][8].ToString());
                    handlingReport.Pieces = int.Parse(table.Rows[i][7].ToString());
                    handlingReport.ChargeableReal = double.Parse(table.Rows[i][9].ToString());
                    listHandlingReports.Add(handlingReport);
                }
                ViewBag.Des = des;
                ViewData["listHandling"] = listHandlingReports;
                ViewBag.TotalRecord = table.Rows.Count;
                return View("~/Views/HandlingReport/ListIMP_HANDLING04.cshtml");
            }
            else if(id== "IMP_HANDLING01" || id== "IMP_HANDLING02" || id== "IMP_HANDLING03" || id== "EXP_HANDLING02")
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    HandlingReportViewModel handlingReport = new HandlingReportViewModel();
                    handlingReport.AWB = table.Rows[i][3].ToString() + table.Rows[i][4].ToString();
                    handlingReport.DateCreate = Convert.ToDateTime(table.Rows[i][2].ToString());

                    handlingReport.Group = table.Rows[i][5].ToString();
                    handlingReport.Pieces = int.Parse(table.Rows[i][8].ToString());
                    handlingReport.Weight = double.Parse(table.Rows[i][9].ToString());
                    handlingReport.ChargeableWeigt = double.Parse(table.Rows[i][10].ToString());
                    if (listHandlingReports.Count(c => c.AWB == handlingReport.AWB) > 0)
                    {
                        handlingReport.ChargeableWeigt = 0;

                    }
                    listHandlingReports.Add(handlingReport);
                }
                ViewData["listHandling"] = listHandlingReports;
                ViewBag.TotalRecord = table.Rows.Count;
                return View("~/Views/HandlingReport/HandlingImportList.cshtml");
            }
            else if(id== "EXP_HANDLING05")
            {
                ViewData["DataList"] = table;
                ViewData["Column"] = column;
                ViewBag.TotalRecord = table.Rows.Count;
                return View("~/Views/HandlingReport/HandlingSkidCartonList.cshtml");
            }
         else
            {
                for (
               int i = 0; i < table.Rows.Count; i++)
                {
                    HandlingReportViewModel handlingReport = new HandlingReportViewModel();
                    handlingReport.AWB = table.Rows[i][5].ToString() + table.Rows[i][6].ToString();
                    handlingReport.Date = table.Rows[i][3].ToString();

                    handlingReport.Group = table.Rows[i][7].ToString();
                    handlingReport.Pieces = int.Parse(table.Rows[i][8].ToString());
                    handlingReport.Weight = double.Parse(table.Rows[i][9].ToString());
                    handlingReport.ChargeableWeigt = double.Parse(table.Rows[i][10].ToString()) > handlingReport.Weight ? double.Parse(table.Rows[i][10].ToString()) : handlingReport.Weight;
                    //if(listHandlingReports.Count(c=>c.AWB == handlingReport.AWB) > 0)
                    //{
                    //    handlingReport.ChargeableWeigt = 0;

                    //}
                    listHandlingReports.Add(handlingReport);
                }
            }
            if (paging)
            {
                string total = table.Rows[2][1].ToString();
                ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingexpawb", int.Parse(total), int.Parse(prRequest[find.Length - 2]), int.Parse(prRequest[find.Length - 1]));
            }
            ViewData["DataList"] = table;
            ViewData["Column"] = column;
            ViewData["listHandling"] = listHandlingReports;
            ViewBag.TotalRecord = table.Rows.Count;
            return View("~/Views/HandlingReport/List.cshtml");
        }
        [DocumentExport("EXCEL", "HANDLING")]
        public ActionResult Export()
        {
            string id = Request["id"];
            string fileTem = Request["fn"].Trim();
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLHANDLING.xml"), id, ref sql, ref find, ref column,ref des);
            string[] prRequest = new string[find.Length];
            for (int i = 0; i < find.Length; i++)
            {
                if (i == 3)
                    prRequest[i] = Int32.MaxValue.ToString();
                else
                    prRequest[i] = string.IsNullOrEmpty(Request[find[i]]) ? string.Empty : Request[find[i]].Trim();
            }
            sql = string.Format(sql, prRequest);
            System.Data.DataTable table = reportAccess.GetData(string.Format(sql)).Tables[0];
            List<HandlingReportViewModel> listHandlingReports = new List<HandlingReportViewModel>();
            if (id == "EXP_HANDLING04")
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    HandlingReportViewModel handlingReport = new HandlingReportViewModel();
                    handlingReport.AWB = table.Rows[i][2].ToString() + table.Rows[i][3].ToString();
                    handlingReport.Date = table.Rows[i][1].ToString();
                    handlingReport.Pieces = int.Parse(table.Rows[i][6].ToString());

                    handlingReport.Weight = double.Parse(table.Rows[i][5].ToString());
                    handlingReport.ChargeableWeigt = double.Parse(table.Rows[i][4].ToString());
                    handlingReport.ChargeableReal = double.Parse(table.Rows[i][7].ToString());
                    listHandlingReports.Add(handlingReport);
                }
                ViewData["listHandling"] = listHandlingReports;
                ViewBag.Des = des;
                ViewBag.TotalRecord = table.Rows.Count;
                return View("~/Views/HandlingReport/ExpReportEXP_HANDLING04.cshtml");
            }
            else if (id == "IMP_HANDLING01" || id == "IMP_HANDLING02" || id == "IMP_HANDLING03")
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    HandlingReportViewModel handlingReport = new HandlingReportViewModel();
                    handlingReport.AWB = table.Rows[i][3].ToString() + table.Rows[i][4].ToString();
                    handlingReport.DateCreate = Convert.ToDateTime(table.Rows[i][2].ToString());

                    handlingReport.Group = table.Rows[i][5].ToString();
                    handlingReport.Pieces = int.Parse(table.Rows[i][8].ToString());
                    handlingReport.Weight = double.Parse(table.Rows[i][9].ToString());
                    handlingReport.ChargeableWeigt = double.Parse(table.Rows[i][10].ToString());
                    if (listHandlingReports.Count(c => c.AWB == handlingReport.AWB) > 0)
                    {
                        handlingReport.ChargeableWeigt = 0;

                    }
                    listHandlingReports.Add(handlingReport);
                }
                ViewBag.Des = des;
                ViewData["listHandling"] = listHandlingReports;
                ViewBag.TotalRecord = table.Rows.Count;
                return View("~/Views/HandlingReport/ExportHandlingImport.cshtml");
            }
            else if (id == "IMP_HANDLING04")
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    HandlingReportViewModel handlingReport = new HandlingReportViewModel();
                    handlingReport.AWB = table.Rows[i][1].ToString() + table.Rows[i][2].ToString();
                    handlingReport.Date = table.Rows[i][0].ToString();
                    handlingReport.Hawb = table.Rows[i][3].ToString();
                    handlingReport.Weight = double.Parse(table.Rows[i][6].ToString());
                    handlingReport.ChargeableWeigt = double.Parse(table.Rows[i][8].ToString());
                    handlingReport.Pieces = int.Parse(table.Rows[i][7].ToString());
                    handlingReport.ChargeableReal = double.Parse(table.Rows[i][9].ToString());
                    listHandlingReports.Add(handlingReport);
                }
                ViewBag.Des = des;
                ViewData["listHandling"] = listHandlingReports;
                ViewBag.TotalRecord = table.Rows.Count;
                return View("~/Views/HandlingReport/ExpReportIMP_HANDLING04.cshtml");
            }
            else if ( id == "EXP_HANDLING02")
            {
                for (
             int i = 0; i < table.Rows.Count; i++)
                {
                    HandlingReportViewModel handlingReport = new HandlingReportViewModel();
                    handlingReport.AWB = table.Rows[i][5].ToString() + table.Rows[i][6].ToString();
                    handlingReport.Date = table.Rows[i][3].ToString();

                    handlingReport.Group = table.Rows[i][8].ToString();
                    handlingReport.Pieces = int.Parse(table.Rows[i][9].ToString());
                    handlingReport.Weight = double.Parse(table.Rows[i][10].ToString());
                    handlingReport.ChargeableWeigt = double.Parse(table.Rows[i][7].ToString());
                    if (listHandlingReports.Count(c => c.AWB == handlingReport.AWB) > 0)
                    {
                        handlingReport.ChargeableWeigt = 0;

                    }
                    listHandlingReports.Add(handlingReport);
                }
            }
            else
            {
                for (
               int i = 0; i < table.Rows.Count; i++)
                {
                    HandlingReportViewModel handlingReport = new HandlingReportViewModel();
                    handlingReport.AWB = table.Rows[i][5].ToString() + table.Rows[i][6].ToString();
                    handlingReport.Date = table.Rows[i][3].ToString();

                    handlingReport.Group = table.Rows[i][7].ToString();
                    handlingReport.Pieces = int.Parse(table.Rows[i][8].ToString());
                    handlingReport.Weight = double.Parse(table.Rows[i][9].ToString());
                    handlingReport.ChargeableWeigt = double.Parse(table.Rows[i][10].ToString()) > handlingReport.Weight ? double.Parse(table.Rows[i][10].ToString()) : handlingReport.Weight;
                    //if(listHandlingReports.Count(c=>c.AWB == handlingReport.AWB) > 0)
                    //{
                    //    handlingReport.ChargeableWeigt = 0;

                    //}
                    listHandlingReports.Add(handlingReport);
                }
            }
            ViewData["DataList"] = table;
            ViewData["Column"] = column;
            ViewData["listHandling"] = listHandlingReports;
            ViewBag.Des = des;
            ViewBag.TotalRecord = table.Rows.Count;
            return View("~/Views/HandlingReport/ExpReport.cshtml");
        }
    }
}
