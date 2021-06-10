using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("HermesInvoiceDetail")]
    public class HermesInvoiceDetail
    {
        public int ID { set; get; }
        public string InvoiceIns { set; get; }
        public string InvoiceLineIns { set; get; }
        public string Item { set; get; }
        public string Unit { set; get; }
        public double Quantity { set; get; }
        public decimal UnitPrice { set; get; }
        public decimal Amount { set; get; }
        public string TaxRate { set; get; }
        public decimal VAT { set; get; }
        public bool? MinCharged { set; get; }
        //  [ID]
        //,[InvoiceIns]
        //,[InvoiceLineIns]
        //,[Item]
        //,[Unit]
        //,[Quantity]
        //,[UnitPrice]
        //,[Amount]
        //,[TaxRate]
        //,[VAT]
        //,[MinCharged]
    }
}
