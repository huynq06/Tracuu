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
    public class SearchImpAwbAccess : DataBase.OracleProvider
    {
        private GeneralImp GetProperties(OracleDataReader reader)
        {
            GeneralImp awb = new GeneralImp();
            awb.Lagi_Ident = Convert.ToString(GetValueField(reader, "ID", string.Empty));
            awb.Lagi_Master_Ident = Convert.ToString(GetValueField(reader, "LAGI_MASTER", string.Empty));
            awb.Mawb = Convert.ToString(GetValueField(reader, "MAWB", string.Empty));
            awb.Hawb = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            awb.Pieces = Convert.ToInt32(GetValueField(reader, "PIECES_RECEIVED", string.Empty));
            awb.Weight = Convert.ToString(GetValueField(reader, "WEIGHT", string.Empty));
            awb.Origin = Convert.ToString(GetValueField(reader, "AWB_ORG", string.Empty));
            awb.Dest = Convert.ToString(GetValueField(reader, "AWB_DEST", string.Empty));
            awb.Remark = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
            awb.Commodity = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            return awb;
        }
        public List<GeneralImp> GetAwbDetail(string input)
        {
            string sql = " SELECT distinct " +
      "lagi.lagi_ident_no as ID, " +
      "lagi.lagi_mawb_prefix || lagi.lagi_mawb_no as MAWB, " +
      "lagi.LAGI_HAWB as HAWB, " +
      "lagi.lagi_quantity_received as PIECES_RECEIVED, " +
      "lagi.lagi_master_ident_no as LAGI_MASTER, " +
      "lagi.lagi_quantity_expected as PIECES_EXPECTED, " +
      "lagi.lagi_quantity_delivered as PIECES_DELIVERED, " +
      "lagi.lagi_weight_received as WEIGHT, " +
      "lagi.lagi_awb_origin as AWB_ORG, " +
                             "lagi.lagi_awb_dest as AWB_DEST, " +
                             "lagi.lagi_shipper_name as SHIPPER, " +
                             "lagi.lagi_shipper_address as SHIPPERADDR, " +
                             "lagi.LAGI_ORIGINAL_AGENT as CUS_CODE, " +
                             "lagi.lagi_consignee_name as CONSIGNEE, " +
                             "lagi.lagi_consignee_address as CONSIGADDR, " +
                             "lagi.LAGI_CURRENT_AGENT as CNEE, " +
                             "lagi.LAGI_ORIGINAL_AGENT as AGENT, " +
                             "lagi.LAGI_ORIGINAL_AGENT as AGENT_CODE, " +
                             "lagi.lagi_quantity_delivered as DELIVERED, " +
                             "lagi.lagi_goods_content as GOODSCONTENT, " +
                             "lagi.lagi_shipment_remarks as REMARK " +
    "FROM LAGI lagi " +
           "WHERE " +
                "1 = 1 " +
      //"and lagi.lagi_ident_no NOT IN ( " +
      //    "SELECT " +
      //    "l.lagi_ident_no " +
      //    "FROM han_w1_hl.lagi l " +
      //    "WHERE EXISTS( " +
      //    "SELECT 1 " +
      //    "FROM han_w1_hl.lagi t2 " +
      //   "WHERE t2.lagi_mawb_no = l.lagi_mawb_no " +
      //    "and t2.lagi_mawb_prefix = l.lagi_mawb_prefix " +
      //    "AND t2.lagi_ident_no <> l.lagi_ident_no " +
      //    "and t2.lagi_deleted = 0 ) " +
      //   "AND l.lagi_hawb = ' ' ) " +
      "AND lagi.lagi_deleted = 0 " +
     "AND((lagi.lagi_mawb_prefix || ltrim(to_char(lagi.lagi_mawb_no, '00000000'))) = '" + input + "' or lagi.LAGI_HAWB = '" + input + "')";
            List<GeneralImp> listawb = new List<GeneralImp>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listawb.Add(GetProperties(reader));

                }
            }
            return listawb;
        }
    }
}
