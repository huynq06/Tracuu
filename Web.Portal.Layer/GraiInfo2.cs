using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class GraiInfo2
    {
        public Int64 LagiId { get; set; }
        public string FlightNo { get; set; }
        public string ATA_DATE { get; set; }
        public string ATA_TIME { get; set; }
        public string AWB { get; set; }
        public string HAWB { get; set; }
        public int QuantityExpected { get; set; }
        public string Group { get; set; }
        public string Type { get; set; }
        public string Code { get; set; }
        public string Value { get; set; }
        public string GoodsContent { get; set; }
        public string Shipper { get; set; }
        public string ShipperADDR { get; set; }
        public string Consignee { get; set; }
        public string ConsignADDR { get; set; }
        public string NumberValue { get; set; }
    }
}
