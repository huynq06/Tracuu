using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class LocationViewModel
    {
        public int LocationID { set; get; }
        public string LocationName { set; get; }
        public int? UldID { set; get; }
        public Guid? FlightID { set; get; }
        public string ULDName { set; get; }
        public string ULDType { set; get; }
        public int? UldOperation { set; get; }
        public int? UldNotify { set; get; }
        public DateTime? StartTime { set; get; }
        public int? TimeProcess { set; get; }
        public int? TimeOperation { set; get; }
        public string FlightNumber { set; get; }
        public int? Status { set; get; }
    }
}
