using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC")]
    public class GenSitaController:BaseController
    {
        DateTime? fromDate;
        DateTime? toDate;
        public static IList<Layer.Flight> FlightList = new List<Layer.Flight>();
        public ActionResult Index()
        {
            FlightList = new DataAccess.FlightAccess().GetAllFlight();
            ViewData["CODE"] = FlightList.GroupBy(x => x.Code).Select(x => x.Key).ToList();
            return View();
        }
        public ActionResult Edit()
        {
            string id = Request["id"];
            ViewBag.Id = id;
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
        private void ShowResult()
        {
            string sita = string.IsNullOrEmpty(Request["ty"]) ? "RCF" : Request["ty"].Trim();         
            IList<Web.Portal.Layer.ImpSita> SitaList = new DataAccess.ImpSitaAccess().GetAllIn(Request["id"]);
            List<string> rs = new List<string>();
            foreach (var item in SitaList)
            {
                string vsion = System.Configuration.ConfigurationManager.AppSettings[item.AIRLINE.ToUpper().Trim()].Trim();
                rs.Add(GetContent(sita, vsion, item));
            }
            ViewData["ListSita"] = rs;
        }
        public ActionResult Result()
        {
            ShowResult();
            return View();
        }
        [DocumentExport("TEXT", "SITA")]
        public ActionResult Export()
        {
            ShowResult();
            return View();
        }
        public ActionResult List()
        {
            string cd = string.IsNullOrEmpty(Request["cd"]) ? string.Empty : Request["cd"].Trim();
            string fno = string.IsNullOrEmpty(Request["fno"]) ? string.Empty : Request["fno"].Trim();
            string mawb = string.IsNullOrEmpty(Request["mawb"]) ? "ALL" : Request["mawb"].Trim(); 
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? DateTime.Now : Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? DateTime.Now : Utils.Format.ConvertDate(Request["tda"]);
            IList<Web.Portal.Layer.ImpSita> SitaList = new DataAccess.ImpSitaAccess().GetAll(cd,fno,mawb,fromDate,toDate);            
            ViewData["ImpSitaLists"] = SitaList;
            ViewBag.Total = SitaList.Count;

            return View();
        }
        private string GetContent(string type,string vsion, Web.Portal.Layer.ImpSita item)
        {

            System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();
            xmlDoc.Load(Server.MapPath("/SitaTemplate/" + type + ".xml"));
            string content = string.Empty;
            content = GetElement(xmlDoc, vsion, string.Empty);
                string fdate = (Utils.Format.GetMonthName(DateTime.Now));
                string ftime = DateTime.Now.ToString("HHmm");
            content = content.Replace("{MAWB}", item.PREFIX + "-" + item.SERIAL_NO).
                            Replace("{ORI}", item.FLT_ORG).
                            Replace("{AWB_DEST}", item.FLT_DEST).
                            Replace("{FLT_DEST}", item.FLT_DEST).
                            Replace("{FLIGHTNUMBER}", item.AIRLINE + item.FLIGHT_NO).
                            Replace("{FLIGHTDATE}", fdate + ftime).
                            Replace("{CONSIGNEE}", item.CONSIGNEE_NAME).
                            Replace("{ACTUALTIME}", "A" + (item.ATA_TIME.Length >= 4 ? item.ATA_TIME.Substring(0, 4) : item.ATA_TIME));
                                
            if (type.Equals("DLV"))
            {
                string fd = (Utils.Format.GetMonthName(item.DELIVERED_DATE.HasValue ? item.DELIVERED_DATE.Value : DateTime.Now));
                string ft = item.DELIVERED_TIME.Length >= 4 ? item.DELIVERED_TIME.Substring(0, 4) : item.DELIVERED_TIME;

                content = content.Replace("{DELIVERYDATE}",fd+ft ).
                         Replace("{PW_GOODS}",
                                (item.FFM_PIECES > item.DELIVERED_PIECES ? "P" : "T") + item.DELIVERED_PIECES + "K" + item.AWB_EXPECTED_WEIGHT).
                         Replace("{PW_BILL}", "T" + (item.AWB_EXPECTED_PIECES + "K" + item.AWB_EXPECTED_WEIGHT));
            }else
            {
                content = content.Replace("{PW_GOODS}",
                                (item.FFM_PIECES < item.AWB_EXPECTED_PIECES ? "P"+item.FFM_PIECES+ "K" + item.FFM_WEIGHT : ("T"+ item.AWB_EXPECTED_PIECES+"K"+item.AWB_EXPECTED_WEIGHT)) ).
                                Replace("{PW_BILL}", "T" + (item.AWB_EXPECTED_PIECES + "K" + item.AWB_EXPECTED_WEIGHT));

            }
            return content;
        }
        public static string GetElement(System.Xml.XmlDocument xmlMain, string Name, string Default)
        {
            try
            {
                return xmlMain.GetElementsByTagName(Name) != null ? xmlMain.GetElementsByTagName(Name)[0].InnerText : Default;
            }
            catch (Exception)
            {
                return Default;
            }
        }
    }
}
