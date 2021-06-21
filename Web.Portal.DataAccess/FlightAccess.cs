using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class FlightAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.Flight GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.Flight objFlight = new Web.Portal.Layer.Flight();
            objFlight.FlightID = Convert.ToString(GetValueField(reader, "FLUI_ID", string.Empty));
            objFlight.Code = Convert.ToString(GetValueField(reader, "Code", string.Empty));
            objFlight.FlightNo = Convert.ToString(GetValueField(reader, "FlightNo", string.Empty));
            objFlight.ScheDate = Convert.ToDateTime(GetValueDateTimeField(reader, "ScheDate", objFlight.ScheDate));
            objFlight.ScheTime = Convert.ToString(GetValueField(reader, "ScheTime", string.Empty));
            objFlight.LandDate = Convert.ToDateTime(GetValueDateTimeField(reader, "LandDate", objFlight.LandDate));
            objFlight.LandTime = Convert.ToString(GetValueField(reader, "LandTime", string.Empty));
            objFlight.FlightType = Convert.ToString(GetValueField(reader, "FLIGHTYPE", string.Empty));
            return objFlight;
        }

        public IList<Layer.Flight> GetPaging(int page, int pageSize, string code, string flightNo, DateTime? fromDate, DateTime? toDate, ref int totalRows)
        {
            IList<Layer.Flight> flights = new List<Layer.Flight>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.FLUI_SEARCH_BY_D_C", code.Trim(), flightNo.Trim(),
                GetNullDateTime(fromDate), GetNullDateTime(toDate), page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                    flights.Add(GetProperties(reader));
                }
            }
            return flights;

        }


        public IList<Layer.Flight> GetAllFlight()
        {
            IList<Layer.Flight> flights = new List<Layer.Flight>();
            using (OracleDataReader reader = GetScriptOracleDataReader("select  distinct FLUI_AL_2_3_LETTER_CODE CODE,FLUI_FLIGHT_NO FLIGHTNO  from flui"))
            {
                while (reader.Read())
                {

                    flights.Add(GetProperties(reader));
                }
            }
            return flights;

        }

        public IList<Layer.Flight> GetAllFlightExp()
        {
            IList<Layer.Flight> flights = new List<Layer.Flight>();
            using (OracleDataReader reader = GetScriptOracleDataReader("select  distinct FLUP_FLIGHT_NO_LVG CODE,flup_flight_no FLIGHTNO  from flup"))
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
