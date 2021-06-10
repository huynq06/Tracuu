using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class UldByFlightViewModel
    {
        public int ID { set; get; }
        public string Name { set; get; }
        public int? Status { set; get; }
        public Guid Flight_ID { set; get; }
        public string FlightNumber { set; get; }
        public int TotalAwb { set; get; }
    }
}
