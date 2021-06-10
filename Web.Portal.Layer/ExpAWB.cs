using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class ExpAWB
    {
        public Int64 ID { get; set; }
        public string FlightNo { get; set; }
        public DateTime? FlightDate { get; set; }
        public string ATATIME { get; set; }
        public string Prefix { get; set; }
        public string ORGIN { get; set; }
        public string DEST { get; set; }
        public string AWB { get; set; }
        public string HAWB { get; set; }
        public string Agent { get; set; }
        public string AgentCode { get; set; }
        public string Shipper { get; set; }
        public string ShipperADDR { get; set; }
        public string Consignee { get; set; }
        public string ConsignADDR { get; set; }
        public string Quantity { get; set; }
        public string Weight{ get; set; }
        public int Status { set; get; }
       
       
       // public DateTime? DateIn { get; set; }
        //public DateTime? DateOut { get; set; }
        //public DateTime? DateStatus { get; set; }
    }
}
