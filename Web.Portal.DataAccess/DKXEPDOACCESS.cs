using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
namespace Web.Portal.DataAccess
{
    public class DKXEPDOACCESS : DataBase.OracleProvider
    {
        private Web.Portal.Layer.DKXEPDO GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.DKXEPDO objDKXEPDO = new Web.Portal.Layer.DKXEPDO();

            objDKXEPDO.FLIGHT_NO = Convert.ToString(GetValueField(reader, "FLIGHT_NO", string.Empty));
            objDKXEPDO.SCHEDULE_DATE = Convert.ToString(GetValueField(reader, "SCHEDULE_DATE", string.Empty));            
            objDKXEPDO.AWB = Convert.ToString(GetValueField(reader, "AWB", string.Empty));
            objDKXEPDO.HAWB = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            objDKXEPDO.NATURE = Convert.ToString(GetValueField(reader, "NATURE", string.Empty));
            objDKXEPDO.EXPECTED_QUANTITY = Convert.ToInt32(GetValueField(reader, "EXPECTED_QUANTITY", 0));
            objDKXEPDO.EXPECTED_WEIGHT = Convert.ToDouble(GetValueField(reader, "EXPECTED_WEIGHT",0));
            return objDKXEPDO;
        }
        public IList<Layer.DKXEPDO> GetPaging(string code, string flightNo, DateTime? fromDate, DateTime? toDate)
        {
            string sql = "  select t.FLIGHT_NO,t.SCHEDULED_DATE,t.AWB,t.HAWB,t.EXPECTED_QUANTITY,t.EXPECTED_WEIGHT,t.NATURE from ("
                        + " select distinct * from(SELECT lagi.lagi_ident_no as ID,awbu.awbu_mawb_ident_no as MAWBID,flui.flui_al_2_3_letter_code || flui.flui_flight_no AS FLIGHT_NO,"
                        + " flui.flui_loading_location as ORIGIN,'HAN' as DESTINATION,"
                        + " to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flui.flui_schedule_date, 'DD-MM-YYYY') as SCHEDULED_DATE,"
                        + " to_char(to_date(flui.flui_schedule_time, 'HH24MISS'), 'HH24:MI:SS') as SCHEDULED_TIME,"
                        + " awbu.awbu_mawb_prefix || trim(to_char(awbu.awbu_mawb_serial_no, '00000000')) as AWB,"
                        + " lagi.LAGI_HAWB as HAWB, lagi.lagi_awb_origin as AWB_ORG, lagi.lagi_awb_dest as AWB_DEST, lagi.lagi_quantity_expected as EXPECTED_QUANTITY,"
                        + " lagi.lagi_weight_expected as EXPECTED_WEIGHT,"
                        + " CASE lagi.lagi_hawb  WHEN ' ' THEN lagi.lagi_shipper_name"
                        + " ELSE (SELECT l.lagi_shipper_name from LAGI l WHERE l.lagi_ident_no = lagi.lagi_master_ident_no)"
                        + " END AS SHIPPER_NAME,  lagi.lagi_consignee_name as CONSIGNEE_NAME, ("
                        + " select kund.kund_name_1 from kund where kund.kund_customer_no_ = lagi.lagi_current_agent) as AGENT_NAME,"
                        + " lagi.LAGI_GOODS_CONTENT as NATURE"
                        + " FROM flui flui"
                        + "  JOIN PALO palo"
                        + " on palo.palo_lvg_in = flui.flui_al_2_3_letter_code"
                        + " and palo.palo_flight_no_in = flui.flui_flight_no"
                        + " and to_date('02-01-0001', 'DD-MM-YYYY') + flui.flui_schedule_date = to_date('02-01-0001', 'DD-MM-YYYY') + palo.palo_flight_arrival_date"
                        + " JOIN AWBU_AWBPERULD_LIST awbu"
                        + " on awbu.awbu_uld_isn = palo.palo_uld_isn"
                        + " and awbu.awbu_uld_serial = palo.palo_serial_no_"
                        + " and awbu.awbu_uld_no = palo.palo_type"
                        + " and awbu.awbu_uld_owner = palo.palo_owner"
                        + " and awbu.awbu_object_type = 'IMPORT AWB'"
                        + " JOIN LAGI lagi on awbu.awbu_mawb_prefix = lagi.lagi_mawb_prefix"
                        + " and awbu.awbu_mawb_serial_no = lagi.lagi_mawb_no"
                        + " and lagi.lagi_ident_no NOT IN (  SELECT  l.lagi_ident_no  FROM han_w1_hl.lagi l  WHERE EXISTS("
                        + " SELECT 1  FROM han_w1_hl.lagi t2 WHERE t2.lagi_mawb_no = l.lagi_mawb_no  and t2.lagi_mawb_prefix = l.lagi_mawb_prefix"
                        + " AND t2.lagi_ident_no <> l.lagi_ident_no and t2.lagi_deleted = 0)"
                        + " AND l.lagi_hawb = ' ' ) WHERE  1 = 1  AND lagi.lagi_deleted = 0"
                        + " AND awbu.awbu_mawb_prefix not like '%Z%'"
                        + " AND to_date('02-01-0001', 'DD-MM-YYYY') + flui.flui_schedule_date between to_date('11-11-2019', 'DD-MM-YYYY') and to_date('11-11-2019', 'DD-MM-YYYY')"
                        + " AND flui.flui_al_2_3_letter_code ={ { airline} }"
                        + " AND flui.flui_flight_no ={ { flight_no} }"
                        + " GROUP BY  lagi.lagi_ident_no, awbu.awbu_mawb_ident_no,  flui.flui_al_2_3_letter_code || flui.flui_flight_no,"
                        + " flui.flui_loading_location, flui.flui_landed_date,  flui.flui_landed_time, flui.flui_schedule_date, flui.flui_schedule_time,"
                        + " awbu.awbu_mawb_prefix,awbu.awbu_mawb_serial_no, lagi.lagi_awb_origin, lagi.lagi_awb_dest, lagi.LAGI_HAWB,"
                        + " lagi.lagi_master_ident_no,lagi.lagi_quantity_expected, lagi.lagi_weight_expected,"         
                        + " lagi.lagi_shipper_name, lagi.lagi_consignee_name, lagi.LAGI_CURRENT_AGENT, lagi.LAGI_GOODS_CONTENT,awbu.awbu_specialhandlingcodes"
                        + " ) )t group by t.FLIGHT_NO,t.SCHEDULED_DATE,t.AWB,t.HAWB,t.NATURE,t.EXPECTED_QUANTITY,t.EXPECTED_WEIGHT,t.NATURE order by 2,1,3,4";
            IList<Layer.DKXEPDO> DKXEPDOLIST = new List<Layer.DKXEPDO>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    
                    DKXEPDOLIST.Add(GetProperties(reader));
                }
            }
            return DKXEPDOLIST;

        }
    }
}
