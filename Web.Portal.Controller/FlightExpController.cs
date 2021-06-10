using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,MEMBER,HAIQUAN,KHOKEODAI,CUSTOMER")]
    public class FlightExpController:BaseController
    {
        private DateTime? fromDate;
        private DateTime? toDate;
        public static IList<Layer.FlightExport> FlightExportList = new List<Layer.FlightExport>();

        public ActionResult Index()
        {

            FlightExportList = new DataAccess.FlightExportAccess().GetAllFlight();
            ViewData["CODE"] = FlightExportList.GroupBy(x => x.Code).Select(x => x.Key).ToList();

            return View();
        }
        public ActionResult GetNo(string id)
        {
            StringBuilder row = new StringBuilder();

            var Child = FlightExportList.Where(x => x.Code.Equals(id)).ToList();
            row.AppendLine("<option value='ALL'></option>");
            foreach (var item in Child)
            {
                row.AppendLine("<option value='" + item.FlightNo + "'>" + item.FlightNo + "</option>");

            }
            return Content(row.ToString());
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
            IList<Layer.FlightExport> flights = new DataAccess.FlightExportAccess().GetPaging(page,
                                                                                  pageSize,
                                                                                  code,
                                                                                  flightNo,
                                                                                  fromDate,
                                                                                  toDate,

                                                                                  ref total);
            ViewData["flightLists"] = flights;
            ViewBag.TotalRecord = total;
            ViewBag.PageCurrent = (page - 1) * pageSize;

            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingfl", total, page, pageSize);
            return View();
        }
        [DocumentExport("EXCEL", "SCHEDULE_FLIGHT")]
        public ActionResult Export()
        {
            int total = 0;


            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();

            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            IList<Layer.FlightExport> flights = new DataAccess.FlightExportAccess().GetPaging(1,
                                                                                  Int32.MaxValue,
                                                                                  code,
                                                                                  flightNo,
                                                                                  fromDate,
                                                                                  toDate,

                                                                                  ref total);
            ViewData["flightLists"] = flights;
            ViewBag.FromDate = Request["fda"];
            ViewBag.ToDate = Request["tda"];

            return View();
        }


    }
}
