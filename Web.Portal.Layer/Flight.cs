using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Layer
{
   public class Flight
    {
        public string FlightID { set; get; }
        public string Code { get; set; }
        public string FlightNo { get; set; }
        public DateTime? ScheDate { get; set; }
        public string ScheTime { get; set; }
        public DateTime? LandDate { get; set; }
        public string LandTime { get; set; }
        public string FlightType { get; set; }
    }
}
