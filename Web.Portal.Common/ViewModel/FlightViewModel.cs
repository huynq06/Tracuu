using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class FlightViewModel
    {
        public int ID { set; get; }
        public Guid FlightID { set; get; }
        public string FlightNumber { set; get; }
        public int? ULDFinish { set; get; }
        public int? ULDProcessing { set; get; }
        public int ULDTotal { set; get; }
        public int ULDRemain { set; get; }
        public DateTime ScheduleDate { set; get; }
        public DateTime? LandedDate { set; get; }
        public int TimeProcess { set; get; }
        public DateTime? TimeToFinish { set; get; }
        public int TimeToSop { set; get; }
        public int? SopTime { set; get; }
        public int? AlertTime1 { set; get; }
        public int? AlertTime2 { set; get; }
        public int? AlertTime3 { set; get; }
        public string Type { set; get; }
        public string AcraftType { set; get; }
        public bool Status { set; get; }

    }
}
