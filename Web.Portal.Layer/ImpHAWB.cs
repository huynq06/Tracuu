using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class ImpHAWB
    {
        public string Lagi_Master_Ident { set; get; }
        public string Lagi_Ident { set; get; }
        public string HAWB { get; set; }
        public string GOODSNAME { get; set; }
        public string CONSIGNEE { get; set; }
        public string CONSIGNEEADDR { get; set; }
      
        public string QuantityExpected { get; set; }
        public string WeightExpected { get; set; }
        public string QuantityReceived { get; set; }
        public string WeightReceived { get; set; }
        public string QuantityDelivered { get; set; }
        public string StatusDelivered { get; set; }
      
    }
}
