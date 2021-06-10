using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class GraiInfo
    {
        
        public Int64 LagiId { get; set; }
        public string FCode { get; set; }
        public string FlightNo { get; set; }
        public DateTime? FlightDate { get; set; }
        public string ATATIME { get; set; }
        public string ScheTime { get; set; }
        public string INTERNAL_NUMBER { get; set; }
        public string Prefix { get; set; }
        public string ORGIN { get; set; }
        public string LOADING { get; set; }
        public string DEST { get; set; }
        public string AWB { get; set; }
        public string HAWB { get; set; }
        public string Agent { get; set; }
        public string AgentCode { get; set; }
        public string Shipper { get; set; }
        public string ShipperADDR { get; set; }
        public string Consignee { get; set; }
        public string ConsignADDR { get; set; }
        public string QuantityExpected { get; set; }
        public string WeightExpected { get; set; }
        public string QuantityReceived { get; set; }
        public string WeightReceived { get; set; }
        public string QuantityDelivered { get; set; }
        public string GoodsContent { get; set; }
        public string Group { get; set; }
        public string Type { get; set; }
        public string Code { get; set; }
        public string Value { get; set; }
        public string Number { get; set; }
    }
}
