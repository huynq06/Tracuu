using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KTX")]
    public class ExportReportController : BaseController
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
            return View("~/Views/ExportReport/DailyExport.cshtml");
        }
        public ActionResult ReportList()
        {
            string id = Request["id"];
            bool paging = Boolean.Parse(Request["paging"]);
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQL(Server.MapPath("/SitaTemplate/SQL.xml"), id, ref sql, ref find, ref column);
            string[] prRequest = new string[find.Length];
            for (int i = 0; i < find.Length; i++)
            {
                prRequest[i] = string.IsNullOrEmpty(Request[find[i]]) ? string.Empty : Request[find[i]].Trim();
            }
            string sqlComplete = string.Format(sql, prRequest);
            System.Data.DataTable table = reportAccess.GetData(sqlComplete).Tables[0];
            if(paging)
            {
                string total = table.Rows[2][1].ToString();
                ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingexpawb", int.Parse(total), int.Parse(prRequest[find.Length-2]), int.Parse(prRequest[find.Length-1]));
            }
            
            ViewData["DataList"] = table;
            ViewData["Column"] = column;
            ViewBag.TotalRecord = table.Rows.Count;
            return View();
        }
        [DocumentExport("EXCEL", "EXP_AWB")]
        public ActionResult Export()
        {
            string id = Request["id"];
            //string fileTem = Request["fn"].Trim();
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQL.xml"), id, ref sql, ref find, ref column,ref des);
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
            ViewBag.FlightNumber = prRequest[1] + "-" + prRequest[0];
            ViewBag.Des = des;
            ViewBag.TotalRecord = table.Rows.Count;
            if(id== "HERMES01")
            {
                int sum_pieces = 0;
                int sum_totalPices = 0;
                double sum_gw = 0;
                double sum_total_gw = 0;
                double sum_volume = 0;
                double sum_totalVolume = 0;
                double sum_vw = 0;
                double sum_cw = 0;
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    sum_pieces += int.Parse(table.Rows[i][5].ToString());
                    sum_totalPices += int.Parse(table.Rows[i][6].ToString());
                    sum_gw += double.Parse(table.Rows[i][7].ToString());
                    sum_total_gw += double.Parse(table.Rows[i][8].ToString());
                    sum_volume += double.Parse(table.Rows[i][9].ToString());
                    sum_totalVolume += double.Parse(table.Rows[i][10].ToString());
                    sum_vw += double.Parse(table.Rows[i][11].ToString());
                    sum_cw += double.Parse(table.Rows[i][12].ToString());
                    

                }
                ViewBag.sum_pieces = sum_pieces;
                ViewBag.sum_totalPices = sum_totalPices;
                ViewBag.sum_gw = sum_gw;
                ViewBag.sum_total_gw = sum_total_gw;
                ViewBag.sum_volume = sum_volume;
                ViewBag.sum_totalVolume = sum_totalVolume;
                ViewBag.sum_vw = sum_vw;
                ViewBag.sum_cw = sum_cw;
                return View("~/Views/ExportReport/ExpReportHermes01.cshtml");
            }
            if (id == "HERMES05")
            {
              
                double sum_gw = 0;
              
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    sum_gw += double.Parse(table.Rows[i][2].ToString());
                }
                ViewBag.sum_gw = sum_gw;
                return View("~/Views/ExportReport/ExpReportHermes05.cshtml");
            }

            return View("~/Views/ExportReport/ExpReport.cshtml");
        }
    }
}
