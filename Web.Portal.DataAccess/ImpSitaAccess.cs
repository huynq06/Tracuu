using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class ImpSitaAccess : DataBase.OracleProvider
    {
        private string SQL = "";
        private Web.Portal.Layer.ImpSita GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.ImpSita objImpSita = new Web.Portal.Layer.ImpSita();
            objImpSita.LAGI_INDENT_NO = Convert.ToInt64(GetValueField(reader, "MAWB_IDENT", 0));
            objImpSita.AIRLINE = Convert.ToString(GetValueField(reader, "AIRLINE", string.Empty));
            objImpSita.FLIGHT_NO = Convert.ToString(GetValueField(reader, "FLIGHT_NO", string.Empty));
            objImpSita.FLT_ORG = Convert.ToString(GetValueField(reader, "FLT_ORG", string.Empty));
            objImpSita.FLT_DEST = Convert.ToString(GetValueField(reader, "FLT_DEST", string.Empty));
            objImpSita.SCHEDULE_DATE = Convert.ToDateTime(GetValueDateTimeField(reader, "SCHEDULE_DATE", objImpSita.SCHEDULE_DATE));
            objImpSita.SCHEDULE_TIME = Convert.ToString(GetValueField(reader, "SCHEDULE_TIME", string.Empty));
            objImpSita.ATA_DATE = Convert.ToDateTime(GetValueDateTimeField(reader, "ATA_DATE", objImpSita.ATA_DATE));
            objImpSita.ATA_TIME = Convert.ToString(GetValueField(reader, "ATA_TIME", string.Empty));
            objImpSita.PREFIX = Convert.ToString(GetValueField(reader, "PREFIX", string.Empty));
            objImpSita.SERIAL_NO = Convert.ToString(GetValueField(reader, "SERIAL_NO", string.Empty));
            objImpSita.HAWB = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            objImpSita.AWB_ORG = Convert.ToString(GetValueField(reader, "AWB_ORG", string.Empty));
            objImpSita.AWB_DEST = Convert.ToString(GetValueField(reader, "AWB_DEST", string.Empty));
            objImpSita.AWB_EXPECTED_PIECES = Convert.ToInt32(GetValueField(reader, "QUANTITY_EXPECTED", "0"));
            objImpSita.AWB_EXPECTED_WEIGHT = Convert.ToString(GetValueField(reader, "WEIGHT_EXPECTED", "0"));
            objImpSita.NATURE = Convert.ToString(GetValueField(reader, "NATURE", string.Empty));
            objImpSita.CONSIGNEE_NAME = Convert.ToString(GetValueField(reader, "CONSIGNEE_NAME", string.Empty));          
            objImpSita.SHIPPER_NAME = Convert.ToString(GetValueField(reader, "SHIPPER_NAME", string.Empty));           
            objImpSita.RECEIVED_STATUS = Convert.ToInt32(GetValueField(reader, "RECEIVED_STATUS", "0"));
            objImpSita.RECEIVED_DATE = Convert.ToDateTime(GetValueDateTimeField(reader, "RECEIVED_DATE", objImpSita.RECEIVED_DATE));
            objImpSita.RECEIVED_TIME = Convert.ToString(GetValueField(reader, "RECEIVED_TIME", string.Empty));
            objImpSita.RECEIVED_PIECES = Convert.ToInt32(GetValueField(reader, "QUANTITY_RECEIVED", "0"));
            objImpSita.RECEIVED_WEIGHT = Convert.ToString(GetValueField(reader, "RECEIVED_WEIGHT", "0"));
            objImpSita.FFM_PIECES = Convert.ToInt32(GetValueField(reader, "FFM_PIECES", "0"));
            objImpSita.FFM_WEIGHT = Convert.ToString(GetValueField(reader, "FFM_WEIGHT", "0"));
            objImpSita.DELIVERED_STATUS = Convert.ToInt32(GetValueField(reader, "DELIVERED_STATUS", "0"));
            objImpSita.DELIVERED_DATE = Convert.ToDateTime(GetValueDateTimeField(reader, "DELIVERED_DATE", objImpSita.DELIVERED_DATE));
            objImpSita.DELIVERED_TIME = Convert.ToString(GetValueField(reader, "DELIVERED_TIME", string.Empty));
            objImpSita.DELIVERED_PIECES = Convert.ToInt32(GetValueField(reader, "QUANTITY_DELIVERED", "0"));
            objImpSita.DELIVERED_WEIGHT = Convert.ToString(GetValueField(reader, "DELIVERED_WEIGHT", "0"));
            objImpSita.DOC_ARRIVED_STATUS = Convert.ToInt32(GetValueField(reader, "DOC_ARRIVED_STATUS", "0"));
            objImpSita.DOC_ARRIVED_DATE = Convert.ToDateTime(GetValueDateTimeField(reader, "DOC_ARRIVED_DATE", objImpSita.DOC_ARRIVED_DATE));
            objImpSita.DOC_ARRIVED_TIME = Convert.ToString(GetValueField(reader, "DOC_ARRIVED_TIME", string.Empty));
            objImpSita.RCF_SENT = Convert.ToInt32(GetValueField(reader, "RCF_SENT", 0));
            objImpSita.NFD_SENT = Convert.ToInt32(GetValueField(reader, "NFD_SENT", 0));
            objImpSita.AWR_SENT = Convert.ToInt32(GetValueField(reader, "AWR_SENT", 0));
            objImpSita.DLV_SENT = Convert.ToInt32(GetValueField(reader, "DLV_SENT", 0));
            return objImpSita;
        }
        public IList<Layer.ImpSita> GetAllByMawb(string MAWB)
        {
            IList<Layer.ImpSita> impSitas = new List<Layer.ImpSita>();
            using (OracleDataReader reader = GetScriptOracleDataReader("select * from REPORT.IMP_DAILY_AWB where MASTER_IDENT_NO=0 and PREFIX||SERIAL_NO='"+MAWB.Trim()+"'"))
            {
                while (reader.Read())
                {
                    impSitas.Add(GetProperties(reader));
                }
            }
            return impSitas;

        }
        public IList<Layer.ImpSita> GetAll(string cd,string fno,string mawb,DateTime?fromDate,DateTime?toDate)
        {
            IList<Layer.ImpSita> impSitas = new List<Layer.ImpSita>();
            string sql = "select distinct * from REPORT.IMP_DAILY_AWB where (PREFIX||SERIAL_NO='" + mawb+ "' or '"+mawb+"'='ALL') and (AIRLINE='"+cd+"' or 'ALL'='"+cd+"')"
                      + " and (FLIGHT_NO='"+fno+"' or 'ALL'='"+fno+ "') "
                      + ((fromDate.HasValue && toDate.HasValue)? "and  (SCHEDULE_DATE>=to_Date('" + fromDate.Value.ToString("yyyy-MM-dd")+ "','YYYY-MM-DD') and SCHEDULE_DATE<=to_Date('" + toDate.Value.ToString("yyyy-MM-dd") + "','YYYY-MM-DD'))" : string.Empty);
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    impSitas.Add(GetProperties(reader));
                }
            }
            return impSitas;

        }
        public IList<Layer.ImpSita> GetAllIn(string id)
        {
            IList<Layer.ImpSita> impSitas = new List<Layer.ImpSita>();
            string sql = "select distinct * from REPORT.IMP_DAILY_AWB where MAWB_IDENT in (" + id+ ") and RECEIVED_STATUS=0";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    impSitas.Add(GetProperties(reader));
                }
            }
            return impSitas;

        }
        public Layer.ImpSita GetById(Int64 id)
        {
            IList<Layer.ImpSita> impSitas = new List<Layer.ImpSita>();
            using (OracleDataReader reader = GetScriptOracleDataReader("select * from REPORT.IMP_DAILY_AWB where RECEIVED_STATUS=1 and MAWB_IDENT=" + id))
            {
                if(reader.Read())               
                  return  GetProperties(reader);
               
            }
            return new Layer.ImpSita(); ;

        }


    }
}
