using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class FlightReport
    {
        public string Code { get; set; }
        public string Prefix { get; set; }
        public string MAWB { get; set; }
        public string FlightNo { get; set; }
        public DateTime? ScheDate { get; set; }
        public string ScheTime { get; set; }
        public DateTime? LandDate { get; set; }
        public string LandTime { get; set; }
        public double Pices { get; set; }
        public double Weight { get; set; }
        public double PicesMail { get; set; }
        public double WeightMail { get; set; }
        public string GoodsContent { get; set; }
        public string AgenRemark { get; set; }
        public string AgenStatus { get; set; }
        public DateTime?Created { get; set; }
    }
}
