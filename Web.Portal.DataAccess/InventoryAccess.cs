        using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class InventoryAccess : DataBase.OracleProvider
    {
       
        public void GetInventory( DateTime? start,DateTime? end, DateTime? check,  ref int sumDelivered, ref double sumWeight)
        {
            string sql = "select (sum(PCSGOODS) ) DELIVEREDSUM ,(sum(GWGOODS)) GWGOODSSUM"
                        +" from (select distinct lagi.lagi_ident_no, "                       
                        + " lagi.lagi_quantity_received as PCSGOODS,"
                        + " lagi_weight_received as GWGOODS"
                      
                        + " FROM lagi "
                        + " join (select * from grai_group_additional_info grai where  grai.grai_group_type = 'DATE'"
                        + " and grai.grai_group_code = 'RECEIVED' and to_date(grai.grai_value, 'YYYY-MM-DD hh24:mi:ss') >= to_date('" + start.Value.ToString("dd-MM-yyyy HH:mm:ss") + "', 'DD-MM-YYYY hh24:mi:ss')"
                        + " and to_date(grai.grai_value, 'YYYY-MM-DD hh24:mi:ss') <= to_date('" + end.Value.ToString("dd-MM-yyyy HH:mm:ss") + "', 'DD-MM-YYYY hh24:mi:ss')"
                        + " and(select count(dl.grai_object_isn) from grai_group_additional_info dl where"
                        + " dl.grai_object_isn = grai.grai_object_isn  and dl.grai_object_group_isn = grai.grai_object_group_isn"
                        + " and dl.grai_group_type = 'DATE'  and dl.grai_group_code = 'DELIVERED'"
                        + " and to_date(dl.grai_value, 'YYYY-MM-DD hh24:mi:ss') >= to_date(grai.grai_value, 'YYYY-MM-DD hh24:mi:ss')"
                        + " and to_date(dl.grai_value, 'YYYY-MM-DD hh24:mi:ss') <= to_date('" + check.Value.ToString("dd-MM-yyyy HH:mm:ss") + "', 'DD-MM-YYYY hh24:mi:ss')"
                        + " ) = 0) GROUP_GRAI on  GROUP_GRAI.grai_object_isn = lagi.lagi_ident_no where lagi.LAGI_DELETED = 0 and(lagi.LAGI_LOCAL_TRANSFER != 'TRANSHIPMENT') AND lagi.LAGI_GOODS_CONTENT NOT LIKE '%MAIL%' AND lagi.LAGI_GOODS_CONTENT NOT LIKE '%POST%' "
                        +" and "
                         + "     ("
                         + "     ((select count(ls.lagi_mawb_no) from lagi ls  where ls.LAGI_DELETED = 0  and ls.lagi_mawb_prefix = lagi.lagi_mawb_prefix  and ls.lagi_mawb_no = lagi.lagi_mawb_no) = 1"
                         + " and lagi.Lagi_master_ident_no = 0)"
                         + "        or  (lagi.Lagi_master_ident_no != 0) "
                          + "    ) and lagi.LAGI_GOODS_CONTENT!='TEST'"
                         + ")";
           
            using (OracleDataReader reader = GetScriptOracleDataReader(sql ))
            {
                if (reader.Read())
                {
                    
                    sumDelivered = Convert.ToInt32(GetValueField(reader, "DELIVEREDSUM", 0));
                    sumWeight = Convert.ToDouble(GetValueField(reader, "GWGOODSSUM", 0));
                }
            }
            

        }
    }
}
