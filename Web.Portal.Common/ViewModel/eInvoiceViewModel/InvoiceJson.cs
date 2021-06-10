using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class InvoiceJson
    {
        public Account user { set; get; }
        public InvoiceFields inv { set; get; }
    }
}
