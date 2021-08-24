using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,REPORT")]
    public class HrReportController : BaseController
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
            return View("~/Views/HrReport/DailyExport.cshtml");
        }

        public ActionResult ReportList()
        {
            string id = Request["id"];
            bool paging = Boolean.Parse(Request["paging"]);
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLNS.xml"), id, ref sql, ref find, ref column, ref des);
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
            if(id=="IMP_NS01")
            {
                return View();
            }
            else
            {
                return View("~/Views/HrReport/ReportExpList.cshtml"); 
            }
        
        }
        [DocumentExport("EXCEL", "HR_")]
        public ActionResult Export()
        {
            string id = Request["id"];
            string fileTem = Request["fn"].Trim();
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLNS.xml"), id, ref sql, ref find, ref column, ref des);
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
            if (id == "IMP_NS01")
            {
                return View("~/Views/HrReport/ExpReport.cshtml");
            }
            else
            {
                return View("~/Views/HrReport/ExpExpReport.cshtml");
            }
          
        }
    }
}
