using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using System.Web.Mvc;
using Web.Portal.Common;
using Web.Portal.Common.ViewModel;
using System.Web.Script.Serialization;
using System.Xml.Linq;
using Web.Portal.DataAccess;
using Web.Portal.Common.ApiViewModel;
using System.IO;

namespace Web.Portal.Controller
{
    public class AlsxImpAwbController : BaseController
    {
        IIMP_AWBServiceService _impService;
        private DateTime? fromDate;
        private DateTime? toDate;
        public static IList<Layer.Flight> FlightList = new List<Layer.Flight>();
        public AlsxImpAwbController(IIMP_AWBServiceService impService)
        {
            this._impService = impService;
        }
        public ActionResult Index()
        {
            string check = "true";
            string userName = WebMatrix.WebData.WebSecurity.CurrentUserName;
            if (userName.ToLower() != "admin")
            {
                check = "false";
            }
            ViewBag.CheckUserLogin = check;
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
        public ActionResult List()
        {
            string warehouse = "";
            string userName = WebMatrix.WebData.WebSecurity.CurrentUserName;
            if (userName.ToLower() == "admin")
            {
                warehouse = Request["warehouse"].Trim();
            }
            else
            {
                warehouse = userName.ToUpper();
            }
            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();
            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            string hawb = string.IsNullOrEmpty(Request["hawb"]) ? "ALL" : Request["hawb"].Trim();
            List<IMP_AWB> listImp = new List<IMP_AWB>();
            listImp = _impService.GetByDate(fromDate, toDate.Value.AddDays(1), code, flightNo, hawb,warehouse).ToList();
            ViewData["listAwb"] = listImp;
            return View();
        }
    }
}
