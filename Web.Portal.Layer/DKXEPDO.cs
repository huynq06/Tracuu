using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class DKXEPDO
    {
        public string FLIGHT_NO { get; set; }
        public string SCHEDULE_DATE { get; set; }
        public string AWB { get; set; }
        public string HAWB { get; set; }
        public int EXPECTED_QUANTITY { get; set; }
        public double EXPECTED_WEIGHT { get; set; }
        public string NATURE { get; set; }
    }
}
