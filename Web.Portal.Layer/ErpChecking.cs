using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class ErpChecking
    {
        public string InvoiceIsn { set; get; }
        public DateTime? InvoiceDate { set; get; }
        public string InvoiceNumber { set; get; }
        public string InvoiceType { set; get; }
        public string ObjectType { set; get; }
        public int Status { set; get; }
    }
}

