using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;

using System.Data;
namespace Web.Portal.DataAccess
{
    public class FlightExportAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.FlightExport GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.FlightExport objFlightExport = new Web.Portal.Layer.FlightExport();

            objFlightExport.Code = Convert.ToString(GetValueField(reader, "FLIGHTCODE", string.Empty));
            objFlightExport.FlightNo = Convert.ToString(GetValueField(reader, "FLIGHTNUMBER", string.Empty));
            objFlightExport.Route = Convert.ToString(GetValueField(reader, "ROUTE", string.Empty));
            objFlightExport.FlightType = Convert.ToString(GetValueField(reader, "FLIGHTTYPE", string.Empty));
            objFlightExport.Scheduled = Convert.ToDateTime(GetValueDateTimeField(reader, "SCHEDULED_DATE", objFlightExport.Scheduled));
            objFlightExport.ScheduledTime = Convert.ToString(GetValueField(reader, "SCHEDULED_TIME", string.Empty));
            objFlightExport.Expected = Convert.ToDateTime(GetValueDateTimeField(reader, "EXPECTED_DATE", objFlightExport.Expected));
            objFlightExport.ExpectedTime = Convert.ToString(GetValueField(reader, "EXPECTED_TIME", string.Empty));
            objFlightExport.LastAccepted = Convert.ToDateTime(GetValueDateTimeField(reader, "LAST_ACCEPTED_DATE", objFlightExport.LastAccepted));
            objFlightExport.LastAcceptedTime = Convert.ToString(GetValueField(reader, "LAST_ACCEPTED_TIME", string.Empty));
            objFlightExport.Actualed = Convert.ToDateTime(GetValueDateTimeField(reader, "ACTUAL_DATE", objFlightExport.Actualed));
            objFlightExport.ActualTime = Convert.ToString(GetValueField(reader, "ACTUAL_TIME", string.Empty));
            objFlightExport.Departed = Convert.ToBoolean(GetValueField(reader, "DEPARTED", false));
            return objFlightExport;
        }
        public IList<Layer.FlightExport> GetAllFlight()
        {
            IList<Layer.FlightExport> flights = new List<Layer.FlightExport>();
            using (OracleDataReader reader = GetScriptOracleDataReader("select  distinct flup_flight_no_lvg FLIGHTCODE,flup_flight_no FLIGHTNUMBER  from flup"))
            {
                while (reader.Read())
                {

                    flights.Add(GetProperties(reader));
                }
            }
            return flights;

        }
        public IList<Layer.FlightExport> GetPaging(int page, int pageSize, string code, string flightNo, DateTime? fromDate, DateTime? toDate, ref int totalRows)
        {
            IList<Layer.FlightExport> flightExports = new List<Layer.FlightExport>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.FLUP_SEARCH_BY_DC", code.Trim(), flightNo.Trim(),
                GetNullDateTime(fromDate), GetNullDateTime(toDate), page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                    flightExports.Add(GetProperties(reader));
                }
            }
            return flightExports;

        }
    }
   }
