using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Model.Models;
using Web.Portal.Common.ViewModel;
using Web.Portal.Layer;

namespace Web.Portal.DataAccess
{
    public class ERPCheckAccess : DataBase.OracleProvider
    {
        private ErpChecking GetProperties(OracleDataReader reader)
        {
            ErpChecking erp = new ErpChecking();
            erp.InvoiceIsn = Convert.ToString(GetValueField(reader, "INVOICE_ISN", string.Empty));
            erp.InvoiceNumber = Convert.ToString(GetValueField(reader, "INVOICE_NUMBER", string.Empty));
            erp.InvoiceDate = Convert.ToDateTime(GetValueDateTimeField(reader, "INVOICE_DATE", erp.InvoiceDate));
            erp.InvoiceType = Convert.ToString(GetValueField(reader, "INVOICE_TYPE", string.Empty));
            erp.ObjectType = Convert.ToString(GetValueField(reader, "OBJECT_TYPE", string.Empty));
            erp.Status = Convert.ToInt32(GetValueField(reader, "INVOICE_STATUS", 0));
            return erp;
        }
        public List<ErpChecking> CheckDataErp(string fda, string tda, string object_type, string invoice_type, string tt)
        {

            string sql = "select m.INVOICE_ISN as INVOICE_ISN, " +
"ivh.invh_invoice_number as INVOICE_NUMBER, " +
"ivh.invh_invoice_date as INVOICE_DATE, " +
"ivh.invh_invoice_type as INVOICE_TYPE, " +
"m.INVOICE_STATUS, " +
"iod.iobd_object_type as OBJECT_TYPE " +
 "from (select " +
       "to_char(ivh.invh_invoice_isn) as INVOICE_ISN, " +
       "ivh.invh_invoice_number, " +
       "ivh.invh_invoice_type, " +
       "0 as INVOICE_STATUS " +
"from INVH_INVOICE_HEADER ivh " +
"WHERE ivh.invh_invoice_type IN('CREDITNOTE', 'CASH', 'INVOICE', 'DEBIT NOTE') " +
  "AND ivh.invh_invoice_date BETWEEN to_date('" + fda + "', 'DD/MM/YYYY') AND to_date('" + tda + "', 'DD/MM/YYYY') " +
  "AND ivh.invh_invoice_isn NOT IN(SELECT t.ZO_HEADER_ID FROM REPORT.INVOICE_TEMP t) " +
  "and ivh.invh_invoice_isn NOT IN(select ck.invoice_isn from ALSC_H5_ERP_ZINT_CHECK ck ) " +
"union all " +
"select ck.invoice_isn as INVOICE_ISN, " +
"'00000' as invh_invoice_number, " +
"ck.type as invh_invoice_type, " +
"-1 as INVOICE_STATUS " +
 "from ALSC_H5_ERP_ZINT_CHECK ck " +
"where ck.existed = -1 " +
//"and  (to_date(ck.doc_date, 'yyyy-mm-dd') " +
//"BETWEEN to_date('" + fda + "', 'DD/MM/YYYY') AND to_date('" + tda + "', 'DD/MM/YYYY') " +
//" or to_date(ck.billing_date, 'yyyy-mm-dd') BETWEEN to_date('" + fda + "', 'DD/MM/YYYY') AND to_date('" + tda + "', 'DD/MM/YYYY')) " +
"union all " +
"select ck.invoice_isn as INVOICE_ISN, " +
"'00000' as invh_invoice_number, " +
"ck.type as invh_invoice_type, " +
"1 as INVOICE_STATUS " +
"from ALSC_H5_ERP_ZINT_CHECK ck " +
"where ck.existed = 1 " +
")m " +
"join INVH_INVOICE_HEADER ivh on ivh.invh_invoice_isn = m.INVOICE_ISN " +
"inner join IOBD_INVOICE_OBJECT_DTL iod on iod.iobd_invoice_isn = ivh.invh_invoice_isn " +
"where iod.iobd_object_type in " + object_type +
 "and ivh.invh_invoice_type in " + invoice_type +
 "and m.INVOICE_STATUS in(" + tt + ")" +
 "and  ivh.invh_invoice_date " +
"BETWEEN to_date('" + fda + "', 'DD/MM/YYYY') AND to_date('" + tda + "', 'DD/MM/YYYY') ";

            List<ErpChecking> listErp = new List<ErpChecking>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    ErpChecking obj = GetProperties(reader);
                    listErp.Add(obj);
                }
            }
            return listErp;
        }
    }
}
