using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("HermesInvoice")]
    public class HermesInvoice
    {
        public int ID { set; get; }
        public string InvoiceIsn { set; get; }
        public string InvoiceRunIsn { set; get; }
        public string Payment { set; get; }
        public string InvoiceNumber { set; get; }
        public string InvoiceType { set; get; }
        public DateTime InvoiceDate { set; get; }
        public decimal InvoiceTotalAmount { set; get; }
        public decimal InvoiceTotalVatAmount { set; get; }
        public string AWB_Prefix { set; get; }
        public string AWB_Serial { set; get; }
        public string Hawb { set; get; }
        public DateTime InvoiceDatime { set; get; }
        public string KundName { set; get; }
        public string PersonName { set; get; }
        public string Address { set; get; }
        public string TaxCode { set; get; }
        public bool Status { set; get; }
        public int Retry { set; get; }
        public string ObjectType { set; get; }
        public string InvoiceLink { set; get; }
        public DateTime? Created { set; get; }
        public DateTime? TimeSent { set; get; }
        public DateTime? TimeReponse { set; get; }
        public string ExecuteTime { set; get; }
        public string EInvoiceLink { set; get; }
        public int? Sequence { set; get; }
        public decimal InvoiceTotalNoVatAmount { set; get; }
        public string AWB { set; get; }
        public int? InvoiceStatus { set; get; }
        public string ReferenceNo { set; get; }
        public string InvoiceDescription { set; get; }
        public bool? IsCancel { set; get; }
        public string Email { set; get; }
        public string Phone { set; get; }
        public string Note { set; get; }
        public DateTime? CancelDateTime { set; get; }
        public int? ExceptionStatus { set; get; }
        public string EInvoiceSearchLink { set; get; }
        public string SearchCode { set; get; }
        public string CancelReason { set; get; }
        public string PaymentDescription { set; get; }

        //  [ID]
        //,[InvoiceIsn]
        //,[InvoiceRunIsn]
        //,[Payment]
        //,[InvoiceNumber]
        //,[InvoiceType]
        //,[InvoiceDate]
        //,[InvoiceTotalAmount]
        //,[InvoiceTotalVatAmount]
        //,[AWB_Prefix]
        //,[AWB_Serial]
        //,[Hawb]
        //,[InvoiceDatime]
        //,[KundName]
        //,[PersonName]
        //,[Address]
        //,[TaxCode]
        //,[Status]
        //,[Retry]
        //,[ObjectType]
    }
}
