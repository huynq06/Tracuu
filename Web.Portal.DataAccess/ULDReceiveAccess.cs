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
    public class ULDReceiveAccess : DataBase.OracleProvider
    {
        private ULDReceiveViewModel GetProperties(OracleDataReader reader)
        {
            ULDReceiveViewModel uld = new ULDReceiveViewModel();

            uld.Name = Convert.ToString(GetValueField(reader, "ULD", string.Empty));
            uld.ReceiveDate = GetValueDateTimeField(reader, "receive_datetime", uld.ReceiveDate);
            return uld;
        }
        public List<ULDReceiveViewModel> GetULDReceiveByFlight(Flight flight)
        {
            string sql = "SELECT DISTINCT " +        
                         "palo.palo_type || palo.palo_serial_no_ || palo.palo_owner as ULD, "+    
                         "case when palo.palo_receive_time is null then null " +
                         "when palo.palo_receive_time is not null then to_date(palo.palo_receive_date || ' ' || palo.palo_receive_time, 'dd/mm/RR HH24:MI:SS') "+ 
                         "end as receive_datetime " +
                         "FROM flui flui "+
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
            " GROUP BY palo.palo_receive_date, palo.palo_receive_time,palo.palo_type || palo.palo_serial_no_ || palo.palo_owner";
            List<ULDReceiveViewModel> ulds = new List<ULDReceiveViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    ULDReceiveViewModel uld = GetProperties(reader);
                    ulds.Add(uld);
                    
                }
            }
            return ulds;
        }
    }
}
