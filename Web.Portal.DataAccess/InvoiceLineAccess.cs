using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Common.ViewModel;

namespace Web.Portal.DataAccess
{
    public class InvoiceLineAccess : DataBase.OracleProvider
    {
        private InvoiceDetailAwbViewModel GetProperties(OracleDataReader reader)
        {
            InvoiceDetailAwbViewModel objInvoice = new InvoiceDetailAwbViewModel();
            objInvoice.InvoiceIsn = Convert.ToString(GetValueField(reader, "INVOICEISN", string.Empty));
            objInvoice.Des = Convert.ToString(GetValueField(reader, "DES", string.Empty));
            objInvoice.TotalAmount = Convert.ToDouble(GetValueField(reader, "AMOUNT", 0));
            objInvoice.TotalVatAmount = Convert.ToDouble(GetValueField(reader, "VAT", 0));
            objInvoice.TotalAmountReturn = objInvoice.TotalAmount + objInvoice.TotalVatAmount;

            return objInvoice;
        }
        public List<InvoiceDetailAwbViewModel> GetAllInvoice(List<Web.Portal.Layer.Invoice> invoices)
        {
            string listInvoice = "";
            for (int i = 0; i < invoices.Count; i++)
            {
                if (i == 0)
                {
                    listInvoice += "'" + invoices[0].InvoiceIsn + "'";
                }
                else
                {
                    listInvoice += "," + "'" + invoices[i].InvoiceIsn + "'";
                }
            }
            List<InvoiceDetailAwbViewModel> Invoices = new List<InvoiceDetailAwbViewModel>();
                string sql = "select distinct invl.invl_invoice_isn as INVOICEISN,"
    + "invl.invl_description as DES,"
    + "invl.invl_amount as AMOUNT,"
    + "invl.invl_vat as VAT,"
    + "invl.invl_vat_percentage as PERCENTAGE "
    + "from invl_invoice_lines invl "
    + "where invl.invl_invoice_isn in (" + listInvoice + ")";

                using (OracleDataReader reader = GetScriptOracleDataReader(sql))
                {
                    while (reader.Read())
                    {
                        Invoices.Add(GetProperties(reader));
                    }
                }

            
          
            return Invoices;

        }
    }
}
