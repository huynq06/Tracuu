using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Model.Models;
using Web.Portal.Common.ViewModel;

//public string Awb_Prefix { set; get; }
//public string Awb_Serial { set; get; }
//public string GoodId { set; get; }
//public string Pieces_Per_GoodId { set; get; }
//public int GetIn_Status { set; get; }
//public int Awb_Pieces_Received { set; get; }
//public int Group_Pices_Received { set; get; }
//public string Agent { set; get; }
//public string Good_Content { set; get; }
//public int GetIn_Process { set; get; }
namespace Web.Portal.DataAccess
{
    public class CheckGetInAccess :  DataBase.OracleProvider
    {
        private CheckGetIn GetProperties(OracleDataReader reader)
        {
            CheckGetIn obj = new CheckGetIn();
            obj.Awb_Prefix = Convert.ToString(GetValueField(reader, "PREFIX", string.Empty));
            obj.Awb_Serial = Convert.ToString(GetValueField(reader, "SERIAL", string.Empty));
            obj.GoodId = Convert.ToString(GetValueField(reader, "GOODSID", string.Empty));
            obj.Agent = Convert.ToString(GetValueField(reader, "AGENT_NAME", string.Empty));
            obj.Good_Content = Convert.ToString(GetValueField(reader, "NATURE", string.Empty));
            obj.Pieces_Per_GoodId = Convert.ToInt32(GetValueField(reader, "PIECES_PER_GOODSID", 0));
            obj.GetIn_Status = Convert.ToInt32(GetValueField(reader, "GETIN_STATUS", 0));
            obj.Awb_Pieces_Received = Convert.ToInt32(GetValueField(reader, "AWB_RECEIVED_PIECES", 0));
            obj.GetIn_Process = Convert.ToInt32(GetValueField(reader, "GETIN_PROCESS", -1));
            obj.Group_Pices_Received = Convert.ToInt32(GetValueField(reader, "GROUP_PIECES_RECEIVED", 0));
            obj.INT_OUT_STATUS = Convert.ToInt32(GetValueField(reader, "INT_OUT_STATUS", 0));
            return obj;
        }
        public List<CheckGetIn> CheckGetInToday(string DateCreated)
        {

            string sql = "SELECT " +
  "to_char(labs.labs_ident_no) as LABS_INDENT, "+
  "labs.labs_fwbm_serial_no as LABS_MASTER_ISN, "+
  "labs.LABS_TIME_STATUS_4_SET as RECEIVED_TIME, "+
  "labs.LABS_MAWB_PREFIX as PREFIX, "+
  "to_char(labs.LABS_MAWB_SERIAL_NO) AS SERIAL, "+
  "hhwd.hawb_house_number as GOODSID,"+
  "hhwd.hawb_pcs_exp as PIECES_PER_GOODSID,"+
  "nsw.getin_status as GETIN_PROCESS,"+
  "labs.labs_quantity_del as AWB_RECEIVED_PIECES,"+
  "labs.labs_weight_del as AWB_RECEIVED_WEIGHT,"+
  "(SELECT sum(grai.grai_value) from grai_group_additional_info grai where grai.grai_object_isn = labs.labs_ident_no "+
        "and grai.grai_group_type = 'PIECES' and grai.grai_group_code = 'RECEIVED') as GROUP_PIECES_RECEIVED, "+
  "labs.LABS_AGENT_NAME as AGENT_NAME,  "+
  "labs.LABS_CONTENT as NATURE, "+
  "(select sum(hh.hawb_pcs_exp) from HAWB_HOUSE_WAYBILL_DETAILS hh where hh.hawb_master_isn = labs.labs_fwbm_serial_no and(hh.hawb_house_number like '1219%' or hh.hawb_house_number like '1220%' or hh.hawb_house_number like '1221%' or hh.hawb_house_number like '1222%')) as TOTAL_GOODS_ID_PIECES," +
  "CASE(select sum(hh.hawb_pcs_exp) from HAWB_HOUSE_WAYBILL_DETAILS hh where hh.hawb_master_isn = labs.labs_fwbm_serial_no and(hh.hawb_house_number like '1219%' or hh.hawb_house_number like '1220%' or hh.hawb_house_number like '1221%' or hh.hawb_house_number like '1222%')) "+
    "WHEN labs.labs_quantity_del THEN '0' "+
    "ELSE '-1' "+
  "END AS GETIN_STATUS,"+
  "ci.status as INT_OUT_STATUS " +
"FROM labs labs "+
"JOIN HAWB_HOUSE_WAYBILL_DETAILS hhwd on hhwd.hawb_master_isn = labs.labs_fwbm_serial_no "+
"LEFT JOIN customservice.nsw_exp_getin_request nsw on nsw.goodsid = hhwd.hawb_house_number "+
" left join customservice.cargo_inout ci on ci.tequip_cargoctrlno = hhwd.hawb_house_number " +
"WHERE " +
 "1 = 1 "+
 "AND "+
     "labs.labs_ident_no IN ( "+
                "select distinct a.agen_ident_no "+
                "from han_w1_hl.agen a "+
                "where "+
                "1 = 1 "+
                " AND trunc(a.agen_creation_datetime) = to_date('" + DateCreated + "', 'dd/mm/yyyy')  " +
                "and a.agen_status_external = 'AWB CONFIRMED') "+
 "AND labs.labs_deleted = 0 "+
 "AND labs.labs_quantity_del > 0 "+
"and((SELECT sum(grai.grai_value) from grai_group_additional_info grai where grai.grai_object_isn = labs.labs_ident_no "+
        "and grai.grai_group_type = 'PIECES' and grai.grai_group_code = 'RECEIVED') = labs.labs_quantity_del) "+
            "AND "+
     "(hhwd.hawb_house_number like '1%' " +
    "or hhwd.hawb_house_number like '500%') " +
 "and labs.labs_mawb_prefix not like '%Z%' " +
"ORDER BY RECEIVED_DATE, RECEIVED_TIME ASC";
            List<CheckGetIn> listGetIns = new List<CheckGetIn>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    CheckGetIn obj = GetProperties(reader);


                    listGetIns.Add(obj);
                   
                }
            }
            return listGetIns;
        }
    }
}
