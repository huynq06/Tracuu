using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,MEMBER,HAIQUAN,KHOKEODAI,CUSTOMER")]
    public class ImpAWBController : BaseController
    {
        private DateTime? fromDate;
        private DateTime? toDate;
        public static IList<Layer.Flight> FlightList = new List<Layer.Flight>();
        public ActionResult Index()
        {
            FlightList = new DataAccess.FlightAccess().GetAllFlight();
            ViewData["CODE"] = FlightList.GroupBy(x => x.Code).Select(x => x.Key).ToList();

            return View();
        }
      
        public ActionResult GetNo(string id)
        {
            StringBuilder row = new StringBuilder();
            var Child = FlightList.Where(x => x.Code.Equals(id)).ToList();
            row.AppendLine("<option value='ALL'></option>");
            foreach (var item in Child)
            {
                row.AppendLine("<option value='" + item.FlightNo + "'>" + item.FlightNo + "</option>");

            }
            return Content(row.ToString());
        }
        public ActionResult EditHAWB(string id)
        {
            IList<Layer.ImpHAWB> impHawbs = new DataAccess.ImpHAWBAccess().GetByMawbGroup(id);
            ViewData["impHawbLists"] =impHawbs.Count==1?impHawbs:impHawbs.Where(x=>!string.IsNullOrEmpty(x.HAWB.Trim())).ToList();
            ViewBag.AWB = Request["awb"];
            ViewBag.FlightNo = Request["fl"];
            ViewBag.OrginDest = Request["ori"];
            ViewBag.TotalRecord = impHawbs.Count;
            ViewBag.TotalExp = impHawbs.Sum(x => (string.IsNullOrEmpty(x.WeightExpected.Trim()) ? 0 : Convert.ToDouble(x.WeightExpected)));
            ViewBag.TotalRecv = impHawbs.Sum(x => (string.IsNullOrEmpty(x.WeightReceived.Trim()) ? 0 : Convert.ToDouble(x.WeightReceived)));
            
            return View();
        }
        public ActionResult List()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();

            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            string hawb = string.IsNullOrEmpty(Request["hawb"]) ? "ALL" : Request["hawb"].Trim();


            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetPaging(page,
                                                                                  pageSize, code,
                                                                                  flightNo,
                                                                                  fromDate,
                                                                                  toDate,
                                                                                  hawb,


                                                                                  ref total);
            ViewData["impAWBLists"] = impAwbs;
            ViewBag.TotalRecord = total;
            ViewBag.PageCurrent = (page - 1) * pageSize;

            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingimpawb", total, page, pageSize);
            return View();
        }
        [DocumentExport("EXCEL", "IMP_AWB")]
        public ActionResult Export()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();

            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            string hawb = string.IsNullOrEmpty(Request["hawb"]) ? "ALL" : Request["hawb"].Trim();



            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetPaging(1,
                                                                                  Int32.MaxValue,
                                                                                  code,
                                                                                  flightNo,
                                                                                  fromDate,
                                                                                  toDate,
                                                                                  hawb,



                                                                                  ref total);
            ViewData["impAWBLists"] = impAwbs;


            return View();
        }

        public ActionResult ImportRS()
        {
            FlightList = new DataAccess.FlightAccess().GetAllFlight();
            ViewData["CODE"] = FlightList.GroupBy(x => x.Code).Select(x => x.Key).ToList();
            return View();
        }

        public ActionResult ListRS()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();

            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            string hawb = string.IsNullOrEmpty(Request["hawb"]) ? "ALL" : Request["hawb"].Trim();


            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetReceiver(page,
                                                                                  pageSize, code,
                                                                                  flightNo,
                                                                                  fromDate,
                                                                                  toDate,
                                                                                  hawb,


                                                                                  ref total);
            ViewData["impAWBLists"] = impAwbs;
            ViewBag.TotalRecord = total;
            ViewBag.PageCurrent = (page - 1) * pageSize;

            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingimpawb", total, page, pageSize);
            return View();
        }

        [DocumentExport("EXCEL", "DANHSACHHANGVE")]
        public ActionResult ExportRS()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();

            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            string hawb = string.IsNullOrEmpty(Request["hawb"]) ? "ALL" : Request["hawb"].Trim();



            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetReceiver(1,
                                                                                  Int32.MaxValue,
                                                                                  code,
                                                                                  flightNo,
                                                                                  fromDate,
                                                                                  toDate,
                                                                                  hawb,
                                                                                  ref total);
            ViewData["impAWBLists"] = impAwbs;
            ViewBag.TotalRecord = impAwbs.Count;

            return View();
        }

    }
}
