using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using Web.Portal.Common;
namespace Web.Portal.Controller
{
    public class DirectorReportController : BaseController
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
            return View("~/Views/DirectorReport/DailyExport.cshtml");
        }
        public ActionResult ReportList()
        {
            string id = Request["id"];
            bool paging = Boolean.Parse(Request["paging"]);
            string fda = Request["fdate"];
            string tda = Request["tdate"];
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLBGD.xml"), id, ref sql, ref find, ref column, ref des);
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
            List<DirectorReportViewModel> listDrv = new List<DirectorReportViewModel>();
            for (int i = 0; i < table.Rows.Count; i++)
            {
                DirectorReportViewModel obj = new DirectorReportViewModel();
                obj.RECEIVED_DATE = table.Rows[i][0].ToString();
                obj.CX = Math.Round(double.Parse(string.IsNullOrEmpty(table.Rows[i][2].ToString()) ? "0" : table.Rows[i][2].ToString())/1000,2);
                obj.EK = Math.Round(double.Parse(string.IsNullOrEmpty(table.Rows[i][3].ToString()) ? "0" : table.Rows[i][3].ToString())/ 1000,2);
                obj.JL = Math.Round(double.Parse(string.IsNullOrEmpty(table.Rows[i][4].ToString()) ? "0" : table.Rows[i][4].ToString())/ 1000,2);
                obj.KE = Math.Round(double.Parse(string.IsNullOrEmpty(table.Rows[i][1].ToString()) ? "0" : table.Rows[i][1].ToString())/1000,2);
                obj.UPS = Math.Round(double.Parse(string.IsNullOrEmpty(table.Rows[i][5].ToString()) ? "0" : table.Rows[i][5].ToString())/1000,2);
                if(id == "EXP_KD01")
                {
                    obj.CI = Math.Round(double.Parse(string.IsNullOrEmpty(table.Rows[i][6].ToString()) ? "0" : table.Rows[i][6].ToString()) / 1000,2);
                }
                else
                {
                    obj.CI = 0;
                }
                listDrv.Add(obj);
            }
            List<ChartDataSet> chartDataSet = new List<ChartDataSet>();
            //var columns = column.Where(x => (x != "RECEIVED_DATE")).ToArray();
            var mainReports = listDrv.Select(g => new { MainCol = g.RECEIVED_DATE + "<br>" +  "(" + g.Total+ ")" }).ToList();
            List<ChartCategory> chartItems = new List<ChartCategory>();
            foreach (var item in mainReports)
            {
                chartItems.Add(new ChartCategory() { Label = item.MainCol });
            }
            for(int i=0; i<column.ToList().Count; i++)
            {
                List<ChartDictionary> listChart = new List<ChartDictionary>();
                List<ChartDataSet.DataItem> dataItems = new List<ChartDataSet.DataItem>();
                foreach(var item in listDrv)
                {
                    ChartDictionary chart = new ChartDictionary();
                    chart.Key = item.RECEIVED_DATE;
                    chart.Value = Utils.Format.FormatValue(item.GetType().GetProperty(column[i]).PropertyType, item.GetType().GetProperty(column[i]).GetValue(item, null));
                    listChart.Add(chart);
                }
                var colResult = listDrv.GroupBy(x => Utils.Format.FormatValue(x.GetType().GetProperty(column[i]).PropertyType, x.GetType().GetProperty(column[i]).GetValue(x, null))).Select(sl => new { key = sl.Key, cout = sl.Count() }).ToList();
                foreach (var val in listChart)
                    dataItems.Add(new ChartDataSet.DataItem() { Value = val.Value == "0"? "" : val.Value });
                chartDataSet.Add(new ChartDataSet()
                {
                    SeriesName = column[i],
                    Renderas = "",
                    Data = dataItems

                });
            }
            return Json(new { category = chartItems, dataset = chartDataSet }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ReportExportList()
        {
            string id = Request["id"];
            bool paging = Boolean.Parse(Request["paging"]);
            string fda = Request["fdate"];
            string tda = Request["tdate"];
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLBGD.xml"), id, ref sql, ref find, ref column, ref des);
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
            List<DirectorReportViewModel> listDrv = new List<DirectorReportViewModel>();
            for (int i = 0; i < table.Rows.Count; i++)
            {
                DirectorReportViewModel obj = new DirectorReportViewModel();
                obj.RECEIVED_DATE = table.Rows[i][0].ToString();
                obj.CX = Math.Round(double.Parse(string.IsNullOrEmpty(table.Rows[i][2].ToString()) ? "0" : table.Rows[i][2].ToString()) / 1000);
                obj.EK = Math.Round(double.Parse(string.IsNullOrEmpty(table.Rows[i][3].ToString()) ? "0" : table.Rows[i][3].ToString()) / 1000);
                obj.JL = Math.Round(double.Parse(string.IsNullOrEmpty(table.Rows[i][4].ToString()) ? "0" : table.Rows[i][4].ToString()) / 1000);
                obj.KE = Math.Round(double.Parse(string.IsNullOrEmpty(table.Rows[i][1].ToString()) ? "0" : table.Rows[i][1].ToString()) / 1000);
                obj.UPS = Math.Round(double.Parse(string.IsNullOrEmpty(table.Rows[i][5].ToString()) ? "0" : table.Rows[i][5].ToString()) / 1000);
                listDrv.Add(obj);
            }
            List<ChartDataSet> chartDataSet = new List<ChartDataSet>();
            var columns = column.Where(x => (x != "RECEIVED_DATE")).ToArray();
            var mainReports = listDrv.Select(g => new { MainCol = g.RECEIVED_DATE }).ToList();
            List<ChartCategory> chartItems = new List<ChartCategory>();
            foreach (var item in mainReports)
            {
                chartItems.Add(new ChartCategory() { Label = item.MainCol });
            }
            for (int i = 0; i < column.ToList().Count; i++)
            {
                List<ChartDictionary> listChart = new List<ChartDictionary>();
                List<ChartDataSet.DataItem> dataItems = new List<ChartDataSet.DataItem>();
                foreach (var item in listDrv)
                {
                    ChartDictionary chart = new ChartDictionary();
                    chart.Key = item.RECEIVED_DATE;
                    chart.Value = Utils.Format.FormatValue(item.GetType().GetProperty(column[i]).PropertyType, item.GetType().GetProperty(columns[i]).GetValue(item, null));
                    listChart.Add(chart);
                }
                var colResult = listDrv.GroupBy(x => Utils.Format.FormatValue(x.GetType().GetProperty(column[i]).PropertyType, x.GetType().GetProperty(columns[i]).GetValue(x, null))).Select(sl => new { key = sl.Key, cout = sl.Count() }).ToList();
                foreach (var val in listChart)
                    dataItems.Add(new ChartDataSet.DataItem() { Value = val.Value });
                chartDataSet.Add(new ChartDataSet()
                {
                    SeriesName = columns[i],
                    Renderas = "",
                    Data = dataItems

                });
            }
            return Json(new { category = chartItems, dataset = chartDataSet }, JsonRequestBehavior.AllowGet);
        }
    }
}
