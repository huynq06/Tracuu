using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
namespace Web.Portal.DataAccess
{
    public class GraiInfo2Access:DataBase.OracleProvider
    {
        private Web.Portal.Layer.GraiInfo2 GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.GraiInfo2 objGraiInfo2 = new Web.Portal.Layer.GraiInfo2();

            objGraiInfo2.LagiId = Convert.ToInt64(GetValueField(reader, "LAGI_IDENT_NO", 0));
            objGraiInfo2.FlightNo = Convert.ToString(GetValueField(reader, "FLIGHTNO", string.Empty));
            objGraiInfo2.ATA_DATE = Convert.ToString(GetValueField(reader, "ATA_DATE", string.Empty));
            objGraiInfo2.ATA_TIME = Convert.ToString(GetValueField(reader, "ATA_TIME", string.Empty));
            objGraiInfo2.Group = Convert.ToString(GetValueField(reader, "GROUP_ISN", string.Empty));
            objGraiInfo2.Type = Convert.ToString(GetValueField(reader, "GROUP_TYPE", string.Empty));
            objGraiInfo2.Code = Convert.ToString(GetValueField(reader, "GROUP_CODE", string.Empty));
            objGraiInfo2.Value = Convert.ToString(GetValueField(reader, "GROUP_VALUE", string.Empty));
            objGraiInfo2.NumberValue = Convert.ToString(GetValueField(reader, "GROUP_NUMBER", string.Empty));
            objGraiInfo2.AWB = Convert.ToString(GetValueField(reader, "PREFIX", string.Empty)) + Format(Convert.ToString(GetValueField(reader, "MAWB_NO", string.Empty)));
            objGraiInfo2.HAWB = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            objGraiInfo2.QuantityExpected = Convert.ToInt32(GetValueField(reader, "SPIECE", 0));            
            objGraiInfo2.Shipper = Convert.ToString(GetValueField(reader, "SHIPPER", string.Empty));
            objGraiInfo2.ShipperADDR = Convert.ToString(GetValueField(reader, "SHIPPERADDR", string.Empty));
            objGraiInfo2.Consignee = Convert.ToString(GetValueField(reader, "CONSIGNEE", string.Empty));
            objGraiInfo2.ConsignADDR = Convert.ToString(GetValueField(reader, "CONSIGADDR", string.Empty));
            objGraiInfo2.GoodsContent = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            return objGraiInfo2;
        }
        private string Format(string awb)
        {
            while (awb.Length < 8)
            {
                awb = "0" + awb;
            }
            return awb;
        }
        public IList<Layer.GraiInfo2> GetByDate(string type, DateTime? from, DateTime? to)
        {
            IList<Layer.GraiInfo2> IMP_GETIN_REQUESTList = new List<Layer.GraiInfo2>();

            string sql = "select distinct lagi.lagi_ident_no, flui.flui_al_2_3_letter_code|| flui.flui_flight_no as FLIGHTNO,"
                             + " to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flui.flui_landed_date,'DD/MM/YYYY') AS ATA_DATE,"
                             + " to_Char(to_date(flui.flui_landed_time, 'hh24miss'), 'hh24:mi:ss') AS ATA_TIME,"
                             + " lagi.lagi_MAWB_PREFIX as PREFIX,"
                             + " lagi.lagi_MAWB_NO as MAWB_NO, "
                             + " lagi.lagi_hawb as HAWB , "
                             + " (select distinct lagi_quantity_expected from lagi ls where ls.lagi_MAWB_PREFIX || ls.lagi_MAWB_NO = lagi.lagi_MAWB_PREFIX || lagi.lagi_MAWB_NO and ls.Lagi_master_ident_no = 0) as SPIECE,"
                             + " grai.GRAI_OBJECT_GROUP_ISN as GROUP_ISN,"
                             + " grai.GRAI_GROUP_TYPE as GROUP_TYPE,"
                             + " grai.GRAI_GROUP_CODE as GROUP_CODE,"
                             + " grai.GRAI_VALUE as GROUP_VALUE, "
                             + " grai.GRAI_NUMERIC_VALUE as GROUP_NUMBER, "
                             +" lagi.lagi_shipper_name as SHIPPER,"
                             +" lagi.lagi_shipper_address as SHIPPERADDR,"
                             +" lagi.lagi_consignee_name as CONSIGNEE, "
                             +" lagi.lagi_consignee_address as CONSIGADDR, "
                             + " lagi.LAGI_GOODS_CONTENT as GOODSCONTENT"
                             + " FROM han_w1_hl.flui flui   JOIN han_w1_hl.PALO palo  on palo.palo_lvg_in = flui.flui_al_2_3_letter_code"
                             + " and palo.palo_flight_no_in = flui.flui_flight_no and (palo.palo_flight_arrival_date = flui.flui_schedule_date)"
                             + " JOIN han_w1_hl.AWBU_AWBPERULD_LIST awbu  on awbu.awbu_uld_isn = palo.palo_uld_isn    and awbu.awbu_uld_serial = palo.palo_serial_no_"
                             + " and awbu.awbu_uld_no = palo.palo_type"
                             + " and awbu.awbu_uld_owner = palo.palo_owner"
                             + " and awbu.awbu_object_type = 'IMPORT AWB'"
                             + " JOIN han_w1_hl.LAGI lagi"
                             + " on awbu.awbu_mawb_prefix = lagi.lagi_mawb_prefix"
                             + " and awbu.awbu_mawb_serial_no = lagi.lagi_mawb_no"
                             + " inner join han_w1_hl.grai_group_additional_info grai on"
                             + " grai.grai_object_isn = lagi.lagi_ident_no  "
                             + " where"
                             + "  to_date('02-01-0001 ' || to_Char(to_date(flui.flui_landed_time, 'hh24miss'), 'hh24:mi:ss'), 'DD-MM-YYYY hh24:mi:ss') + flui.flui_landed_date between to_date('" + from.Value.AddDays(-1).ToString("dd-MM-yyyy 23:00:00") + "', 'DD-MM-YYYY hh24:mi:ss') and to_date('" + to.Value.ToString("dd-MM-yyyy 23:59:59") + "', 'DD-MM-YYYY hh24:mi:ss')"

                              + " and(lagi.LAGI_LOCAL_TRANSFER != 'TRANSHIPMENT')"
                              + "   and(grai.grai_group_type='PIECES' or  grai.grai_group_type='WEIGHT' or  grai.grai_group_type='DATE') "
                              + " and lagi.LAGI_DELETED = 0"
                              + " and(grai.grai_group_code = '" + type + "')";

            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {

                while (reader.Read())
                {
                    IMP_GETIN_REQUESTList.Add(GetProperties(reader));

                }


            }
            return IMP_GETIN_REQUESTList;

        }
    }
}
