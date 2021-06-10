using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class ReportImpAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.ReportImp GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.ReportImp objReportImp = new Web.Portal.Layer.ReportImp();



            objReportImp.QuantityExpected = Convert.ToInt32(GetValueField(reader, "P_RECEIVED", "0"));
            objReportImp.WeightExpected = Convert.ToDouble(GetValueField(reader, "W_RECEIVED", "0"));
            objReportImp.QuantityReceived = Convert.ToInt32(GetValueField(reader, "P_EXPECTED", "0"));
            objReportImp.WeightReceived = Convert.ToDouble(GetValueField(reader, "W_EXPECTED", "0"));
            objReportImp.QuantityDelivery = Convert.ToInt32(GetValueField(reader, "P_DELIVERY", "0"));
            objReportImp.WeightDelivery = Convert.ToDouble(GetValueField(reader, "W_DELIVERY", "0"));
            return objReportImp;
        }
        public Layer.ReportImp GetCustom(DateTime? fromDate, DateTime? toDate)
        {
            ;
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.REPORT_IMP_BYDATE", GetNullDateTime(fromDate), GetNullDateTime(toDate)))
            {
                if (reader.Read())
                {
                    return GetProperties(reader);
                }
            }
            return new Layer.ReportImp(); ;

        }
        public Layer.ReportImp GetWarhouse(DateTime? fromDate, DateTime? toDate)
        {
            ;
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.CUSTOM_IMP_WH_REPORT_TOTAL", GetNullDateTime(fromDate), GetNullDateTime(toDate)))
            {
                if (reader.Read())
                {
                    return GetProperties(reader);
                }
            }
            return new Layer.ReportImp(); ;

        }
        public Layer.ReportImp GetCustomer(DateTime? fromDate, DateTime? toDate)
        {
            ;
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.CUSTOM_IMP_REPORT_TOTAL", GetNullDateTime(fromDate), GetNullDateTime(toDate)))
            {
                if (reader.Read())
                {
                    return GetProperties(reader);
                }
            }
            return new Layer.ReportImp(); ;

        }
    }
}
