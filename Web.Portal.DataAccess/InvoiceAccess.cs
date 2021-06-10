using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;

namespace Web.Portal.DataAccess
{
    public class InvoiceAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.Invoice GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.Invoice objInvoice = new Web.Portal.Layer.Invoice();


            objInvoice.No = Convert.ToString(GetValueField(reader, "INVOICE_NUMBER", string.Empty));
            objInvoice.Awb_Prefix = Convert.ToString(GetValueField(reader, "AWB_PREFIX", string.Empty));
            objInvoice.Awb_No = Convert.ToString(GetValueField(reader, "AWB_SERIRAL", string.Empty));
            objInvoice.Payment = Convert.ToString(GetValueField(reader, "PAYMENT", string.Empty));
            objInvoice.Hawb = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            objInvoice.Amount_No_Vat = Math.Ceiling(Convert.ToDouble(GetValueField(reader, "INVOICE_TOTAL_AMOUNT", 0)));
            objInvoice.Amount_Vat = Math.Floor(Convert.ToDouble(GetValueField(reader, "INVOICE_TOTAL_VAT", 0)) + 0.5);
            objInvoice.Customer_Name = Convert.ToString(GetValueField(reader, "KUND_NAME", string.Empty));
            objInvoice.PersonName = Convert.ToString(GetValueField(reader, "PERSON_NAME", string.Empty));
            objInvoice.Amount_Total = objInvoice.Amount_No_Vat + objInvoice.Amount_Vat;
            objInvoice.Vat = (objInvoice.Amount_Vat * 100 / objInvoice.Amount_No_Vat).ToString("N0");
           
