using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Web.Portal.Utils;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,MEMBER,HAIQUAN,KHOKEODAI,CUSTOMER")]
    public class FlightController : GuestController
    {
        private DateTime? fromDate;
        private DateTime? toDate;
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Alert()
        {
            int total = 0;
            fromDate = DateTime.Now.Date;
            toDate = DateTime.Now.Date;

            IList<Layer.Flight> flights = new DataAccess.FlightAccess().GetPaging(1,
                                                                                  Int32.MaxValue,
                                                                                  "ALL",
                                                                                  "ALL",
                                                                                  fromDate,
                                                                                  toDate,
                                                                              ref total);
            TimeSpan currentDate = TimeSpan.Parse(DateTime.Now.ToString("HH:mm"));
            TimeSpan tfr = currentDate.Add(-TimeSpan.Parse("00:02"));
            TimeSpan tto = currentDate.Add(TimeSpan.Parse("00:03"));

            var alertfl = flights.Where(x => !string.IsNullOrEmpty(x.LandTime.Trim())
                                        //&& TimeSpan.Parse(x.LandTime).CompareTo(tfr) >= 0
                                        // && tto.CompareTo(TimeSpan.Parse(x.LandTime)) >= 0
                                        && (x.Code.Equals("KE")
                                        )
                                      ).ToList();
            var alertata = flights.Where(x => !string.IsNullOrEmpty(x.LandTime.Trim())
                                        && (x.Code.Equals("KE"))
                                     //&& TimeSpan.Parse(x.LandTime).Add(TimeSpan.Parse("00:40")).CompareTo(currentDate.Add(-TimeSpan.Parse("00:02"))) >= 0
                                     //&& TimeSpan.Parse(x.LandTime).Add(TimeSpan.Parse("00:40")).CompareTo(currentDate) <= 0
                                     ).ToList();
            StringBuilder ms = new StringBuilder();
            foreach (var item in alertfl)
            {
                TimeSpan landed = TimeSpan.Parse(item.LandTime);
                ms.Append(string.Format(Utils.Constants.ALERT_FL, item.Code + item.FlightNo, landed.Hours, landed.Minutes));
            }

            foreach (var item in alertata)
            {
                ms.Append(string.Format(Utils.Constants.ALERT_ATA, item.Code + item.FlightNo));
            }
            ViewBag.Translate = ms.ToString();
            return View();
        }
        public ActionResult List()
        {
            int total = 0;
            fromDate = DateTime.Now.Date.AddDays(-2);
            toDate = DateTime.Now.Date;
            DataAccess.FlightCheckAccess flightCheckAccess = new DataAccess.FlightCheckAccess();
            IList<Layer.FlightCheck> flightChecks = flightCheckAccess.GetAll(DateTime.Now);
            IList<Layer.FlightCheck> flightChecksBack = flightCheckAccess.GetAll(DateTime.Now.AddDays(-1));
            IList<Layer.FlightRCF> flightRCFs = new DataAccess.FlightRCFAccess().GetAll();
            IList<Layer.Flight> flights = new DataAccess.FlightAccess().GetPaging(1,
                                                                                   Int32.MaxValue,
                                                                                   "ALL",
                                                                                   "ALL",
                                                                                   fromDate,
                                                                                   toDate,
                                                                               ref total);
            TimeSpan currentDate = TimeSpan.Parse(DateTime.Now.ToString("HH:mm"));
            TimeSpan tfr = currentDate.Add(-TimeSpan.Parse("00:40"));
            TimeSpan tto = currentDate.Add(TimeSpan.Parse("00:40"));
            var alertfl = flights.Where(x => !string.IsNullOrEmpty(x.LandTime.Trim())
                                       && x.LandDate.Value.Date.CompareTo(DateTime.Now.Date) == 0
                                       && TimeSpan.Parse(x.LandTime).CompareTo(tfr) >= 0
                                       && tto.CompareTo(TimeSpan.Parse(x.LandTime)) >= 0
                                      ).ToList();
            var alertata = flights.Where(x => !string.IsNullOrEmpty(x.LandTime.Trim())
                                      && x.LandDate.Value.Date.CompareTo(DateTime.Now.Date) == 0
                                      && ((x.FlightType.ToUpper().Trim().Equals("C")
                                      && TimeSpan.Parse(x.LandTime).Add(TimeSpan.Parse("00:40")).CompareTo(currentDate.Add(-TimeSpan.Parse("00:30"))) >= 0
                                      && TimeSpan.Parse(x.LandTime).Add(TimeSpan.Parse("00:40")).CompareTo(currentDate) <= 0)
                                      ||
                                      (x.FlightType.ToUpper().Trim().Equals("P")
                                      && TimeSpan.Parse(x.LandTime).Add(TimeSpan.Parse("00:55")).CompareTo(currentDate.Add(-TimeSpan.Parse("00:30"))) >= 0
                                      && TimeSpan.Parse(x.LandTime).Add(TimeSpan.Parse("00:55")).CompareTo(currentDate) <= 0)
                                        )
                                     ).ToList();
            IList<Layer.Flight> alertrcfs = new List<Layer.Flight>();
            alertrcfs = flights.Where(x => !string.IsNullOrEmpty(x.LandTime.Trim())).ToList();
            StringBuilder ms = new StringBuilder();
            foreach (var item in alertfl)
            {
                if (flightChecks.Count(x => x.FlightNo.Trim().ToUpper().Equals(item.Code.ToUpper().Trim() + item.FlightNo.ToUpper().Trim()) && x.FType.Equals("ATA") && x.FlightTime.Trim().Equals(item.LandTime.Trim())) <= 2)
                {
                    flightCheckAccess.Add(new Layer.FlightCheck() { FlightNo = item.Code + item.FlightNo, FlightDate = item.LandDate, FlightTime = item.LandTime, FType = "ATA", Created = DateTime.Now });
                    TimeSpan landed = TimeSpan.Parse(item.LandTime);

                    ms.Append(string.Format(Utils.Constants.ALERT_FL, formatFlight(item.Code + item.FlightNo), landed.Hours, landed.Minutes));
                    Log.WriteLog(ms.ToString(), "alertflFlightLog");
                }
            }
            foreach (var item in alertata)
            {

                if (flightChecks.Count(x => x.FlightNo.Trim().ToUpper().Equals(item.Code.ToUpper().Trim() + item.FlightNo.ToUpper().Trim()) && x.FType.Equals("ATA40") && x.FlightTime.Trim().Equals(item.LandTime.Trim())) <= 2)
                {
                    flightCheckAccess.Add(new Layer.FlightCheck() { FlightNo = item.Code + item.FlightNo, FlightDate = item.LandDate, FlightTime = item.LandTime, FType = "ATA40", Created = DateTime.Now });
                    ms.Append(string.Format(Utils.Constants.ALERT_ATA, formatFlight(item.Code + item.FlightNo)));
                    Log.WriteLog(ms.ToString(), "ATAFlightLog");
                }
            }
            foreach (var item in alertrcfs)
            {

                if (item.LandDate.Value != DateTime.MinValue && (item.LandDate.Value.Date == DateTime.Now.Date || item.LandDate.Value == DateTime.Now.AddDays(-1).Date))
                {
                    int tc = CheckTime(flightRCFs, item.Code.ToUpper().Trim(), item.LandDate.Value, TimeSpan.Parse(item.LandTime), currentDate);
                    if (tc != 0)
                    {
                        if (flightChecks.Count(x => x.FlightNo.Trim().ToUpper().Equals(item.Code.ToUpper().Trim() + item.FlightNo.ToUpper().Trim()) && x.FType.Equals("RCF" + tc) && x.FlightTime.Trim().Equals(item.LandTime.Trim()) && x.FlightDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0) <= 2
                            && flightChecksBack.Count(x => x.FlightNo.Trim().ToUpper().Equals(item.Code.ToUpper().Trim() + item.FlightNo.ToUpper().Trim()) && x.FType.Equals("RCF" + tc) && x.FlightTime.Trim().Equals(item.LandTime.Trim()) && x.FlightDate.Value.Date.CompareTo(item.LandDate.Value.Date) == 0) <= 2
                            )
                        {
                            flightCheckAccess.Add(new Layer.FlightCheck() { FlightNo = item.Code + item.FlightNo, FlightDate = item.LandDate, FlightTime = item.LandTime, FType = "RCF" + tc, Created = DateTime.Now });
                            ms.Append(string.Format(Utils.Constants.ALERT_RCF, formatFlight(item.Code + item.FlightNo), item.LandDate.Value.Day + " tháng " + item.LandDate.Value.Year, tc));
                            Log.WriteLog(ms.ToString(), "RCFFlightLog");
                        }
                    }
                }
            }
            if (!string.IsNullOrEmpty(ms.ToString()))
            {
                Log.WriteLog(ms.ToString());
            }
            ViewBag.Translate = ms.ToString();
            ViewData["flightLists"] = flights.Where(x => (x.ScheDate.Value.Date.CompareTo(DateTime.Now.Date) == 0) || (x.ScheDate.Value.Date.CompareTo(DateTime.Now.Date) != 0 && x.LandDate.HasValue == false)).ToList();
            return View();
        }
        private int CheckTime(IList<Layer.FlightRCF> flightRCF, string code, DateTime date, TimeSpan time, TimeSpan timeCurrent)
        {
            var f = flightRCF.FirstOrDefault(x => x.FlightNo.Trim().ToUpper().Equals(code.Trim().ToUpper()));
            if (f == null)
                return 0;
            DateTime dt = date + time;
            DateTime tc = dt.Add(TimeSpan.Parse((f.TimeCheck / 60) + ":" + (f.TimeCheck % 60)));
            double rs = (double)Math.Round((tc - DateTime.Now).TotalMinutes, 0);
            //double rs = tc.TotalMinutes - DateTime.Now.TotalMinutes;
            if (rs <= 50 && rs >= 50)
                return 50;
            if (rs <= 30 && rs >= 30)
                return 30;
            if (rs <= 10 && rs >= 10)
                return 10;
            return 0;
        }
        private string formatFlight(string f)
        {
            char[] fl = f.ToCharArray();

            return string.Join(" ", fl);
        }
    }
}
