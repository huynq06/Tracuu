using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Security;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KTN")]
    public class MessageController:BaseController
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
            fromDate = string.IsNullOrEmpty(Request["tda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 00:00");
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 23:59");
            
          
            List<Layer.MessageHermes> messageHermesList = new List<Layer.MessageHermes>();
            messageHermesList=new DataAccess.MessageHermesAccess().GetCustomByEmail("TO","E-MAIL",
                                                                                  cd, no,
                                                                                  fromDate,
                                                                                  toDate);
            var messageList = messageHermesList.Where(x => x.AWB.Contains("Z") == false && x.GoodsContent.Contains("MAIL") == false).ToList();
            List<Layer.MessageHermes> messageHermesReal = new List<Layer.MessageHermes>();
            var groupMess = messageList.GroupBy(x => new {x.Prefix, x.AWB,x.Consignee,x.ConsignADDR }).ToList();
            foreach(var item in groupMess)
            {
                string[] msgValue = messageList.Where(x =>x.MSGCOMPLETED.Trim().Equals("1")&& x.Prefix.Trim().Equals(item.Key.Prefix.Trim()) && x.AWB.Trim().Equals(item.Key.AWB.Trim()))
                .GroupBy(x => new { x.MSGFILE, x.MSGVALUE }).Select(x => "<a href='/message/download?file=" + x.Key.MSGFILE.Replace("VM-SHARE", "10.10.0.2") + "'>" + x.Key.MSGVALUE + "</a>").ToArray();
                string[] msgValueEr = messageList.Where(x => x.MSGCOMPLETED.Trim().Equals("0") && x.Prefix.Trim().Equals(item.Key.Prefix.Trim()) && x.AWB.Trim().Equals(item.Key.AWB.Trim()))
                .GroupBy(x => new { x.MSGFILE, x.MSGVALUE }).Select(x => "<a href='/message/download?file=" + x.Key.MSGFILE.Replace("VM-SHARE", "10.10.0.2") + "'>" + x.Key.MSGVALUE + "</a>").ToArray();

                string[] msgDate = messageList.Where(x => x.Prefix.Trim().Equals(item.Key.Prefix.Trim()) && x.AWB.Trim().Equals(item.Key.AWB.Trim()))
                  .GroupBy(x=>x.MSGDATE).Select(x => x.Key.HasValue ? x.Key.Value.ToString("dd/MM/yyyy HH:mm:ss") : string.Empty).ToArray();
                messageHermesReal.Add(new Layer.MessageHermes()
                {
                    Prefix = item.Key.Prefix,
                    AWB = item.Key.AWB,
                    MSGCOUNT = msgDate.Length.ToString(),
                    Consignee = item.Key.Consignee,
                    ConsignADDR = item.Key.ConsignADDR,
                    MSGDATELIST = msgDate.Length > 0 ? string.Join("<br/> ", msgDate) : string.Empty,
                    MSGVALUE = msgValue.Length > 0 ? string.Join("<br/> ", msgValue) : string.Empty,
                    MSGFILE = msgValueEr.Length > 0 ? string.Join("<br/> ", msgValueEr) : string.Empty,

                });
            }
            ViewData["MessageHermesList"] = messageHermesReal.OrderBy(x=>x.AWB.Substring(x.AWB.Length-1)).ToList();
            //ViewBag.TotalNoOK = messageList.Count(x => x.MSGCOMPLETED.Trim().Equals("0"));
            //ViewBag.TotalOK = messageList.Count(x => x.MSGCOMPLETED.Trim().Equals("1"));
            ViewBag.TotalMail = messageHermesReal.Count(x => !x.MSGVALUE.ToUpper().Trim().Contains("EDATAPOST.ALSC@ALS.COM.VN"));
            ViewBag.TotalPost = messageHermesReal.Count(x => x.MSGVALUE.ToUpper().Trim().Contains("EDATAPOST.ALSC@ALS.COM.VN"));
            ViewBag.TotalMAWB = messageList.GroupBy(x => new { x.Prefix, x.AWB }).Count();
            return View();
        }
        [DocumentExport("EXCEL", "DANHSACHBAOHANG")]
        public ActionResult Export()
        {

            string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            string cd = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();
            fromDate = string.IsNullOrEmpty(Request["tda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 00:00");
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 23:59");


            List<Layer.MessageHermes> messageHermesList = new List<Layer.MessageHermes>();
            messageHermesList = new DataAccess.MessageHermesAccess().GetCustomByEmail("TO", "E-MAIL",
                                                                                  cd, no,
                                                                                  fromDate,
                                                                                  toDate);
            var messageList = messageHermesList.Where(x => x.AWB.Contains("Z") == false && x.GoodsContent.Contains("MAIL") == false).ToList();

            List<Layer.MessageHermes> messageHermesReal = new List<Layer.MessageHermes>();
            var groupMess = messageList.GroupBy(x => new { x.Prefix, x.AWB, x.Consignee, x.ConsignADDR }).ToList();

            foreach (var item in groupMess)
            {
                string[] msgValue = messageList.Where(x => x.MSGCOMPLETED.Trim().Equals("1") && x.Prefix.Trim().Equals(item.Key.Prefix.Trim()) && x.AWB.Trim().Equals(item.Key.AWB.Trim()))
                .GroupBy(x => new { x.MSGFILE, x.MSGVALUE }).Select(x => "<a href='/message/download?file=" + x.Key.MSGFILE.Replace("VM-SHARE", "10.10.0.2") + "'>" + x.Key.MSGVALUE + "</a>").ToArray();
                string[] msgValueEr = messageList.Where(x => x.MSGCOMPLETED.Trim().Equals("0") && x.Prefix.Trim().Equals(item.Key.Prefix.Trim()) && x.AWB.Trim().Equals(item.Key.AWB.Trim()))
                .GroupBy(x => new { x.MSGFILE, x.MSGVALUE }).Select(x => "<a href='/message/download?file=" + x.Key.MSGFILE.Replace("VM-SHARE", "10.10.0.2") + "'>" + x.Key.MSGVALUE + "</a>").ToArray();

                string[] msgDate = messageList.Where(x => x.Prefix.Trim().Equals(item.Key.Prefix.Trim()) && x.AWB.Trim().Equals(item.Key.AWB.Trim()))
                   .GroupBy(x => x.MSGDATE).Select(x => x.Key.HasValue ? x.Key.Value.ToString("dd/MM/yyyy HH:mm:ss") : string.Empty).ToArray();
                messageHermesReal.Add(new Layer.MessageHermes()
                {
                    Prefix = item.Key.Prefix,
                    AWB = item.Key.AWB,
                    MSGCOUNT =msgDate.Length.ToString(),
                    Consignee = item.Key.Consignee,
                    ConsignADDR = item.Key.ConsignADDR,
                    MSGDATELIST = msgDate.Length > 0 ? string.Join("<br/> ", msgDate) : string.Empty,
                    MSGVALUE = msgValue.Length > 0 ? string.Join("<br/> ", msgValue) : string.Empty,
                    MSGFILE = msgValueEr.Length > 0 ? string.Join("<br/> ", msgValueEr) : string.Empty

                });
            }
          
            ViewData["MessageHermesList"] = messageHermesReal.OrderBy(x => x.AWB.Substring(x.AWB.Length - 1)).ToList();
            //ViewBag.TotalNoOK = messageList.Count(x => x.MSGCOMPLETED.Trim().Equals("0"));
            //   ViewBag.TotalOK = messageList.Count(x => x.MSGCOMPLETED.Trim().Equals("1"));
            ViewBag.TotalMail = messageHermesReal.Count(x => !x.MSGVALUE.ToUpper().Trim().Contains("EDATAPOST.ALSC@ALS.COM.VN"));
            ViewBag.TotalPost = messageHermesReal.Count(x => x.MSGVALUE.ToUpper().Trim().Contains("EDATAPOST.ALSC@ALS.COM.VN"));
            ViewBag.Flight = cd + no;
            ViewBag.Date = Request["tda"];
            ViewBag.TotalMAWB = groupMess.Count();
            return View();
        }
        public ActionResult Download()
        {
            string pathFile = Request["file"];
            System.Net.NetworkCredential readCredentials = new System.Net.NetworkCredential(@"alsc\hermessrv", "#hermessrv*");   
          
            using (new Web.Portal.Sercurity.NetworkConnection(pathFile, readCredentials))
            {
                try
                {
                    System.IO.FileInfo file = new System.IO.FileInfo(pathFile);
                    byte[] fileBytes = System.IO.File.ReadAllBytes(pathFile);
                    string fileName = file.Name;
                   FileContentResult fileContent = File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
                    
                    return fileContent;
                }
                catch(Exception)
                {
                }
                
            }
            return View();
            
        }
    }
}
