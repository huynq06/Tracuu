using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel.eInvoiceViewModel
{
    [Serializable]
    public class OrderDetailViewModel
    {
        public int ID { set; get; }
        public string InvoiceIns { set; get; }
        public string InvoiceLineIns { set; get; }
        public string Item { set; get; }
        public double Quantity { set; get; }
        public decimal UnitPrice { set; get; }
        public string Unit { set; get; }
        public int Tax { set; get; }
        public decimal VAT { set; get; }
        public decimal Amount { set; get; }
        //default:0 ; Update: 1; Insert:2; Delete: 3
        public int Action { set; get; }
    }
}
