using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    public class QueueController : BaseController
    {
        DateTime? from;
        DateTime? to;
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            ShowData();
            return View();

        }
        [DocumentExport("EXCEL", "BAOCAO_CAPSO")]
        public ActionResult Export()
        {
            ShowData();
            return View();

        }
        private void ShowData()
        {


            
            string ino = string.IsNullOrEmpty(Request["ino"]) ? "ALL" : Request["ino"].Trim();
            from = string.IsNullOrEmpty(Request["fda"]) ? DateTime.Now : Utils.Format.ConvertDate(Request["fda"] + " 00:00:00");
            to = string.IsNullOrEmpty(Request["tda"]) ? DateTime.Now : Utils.Format.ConvertDate(Request["tda"] + " 23:59:59");
            IList<Layer.QueueAWB> invoiceList = new List<Layer.QueueAWB>();
            invoiceList = new DataAccess.QUEUEAWBAccess().GetReport(ino,from,to);           
            ViewData["QueueLists"] = invoiceList;
            ViewBag.TotalRecord = invoiceList.Count;
            ViewBag.From = Request["fda"];
            ViewBag.To= Request["tda"];

            //ViewBag.TotalNoOK = messageList.Count(x => x.MSGCOMPLETED.Trim().Equals("0"));
            //ViewBag.TotalOK = messageList.Count(x => x.MSGCOMPLETED.Trim().Equals("1"));



        }
    }
}
