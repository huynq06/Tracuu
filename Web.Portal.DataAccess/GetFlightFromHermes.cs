using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Model.Models;

namespace Web.Portal.DataAccess
{
    public class GetFlightFromHermes : DataBase.OracleProvider
    {
        public Flight GetProperties(OracleDataReader reader)
        {
            Flight flight = new Flight();
            flight.FlightType = Convert.ToString(GetValueField(reader, "FLUI_TYPE", string.Empty));
            flight.FlightTypeOfAirCraft = Convert.ToString(GetValueField(reader, "FLUI_TYPE_OF_AIRCRAFT", string.Empty));
            return flight;
        }
        public Flight GetFlight(Flight flightInput)
        {
            Flight flight = new Flight();
            string sql = "select * from flui " +
                         "where flui.flui_al_2_3_letter_code = '" +flightInput.FlightLetter + "'" +
                         " and flui.flui_schedule_date = '" + flightInput.FLUI_SCHEDULE_DATE+ "'" +
                         " and flui.flui_schedule_time like '%" +flightInput.FLUI_SCHEDULE_TIME+ "'";
            List<VCTProcessing> ListVCTProcessing = new List<VCTProcessing>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    flight = GetProperties(reader);
                }
            }
            return flight;

        }
    }
    
}
