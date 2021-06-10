using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("FLightFlup")]
    public class FLightFlup
    {
        public int ID { set; get; }
        public string FlightID { set; get; }
        public string FLightNumber { set; get; }
        public string FlightAirCraffType { set; get; }
        public string FlightType { set; get; }
        public DateTime STD { set; get; }
        public DateTime ETD { set; get; }
        public DateTime? LAT { set; get; }
        public DateTime Created { set; get; }
        public string BookingFlight { set; get; }
        public int FinalLoad { set; get; }
        public DateTime? FinishTime { set; get; }
        public int? TotalULD { set; get; }
        public int? RemainULD { set; get; }
        public int? NeedPosition { set; get; }
        public int? ManPower { set; get; }
        public string Remark { set; get; }

        public int? TotalPosition { set; get; }
        public int? FinishTimePerUld { set; get; }
        public int? UldLoaded { set; get; }
        public int? FlightStatus { set; get; }
        public int? FlightDeleted { set; get; }


    }
}
