using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class InvoiceDetailAwbViewModel
    {
        public string InvoiceLineIsn { set; get; }
        public string InvoiceIsn { set; get; }
        public string LineNo { set; get; }
        public string Des { set; get; }
        public double TotalAmount { set; get; }
        public double TotalVatAmount { set; get; }
        public double TotalAmountReturn { set; get; }
      
    }
}
