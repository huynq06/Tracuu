using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class ULDViewModel
    {
        public int UldID { set; get; }
        public string ULDName { set; get; }
        public int? Status { set; get; }
        public string StatusMessage { set; get; }
        public string FlightNumber { set; get; }
        public string LocationName { set; get; }
        public Guid Flight_ID { set; get; }
        public int? ULDTypeID { set; get; }
        public string ULDType { set; get; }
        public DateTime? StartTime { set; get; }
        public DateTime? FinishTime { set; get; }
        public string NotifyMessage { set; get; }
        public string Note { set; get; }
        public int LocationID { set; get; }
        public int? UldOperation { set; get; }
        public int UldNotify { set; get; }
        public int? TimeOperation { set; get; }
        public int? NotifyID { set; get; }
        public string FlightNUmber { set; get; }
        public int? StandartTime { set; get; }

    }
}
