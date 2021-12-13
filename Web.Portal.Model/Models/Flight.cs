using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("Flight")]
    public class Flight
    {
        public int ID { set; get; }
        public Guid FlightID { set; get; }
        public string FlightNumber { set; get; }
        public DateTime? Schedule { set; get; }
        public DateTime? LandedDate { set; get; }
        public DateTime? Created { set; get; }
        public bool Status { set; get; }
        public string FlightType { set; get; }
        public int? FLUI_SCHEDULE_DATE { set; get; }
        public int? FLUI_SCHEDULE_TIME { set; get; }
        public int? FLUI_LANDED_TIME { set; get; }
        public int? FLUI_LANDED_DATE { set; get; }
        public string FlightTypeOfAirCraft { set; get; }
        public int? SOPTIME { set; get; }
        public int? AlertTime1 { set; get; }
        public int? AlertTime2 { set; get; }
        public int? AlertTime3 { set; get; }
        public string FlightLetter { set; get; }
        public DateTime? FinishTime { set; get; }
        public int? SHCTIME { set; get; }
        public int? AlertSHC1 { set; get; }
        public int? AlertSHC2 { set; get; }
        public string Flight_Int_Number { set; get; }


    }
}
