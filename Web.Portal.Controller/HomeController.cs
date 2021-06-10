using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,MEMBER,HAIQUAN,KHOKEODAI,CUSTOMER,XEMUYQUYEN")]

    public class HomeController : BaseController
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
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);

            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();

            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            IList<Layer.Flight> flights = new DataAccess.FlightAccess().GetPaging(page,
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
            IList<Layer.Flight> flights = new DataAccess.FlightAccess().GetPaging(1,
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
        [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC")]
        public ActionResult Flight()
        {
            FlightList = new DataAccess.FlightAccess().GetAllFlight();
            ViewData["CODE"] = FlightList.GroupBy(x => x.Code).Select(x => x.Key).ToList();


            return View();
        }
        /*[Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC")]
        public ActionResult FLList()
        {
            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();

            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            double SumPicesNoMail = 0;
            double SumWeightNoMail = 0;
            double SumPicesMail = 0;
            double SumWeigthMail = 0;

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            DataAccess.FlightReportAccess flightReportAccess = new DataAccess.FlightReportAccess();
            
            IList<Layer.FlightReport> flightsClear = flightReportAccess.GetReportByFlightTotal(string.Empty, code,
                                                                                  flightNo,
                                                                                  fromDate,
                                                                                  toDate

                                                                                  );

            IList<Layer.FlightReport> flightsReal = new List<Layer.FlightReport>();
            
            var group = flightsClear.GroupBy(x => new { x.Code, x.FlightNo, x.LandDate, x.LandTime })
                .Select(x=>new {
                    
                    Code=x.Key.Code,
                    FlightNo=x.Key.FlightNo,
                    LandDate=x.Key.LandDate,
                    LandTime=x.Key.LandTime                  
                    
                }).ToList();
            foreach (var item in group)
            {
                Layer.FlightReport itemReport = new Layer.FlightReport();
                itemReport.Code = item.Code;
               
                itemReport.FlightNo = item.FlightNo;
                itemReport.LandDate = item.LandDate;
                itemReport.LandTime = item.LandTime;
                
                itemReport.Pices = flightsClear.Where(x => x.GoodsContent.Contains("POST")==false &&x.GoodsContent.Contains("MAIL")  == false  &&  x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date)==0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo)).ToList().Sum(x => x.Pices);
                itemReport.Weight = flightsClear.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") == false  &&  x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo)).ToList().Sum(x => x.Weight);
                itemReport.PicesMail = flightsClear.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true)  &&  x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo)).ToList().Sum(x => x.Pices);
                itemReport.WeightMail = flightsClear.Where(x => (x.GoodsContent.Contains("POST") == true ||x.GoodsContent.Contains("MAIL") == true) && x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0  &&  x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo) ).ToList().Sum(x => x.Weight);
                flightsReal.Add(itemReport);
                SumPicesNoMail += itemReport.Pices;
                SumWeightNoMail += itemReport.Weight;
                SumPicesMail += itemReport.PicesMail;
                SumWeigthMail += itemReport.WeightMail;
            }

            ViewBag.SUMPCS = flightsClear.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") == false ).ToList().Sum(x => x.Pices);// flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
            ViewBag.SumGW = SumWeightNoMail; //flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") && x.AgenRemark.Contains(tem_weight) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_weight) + tem_weight.Length)));
            ViewBag.SUMPCSMAIL = SumPicesMail; //flights.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
            ViewBag.SumGWMail = SumWeigthMail;//flights.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.AgenRemark.Contains(tem_weight) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_weight) + tem_weight.Length)));
            ViewData["flightLists"] = flightsReal;
            return View();
        }*/
        [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC")]
        public ActionResult FLList()
        {
            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();
            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            double SumPicesNoMail = 0;
            double SumWeightNoMail = 0;
            double SumPicesMail = 0;
            double SumWeigthMail = 0;
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            GetSumGrai(code, flightNo, ref SumPicesNoMail, ref SumPicesMail, ref SumWeightNoMail, ref SumWeigthMail);
            /*DataAccess.FlightReportAccess flightReportAccess = new DataAccess.FlightReportAccess();
            IList<Layer.FlightReport> flightsClear = flightReportAccess.GetReportByFlight(string.Empty, code,
                                                                                  flightNo,
                                                                                  fromDate,
                                                                                  toDate
                                                                                  );
            IList<Layer.FlightReport> flights = new List<Layer.FlightReport>();
            IList<Layer.FlightReport> flightsReal = new List<Layer.FlightReport>();
            string tem_pcs = "update: PIECES - RECEIVED - ";
            string tem_weight = "update: WEIGHT - RECEIVED - ";
            var flightsChange = flightsClear.Where(x => x.AgenStatus.Equals("CHANGE AWB NUMBER")).ToList();

            foreach (var item in flightsChange)
            {
                string mawbs = item.AgenRemark.Replace("AWB Number changed from", string.Empty).Replace("to " + item.Prefix + "-" + item.MAWB, "");
                string[] m_arr = mawbs.Split('-');

                mawbs = m_arr.Length > 1 ? m_arr[0] + (m_arr[1].All(char.IsDigit) ? Convert.ToInt32(m_arr[1]).ToString() : m_arr[1]) : m_arr[0];

                IList<Layer.FlightReport> em_awbs = flightReportAccess.GetByHAWB(mawbs);
                foreach (var es in em_awbs)
                {
                    es.MAWB = item.MAWB;
                    es.Prefix = item.Prefix;
                    es.Code = item.Code;
                    es.FlightNo = item.FlightNo;
                    es.LandDate = item.LandDate;
                    es.LandTime = item.LandTime;
                    flightsClear.Add(es);
                }
            }

            foreach (var item in flightsClear.Where(x => x.AgenStatus.Equals("GROUP ADDITIONAL INFO")).OrderByDescending(x => x.Created))
            {


                if (item.AgenRemark.Contains(tem_pcs) == true)
                {

                    string p_tem = item.AgenRemark.Substring(0, item.AgenRemark.LastIndexOf(tem_pcs) - 1).Trim();
                    var f_check = flightsClear.FirstOrDefault(x => x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo) && x.AgenStatus.Equals("GROUP UPDATED") && item.AgenRemark.Contains(p_tem.Trim()));
                    if (f_check != null)
                        flights.Add(item);
                    else
                    {
                        var check = flightsClear.Where(x => x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo) && x.AgenRemark.Contains(p_tem) == true).OrderByDescending(x => x.Created).First();
                        if (item.Created.Value.ToString("dd/MM/yyyy HH:mm").Equals(check.Created.Value.ToString("dd/MM/yyyy HH:mm")))
                            flights.Add(item);
                    }

                }


                if (item.AgenRemark.Contains(tem_weight) == true)
                {
                    string w_tem = item.AgenRemark.Substring(0, item.AgenRemark.LastIndexOf(tem_weight) - 1).Trim();
                    var f_check = flightsClear.FirstOrDefault(x => x.LandTime.Trim().Equals(item.LandTime.Trim())
                                                                    && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0
                                                                    && x.Code.Trim().Equals(item.Code)
                                                                    && x.FlightNo.Trim().Equals(item.FlightNo)
                                                                    && x.AgenStatus.Equals("GROUP UPDATED")
                                                                    && x.AgenRemark.Contains(w_tem.Trim()));
                    if (f_check != null)
                        flights.Add(item);
                    else
                    {
                        var check = flightsClear.Where(x => x.LandTime.Trim().Equals(item.LandTime.Trim())
                                                        && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0
                                                        && x.Code.Trim().Equals(item.Code)
                                                        && x.FlightNo.Trim().Equals(item.FlightNo)
                                                        && x.AgenRemark.Contains(w_tem) == true).OrderByDescending(x => x.Created).First();
                        if (item.Created.Value.ToString("dd/MM/yyyy HH:mm").Equals(check.Created.Value.ToString("dd/MM/yyyy HH:mm")))
                            flights.Add(item);
                    }

                }

            }


            var group = flights.GroupBy(x => new {x.MAWB, x.Code, x.FlightNo, x.LandDate, x.LandTime })
                .Select(x => new {
                    MAWB=x.Key.MAWB,
                    Code = x.Key.Code,
                    FlightNo = x.Key.FlightNo,
                    LandDate = x.Key.LandDate,
                    LandTime = x.Key.LandTime

                }).ToList();
            foreach (var item in group)
            {
                Layer.FlightReport itemReport = new Layer.FlightReport();
                itemReport.Code = item.Code;
                itemReport.FlightNo = item.FlightNo;
                itemReport.LandDate = item.LandDate;
                itemReport.LandTime = item.LandTime;
                itemReport.MAWB = item.MAWB;
                itemReport.Pices = flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") == false && x.MAWB.Equals(item.MAWB) && x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo) && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
                itemReport.Weight = flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") == false && x.MAWB.Equals(item.MAWB) && x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo) && x.AgenRemark.Contains(tem_weight) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_weight) + tem_weight.Length)));
                itemReport.PicesMail = flights.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.MAWB.Equals(item.MAWB) && x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo) && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
                itemReport.WeightMail = flights.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.MAWB.Equals(item.MAWB) && x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo) && x.AgenRemark.Contains(tem_weight) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_weight) + tem_weight.Length)));
                flightsReal.Add(itemReport);
                SumPicesNoMail += itemReport.Pices;
                SumWeightNoMail += itemReport.Weight;
                SumPicesMail += itemReport.PicesMail;
                SumWeigthMail += itemReport.WeightMail;
            }

            ViewBag.SUMPCS = SumPicesNoMail;// flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
            ViewBag.SumGW = SumWeightNoMail; //flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") && x.AgenRemark.Contains(tem_weight) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_weight) + tem_weight.Length)));
            ViewBag.SUMPCSMAIL = SumPicesMail; //flights.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
            ViewBag.SumGWMail = SumWeigthMail;//flights.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.AgenRemark.Contains(tem_weight) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_weight) + tem_weight.Length)));
            ViewData["flightLists"] = flightsReal;*/


            return View();
        }

        private void GetSumGrai(string code, string flightNo, ref double SumPicesNoMail, ref double SumPicesMail, ref double SumWeightNoMail, ref double SumWeigthMail)
        {
            IList<Layer.FlightReport> flightsReal = new List<Layer.FlightReport>();
            IList<Layer.GraiInfo> graisList = new DataAccess.GraiInfoAccess().GetCustomByGrai(code,
                                                                                 flightNo,
                                                                                 fromDate,
                                                                                 toDate
                                                                                 );
         //   var grais = graisList.Where(x => x.AWB.Contains("Z") == false && x.GoodsContent.Contains("MAIL") == false).ToList();
            var grais = graisList.Where(x => x.AWB.Contains("Z") == false).ToList();
            var graisCheck = grais.Where(x => x.Type.Trim().Equals("PIECES") && x.Code.Trim().Equals("RECEIVED")).GroupBy(x => new { x.Group, x.GoodsContent }).ToList();
            var flightCheck = grais.GroupBy(x => new { x.FCode, x.FlightNo, x.FlightDate, x.ATATIME }).ToList();
            foreach (var item in flightCheck)
            {

                Layer.FlightReport freport = new Layer.FlightReport();
                freport.Code = item.Key.FCode;
                freport.LandDate = item.Key.FlightDate;
                freport.LandTime = item.Key.ATATIME;
                freport.FlightNo = item.Key.FlightNo;
                var flights = grais.Where(x => x.FCode.Trim().Equals(item.Key.FCode.Trim()) &&
                x.FlightNo.Trim().Equals(item.Key.FlightNo.Trim()) &&
                x.FlightDate.Value.CompareTo(item.Key.FlightDate.Value) == 0 && x.Type.Trim().Equals("FLIGHT")).ToList();
                double weight = 0;
                double pieces = 0;
                double weightMail = 0;
                double piecesMail = 0;
                foreach (var fs in flights)
                {
                    if (fs.GoodsContent.Contains("POST") == false && fs.GoodsContent.Contains("MAIL") == false)
                    {

                        weight += grais.Where(x => fs.Group.Trim().Equals(x.Group.Trim()) &&
                              x.Type.Trim().Equals("WEIGHT") && x.Code.Trim().Equals("RECEIVED")).Sum(x => Convert.ToDouble(x.Value.Replace(",", ".")));
                        pieces += grais.Where(x => fs.Group.Trim().Equals(x.Group.Trim()) && x.Type.Trim().Equals("PIECES") && x.Code.Trim().Equals("RECEIVED")).Sum(x => Convert.ToDouble(x.Value.Replace(",", ".")));
                    }
                    else
                    {
                        weightMail += grais.Where(x => fs.Group.Trim().Equals(x.Group.Trim()) &&
                             x.Type.Trim().Equals("WEIGHT") && x.Code.Trim().Equals("RECEIVED")).Sum(x => Convert.ToDouble(x.Value.Replace(",", ".")));
                        piecesMail += grais.Where(x => fs.Group.Trim().Equals(x.Group.Trim()) && x.Type.Trim().Equals("PIECES") && x.Code.Trim().Equals("RECEIVED")).Sum(x => Convert.ToDouble(x.Value.Replace(",", ".")));
                    }

                }
                freport.Pices = pieces;
                freport.Weight = weight;
                freport.WeightMail = weightMail;
                freport.PicesMail = piecesMail;

                SumPicesNoMail += pieces;
                SumWeightNoMail += weight;
                SumPicesMail += piecesMail;
                SumWeigthMail += weightMail;

                flightsReal.Add(freport);
            }
            /* foreach (var item in graisCheck)
             {
                 var itemChecks = grais.Where(x => x.Group.Trim().Equals(item.Key.Group.Trim()));
                 var flight = itemChecks.FirstOrDefault(x => x.Type.Trim().Equals("FLIGHT"));
                 var date= itemChecks.FirstOrDefault(x => x.Type.Trim().Equals("DATE"));
                 if (flight != null && flight.Value.Trim().Equals(flight.INTERNAL_NUMBER.Trim())
                     //  && date!=null && (Convert.ToDateTime(date.Value).CompareTo(fromDate)==1 && Convert.ToDateTime(date.Value).CompareTo(toDate) <0)
                     )
                 {
                     double weight = itemChecks.Where(x => x.Type.Trim().Equals("WEIGHT") && x.Code.Trim().Equals("RECEIVED")).Sum(x => Convert.ToDouble(x.Value.Replace(",", ".")));
                     double pieces = itemChecks.Where(x => x.Type.Trim().Equals("PIECES") && x.Code.Trim().Equals("RECEIVED")).Sum(x => Convert.ToDouble(x.Value.Replace(",", ".")));

                     Layer.FlightReport freport = new Layer.FlightReport();
                     freport.Code = flight.FCode;                    
                     freport.LandDate = flight.FlightDate;
                     freport.LandTime = flight.ATATIME;
                     freport.FlightNo = flight.FlightNo;

                     if (item.Key.GoodsContent.Contains("POST") == false && item.Key.GoodsContent.Contains("MAIL") == false)
                     {
                         SumPicesNoMail += pieces;
                         SumWeightNoMail += weight;
                         freport.Pices = pieces;
                         freport.Weight = weight;
                         freport.WeightMail = 0;
                         freport.PicesMail = 0;
                     }
                     else
                     {
                         SumPicesMail += pieces;
                         SumWeigthMail += weight;
                         freport.PicesMail = pieces;
                         freport.WeightMail = weight;
                         freport.Pices = 0;
                         freport.Weight = 0;
                     }
                     flightsReal.Add(freport);
                 }


             }*/

            ViewBag.SUMPCS = SumPicesNoMail;// flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
            ViewBag.SumGW = SumWeightNoMail; //flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") && x.AgenRemark.Contains(tem_weight) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_weight) + tem_weight.Length)));
            ViewBag.SUMPCSMAIL = SumPicesMail; //flights.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
            ViewBag.SumGWMail = SumWeigthMail;
            ViewBag.TotalRecord = flightsReal.Count;
            ViewData["flightLists"] = flightsReal;
        }

        [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC")]
        [DocumentExport("EXCEL", "REPORT_FLIGHT")]
        public ActionResult FLExport()
        {
            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();
            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);

            double SumPicesNoMail = 0;
            double SumWeightNoMail = 0;
            double SumPicesMail = 0;
            double SumWeigthMail = 0;
            GetSumGrai(code, flightNo, ref SumPicesNoMail, ref SumPicesMail, ref SumWeightNoMail, ref SumWeigthMail);
            ViewBag.TitleReport = fromDate.Value.Date.CompareTo(toDate.Value.Date) == 0 ? "TỔNG HỢP SẢN LƯỢNG CHUYẾN BAY NGÀY " + fromDate.Value.ToString("dd/MM/yyyy") : "TỔNG HỢP SẢN LƯỢNG CHUYẾN BAY TỪ NGÀY " + fromDate.Value.ToString("dd/MM/yyyy") + " - " + toDate.Value.ToString("dd/MM/yyyy");
            //ViewBag.FromDate = Request["fda"];
            //ViewBag.ToDate = Request["tda"];
            ViewBag.Flight = !code.Equals("ALL") || !flightNo.Equals("ALL") ? "CHUYẾN BAY " + code + (!flightNo.Equals("ALL") ? flightNo : string.Empty) : string.Empty;
            return View();


        }
        /*

        [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC")]
        [DocumentExport("EXCEL", "REPORT_FLIGHT")]
        public ActionResult FLExport()
        {

            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();

            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            double SumPicesNoMail = 0;
            double SumWeightNoMail = 0;
            double SumPicesMail = 0;
            double SumWeigthMail = 0;

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            DataAccess.FlightReportAccess flightReportAccess = new DataAccess.FlightReportAccess();

            IList<Layer.FlightReport> flightsClear = flightReportAccess.GetReportByFlightTotal(string.Empty, code,
                                                                                  flightNo,
                                                                                  fromDate,
                                                                                  toDate

                                                                                  );

            IList<Layer.FlightReport> flightsReal = new List<Layer.FlightReport>();

            var group = flightsClear.GroupBy(x => new { x.Code, x.FlightNo, x.LandDate, x.LandTime })
                .Select(x => new {

                    Code = x.Key.Code,
                    FlightNo = x.Key.FlightNo,
                    LandDate = x.Key.LandDate,
                    LandTime = x.Key.LandTime

                }).ToList();
            foreach (var item in group)
            {
                Layer.FlightReport itemReport = new Layer.FlightReport();
                itemReport.Code = item.Code;

                itemReport.FlightNo = item.FlightNo;
                itemReport.LandDate = item.LandDate;
                itemReport.LandTime = item.LandTime;

                itemReport.Pices = flightsClear.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") == false && x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo)).ToList().Sum(x => x.Pices);
                itemReport.Weight = flightsClear.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") == false && x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo)).ToList().Sum(x => x.Weight);
                itemReport.PicesMail = flightsClear.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo)).ToList().Sum(x => x.Pices);
                itemReport.WeightMail = flightsClear.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.LandTime.Trim().Equals(item.LandTime.Trim()) && x.LandDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0 && x.Code.Trim().Equals(item.Code) && x.FlightNo.Trim().Equals(item.FlightNo)).ToList().Sum(x => x.Weight);
                flightsReal.Add(itemReport);
                SumPicesNoMail += itemReport.Pices;
                SumWeightNoMail += itemReport.Weight;
                SumPicesMail += itemReport.PicesMail;
                SumWeigthMail += itemReport.WeightMail;
            }

            ViewBag.SUMPCS = flightsClear.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") == false).ToList().Sum(x => x.Pices);// flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
            ViewBag.SumGW = SumWeightNoMail; //flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") && x.AgenRemark.Contains(tem_weight) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_weight) + tem_weight.Length)));
            ViewBag.SUMPCSMAIL = SumPicesMail; //flights.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
            ViewBag.SumGWMail = SumWeigthMail;//flights.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.AgenRemark.Contains(tem_weight) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_weight) + tem_weight.Length)));
            ViewData["flightLists"] = flightsReal;
            ViewBag.TitleReport = fromDate.Value.Date.CompareTo(toDate.Value.Date) == 0 ? "TỔNG HỢP SẢN LƯỢNG CHUYẾN BAY NGÀY " + fromDate.Value.ToString("dd/MM/yyyy") : "TỔNG HỢP SẢN LƯỢNG CHUYẾN BAY TỪ NGÀY " + fromDate.Value.ToString("dd/MM/yyyy") + " - " + toDate.Value.ToString("dd/MM/yyyy");
            //ViewBag.FromDate = Request["fda"];
            //ViewBag.ToDate = Request["tda"];
            ViewBag.Flight = !code.Equals("ALL") || !flightNo.Equals("ALL") ? "CHUYẾN BAY " + code + (!flightNo.Equals("ALL") ? flightNo : string.Empty) : string.Empty;
            return View();


        }*/
    }
}
