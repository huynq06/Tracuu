using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Model.Models;
using Web.Portal.Common.ViewModel;

namespace Web.Portal.DataAccess
{
    public class FLUPAccess : DataBase.OracleProvider
    {
        //public int FLUP_INT_NUMBER { set; get; }
        //public string FLUP_FLIGHT_NO_LVG { set; get; }
        //public string FLUP_FLIGHT_NO { set; get; }
        //public double FLUP_FREIGHT_TOTAL_IN_KG { set; get; }
        //public string FLUP_AIRPORT_CODE_1 { set; get; }
        //public int FLUP_SCHEDULED_DATE { set; get; }
        //public int FLUP_ESTIMATED_DATE { set; get; }
        //public int FLUP_ACTUAL_DATE { set; get; }
        //public string FLUP_TYPE_OF_AIRPLANE { set; get; }
        //public string FLUP_TYPE { set; get; }
        private FLUPViewModel GetProperties(OracleDataReader reader)
        {
            FLUPViewModel flight = new FLUPViewModel();
            flight.FLUP_INT_NUMBER = Convert.ToString(GetValueField(reader, "FLUP_INT_NUMBER", string.Empty));
            flight.FLUP_FLIGHT_NO_LVG = Convert.ToString(GetValueField(reader, "FLUP_FLIGHT_NO_LVG", string.Empty));
            flight.FLUP_FLIGHT_NO = Convert.ToString(GetValueField(reader, "FLUP_FLIGHT_NO", string.Empty));
            flight.FLUP_FREIGHT_TOTAL_IN_KG = Convert.ToInt64(GetValueField(reader, "FLUP_FREIGHT_TOTAL_IN_KG", string.Empty));
            flight.FLUP_AIRPORT_CODE_1 = Convert.ToString(GetValueField(reader, "FLUP_AIRPORT_CODE_1", string.Empty));
            flight.FLUP_SCHEDULED_DATE = Convert.ToDateTime(GetValueField(reader, "FLUP_SCHEDULED_DATE", flight.FLUP_SCHEDULED_DATE));
            flight.FLUP_ESTIMATED_DATE = Convert.ToDateTime(GetValueField(reader, "FLUP_ESTIMATED_DATE", string.Empty));
            flight.FLUP_DEPARTED_DATE = Convert.ToString(GetValueField(reader, "FLUP_DEPARTED_DATE", string.Empty));
            flight.FLUP_ACTUAL_DATE = Convert.ToInt32(GetValueField(reader, "FLUP_ACTUAL_DATE", string.Empty));
            flight.FLUP_TYPE_OF_AIRPLANE = Convert.ToString(GetValueField(reader, "FLUP_TYPE_OF_AIRPLANE", string.Empty));
            flight.FLUP_TYPE = Convert.ToString(GetValueField(reader, "FLUP_TYPE", string.Empty));
            return flight;
        }
        public List<FLUPViewModel> GetListFlight(string fda,string tda)
        {
            string sql = "select f.flup_int_number FLUP_INT_NUMBER,f.flup_flight_no_lvg as FLUP_FLIGHT_NO_LVG,f.flup_flight_no as FLUP_FLIGHT_NO,f.flup_freight_total_in_kg as FLUP_FREIGHT_TOTAL_IN_KG, " +
"f.flup_airport_code_1 as FLUP_AIRPORT_CODE_1, " +
"to_date('02-01-0001', 'dd-mm-yyyy') + f.flup_scheduled_date as FLUP_SCHEDULED_DATE, " +
"f.flup_scheduled_time as scheduled_time, " +
"to_date('02-01-0001', 'dd-mm-yyyy') + f.flup_estimated_date as FLUP_ESTIMATED_DATE, " +
"f.flup_estimated_time as estimate_time, " +
"to_date('02-01-0001', 'dd-mm-yyyy') + f.flup_actual_date as FLUP_DEPARTED_DATE, " +
"f.flup_actual_date FLUP_ACTUAL_DATE, " +
"f.flup_actual_time as DEPARTURE_TIME, " +
"f.flup_type_of_airplane as FLUP_TYPE_OF_AIRPLANE, " +
"f.flup_type FLUP_TYPE, " +
"f.flup_flight_scheduled_date " +
"from han_w1_hl.flup f "+
"where  to_date('02-01-0001' ,'DD-MM-YYYY') + f.flup_scheduled_date between to_date('" + fda +"','dd/mm/yyyy') and to_date('"+ tda + "','dd/mm/yyyy')";

            List<FLUPViewModel> flights = new List<FLUPViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
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
