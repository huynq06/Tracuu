using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class QUEUEAWBAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.QueueAWB GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.QueueAWB objQueueAwb= new Web.Portal.Layer.QueueAWB();
            objQueueAwb.MAWB = Convert.ToString(GetValueField(reader, "PREFIX", string.Empty))+ FormatAWB( Convert.ToString(GetValueField(reader, "MAWB", string.Empty)));
            objQueueAwb.HAWB = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            objQueueAwb.INVOICECREATED = GetValueDateTimeField(reader, "INVOICECREATED", objQueueAwb.INVOICECREATED);
            objQueueAwb.INVOICENO = Convert.ToString(GetValueField(reader, "INVOICENO", string.Empty));
            objQueueAwb.EMPLOYEE = Convert.ToString(GetValueField(reader, "EMPLOYEE", string.Empty));
            objQueueAwb.QUEUE = Convert.ToString(GetValueField(reader, "QUEUE", string.Empty));
            objQueueAwb.QUEUECREATED = GetValueDateTimeField(reader, "QUEUECREATED", objQueueAwb.QUEUECREATED);
            return objQueueAwb;
        }
        private string FormatAWB(string mawb)
        {
           while(mawb.Length<8)
                mawb = "0" + mawb;
            return mawb;
        }
        public IList<Layer.QueueAWB> GetReport(string invoiceno,DateTime? from,DateTime? to)
        {
            string sql = "select cus.cusf_form_number INVOICENO, lagi.Lagi_Mawb_Prefix PREFIX,lagi.lagi_mawb_no MAWB,lagi.lagi_hawb HAWB"
                        +",agen.agen_Creation_datetime INVOICECREATED"
                        + ",mita.MITA_NAME EMPLOYEE,qe.QUEUE QUEUE,qe.CREATED QUEUECREATED from lagi inner join cusf_customs_forms cus on cus.cusf_ident_no = lagi.lagi_ident_no"
                        + " inner join agen on lagi.lagi_ident_no = agen.agen_ident_no"
                        + " inner join VN_SHARE_HL.MITA mita on mita.mita_personal_no = agen.agen_employee"
                        + " left join IMP_QUEUE_AWB qe on qe.lagi_ident_no = lagi.lagi_ident_no"
                        + " where agen.Agen_Status_External = 'AWB CASH INVOICE PRODUCED' and ('ALL'='"+invoiceno+"' or cus.cusf_form_number='"+invoiceno+"')"
                        + " and agen.agen_Creation_datetime >= to_date('"+from.Value.ToString("yyyy-MM-dd HH:mm:ss")+"', 'YYYY-MM-DD hh24:mi:ss')"
                        + " and agen.agen_Creation_datetime <= to_date('" + to.Value.ToString("yyyy-MM-dd HH:mm:ss") + "', 'YYYY-MM-DD hh24:mi:ss')";
            List<Layer.QueueAWB> Invoices = new List<Layer.QueueAWB>();
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
