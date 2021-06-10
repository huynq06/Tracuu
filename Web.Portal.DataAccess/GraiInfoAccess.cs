using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class GraiInfoAccess: DataBase.OracleProvider
    {
        private Web.Portal.Layer.GraiInfo GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.GraiInfo objGraiInfo = new Web.Portal.Layer.GraiInfo();

            objGraiInfo.LagiId = Convert.ToInt64(GetValueField(reader, "LAGI_IDENT_NO", 0));
            objGraiInfo.FCode = Convert.ToString(GetValueField(reader, "FCODE", string.Empty));
            objGraiInfo.FlightNo = Convert.ToString(GetValueField(reader, "FLIGHTNO", string.Empty));
            objGraiInfo.FlightDate = Convert.ToDateTime(GetValueDateTimeField(reader, "FLIDATE", objGraiInfo.FlightDate));
            objGraiInfo.ATATIME = Convert.ToString(GetValueField(reader, "ATA_TIME", string.Empty));
            objGraiInfo.ScheTime = Convert.ToString(GetValueField(reader, "SCHETIME", string.Empty));
            objGraiInfo.INTERNAL_NUMBER = Convert.ToString(GetValueField(reader, "INTERNAL_NUMER", string.Empty));
            objGraiInfo.Group= Convert.ToString(GetValueField(reader, "GROUP_ISN", string.Empty));
            objGraiInfo.Type = Convert.ToString(GetValueField(reader, "GROUP_TYPE", string.Empty));
            objGraiInfo.Code = Convert.ToString(GetValueField(reader, "GROUP_CODE", string.Empty));
            objGraiInfo.Value = Convert.ToString(GetValueField(reader, "GROUP_VALUE", string.Empty));
            objGraiInfo.Number = Convert.ToString(GetValueField(reader, "GROUP_NUMBER", string.Empty));
            objGraiInfo.Prefix = Convert.ToString(GetValueField(reader, "MAWB_PREFIX", string.Empty));
            objGraiInfo.AWB = Convert.ToString(GetValueField(reader, "MAWB_NO", string.Empty));
            objGraiInfo.HAWB = Convert.ToString(GetValueField(reader, "HAWB_NO", string.Empty));
            objGraiInfo.GoodsContent = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            objGraiInfo.ORGIN = Convert.ToString(GetValueField(reader, "AWB_ORG", string.Empty));
            objGraiInfo.LOADING = Convert.ToString(GetValueField(reader, "AWB_ORG_LOAD", string.Empty));
            objGraiInfo.DEST = Convert.ToString(GetValueField(reader, "AWB_DEST", string.Empty));
            objGraiInfo.Agent = Convert.ToString(GetValueField(reader, "AGENT", string.Empty));
            objGraiInfo.AgentCode = Convert.ToString(GetValueField(reader, "AGENT_CODE", string.Empty));
            objGraiInfo.Shipper = Convert.ToString(GetValueField(reader, "SHIPPER", string.Empty));
            objGraiInfo.ShipperADDR = Convert.ToString(GetValueField(reader, "SHIPPERADDR", string.Empty));
            objGraiInfo.Consignee = Convert.ToString(GetValueField(reader, "CONSIGNEE", string.Empty));
            objGraiInfo.ConsignADDR = Convert.ToString(GetValueField(reader, "CONSIGADDR", string.Empty));
            objGraiInfo.QuantityExpected = Convert.ToString(GetValueField(reader, "SPIECE", "0"));
            objGraiInfo.WeightExpected = Convert.ToString(GetValueField(reader, "SWEIGHT", "0"));
            objGraiInfo.QuantityReceived = Convert.ToString(GetValueField(reader, "PCSGOODS", "0"));
            objGraiInfo.WeightReceived = Convert.ToString(GetValueField(reader, "GWGOODS", "0"));
            objGraiInfo.QuantityDelivered = Convert.ToString(GetValueField(reader, "DELIVERED", "0"));           
            objGraiInfo.GoodsContent = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            return objGraiInfo;
        }

        public List<Layer.GraiInfo> GetCustomByGrai(string code, string fno, DateTime? fromDate, DateTime? toDate)
        {
            List<Layer.GraiInfo> GraiInfos = new List<Layer.GraiInfo>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.REPORT_IMPAWB_BY_GRAI", code, fno.Trim(), GetNullDateTime(fromDate), GetNullDateTime(toDate)))
            {
                while (reader.Read())
                {
                    GraiInfos.Add(GetProperties(reader));
                }
            }
            return GraiInfos;

        }

        
        public IList<Layer.GraiInfo> GetByDate(string type, DateTime? from, DateTime? to)
        {
            IList<Layer.GraiInfo> IMP_GETIN_REQUESTList = new List<Layer.GraiInfo>();

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
                             + " lagi.lagi_goods_content as GOODSCONTENT"
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
                             + "  to_date('02-01-0001 ' || to_Char(to_date(flui.flui_landed_time, 'hh24miss'), 'hh24:mi:ss'), 'DD-MM-YYYY hh24:mi:ss') + flui.flui_landed_date between to_date('" + from.Value.ToString("dd-MM-yyyy 00:00:00") + "', 'DD-MM-YYYY hh24:mi:ss') and to_date('" + to.Value.ToString("dd-MM-yyyy 23:59:59") + "', 'DD-MM-YYYY hh24:mi:ss')"

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
