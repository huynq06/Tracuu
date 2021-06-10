using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("FlightConfig")]
    public class FlightConfig
    {
        public int ID { set; get; }
        public string FlightNumber {set;get; }
        public string FlightType { set; get; }
        public string FlightTypeOfAirCraft { set; get; }
        public int? SopTime { set; get; }
        public int? AlertTime1 { set; get; }
        public int? AlertTime2 { set; get; }
        public int? AlertTime3 { set; get; }
        public int? SHCTIME { set; get; }
        public int? AlertSHC1 { set; get; }
        public int? AlertSHC2 { set; get; }
        public int? FinalLoad { set; get; }

    }
}
