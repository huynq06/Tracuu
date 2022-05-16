using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class InvoiceDetailViewModel
    {
        public int ID { set; get; }
        public string Item { set; get; }
        public string Unit { set; get; }
        public double Quantity { set; get; }
        public decimal UnitPrice { set; get; }
        public decimal VAT { set; get; }
    }
}
