using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class FlightExport
    {
        public string FlightID { set; get; }
        public string Code { get; set; }
        public string FlightNo { get; set; }
        public string Route { get; set; }
        public string FlightType { get; set; }
        public DateTime? Scheduled { get; set; }
        public string ScheduledTime { get; set; }
        public DateTime? Expected { get; set; }
        public string ExpectedTime { get; set; }
        public DateTime? LastAccepted { get; set; }
        public string LastAcceptedTime { get; set; }
        public DateTime? Actualed { get; set; }
        public string ActualTime { get; set; }
        public bool Departed { get; set; }
    }
}
