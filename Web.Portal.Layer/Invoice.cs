using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class Invoice
    {
        public string No { get; set; }
        public string Awb_Prefix { get; set; }
        public string Awb_No { get; set; }
        public string Hawb { get; set; }
        public double Amount_No_Vat { get; set; }
        public double Amount_Vat { get; set; }
        public string Vat { get; set; }
        public double Amount_Total { get; set; }
        public string Customer_Name { get; set; }
        public string Payment { get; set; }
        public string PersonName { get; set; }
        public string InvoiceType { set; get; }
        public string InvoiceIsn { set; get; }
        public string InvoiceDate { set; get; }
    }
}
