using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Web.Portal.Controller
{
    public class HermesReportController : BaseController
    {
        string sql = "";
        string[] find;
        string[] column;

        public ActionResult Index(string id)
        {
            return View("~/Views/HermesReport/" + id + ".cshtml");
        }
        public ActionResult List(string id)
        {
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQL(Server.MapPath("/SitaTemplate/SQL.xml"), id, ref sql, ref find, ref column);
            string[] prRequest = new string[find.Length];
            for (int i = 0; i < find.Length; i++)
            {
                prRequest[i] = string.IsNullOrEmpty(Request[find[i]]) ? string.Empty : Request[find[i]].Trim();
            }
            string sqlComplete = string.Format(sql, prRequest);
            System.Data.DataTable table = reportAccess.GetData(sqlComplete).Tables[0] ;
            string total = table.Rows[2][1].ToString();
            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingexpawb", int.Parse(total), int.Parse(prRequest[2]), int.Parse(prRequest[3]));
            ViewData["DataList"] = table;
            ViewData["Column"] = column;
            ViewBag.TotalRecord = table.Rows.Count;
            return View();
        }
        [DocumentExport("EXCEL", "IMP_AWB")]
        public ActionResult Export(string id)
        {
            string fileTem = Request["fn"].Trim();
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQL(Server.MapPath("/SitaTemplate/SQL.xml"), id, ref sql, ref find, ref column);
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
            ViewBag.TotalRecord = table.Rows.Count;
            return View("~/Views/HermesReport/" + fileTem + ".cshtml");
        }
    }
}
