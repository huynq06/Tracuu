using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class InvoiceApiViewModel
    {
        public string InvoiceID { set; get; }
        public string InvoiceNumber { set; get; }
        public string eInvoiceNumber { set; get; }
        public int InvoiceStatus { set; get; }
        public string InvoiceDescription { set; get; }
        public string Awb { set; get; }
        public string Hawb { set; get; }
        public string Serial { set; get; }
        public string Form { set; get; }
    }
}
