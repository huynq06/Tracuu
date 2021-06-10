using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Layer;

namespace Web.Portal.Common.ApiViewModel
{
    public class ResultFlightExp
    {
        public int total { set; get; }
        public List<FlightExport> Flights { set; get; }
    }
}
