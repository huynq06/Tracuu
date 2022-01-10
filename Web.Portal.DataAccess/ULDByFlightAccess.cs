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
    public class ULDByFlightAccess : DataBase.OracleProvider
    {
        private UldByFlightViewModel GetProperties(OracleDataReader reader)
        {
            UldByFlightViewModel uld = new UldByFlightViewModel();

            uld.Name = Convert.ToString(GetValueField(reader, "ULD", string.Empty));
            uld.TotalAwb = Convert.ToInt32(GetValueField(reader, "ULD_ID", 0));
            uld.ULD_INS = Convert.ToString(GetValueField(reader, "ULD", string.Empty));
            return uld;
        }
        public List<UldByFlightViewModel> GetULDByFlight(Flight flight)
        {
            string sql = "SELECT DISTINCT " +
            "palo.palo_type || palo.palo_serial_no_ || palo.palo_owner as ULD, " +
               "awbu.awbu_uld_isn ULD_ID," +
            "count(awbu.awbu_mawb_serial_no) as AWB_COUNT " +
            "FROM flui flui " +
            "JOIN PALO palo " +
            "on palo.palo_lvg_in = flui.flui_al_2_3_letter_code " +
            "and palo.palo_flight_no_in = flui.flui_flight_no " +
            "and to_date('02-01-0001' , 'DD-MM-YYYY') +flui.flui_schedule_date = to_date('02-01-0001', 'DD-MM-YYYY') + palo.palo_flight_arrival_date " +
            "LEFT JOIN AWBU_AWBPERULD_LIST awbu " +
            "on awbu.awbu_uld_isn = palo.palo_uld_isn " +
            "and awbu.awbu_uld_serial = palo.palo_serial_no_ " +
            "and awbu.awbu_uld_no = palo.palo_type " +
            "and awbu.awbu_uld_owner = palo.palo_owner " +
            "and awbu.awbu_object_type = 'IMPORT AWB' " +
            "Where to_date('02-01-0001', 'DD-MM-YYYY') + flui.flui_schedule_date between trunc(sysdate) - 2 and trunc(sysdate) +1 " +
            "AND flui.flui_al_2_3_letter_code || flui.flui_flight_no = '" + flight.FlightNumber + "' " +
             " AND flui.flui_schedule_date =" + flight.FLUI_SCHEDULE_DATE +
             " AND flui.flui_schedule_time = " + flight.FLUI_SCHEDULE_TIME +
            "GROUP BY palo.palo_type || palo.palo_serial_no_ || palo.palo_owner,awbu.awbu_uld_isn";
            List<UldByFlightViewModel> ulds = new List<UldByFlightViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    UldByFlightViewModel uld = GetProperties(reader);
                    if (uld.Name.Trim() == "BULK")
                    {
                        if (uld.TotalAwb > 0)
                        {
                            ulds.Add(uld);
                        }
                    }
                    else
                    {
                        ulds.Add(uld);
                    }
                }
            }
            return ulds;
        }
    }
}