            return objInvoice;
        }
        private Web.Portal.Layer.Invoice GetPropertiesInvoice(OracleDataReader reader)
        {
            Web.Portal.Layer.Invoice objInvoice = new Web.Portal.Layer.Invoice();


            objInvoice.No = Convert.ToString(GetValueField(reader, "INVOICE_NUMBER", string.Empty));
            objInvoice.Awb_Prefix = Convert.ToString(GetValueField(reader, "AWB_PREFIX", string.Empty));
            objInvoice.Awb_No = Convert.ToString(GetValueField(reader, "AWB_SERIRAL", string.Empty));
            objInvoice.Payment = Convert.ToString(GetValueField(reader, "PAYMENT", string.Empty));
            objInvoice.Hawb = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            objInvoice.Amount_No_Vat = Math.Ceiling(Convert.ToDouble(GetValueField(reader, "INVOICE_TOTAL_AMOUNT", 0)));
            objInvoice.Amount_Vat = Math.Floor(Convert.ToDouble(GetValueField(reader, "INVOICE_TOTAL_VAT", 0)) + 0.5);
            objInvoice.Customer_Name = Convert.ToString(GetValueField(reader, "KUND_NAME", string.Empty));
            objInvoice.PersonName = Convert.ToString(GetValueField(reader, "PERSON_NAME", string.Empty));
            objInvoice.Amount_Total = objInvoice.Amount_No_Vat + objInvoice.Amount_Vat;
            objInvoice.Vat = (objInvoice.Amount_Vat * 100 / objInvoice.Amount_No_Vat).ToString("N0");
            objInvoice.InvoiceType = Convert.ToString(GetValueField(reader, "INVOICE_TYPE", string.Empty));
            objInvoice.InvoiceIsn = Convert.ToString(GetValueField(reader, "INVOICEISN", string.Empty));
            objInvoice.InvoiceDate = Convert.ToString(GetValueField(reader, "INVOICE_DATE", string.Empty));
            return objInvoice;
        }
        private Web.Portal.Layer.AgenInfo GetPropertiesAgen(OracleDataReader reader)
        {
            Web.Portal.Layer.AgenInfo objAgenInfo = new Web.Portal.Layer.AgenInfo();
            objAgenInfo.MAWB = Convert.ToString(GetValueField(reader, "MAWB", string.Empty));
            objAgenInfo.HAWB = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            objAgenInfo.EMPCODE = Convert.ToString(GetValueField(reader, "EMPLOYEE_CODE", string.Empty));
            objAgenInfo.EMPNAME = Convert.ToString(GetValueField(reader, "EMPLOYEE_NAME", string.Empty));
            objAgenInfo.AGENTIME = Convert.ToString(GetValueField(reader, "agen_time", string.Empty));
            objAgenInfo.TOTAL = Convert.ToInt32(GetValueField(reader, "TOTAL", 0));
            return objAgenInfo;
        }
        public List<Layer.Invoice> GetAllInvoiceExp(string cargo, string invoicenumber, string mawb, string type, DateTime? date)
        {
            string sql = "select distinct ivp.INVP_PAYMENT_METHOD as PAYMENT,ih.Invh_Invoice_Number as INVOICE_NUMBER,"
                                + " ih.Invh_Invoice_Type as INVOICE_TYPE,"
                                + " ih.Invh_Invoice_Date as INVOICE_DATE,"
                                + " ih.Invh_Invoice_Total_Amount as INVOICE_TOTAL_AMOUNT,"
                                + " ih.Invh_INVOICE_TOTAL_VAT as INVOICE_TOTAL_VAT,"
                                + " iod.Iobd_Awb_Prefix as AWB_PREFIX,"
                                + " iod.Iobd_Awb_Serial as AWB_SERIRAL,"
                                + " iod.Iobd_HAWB as HAWB,"
                                + " kund.kund_name_1 as KUND_NAME, "
                                + " irun.IRUN_PERSON_NAME as PERSON_NAME"
                                + " from INVH_INVOICE_HEADER ih inner  join IOBD_INVOICE_OBJECT_DTL iod on iod.iobd_invoice_isn = ih.INVH_INVOICE_ISN"
                                + " inner join KUND kund on ih.INVH_CUSTOMER_NO = kund.kund_customer_no_"
                                + " inner join irun_invoice_run irun on irun.IRUN_INVOICE_RUN_ISN = ih.INVH_INVOICE_RUN_ISN"
                                + " left  join INVP_INVOICE_PAYMENTS ivp on ivp.INVP_INVOICE_ISN = ih.INVH_INVOICE_ISN"
                                + " where iod.IOBD_OBJECT_TYPE = 'EXPORT AWB' and ih.INVH_CANCELLED = 0"
                                + " and ih.INVH_INVOICE_NUMBER like '%" + invoicenumber + "%'"
                                + " and iod.Iobd_Awb_Prefix || iod.Iobd_Awb_Serial like '%" + mawb + "%'"
                                + " and('" + type + "' = 'ALL' or UPPER(ih.INVH_INVOICE_TYPE) = '" + type + "')"
                                + " and to_date('" + date.Value.ToString("yyyy-MM-dd") + "', 'YYYY-MM-DD')= ih.Invh_Invoice_Date order by ih.Invh_Invoice_Number";
            List<Layer.Invoice> Invoices = new List<Layer.Invoice>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    Invoices.Add(GetProperties(reader));
                }
            }
            return Invoices;

        }
        public List<Layer.Invoice> GetAllInvoice(string cargo, string invoicenumber, string mawb, string type, DateTime? date)
        {
            /*string sql = "select distinct ivp.INVP_PAYMENT_METHOD as PAYMENT,ih.Invh_Invoice_Number as INVOICE_NUMBER,"
                       + "ih.Invh_Invoice_Type as INVOICE_TYPE,"
                       + "ih.Invh_Invoice_Date as INVOICE_DATE,"
                       + "ih.Invh_Invoice_Total_Amount as INVOICE_TOTAL_AMOUNT,"
                       + "ih.Invh_INVOICE_TOTAL_VAT as INVOICE_TOTAL_VAT,"
                       + "iod.Iobd_Awb_Prefix as AWB_PREFIX,"
                       + "iod.Iobd_Awb_Serial as AWB_SERIRAL,"
                       + "iod.Iobd_HAWB as HAWB,"
                       + "kund.kund_name_1 as KUND_NAME, "
                        + "irun.IRUN_PERSON_NAME  as PERSON_NAME"
                       + " from INVH_INVOICE_HEADER ih  inner  join IOBD_INVOICE_OBJECT_DTL iod on iod.iobd_invoice_isn = ih.INVH_INVOICE_ISN"
                       + " inner  join KUND kund on ih.INVH_CUSTOMER_NO = kund.kund_customer_no_"
                       + "  inner join irun_invoice_run irun on irun.IRUN_INVOICE_RUN_ISN=ih.INVH_INVOICE_RUN_ISN"
                       + " left join INVP_INVOICE_PAYMENTS ivp on ivp.INVP_INVOICE_ISN=ih.INVH_INVOICE_ISN"
                       + " where  iod.IOBD_OBJECT_TYPE = '" + cargo + " AWB' and ih.INVH_CANCELLED=0 "
                       + " and ih.INVH_INVOICE_NUMBER like '" + invoicenumber + "'"
                       + " and iod.Iobd_Awb_Prefix||iod.Iobd_Awb_Serial like '%" + mawb + "%'"
                       + " and ('" + type + "'='ALL' or UPPER(ih.INVH_INVOICE_TYPE) = '" + type + "')"
                       + " order by ih.Invh_Invoice_Number";*/

            string sql = "select distinct ivp.INVP_PAYMENT_METHOD as PAYMENT,ih.Invh_Invoice_Number as INVOICE_NUMBER,"
                        + "ih.Invh_Invoice_Type as INVOICE_TYPE,"
                        + "ih.Invh_Invoice_Date as INVOICE_DATE,"
                        + "ih.Invh_Invoice_Total_Amount as INVOICE_TOTAL_AMOUNT,"
                        + "ih.Invh_INVOICE_TOTAL_VAT as INVOICE_TOTAL_VAT,"
                        + "iod.Iobd_Awb_Prefix as AWB_PREFIX,"
                        + "iod.Iobd_Awb_Serial as AWB_SERIRAL,"
                        + "iod.Iobd_HAWB as HAWB,"
                        + "kund.kund_name_1 as KUND_NAME, "
                         + "irun.IRUN_PERSON_NAME  as PERSON_NAME"
                        + " from INVH_INVOICE_HEADER ih inner  join INVL_INVOICE_LINES il on il.INVL_INVOICE_ISN = ih.invh_invoice_isn"
                        + " inner  join IOBD_INVOICE_OBJECT_DTL iod on iod.IOBD_OBJECT_ISN = il.Invl_Object_Isn"
                        + " inner  join KUND kund on ih.INVH_CUSTOMER_NO = kund.kund_customer_no_"
                        + "  inner join irun_invoice_run irun on irun.IRUN_INVOICE_RUN_ISN=ih.INVH_INVOICE_RUN_ISN"
                        + " left join INVP_INVOICE_PAYMENTS ivp on ivp.INVP_INVOICE_ISN=ih.INVH_INVOICE_ISN"
                        + " where il.INVL_REFERENCE_INVOICE_LINE!=il.INVL_INVOICE_LINE_ISN and"
                        + " iod.IOBD_OBJECT_TYPE = '" + cargo + " AWB' and ih.INVH_CANCELLED=0 "
                        + " and ih.INVH_INVOICE_NUMBER like '%" + invoicenumber + "%'"
                        + " and iod.Iobd_Awb_Prefix||iod.Iobd_Awb_Serial like '%" + mawb + "%'"
                        + " and ('" + type + "'='ALL' or UPPER(ih.INVH_INVOICE_TYPE) = '" + type + "')"
                        + " and ((select count(ilr.INVL_INVOICE_LINE_ISN) from INVL_INVOICE_LINES ilr where ilr.INVL_REFERENCE_INVOICE_LINE=il.INVL_INVOICE_LINE_ISN)=0)"
                        + " and to_date('" + date.Value.ToString("yyyy-MM-dd") + "', 'YYYY-MM-DD')= ih.Invh_Invoice_Date order by ih.Invh_Invoice_Number";


            List<Layer.Invoice> Invoices = new List<Layer.Invoice>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    Invoices.Add(GetProperties(reader));
                }
            }
            return Invoices;

        }
        public List<Layer.Invoice> GetAllInvoicePos(string cargo, string invoicenumber, string mawb, string type, DateTime? date)
        {
            string sql = "select distinct ivp.INVP_PAYMENT_METHOD as PAYMENT,ih.Invh_Invoice_Number as INVOICE_NUMBER,"
                        + "ih.Invh_Invoice_Type as INVOICE_TYPE,"
                        + "ih.Invh_Invoice_Date as INVOICE_DATE,"
                        + "ih.Invh_Invoice_Total_Amount as INVOICE_TOTAL_AMOUNT,"
                        + "ih.Invh_INVOICE_TOTAL_VAT as INVOICE_TOTAL_VAT,"
                        + "iod.Iobd_Awb_Prefix as AWB_PREFIX,"
                        + "iod.Iobd_Awb_Serial as AWB_SERIRAL,"
                        + "iod.Iobd_HAWB as HAWB,"
                        + "kund.kund_name_1 as KUND_NAME, "
                        + "irun.IRUN_PERSON_NAME  as PERSON_NAME"
                        + " from INVH_INVOICE_HEADER ih inner  join INVL_INVOICE_LINES il on il.INVL_INVOICE_ISN = ih.invh_invoice_isn"
                        + " inner  join IOBD_INVOICE_OBJECT_DTL iod on iod.IOBD_OBJECT_ISN = il.Invl_Object_Isn"
                        + " inner  join KUND kund on ih.INVH_CUSTOMER_NO = kund.kund_customer_no_"
                        + "  inner join irun_invoice_run irun on irun.IRUN_INVOICE_RUN_ISN=ih.INVH_INVOICE_RUN_ISN"
                        + " left join INVP_INVOICE_PAYMENTS ivp on ivp.INVP_INVOICE_ISN=ih.INVH_INVOICE_ISN"
                        + " where il.INVL_REFERENCE_INVOICE_LINE!=il.INVL_INVOICE_LINE_ISN and"
                        + " iod.IOBD_OBJECT_TYPE = '" + cargo + " AWB' and ih.INVH_CANCELLED=0 "
                        + " and ih.INVH_INVOICE_NUMBER like '%" + invoicenumber + "%'"
                        + " and iod.Iobd_Awb_Prefix||iod.Iobd_Awb_Serial like '%" + mawb + "%'"
                        + " and ('" + type + "'='ALL' or UPPER(ih.INVH_INVOICE_TYPE) = '" + type + "')"
                        + " and UPPER(ivp.INVP_DESCRIPTION)='POS'"
                        + " and ((select count(ilr.INVL_INVOICE_LINE_ISN) from INVL_INVOICE_LINES ilr where ilr.INVL_REFERENCE_INVOICE_LINE=il.INVL_INVOICE_LINE_ISN)=0)"
                        + " and to_date('" + date.Value.ToString("yyyy-MM-dd") + "', 'YYYY-MM-DD')= ih.Invh_Invoice_Date order by ih.Invh_Invoice_Number";


            List<Layer.Invoice> Invoices = new List<Layer.Invoice>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    Invoices.Add(GetProperties(reader));
                }
            }
            return Invoices;

        }

        public List<Layer.Invoice> GetAllInvoicePosExp(string cargo, string invoicenumber, string mawb, string type, DateTime? date)
        {

            string sql = "select distinct ivp.INVP_PAYMENT_METHOD as PAYMENT,ih.Invh_Invoice_Number as INVOICE_NUMBER,"
                                + " ih.Invh_Invoice_Type as INVOICE_TYPE,"
                                + " ih.Invh_Invoice_Date as INVOICE_DATE,"
                                + " ih.Invh_Invoice_Total_Amount as INVOICE_TOTAL_AMOUNT,"
                                + " ih.Invh_INVOICE_TOTAL_VAT as INVOICE_TOTAL_VAT,"
                                + " iod.Iobd_Awb_Prefix as AWB_PREFIX,"
                                + " iod.Iobd_Awb_Serial as AWB_SERIRAL,"
                                + " iod.Iobd_HAWB as HAWB,"
                                + " kund.kund_name_1 as KUND_NAME, "
                                + " irun.IRUN_PERSON_NAME as PERSON_NAME"
                                + " from INVH_INVOICE_HEADER ih inner  join IOBD_INVOICE_OBJECT_DTL iod on iod.iobd_invoice_isn = ih.INVH_INVOICE_ISN"
                                + " inner join KUND kund on ih.INVH_CUSTOMER_NO = kund.kund_customer_no_"
                                + " inner join irun_invoice_run irun on irun.IRUN_INVOICE_RUN_ISN = ih.INVH_INVOICE_RUN_ISN"
                                + " left  join INVP_INVOICE_PAYMENTS ivp on ivp.INVP_INVOICE_ISN = ih.INVH_INVOICE_ISN"
                                + " where iod.IOBD_OBJECT_TYPE = 'EXPORT AWB' and ih.INVH_CANCELLED = 0"
                                + " and ih.INVH_INVOICE_NUMBER like '%" + invoicenumber + "%'"
                                + " and iod.Iobd_Awb_Prefix || iod.Iobd_Awb_Serial like '%" + mawb + "%'"
                                + " and('" + type + "' = 'ALL' or UPPER(ih.INVH_INVOICE_TYPE) = '" + type + "')"
                                + " and UPPER(ivp.INVP_DESCRIPTION)='POS'"
                                + " and to_date('" + date.Value.ToString("yyyy-MM-dd") + "', 'YYYY-MM-DD')= ih.Invh_Invoice_Date order by ih.Invh_Invoice_Number";

            /*string sql = "select distinct ivp.INVP_PAYMENT_METHOD as PAYMENT,ih.Invh_Invoice_Number as INVOICE_NUMBER,"
                        + "ih.Invh_Invoice_Type as INVOICE_TYPE,"
                        + "ih.Invh_Invoice_Date as INVOICE_DATE,"
                        + "ih.Invh_Invoice_Total_Amount as INVOICE_TOTAL_AMOUNT,"
                        + "ih.Invh_INVOICE_TOTAL_VAT as INVOICE_TOTAL_VAT,"
                        + "iod.Iobd_Awb_Prefix as AWB_PREFIX,"
                        + "iod.Iobd_Awb_Serial as AWB_SERIRAL,"
                        + "iod.Iobd_HAWB as HAWB,"
                        + "kund.kund_name_1 as KUND_NAME, "
                        + "irun.IRUN_PERSON_NAME  as PERSON_NAME"
                        + " from INVH_INVOICE_HEADER ih inner  join INVL_INVOICE_LINES il on il.INVL_INVOICE_ISN = ih.invh_invoice_isn"
                        + " inner  join IOBD_INVOICE_OBJECT_DTL iod on iod.IOBD_OBJECT_ISN = il.Invl_Object_Isn"
                        + " inner  join KUND kund on ih.INVH_CUSTOMER_NO = kund.kund_customer_no_"
                        + "  inner join irun_invoice_run irun on irun.IRUN_INVOICE_RUN_ISN=ih.INVH_INVOICE_RUN_ISN"
                        + " left join INVP_INVOICE_PAYMENTS ivp on ivp.INVP_INVOICE_ISN=ih.INVH_INVOICE_ISN"
                        + " where il.INVL_REFERENCE_INVOICE_LINE!=il.INVL_INVOICE_LINE_ISN and"
                        + " iod.IOBD_OBJECT_TYPE = '" + cargo + " AWB' and ih.INVH_CANCELLED=0 "
                        + " and ih.INVH_INVOICE_NUMBER like '%" + invoicenumber + "%'"
                        + " and iod.Iobd_Awb_Prefix||iod.Iobd_Awb_Serial like '%" + mawb + "%'"
                        + " and ('" + type + "'='ALL' or UPPER(ih.INVH_INVOICE_TYPE) = '" + type + "')"
                        + " and UPPER(ivp.INVP_DESCRIPTION)='POS'"
                        + " and ((select count(ilr.INVL_INVOICE_LINE_ISN) from INVL_INVOICE_LINES ilr where ilr.INVL_REFERENCE_INVOICE_LINE=il.INVL_INVOICE_LINE_ISN)=0)"
                        + " and to_date('" + date.Value.ToString("yyyy-MM-dd") + "', 'YYYY-MM-DD')= ih.Invh_Invoice_Date order by ih.Invh_Invoice_Number";*/


            List<Layer.Invoice> Invoices = new List<Layer.Invoice>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    Invoices.Add(GetProperties(reader));
                }
            }
            return Invoices;

        }
        public IList<Layer.AgenInfo> GetAllGenInfo(DateTime? date)
        {
            string sql = "select  t.ID as ID, l.lagi_mawb_prefix||l.lagi_mawb_no as MAWB, l.lagi_hawb as HAWB,"
                        + "(select count(lagi.LAGI_IDENT_NO) from lagi where l.LAGI_MASTER_IDENT_NO!=0 and lagi.LAGI_MASTER_IDENT_NO=l.LAGI_MASTER_IDENT_NO) as Total,"
                        + " t.agen_date as agen_date, t.agen_time as agen_time, m.mita_identification_number as EMPLOYEE_CODE,"
                        + " m.mita_name as EMPLOYEE_NAME, t.agen_employee as agen_employee"
                        + " from  ( select   a.agen_ident_no as ID, a.agen_employee as agen_employee,"
                        + " row_number() over(partition by a.agen_ident_no order by a.agen_ident_no, a.agen_date, a.agen_time desc) as rn,"
                        + " to_char(to_date('02-01-0001', 'DD-MM-YYYY') + a.agen_date, 'DD-MM-YYYY') as agen_date,"
                        + " to_char(to_date(a.agen_time, 'HH24MISS'), 'HH24:MI:SS') as agen_time"
                        + " from han_w1_hl.agen a  where a.agen_remarks = 'Customs Form reception complete'"
                        + " and  to_date('02-01-0001', 'DD-MM-YYYY') + a.agen_date = to_date('" + date.Value.ToString("yyyy-MM-dd") + "', 'YYYY-MM-DD')"
                        + " order by  a.agen_ident_no, a.agen_sequ_no ) t"
                        + " join han_w1_hl.lagi l on t.ID = l.lagi_ident_no"
                        + " join han_w1_hl.cusf_customs_forms c on t.Id = c.cusf_ident_no"
                        + " join vn_share_hl.mita m on m.mita_personal_no = t.agen_employee"
                        + " where t.rn = 1  order by 1,2,3";

            List<Layer.AgenInfo> AgenInfos = new List<Layer.AgenInfo>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    AgenInfos.Add(GetPropertiesAgen(reader));
                }
            }
            return AgenInfos;
        }
        public List<Layer.Invoice> GetInvoiceByAwb(string awb, string hawb)
        {
            string sql = "select distinct ivp.INVP_PAYMENT_METHOD as PAYMENT,ih.Invh_Invoice_Number as INVOICE_NUMBER,"
                                + " ih.Invh_Invoice_Type as INVOICE_TYPE,"
                                + " ih.invh_invoice_isn as INVOICEISN,"
                                + " ih.Invh_Invoice_Date as INVOICE_DATE,"
                                + " ih.Invh_Invoice_Total_Amount as INVOICE_TOTAL_AMOUNT,"
                                + " ih.Invh_INVOICE_TOTAL_VAT as INVOICE_TOTAL_VAT,"
                                + " ih.Invh_Invoice_Date as INVOICE_DATE,"
                                + " iod.Iobd_Awb_Prefix as AWB_PREFIX,"
                                + " iod.Iobd_Awb_Serial as AWB_SERIRAL,"
                                + " iod.Iobd_HAWB as HAWB,"
                                + " kund.kund_name_1 as KUND_NAME, "
                                + " irun.IRUN_PERSON_NAME as PERSON_NAME"
                                + " from INVH_INVOICE_HEADER ih inner  join IOBD_INVOICE_OBJECT_DTL iod on iod.iobd_invoice_isn = ih.INVH_INVOICE_ISN"
                                + " inner join KUND kund on ih.INVH_CUSTOMER_NO = kund.kund_customer_no_"
                                + " inner join irun_invoice_run irun on irun.IRUN_INVOICE_RUN_ISN = ih.INVH_INVOICE_RUN_ISN"
                                + " left  join INVP_INVOICE_PAYMENTS ivp on ivp.INVP_INVOICE_ISN = ih.INVH_INVOICE_ISN"
                                + " where  ih.INVH_CANCELLED = 0"
                                + " and iod.Iobd_HAWB = '" + hawb + "'"
                                + " and iod.Iobd_Awb_Prefix || iod.Iobd_Awb_Serial = '" + awb + "'"
                                + " order by ih.Invh_Invoice_Number";
            List<Layer.Invoice> Invoices = new List<Layer.Invoice>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    Invoices.Add(GetPropertiesInvoice(reader));
                }
            }
            return Invoices;

        }
        public List<Layer.Invoice> GetInvoiceExportByAwb(string awb)
        {
            string sql = "select distinct ivp.INVP_PAYMENT_METHOD as PAYMENT,ih.Invh_Invoice_Number as INVOICE_NUMBER,"
                                + " ih.Invh_Invoice_Type as INVOICE_TYPE,"
                                + " ih.invh_invoice_isn as INVOICEISN,"
                                + " ih.Invh_Invoice_Date as INVOICE_DATE,"
                                + " ih.Invh_Invoice_Total_Amount as INVOICE_TOTAL_AMOUNT,"
                                + " ih.Invh_INVOICE_TOTAL_VAT as INVOICE_TOTAL_VAT,"
                                + " iod.Iobd_Awb_Prefix as AWB_PREFIX,"
                                + " iod.Iobd_Awb_Serial as AWB_SERIRAL,"
                                + " iod.Iobd_HAWB as HAWB,"
                                + " kund.kund_name_1 as KUND_NAME, "
                                + " irun.IRUN_PERSON_NAME as PERSON_NAME"
                                + " from INVH_INVOICE_HEADER ih inner  join IOBD_INVOICE_OBJECT_DTL iod on iod.iobd_invoice_isn = ih.INVH_INVOICE_ISN"
                                + " inner join KUND kund on ih.INVH_CUSTOMER_NO = kund.kund_customer_no_"
                                + " inner join irun_invoice_run irun on irun.IRUN_INVOICE_RUN_ISN = ih.INVH_INVOICE_RUN_ISN"
                                + " left  join INVP_INVOICE_PAYMENTS ivp on ivp.INVP_INVOICE_ISN = ih.INVH_INVOICE_ISN"
                                + " where  ih.INVH_CANCELLED = 0"
                                + " and iod.Iobd_Awb_Prefix || iod.Iobd_Awb_Serial = '" + awb + "'"
                                + " order by ih.Invh_Invoice_Number";
            List<Layer.Invoice> Invoices = new List<Layer.Invoice>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    Invoices.Add(GetPropertiesInvoice(reader));
                }
            }
            return Invoices;

        }
        public bool CheckInvoiceType(int lagi_iden)
        {
            string sql = "select count(*) as CheckBQL from agen " +
            "where agen.agen_ident_no =" + lagi_iden + " and agen.agen_status_external = 'DEBIT NOTE PRODUCED'";
            bool check = false;
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    int expected = Convert.ToInt32(GetValueField(reader, "CheckBQL", 0));
                    if (expected > 0)
                    {
                        check = true;
                    }
                }

            }
            return check;
        }
    }
}
