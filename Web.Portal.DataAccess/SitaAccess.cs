using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;

using System.Data;
namespace Web.Portal.DataAccess
{
    public class SitaAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.Sita GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.Sita objSita = new Web.Portal.Layer.Sita();



            objSita.Prefix = Convert.ToString(GetValueField(reader, "MAWBPREFIX", string.Empty));
            string mawb = Convert.ToString(GetValueField(reader, "MAWBNO", string.Empty));
            objSita.MAWB = objSita.Prefix + "-" + (mawb.Length == 7 ? "0" + mawb : mawb);
            objSita.Quantity = Convert.ToInt32(GetValueField(reader, "SITACOUNT", 0));
            
            return objSita;
        }

        public IList<Layer.Sita> ReportSita(int page, int pageSize, string code, DateTime? fromDate, DateTime? toDate,  ref int totalRows,ref int sitaTotal)
        {
            IList<Layer.Sita> Sitas = new List<Layer.Sita>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.REPORT_COUNT_SITA", code.Trim(),  GetNullDateTime(fromDate), GetNullDateTime(toDate), page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                    sitaTotal = Convert.ToInt32(GetValueField(reader, "SUMSITA", 0));
                    Sitas.Add(GetProperties(reader));
                }
            }
            return Sitas;

        }

        public IList<Layer.Sita> ReportSita(string code,string flightno, DateTime? fromDate, DateTime? toDate)
        {
            IList<Layer.Sita> Sitas = new List<Layer.Sita>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.REPORT_COUNT_SITA_BY_FL", code.Trim(),flightno, GetNullDateTime(fromDate), GetNullDateTime(toDate)))
            {
                while (reader.Read())
                {
                   
                    Sitas.Add(GetProperties(reader));
                }
            }
            return Sitas;

        }
    }
}
