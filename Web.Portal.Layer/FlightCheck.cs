using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class FlightCheck
    {
        public string FlightNo { get; set;}
        public DateTime? FlightDate { get; set; }
        public string FlightTime { get; set; }
        public string FType { get; set; }
        public DateTime? Created { set; get; }
    }
}
