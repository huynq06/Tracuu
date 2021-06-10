using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class FLUPViewModel 
    {
        public string FLUP_INT_NUMBER { set; get; }
        public string FLUP_FLIGHT_NO_LVG { set; get; }
        public string FLUP_FLIGHT_NO { set; get; }
        public double FLUP_FREIGHT_TOTAL_IN_KG { set; get; }
        public string FLUP_AIRPORT_CODE_1 { set; get; }
        public DateTime FLUP_SCHEDULED_DATE { set; get; }
        public DateTime FLUP_ESTIMATED_DATE { set; get; }
        public string FLUP_DEPARTED_DATE { set; get; }
        public int FLUP_ACTUAL_DATE { set; get; }
        public string FLUP_TYPE_OF_AIRPLANE { set; get; }
        public string FLUP_TYPE { set; get; }
    }
}
