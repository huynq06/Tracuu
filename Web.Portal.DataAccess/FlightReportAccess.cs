using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;

using System.Data;
namespace Web.Portal.DataAccess
{
    public class FlightReportAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.FlightReport GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.FlightReport objFlightReport = new Web.Portal.Layer.FlightReport();

            objFlightReport.Code = Convert.ToString(GetValueField(reader, "FCODE", string.Empty));
            objFlightReport.FlightNo = Convert.ToString(GetValueField(reader, "FLIGHTNO", string.Empty));
            objFlightReport.MAWB = Convert.ToString(GetValueField(reader, "MAWB_NO", string.Empty));
            objFlightReport.Prefix = Convert.ToString(GetValueField(reader, "MAWB_PREFIX", string.Empty));
            objFlightReport.ScheDate = Convert.ToDateTime(GetValueDateTimeField(reader, "SCHEDATE", objFlightReport.ScheDate));
            objFlightReport.ScheTime = Convert.ToString(GetValueField(reader, "SCHETIME", string.Empty));
            objFlightReport.LandDate = Convert.ToDateTime(GetValueDateTimeField(reader, "ATADATE", objFlightReport.LandDate));
            objFlightReport.LandTime = Convert.ToString(GetValueField(reader, "ATATIME", string.Empty));
            objFlightReport.Pices = Convert.ToDouble(GetValueField(reader, "PCSGOODS", 0));
            objFlightReport.Weight = Convert.ToDouble(GetValueField(reader, "GWGOODS", 0));
            objFlightReport.GoodsContent = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            objFlightReport.AgenRemark = Convert.ToString(GetValueField(reader, "AGEN_REMARK", string.Empty));
            objFlightReport.AgenStatus = Convert.ToString(GetValueField(reader, "AGEN_STATUS", string.Empty)).Trim();
            objFlightReport.Created = Convert.ToDateTime(GetValueDateTimeField(reader, "Created", objFlightReport.Created));
            return objFlightReport;
        }
        public IList<Layer.FlightReport> GetReportByFlight( string hawb,string code, string flightNo, DateTime? fromDate, DateTime? toDate)
        {
            IList<Layer.FlightReport> flights = new List<Layer.FlightReport>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.REPORT_IMPAWB_BY_A_H", code.Trim(), flightNo.Trim(),
                GetNullDateTime(fromDate), GetNullDateTime(toDate), hawb.Trim()))
            {
                while (reader.Read())
                {
                    
                    flights.Add(GetProperties(reader));
                }
            }
            return flights;

        }
        public IList<Layer.FlightReport> GetReportByFlightTotal(string hawb, string code, string flightNo, DateTime? fromDate, DateTime? toDate)
        {
            IList<Layer.FlightReport> flights = new List<Layer.FlightReport>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.REPORT_IMPAWB_BY_FL", code.Trim(), flightNo.Trim(),
                GetNullDateTime(fromDate), GetNullDateTime(toDate), hawb.Trim()))
            {
                while (reader.Read())
                {

                    flights.Add(GetProperties(reader));
                }
            }
            return flights;

        }
        public IList<Layer.FlightReport> GetByHAWB(string hawb)
        {
            IList<Layer.FlightReport> flights = new List<Layer.FlightReport>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.REPORT_IMPAWB_BY_MAWB", hawb.Trim()))
            {
                while (reader.Read())
                {

                    flights.Add(GetProperties(reader));
                }
            }
            return flights;

        }
    }
}
