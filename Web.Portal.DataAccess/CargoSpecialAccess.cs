using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class CargoSpecialAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.CargoSpecial GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.CargoSpecial objCargoSpecial = new Web.Portal.Layer.CargoSpecial();
            objCargoSpecial.PREFIX = Convert.ToString(GetValueField(reader, "MAWB_PREFIX", string.Empty));
            objCargoSpecial.MAWB = Convert.ToString(GetValueField(reader, "MAWB_NO", string.Empty));
            objCargoSpecial.TYPE = Convert.ToString(GetValueField(reader, "TYPE", string.Empty));
            objCargoSpecial.POSITION = Convert.ToString(GetValueField(reader, "POSITION", string.Empty));
            objCargoSpecial.GROUPID = Convert.ToString(GetValueField(reader, "GROUPID", string.Empty));
            objCargoSpecial.HAWB = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            return objCargoSpecial;
        }

        public List<Layer.CargoSpecial> GetSpecial(string typeGrai,string typeAgen,string code, string flightNo, DateTime? fromDate, DateTime? toDate)
        {
            string sql = "select distinct  lagi.lagi_MAWB_PREFIX as MAWB_PREFIX, lagi.lagi_MAWB_NO as MAWB_NO,lagi.lagi_hawb as HAWB,grai.GRAI_OBJECT_GROUP_ISN as GROUPID,"
                              + "grai.GRAI_VALUE as TYPE,"
                              + "ag.AGEN_REMARKS as POSITION"
                              + " FROM han_w1_hl.flui flui   JOIN han_w1_hl.PALO palo"
                              + " on palo.palo_lvg_in = flui.flui_al_2_3_letter_code"
                              + " and palo.palo_flight_no_in = flui.flui_flight_no"
                              + " and(palo.palo_flight_arrival_date = flui.flui_schedule_date)"
                              + " JOIN han_w1_hl.AWBU_AWBPERULD_LIST awbu"
                              + " on awbu.awbu_uld_isn = palo.palo_uld_isn"
                              + " and awbu.awbu_uld_serial = palo.palo_serial_no_"
                              + " and awbu.awbu_uld_no = palo.palo_type"
                              + " and awbu.awbu_uld_owner = palo.palo_owner"
                              + " and awbu.awbu_object_type = 'IMPORT AWB'"
                              + " JOIN han_w1_hl.LAGI lagi"
                              + " on awbu.awbu_mawb_prefix = lagi.lagi_mawb_prefix"
                              + " and awbu.awbu_mawb_serial_no = lagi.lagi_mawb_no"
                              + " inner join han_w1_hl.AGEN ag"
                              + " on ag.agen_ident_no = lagi.lagi_ident_no "
                              + " inner join grai_group_additional_info  grai on grai.GRAI_OBJECT_ISN=lagi.lagi_ident_no where "
                              + " (  flui.flui_landed_date is not null and flui.flui_landed_time is not null and"
                              + " to_date('02-01-0001 ' || to_Char(to_date(flui.flui_landed_time, 'hh24miss'), 'hh24:mi:ss'), 'DD-MM-YYYY hh24:mi:ss') + flui.flui_landed_date >= to_date('" + (fromDate.Value.ToString("yyyy-MM-dd HH:mm:ss")) + "' ,'YYYY-MM-DD hh24:mi:ss')"
                              + " and  to_date('02-01-0001 ' || to_Char(to_date(flui.flui_landed_time, 'hh24miss'), 'hh24:mi:ss'), 'DD-MM-YYYY hh24:mi:ss') + flui.flui_landed_date <= to_date('" + (toDate.Value.ToString("yyyy-MM-dd HH:mm:ss")) + "' ,'YYYY-MM-DD hh24:mi:ss')"
                              + " )and   lagi.LAGI_DELETED = 0  and('" + code + "' = 'ALL' or  flui.flui_al_2_3_letter_code = '" + code + "')"
                              + " and('" + flightNo + "' = 'ALL' or  flui.flui_flight_no = '" + flightNo + "')"
                              + " and lagi.LAGI_GOODS_CONTENT NOT LIKE '%MAIL%'"
                              + " and lagi.LAGI_GOODS_CONTENT NOT LIKE '%POST%'"
                              + " and grai.GRAI_GROUP_TYPE='" + typeGrai + "' and ag.AGEN_STATUS_EXTERNAL='" + typeAgen + "'";
                             
            List<Layer.CargoSpecial> CargoSpecialList = new List<Layer.CargoSpecial>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {

                    CargoSpecialList.Add(GetProperties(reader));
                }
            }
            return CargoSpecialList;

        }
    }
}
