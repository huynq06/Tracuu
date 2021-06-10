using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class ReportImp
    {
        public int QuantityExpected { get; set; }
        public double WeightExpected { get; set; }
        public int QuantityReceived { get; set; }
        public double WeightReceived { get; set; }
        public int QuantityDelivery { get; set; }
        public double WeightDelivery { get; set; }
    }
}
