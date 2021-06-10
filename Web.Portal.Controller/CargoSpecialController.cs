using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    public class CargoSpecialController : BaseController
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

        public ActionResult List()
        {
            
            string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            string cd = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();
            fromDate = string.IsNullOrEmpty(Request["tda"]) ? DateTime.Now : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 00:00");
            toDate = string.IsNullOrEmpty(Request["tda"]) ? DateTime.Now : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 23:59");
           
            List<Layer.CargoSpecial> cargoSpecialList = new List<Layer.CargoSpecial>();
            cargoSpecialList = new DataAccess.CargoSpecialAccess().GetSpecial("SHC", "GROUP MOVED", cd, no, fromDate, toDate);
            List<Layer.CargoSpecial> cargoSpecialReal = new List<Layer.CargoSpecial>();
            string[] arrcheck = new string[] { "99A", "99D", "99F", "99N", "99P", "99V", "99W" };
            string[] posClear = new string[] { "TRS", "IDA", "CUS" };
            
            var group = cargoSpecialList.Where(x => Array.Exists(arrcheck, k =>x.TYPE.Contains(k.Trim()))).ToList().GroupBy(x => new { x.MAWB, x.PREFIX,x.HAWB,x.GROUPID});
            foreach (var item in group)
            {
                string[] types = cargoSpecialList.Where(x => x.MAWB.Trim().Equals(item.Key.MAWB.Trim())
                                                        && x.PREFIX.Trim().Equals(item.Key.PREFIX)
                                                     ).GroupBy(x=>x.TYPE).Select(x=>x.Key).ToArray();
                string[] childs = cargoSpecialList.Where(x => x.MAWB.Trim().Equals(item.Key.MAWB.Trim())
                                                      && x.PREFIX.Trim().Equals(item.Key.PREFIX) && !string.IsNullOrEmpty(x.POSITION)
                                                      && x.TYPE.Contains("99F")
                                                     ).Select(x => x.POSITION.Replace("Group " + x.GROUPID + " has been moved to location", "")).Where(x => x.Length <= 20).ToList().Where(x => Array.Exists(posClear, k => x.Contains(k.Trim()))==false).ToArray();
                                                     ;
                cargoSpecialReal.Add(new Layer.CargoSpecial()
                {
                    PREFIX = item.Key.PREFIX,
                    MAWB = item.Key.MAWB,
                    HAWB = item.Key.HAWB,
                    GROUPID = item.Key.GROUPID,
                    TYPE = string.Join(" | ", types),
                    POSITION = string.Join(" | ", childs)
                });

            }
            ViewData["CargoSpecialList"] = cargoSpecialReal;
            return View();
        }
        [DocumentExport("EXCEL", "DANHSACHHANGDATBIET")]
        public ActionResult Export()
        {

            string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            string cd = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();
            fromDate = string.IsNullOrEmpty(Request["tda"]) ? DateTime.Now : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 00:00");
            toDate = string.IsNullOrEmpty(Request["tda"]) ? DateTime.Now : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 23:59");

            List<Layer.CargoSpecial> cargoSpecialList = new List<Layer.CargoSpecial>();
            cargoSpecialList = new DataAccess.CargoSpecialAccess().GetSpecial("SHC", "GROUP MOVED", cd, no, fromDate, toDate);
            List<Layer.CargoSpecial> cargoSpecialReal = new List<Layer.CargoSpecial>();
            string[] arrcheck = new string[] { "99A", "99D", "99F", "99N", "99P", "99V", "99W" };
            string[] posClear = new string[] { "TRS", "IDA", "CUS" };

            var group = cargoSpecialList.Where(x => Array.Exists(arrcheck, k => x.TYPE.Contains(k.Trim()))).ToList().GroupBy(x => new { x.MAWB, x.PREFIX });
            foreach (var item in group)
            {
                string[] types = cargoSpecialList.Where(x => x.MAWB.Trim().Equals(item.Key.MAWB.Trim())
                                                        && x.PREFIX.Trim().Equals(item.Key.PREFIX)
                                                     ).GroupBy(x => x.TYPE).Select(x => x.Key).ToArray();
                string[] childs = cargoSpecialList.Where(x => x.MAWB.Trim().Equals(item.Key.MAWB.Trim())
                                                       && x.PREFIX.Trim().Equals(item.Key.PREFIX) && !string.IsNullOrEmpty(x.POSITION)
                                                        && x.TYPE.Contains("99F")
                                                      ).Select(x => x.POSITION.Replace("Group " + x.GROUPID + " has been moved to location", "")).Where(x => x.Length <= 20).ToList().Where(x => Array.Exists(posClear, k => x.Contains(k.Trim()))==false).ToArray();
                cargoSpecialReal.Add(new Layer.CargoSpecial()
                {
                    PREFIX = item.Key.PREFIX,
                    MAWB = item.Key.MAWB,
                    TYPE = string.Join(" | ", types),
                    POSITION = string.Join(" | ", childs)
                });

            }
            ViewBag.Flight = cd + no;
            ViewBag.Date = Request["tda"];
            ViewData["CargoSpecialList"] = cargoSpecialReal;
            return View();
        }
    }
}
