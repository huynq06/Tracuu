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
    public class FlightAwbAccess : DataBase.OracleProvider
    {
        private FlightNumberViewModel GetProperties(OracleDataReader reader)
        {
            FlightNumberViewModel flight = new FlightNumberViewModel();
            flight.FlightNo = Convert.ToString(GetValueField(reader, "FLIGHTNO", string.Empty));
            flight.AtaDate = Convert.ToString(GetValueField(reader, "ATA_DATE", string.Empty));
            flight.AtaTime = Convert.ToString(GetValueField(reader, "ATA_TIME", string.Empty));
            flight.SchDate = Convert.ToString(GetValueField(reader, "SCHEDULED_DATE", string.Empty));
            flight.SchTime = Convert.ToString(GetValueField(reader, "SCHEDULED_TIME", string.Empty));
            return flight;
        }
        public List<FlightNumberViewModel> GetListFlightByLagiIdentity(string lagiIdent)
        {
            string sql = "select distinct flui.flui_al_2_3_letter_code||flui.flui_flight_no AS FLIGHTNO ,"+
                              "to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flui.flui_landed_date, 'DD-MM-YYYY') AS ATA_DATE, " +
      "to_char(to_date(flui.flui_landed_time, 'HH24MISS'), 'HH24:MI:SS') as ATA_TIME, " +
                             "to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flui.flui_schedule_date, 'DD-MM-YYYY') as SCHEDULED_DATE, " +
                             "to_char(to_date(flui.flui_schedule_time, 'HH24MISS'), 'HH24:MI:SS') as SCHEDULED_TIME " +
                             "FROM han_w1_hl.flui flui " +
                             "JOIN han_w1_hl.PALO palo "+
                                   "on palo.palo_lvg_in = flui.flui_al_2_3_letter_code "+
                                   "and palo.palo_flight_no_in = flui.flui_flight_no "+
                                   "and palo.palo_flight_arrival_date = flui.flui_schedule_date "+
                              "JOIN han_w1_hl.AWBU_AWBPERULD_LIST awbu " +
                                         "on awbu.awbu_uld_isn = palo.palo_uld_isn "+
                                         "and awbu.awbu_uld_serial = palo.palo_serial_no_ "+
                                         "and awbu.awbu_uld_no = palo.palo_type "+
                                         "and awbu.awbu_uld_owner = palo.palo_owner "+
                                         "and awbu.awbu_object_type = 'IMPORT AWB' "+
                             "JOIN han_w1_hl.LAGI lagi "+
                                   "on awbu.AWBU_MAWB_IDENT_NO = lagi.lagi_ident_no "+
                              "where lagi.lagi_ident_no = '" + lagiIdent + "'";
      
            List<FlightNumberViewModel> flights = new List<FlightNumberViewModel>();
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
