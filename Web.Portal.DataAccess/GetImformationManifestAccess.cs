using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Model.Models;
using Web.Portal.Common.ApiViewModel;

namespace Web.Portal.DataAccess
{
    public class GetImformationManifestAccess : DataBase.OracleProvider
    {
        public void GetDetail(ref string pieces,ref string weight,string fightNumber,string lagi_ident,string DateCreated)
        {
            string sql = "select sum (t.awbu_pieces_origin) as PIECES,sum( t.awbu_weight_origin) as WEIGHT from (select distinct awbu.* " +
"FROM flui flui " +
"JOIN PALO palo " +
     "on palo.palo_lvg_in = flui.flui_al_2_3_letter_code " +
     "and palo.palo_flight_no_in = flui.flui_flight_no " +
     "and to_date('02-01-0001' , 'DD-MM-YYYY') +flui.flui_schedule_date = to_date('02-01-0001', 'DD-MM-YYYY') + palo.palo_flight_arrival_date " +
"JOIN AWBU_AWBPERULD_LIST awbu " +
     "on awbu.awbu_uld_isn = palo.palo_uld_isn " +
     "and awbu.awbu_uld_serial = palo.palo_serial_no_ " +
     "and awbu.awbu_uld_no = palo.palo_type " +
     "and awbu.awbu_uld_owner = palo.palo_owner " +
     "and awbu.awbu_object_type = 'IMPORT AWB' " +
"JOIN LAGI lagi " +
     "on awbu.awbu_mawb_prefix = lagi.lagi_mawb_prefix " +
     "and awbu.awbu_mawb_serial_no = lagi.lagi_mawb_no " +
    "and to_date('02-01-0001' , 'DD-MM-YYYY') +lagi.lagi_flight_date_in = awbu.awbu_flight_date " +
"WHERE  1 = 1 " +
 "AND to_date('02-01-0001' , 'DD-MM-YYYY') +flui.flui_schedule_date = to_date('" + DateCreated + "', 'dd/mm/yyyy') " +
 "AND flui.flui_al_2_3_letter_code || flui.flui_flight_no = '" + fightNumber + "'" +
 "and awbu.awbu_mawb_ident_no  = '" + lagi_ident + "' )t ";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    pieces = Convert.ToString(GetValueField(reader, "PIECES", string.Empty)); 
                    weight = Convert.ToString(GetValueField(reader, "WEIGHT", string.Empty));

                }
            }
           
        }
    }
}
