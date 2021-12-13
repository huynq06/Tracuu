using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Web.Portal.Model.Models
{
    [Table("FlightIrr")]
    public  class FlightIrr
    {
        public int ID { get; set; }
        public string FlightID { get; set; }
        public string FLightNo { set; get; }
        public Nullable<System.DateTime> FlightDate { get; set; }
        public string LandedTime { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> FlightStatus { get; set; }
        public string FlightDescription { get; set; }
        public string Org { get; set; }
        public string Des { get; set; }
        public Nullable<bool> WeatherRain { get; set; }
        public Nullable<bool> WeatherDry { get; set; }
        public Nullable<bool> WeatherOther { get; set; }
        public string WeatherDes { get; set; }
    }
}
