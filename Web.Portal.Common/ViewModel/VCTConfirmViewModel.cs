using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class VCTConfirmViewModel
    {
        public int ID { set; get; }
        public string LABS_IDENT_NO { set; get; }
        public string LABS_AWB { set; get; }
        public int? LABS_QUANTITY_BOOKED { set; get; }
        public double? LABS_WEIGHT_BOOKED { set; get; }
        public string AGENT_NAME { set; get; }
        public string BOOKING_FLIGHT { set; get; }
        public DateTime? LABS_CREATED_AT { set; get; }
        public string LOADING { set; get; }
        public int? AWB_STATUS { set; get; }
        public string LAST_GROUP { set; get; }
        public int? LABS_EXPECT { set; get; }
        public int? LABS_RECIEVED { set; get; }
        public int? LOCATION { set; get; }
        public DateTime? LABS_PROCESS_AT { set; get; }
        public int? SortValue { set; get; }
        public DateTime? CutOffTime { set; get; }
        public string CargoType { set; get; }
        public DateTime? LABS_DIM_AT { set; get; }
        public string Note { set; get; }
        public int? ConfirmStatus { set; get; }
        public DateTime? LABS_CONFIRMED_AT { set; get; }
        public DateTime? LABS_ASIGNED_AT { set; get; }
        public int? TimeFromConfirm { set; get; }
    }
}
