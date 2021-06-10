using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class HawbInFlightViewModel
    {
        public string FlightNo { set; get; }
        public string ScheduleDate { set; get; }
        public string ScheduleTime { set; get; }
        public string ATADate { set; get; }
        public string ATATime { set; get; }
        public string EstimateDate { set; get; }
        public string EstimateTime { set; get; }
        public int PiecesReceive { set; get; }
        public double WeightsReceive { set; get; }
        public string GoodName { set; get; }
        public string ULD { set; get; }
    }
}
