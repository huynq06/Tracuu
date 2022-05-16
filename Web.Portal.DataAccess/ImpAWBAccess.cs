using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;

using System.Data;
namespace Web.Portal.DataAccess
{
    public class ImpAWBAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.ImpAWB GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.ImpAWB objImpAWB = new Web.Portal.Layer.ImpAWB();

            objImpAWB.ID = Convert.ToInt64(GetValueField(reader, "LAGI_IDENT_NO", 0));
            objImpAWB.FlightNo = Convert.ToString(GetValueField(reader, "FLIGHTNO", string.Empty));
            objImpAWB.FlightDate = Convert.ToDateTime(GetValueDateTimeField(reader, "FLIDATE", objImpAWB.FlightDate));
            objImpAWB.ATATIME = Convert.ToString(GetValueField(reader, "ATA_TIME", string.Empty));
            objImpAWB.ScheTime = Convert.ToString(GetValueField(reader, "SCHETIME", string.Empty));
            objImpAWB.Prefix = Convert.ToString(GetValueField(reader, "MAWB_PREFIX", string.Empty));
            objImpAWB.AWB = Convert.ToString(GetValueField(reader, "MAWB_NO", string.Empty));
            objImpAWB.HAWB = Convert.ToString(GetValueField(reader, "HAWB_NO", string.Empty));
            objImpAWB.GoodsContent = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            objImpAWB.ORGIN = Convert.ToString(GetValueField(reader, "AWB_ORG", string.Empty));
            objImpAWB.LOADING = Convert.ToString(GetValueField(reader, "AWB_ORG_LOAD", string.Empty));
            objImpAWB.DEST = Convert.ToString(GetValueField(reader, "AWB_DEST", string.Empty));
            objImpAWB.Agent = Convert.ToString(GetValueField(reader, "AGENT", string.Empty));
            objImpAWB.AgentCode = Convert.ToString(GetValueField(reader, "AGENT_CODE", string.Empty));
            objImpAWB.Shipper = Convert.ToString(GetValueField(reader, "SHIPPER", string.Empty));
            objImpAWB.ShipperADDR = Convert.ToString(GetValueField(reader, "SHIPPERADDR", string.Empty));
            objImpAWB.Consignee = Convert.ToString(GetValueField(reader, "CONSIGNEE", string.Empty));
            objImpAWB.ConsignADDR = Convert.ToString(GetValueField(reader, "CONSIGADDR", string.Empty));
            objImpAWB.QuantityExpected = Convert.ToString(GetValueField(reader, "SPIECE", "0"));
            objImpAWB.WeightExpected = Convert.ToString(GetValueField(reader, "SWEIGHT", "0"));
            objImpAWB.QuantityReceived = Convert.ToString(GetValueField(reader, "PCSGOODS", "0"));
            objImpAWB.WeightReceived = Convert.ToString(GetValueField(reader, "GWGOODS", "0"));
            objImpAWB.QuantityDelivered = Convert.ToString(GetValueField(reader, "DELIVERED", "0"));
            objImpAWB.WareHouse = Convert.ToString(GetValueField(reader, "WAREHOUSE", string.Empty));
            objImpAWB.DateStatus = Convert.ToDateTime(GetValueDateTimeField(reader, "LAGI_DATE_STATUS", objImpAWB.DateStatus));
            objImpAWB.DateOut = Convert.ToDateTime(GetValueDateTimeField(reader, "DateOut", objImpAWB.DateIn));
            objImpAWB.Remarks = Convert.ToString(GetValueField(reader, "AGEN_REMARKS", string.Empty));
            objImpAWB.GoodsContent = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            objImpAWB.AgenCreated = Convert.ToDateTime(GetValueDateTimeField(reader, "AGEN_CREATED", objImpAWB.AgenCreated));
            objImpAWB.Location = Convert.ToString(GetValueField(reader, "LOCATION", string.Empty));
            objImpAWB.GOODSNATURE = Convert.ToString(GetValueField(reader, "GOODSNATURE", string.Empty));
            objImpAWB.GroupNO = Convert.ToString(GetValueField(reader, "GROUP_NO,", string.Empty));
            objImpAWB.LAGI_MASTER_PIECES = Convert.ToInt32(GetValueField(reader, "LAGI_MASTER_RECEIVED", 0));
            objImpAWB.LAGI_MASTER_WEGIHT = Convert.ToString(GetValueField(reader, "LAGI_MASTER_WEIGHT", 0));
            objImpAWB.LAGI_MASTER_GOODS = Convert.ToString(GetValueField(reader, "LAGI_MASTER_GOOD", string.Empty));
            objImpAWB.LAGI_REMARK = Convert.ToString(GetValueField(reader, "LAGI_REMARKS", string.Empty));
            return objImpAWB;
        }
        private Web.Portal.Layer.ImpAWB GetPropertiesV2(OracleDataReader reader)
        {
            Web.Portal.Layer.ImpAWB objImpAWB = new Web.Portal.Layer.ImpAWB();

            objImpAWB.ID = Convert.ToInt64(GetValueField(reader, "LAGI_IDENT_NO", 0));
            objImpAWB.FlightNo = Convert.ToString(GetValueField(reader, "FLIGHTNO", string.Empty));
            objImpAWB.FlightDate = Convert.ToDateTime(GetValueDateTimeField(reader, "FLIDATE", objImpAWB.FlightDate));
            objImpAWB.ATATIME = Convert.ToString(GetValueField(reader, "ATA_TIME", string.Empty));
            objImpAWB.ScheTime = Convert.ToString(GetValueField(reader, "SCHETIME", string.Empty));
            objImpAWB.Prefix = Convert.ToString(GetValueField(reader, "MAWB_PREFIX", string.Empty));
            objImpAWB.AWB = Convert.ToString(GetValueField(reader, "MAWB_NO", string.Empty));
            objImpAWB.HAWB = Convert.ToString(GetValueField(reader, "HAWB_NO", string.Empty));
            objImpAWB.GoodsContent = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            objImpAWB.ORGIN = Convert.ToString(GetValueField(reader, "AWB_ORG", string.Empty));
            objImpAWB.LOADING = Convert.ToString(GetValueField(reader, "AWB_ORG_LOAD", string.Empty));
            objImpAWB.DEST = Convert.ToString(GetValueField(reader, "AWB_DEST", string.Empty));
            objImpAWB.Agent = Convert.ToString(GetValueField(reader, "AGENT", string.Empty));
            objImpAWB.AgentCode = Convert.ToString(GetValueField(reader, "AGENT_CODE", string.Empty));
            objImpAWB.Shipper = Convert.ToString(GetValueField(reader, "SHIPPER", string.Empty));
            objImpAWB.ShipperADDR = Convert.ToString(GetValueField(reader, "SHIPPERADDR", string.Empty));
            objImpAWB.Consignee = Convert.ToString(GetValueField(reader, "CONSIGNEE", string.Empty));
            objImpAWB.ConsignADDR = Convert.ToString(GetValueField(reader, "CONSIGADDR", string.Empty));
            objImpAWB.QuantityExpected = Convert.ToString(GetValueField(reader, "SPIECE", "0"));
            objImpAWB.WeightExpected = Convert.ToString(GetValueField(reader, "SWEIGHT", "0"));
            objImpAWB.QuantityReceived = Convert.ToString(GetValueField(reader, "PCSGOODS", "0"));
            objImpAWB.WeightReceived = Convert.ToString(GetValueField(reader, "GWGOODS", "0"));
            objImpAWB.QuantityDelivered = Convert.ToString(GetValueField(reader, "DELIVERED", "0"));
            objImpAWB.WareHouse = Convert.ToString(GetValueField(reader, "WAREHOUSE", string.Empty));
            objImpAWB.DateStatus = Convert.ToDateTime(GetValueDateTimeField(reader, "LAGI_DATE_STATUS", objImpAWB.DateStatus));
            objImpAWB.DateOut = Convert.ToDateTime(GetValueDateTimeField(reader, "DateOut", objImpAWB.DateIn));
            objImpAWB.Remarks = Convert.ToString(GetValueField(reader, "AGEN_REMARKS", string.Empty));
            objImpAWB.GoodsContent = Convert.ToString(GetValueField(reader, "AGEN_REMARKS", string.Empty));
            objImpAWB.AgenCreated = Convert.ToDateTime(GetValueDateTimeField(reader, "AGEN_CREATED", objImpAWB.AgenCreated));
            objImpAWB.Location = Convert.ToString(GetValueField(reader, "LOCATION", string.Empty));
            objImpAWB.GOODSNATURE = Convert.ToString(GetValueField(reader, "GOODSNATURE", string.Empty));
            objImpAWB.GroupNO = Convert.ToString(GetValueField(reader, "GROUP_NO,", string.Empty));
            objImpAWB.LAGI_MASTER_PIECES = Convert.ToInt32(GetValueField(reader, "PIECES_FFM", 0));
            objImpAWB.LAGI_MASTER_WEGIHT = Convert.ToString(GetValueField(reader, "WEIGHT_FFM", 0));
            objImpAWB.LAGI_MASTER_GOODS = Convert.ToString(GetValueField(reader, "LAGI_MASTER_GOOD", string.Empty));
            objImpAWB.LAGI_REMARK = Convert.ToString(GetValueField(reader, "LAGI_REMARKS", string.Empty));
            objImpAWB.FlightID = Convert.ToString(GetValueField(reader, "FLIGHT_ID", string.Empty));
            objImpAWB.GroupNo = Convert.ToString(GetValueField(reader, "GROUP_NO", string.Empty));
            objImpAWB.ULD = Convert.ToString(GetValueField(reader, "ULD", string.Empty));
            objImpAWB.LAGI_MASTER_QUANTITY_EX = Convert.ToInt32(GetValueField(reader, "LAGI_MASTER_QUANTITY_EX", 0));
            objImpAWB.LAGI_MASTER_WEIGHT_EX = Convert.ToString(GetValueField(reader, "LAGI_MASTER_WEIGHT_EX", 0));
            objImpAWB.LAGI_MASTER_ID = Convert.ToString(GetValueField(reader, "LAGI_MASTER_ID", 0));
            objImpAWB.LAGI_ORIGIN = Convert.ToString(GetValueField(reader, "LAGI_ORIGIN", ""));
            objImpAWB.LAGI_DES = Convert.ToString(GetValueField(reader, "LAGI_DES", 0));

            return objImpAWB;
        }

        public IList<Layer.ImpAWB> GetPaging(int page, int pageSize, string code, string flightNo, DateTime? fromDate, DateTime? toDate, string hawb, ref int totalRows)
        {
            IList<Layer.ImpAWB> impAWBs = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.IMPAWB_SEARCH_BY_A_H", code.Trim(), flightNo.Trim(), GetNullDateTime(fromDate), GetNullDateTime(toDate), hawb.Trim(), page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                 
                   
                         impAWBs.Add(GetProperties(reader));
                }
            }
            return impAWBs;

        }
        public IList<Layer.ImpAWB> GetInventory(int page, int pageSize, DateTime? startDate, DateTime? endDate, DateTime? check, ref int totalRows, ref int sumDelivered, ref double sumWeight)
        {
            IList<Layer.ImpAWB> impAWBs = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.REPORT_IMPAWB_INVENTORY",
                GetNullDateTime(startDate), GetNullDateTime(endDate), GetNullDateTime(check)
                , page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                    impAWBs.Add(GetProperties(reader));
                    sumDelivered = Convert.ToInt32(GetValueField(reader, "DELIVEREDSUM", 0));
                    sumWeight = Convert.ToDouble(GetValueField(reader, "GWGOODSSUM", 0));
                }
            }
            return impAWBs;

        }

        public IList<Layer.ImpAWB> GetCustom(int page, int pageSize, DateTime? fromDate, DateTime? toDate, ref int totalRows, ref int sumDelivered, ref double sumWeight)
        {
            IList<Layer.ImpAWB> impAWBs = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.CUSTOM_IMP_REPORT", GetNullDateTime(fromDate), GetNullDateTime(toDate), page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                    sumDelivered = Convert.ToInt32(GetValueField(reader, "DELIVEREDSUM", 0));
                    sumWeight = Convert.ToDouble(GetValueField(reader, "GWGOODSSUM", 0));
                    impAWBs.Add(GetProperties(reader));
                }
            }
            return impAWBs;

        }

        public IList<Layer.ImpAWB> GetCustomByFL(int page, int pageSize, string fno, DateTime? fromDate, DateTime? toDate, ref int totalRows, ref int sumDelivered, ref double sumWeight)
        {
            IList<Layer.ImpAWB> impAWBs = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.CUSTOM_IMP_REPORT_FL", fno.Trim(), GetNullDateTime(fromDate), GetNullDateTime(toDate), page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                    sumDelivered = Convert.ToInt32(GetValueField(reader, "DELIVEREDSUM", 0));
                    sumWeight = Convert.ToDouble(GetValueField(reader, "GWGOODSSUM", 0));
                    impAWBs.Add(GetProperties(reader));
                }
            }
            return impAWBs;

        }
        public IList<Layer.ImpAWB> GetCustomByStatus_v2(int page, int pageSize, string code, string fno, DateTime? fromDate, DateTime? toDate, string status, ref int totalRows, ref int sumDelivered, ref double sumWeight)
        {
            IList<Layer.ImpAWB> impAWBs = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.CUSTOM_IMP_REPORT_STATUS_V2", code, fno.Trim(), GetNullDateTime(fromDate), GetNullDateTime(toDate), status, page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                    sumDelivered = Convert.ToInt32(GetValueField(reader, "DELIVEREDSUM", 0));
                    sumWeight = Convert.ToDouble(GetValueField(reader, "GWGOODSSUM", 0));
                    //Layer.ImpAWB item = GetProperties(reader);
                    //if (item.HAWB == "SMCIA218071")
                        impAWBs.Add(GetPropertiesV2(reader));
                }
            }
            return impAWBs;

        }
        public IList<Layer.ImpAWB> GetCustomByStatus(int page, int pageSize, string code, string fno, DateTime? fromDate, DateTime? toDate, string status, ref int totalRows, ref int sumDelivered, ref double sumWeight)
        {
            IList<Layer.ImpAWB> impAWBs = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.CUSTOM_IMP_REPORT_STATUS", code, fno.Trim(), GetNullDateTime(fromDate), GetNullDateTime(toDate), status, page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                    sumDelivered = Convert.ToInt32(GetValueField(reader, "DELIVEREDSUM", 0));
                    sumWeight = Convert.ToDouble(GetValueField(reader, "GWGOODSSUM", 0));
                    impAWBs.Add(GetProperties(reader));
                }
            }
            return impAWBs;

        }

        public List<Layer.ImpAWB> GetCustomByStatus_TT(string code, string fno, DateTime? fromDate, DateTime? toDate)
        {
            List<Layer.ImpAWB> impAWBs = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.CUSTOM_IMP_REPORT_STATUS_TT", code, fno.Trim(), GetNullDateTime(fromDate), GetNullDateTime(toDate)))
            {
                while (reader.Read())
                {
                    impAWBs.Add(GetProperties(reader));
                }
            }
            return impAWBs;

        }

        public IList<Layer.ImpAWB> GetReceiver(int page, int pageSize, string code, string flightNo, DateTime? fromDate, DateTime? toDate, string HAWB, ref int totalRows)
        {
            IList<Layer.ImpAWB> impAWBs = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.REPORT_IMPAWB_BY_FL", code, flightNo, GetNullDateTime(fromDate), GetNullDateTime(toDate), HAWB, page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));

                    impAWBs.Add(GetProperties(reader));
                }
            }
            return impAWBs;

        }

        public IList<Layer.ImpAWB> GetCustom(int page, int pageSize, string wh, DateTime? fromDate, DateTime? toDate, ref int totalRows, ref int sumDelivered, ref double sumWeight)
        {
            IList<Layer.ImpAWB> impAWBs = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.CUSTOM_IMP_WH_REPORT", wh.Trim(), GetNullDateTime(fromDate), GetNullDateTime(toDate), page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                    sumDelivered = Convert.ToInt32(GetValueField(reader, "DELIVEREDSUM", 0));
                    sumWeight = Convert.ToDouble(GetValueField(reader, "GWGOODSSUM", 0));
                    impAWBs.Add(GetProperties(reader));
                }
            }
            return impAWBs;

        }
        public IList<Layer.ImpAWB> GetNonDelivery(string fno, string fn, bool wh)
        {
            string sql = "Select * from ("
                + " select distinct  lagi.LAGI_IDENT_NO as LAGI_IDENT_NO, "
                + "  max(a.agen_sequ_no) over (partition by substr(a.agen_remarks,7,14),a.agen_ident_no order by a.agen_sequ_no desc) as agen_sequence_no, "
            + "row_number() over(partition by substr(a.agen_remarks, 7, 14), a.agen_ident_no order by substr(a.agen_remarks, 7, 14), a.agen_ident_no) as rn,"
            + " substr(a.agen_remarks,7,14) AS GROUP_NO, "
                    + "flui.flui_al_2_3_letter_code || flui.flui_flight_no AS FLIGHTNO, "
                             + "to_date('02-01-0001' , 'DD-MM-YYYY') +flui.flui_landed_date AS FLIDATE,"
                             + "to_Char(to_date(flui.flui_landed_time, 'hh24miss'), 'hh24:mi:ss') AS ATA_TIME,"
                             + " lagi.lagi_MAWB_PREFIX as MAWB_PREFIX,"
                             + "lagi.lagi_MAWB_NO as MAWB_NO,"
                              + "lagi.lagi_HAWB as HAWB_NO,"
                              + "lagi.lagi_awb_origin as AWB_ORG,"
                              + "lagi.lagi_awb_dest as AWB_DEST,"
                              + "lagi.lagi_shipper_name as SHIPPER,"
                              + "lagi.lagi_shipper_address as SHIPPERADDR,"
                              + "lagi.LAGI_ORIGINAL_AGENT as CUS_CODE,"
                              + "lagi.lagi_consignee_name as CONSIGNEE, "
                              + "lagi.lagi_consignee_address as CONSIGADDR, "
                              + "lagi.LAGI_CURRENT_AGENT as CNEE,"
                              + "lagi.LAGI_ORIGINAL_AGENT as AGENT,"
                              + "lagi.LAGI_ORIGINAL_AGENT as AGENT_CODE, "
                              + "lagi.lagi_quantity_received as PCSGOODS,"
                              + "lagi.lagi_weight_received as GWGOODS,"
                              + "lagi.lagi_quantity_expected as SPIECE,"
                              + "lagi.lagi_weight_expected as SWEIGHT,"
                              + "lagi.lagi_quantity_delivered as DELIVERED, "
                              + "SUBSTR( a.agen_remarks, INSTR(a.agen_remarks, 'location')+9) as location,"
                              + "lagi.lagi_TSO as WAREHOUSE"
                              + "  FROM han_w1_hl.flui flui   JOIN han_w1_hl.PALO palo  on palo.palo_lvg_in = flui.flui_al_2_3_letter_code"
                              + " and palo.palo_flight_no_in = flui.flui_flight_no     and (palo.palo_flight_arrival_date = flui.flui_schedule_date)"
                              + " JOIN han_w1_hl.AWBU_AWBPERULD_LIST awbu on awbu.awbu_uld_isn = palo.palo_uld_isn"
                              + " and awbu.awbu_uld_serial = palo.palo_serial_no_  and awbu.awbu_uld_no = palo.palo_type"
                              + " and awbu.awbu_uld_owner = palo.palo_owner  and awbu.awbu_object_type = 'IMPORT AWB'"
                              + " JOIN han_w1_hl.LAGI lagi  on awbu.awbu_mawb_prefix = lagi.lagi_mawb_prefix "
                              + " and awbu.awbu_mawb_serial_no = lagi.lagi_mawb_no"
                              + "  JOIN han_w1_hl.agen a on lagi.lagi_ident_no = a.agen_ident_no"
                              + " where "
                              + " (((select count(ls.lagi_mawb_no) from lagi ls  where ls.LAGI_DELETED = 0  and ls.lagi_mawb_prefix = lagi.lagi_mawb_prefix  and ls.lagi_mawb_no = lagi.lagi_mawb_no) = 1"
                              + " and lagi.Lagi_master_ident_no = 0) or  (lagi.Lagi_master_ident_no != 0) ) and "
                              + " lagi.lagi_TSO " + (wh == true ? "!=' '" : "=' '") + " and lagi.LAGI_DELETED = 0 and ('ALL'='" + fno + "' or flui.flui_al_2_3_letter_code='" + fno + "')"
                              + "  and ('ALL'='" + fn + "' or flui.flui_flight_no='" + fn + "') and lagi.lagi_quantity_delivered!=lagi.lagi_quantity_received and lagi.LAGI_DELETED = 0   AND lagi.LAGI_GOODS_CONTENT NOT LIKE '%MAIL%'"
                              + "     AND lagi.LAGI_GOODS_CONTENT NOT LIKE '%POST%'"
                              + "   and a.agen_status_external='GROUP MOVED'"
                              + "   AND a.agen_remarks not like '%moved to location TRS%'"
                              + "  and a.agen_remarks like '%has been moved to location%')t where t.rn = 1 order by 5,9";
            List<Layer.ImpAWB> ImpAWBList = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {

                    ImpAWBList.Add(GetProperties(reader));
                }
            }
            return ImpAWBList;

        }

        public IList<Layer.ImpAWB> GetNonDeliveryMawb(string mawb, string fno, string fn, bool wh)
        {
            string sql = " select distinct  lagi.LAGI_IDENT_NO LAGI_IDENT_NO, flui.flui_al_2_3_letter_code || flui.flui_flight_no AS FLIGHTNO,"
                             + "to_date('02-01-0001' , 'DD-MM-YYYY') +flui.flui_landed_date AS FLIDATE,"
                             + "to_Char(to_date(flui.flui_landed_time, 'hh24miss'), 'hh24:mi:ss') AS ATA_TIME,"
                             + " lagi.lagi_MAWB_PREFIX as MAWB_PREFIX,"
                             + "lagi.lagi_MAWB_NO as MAWB_NO,"
                              + "lagi.lagi_HAWB as HAWB_NO,"
                              + "lagi.lagi_awb_origin as AWB_ORG,"
                              + "lagi.lagi_awb_dest as AWB_DEST,"
                              + "lagi.lagi_shipper_name as SHIPPER,"
                              + "lagi.lagi_shipper_address as SHIPPERADDR,"
                              + "lagi.LAGI_ORIGINAL_AGENT as CUS_CODE,"
                              + "lagi.lagi_consignee_name as CONSIGNEE, "
                              + "lagi.lagi_consignee_address as CONSIGADDR, "
                              + "lagi.LAGI_CURRENT_AGENT as CNEE,"
                              + "lagi.LAGI_ORIGINAL_AGENT as AGENT,"
                              + "lagi.LAGI_ORIGINAL_AGENT as AGENT_CODE, "
                              + "lagi.lagi_quantity_received as PCSGOODS,"
                              + "lagi.lagi_weight_received as GWGOODS,"
                              + "lagi.lagi_quantity_expected as SPIECE,"
                              + "lagi.lagi_weight_expected as SWEIGHT,"
                              + "lagi.lagi_quantity_delivered as DELIVERED,"
                              + "lagi.lagi_TSO as WAREHOUSE"
                              + "  FROM han_w1_hl.flui flui   JOIN han_w1_hl.PALO palo  on palo.palo_lvg_in = flui.flui_al_2_3_letter_code"
                              + " and palo.palo_flight_no_in = flui.flui_flight_no     and (palo.palo_flight_arrival_date = flui.flui_schedule_date)"
                              + " JOIN han_w1_hl.AWBU_AWBPERULD_LIST awbu on awbu.awbu_uld_isn = palo.palo_uld_isn"
                              + " and awbu.awbu_uld_serial = palo.palo_serial_no_  and awbu.awbu_uld_no = palo.palo_type"
                              + " and awbu.awbu_uld_owner = palo.palo_owner  and awbu.awbu_object_type = 'IMPORT AWB'"
                              + " JOIN han_w1_hl.LAGI lagi  on awbu.awbu_mawb_prefix = lagi.lagi_mawb_prefix"
                              + " and awbu.awbu_mawb_serial_no = lagi.lagi_mawb_no"
                              + " where lagi.lagi_MAWB_PREFIX||lagi.lagi_MAWB_NO as MAWB_NO='" + mawb + "' and  lagi.lagi_TSO " + (wh == true ? "!=' '" : "=' '") + " and lagi.LAGI_DELETED = 0 and ('ALL'='" + fno + "' or flui.flui_al_2_3_letter_code='" + fno + "')"
                              + "  and ('ALL'='" + fn + "' or flui.flui_flight_no='" + fn + "') and lagi.lagi_quantity_delivered!=lagi.lagi_quantity_received and lagi.LAGI_DELETED = 0   AND lagi.LAGI_GOODS_CONTENT NOT LIKE '%MAIL%'"
                              + "     AND lagi.LAGI_GOODS_CONTENT NOT LIKE '%POST%'";
            List<Layer.ImpAWB> ImpAWBList = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {

                    ImpAWBList.Add(GetProperties(reader));
                }
            }
            return ImpAWBList;

        }


        public IList<Layer.ImpAWB> GetInventory(DateTime? start, DateTime? end, DateTime? dateCheck)
        {
            string sql = "select t.lagi_ident_no,t.location,t.FLIGHTNO,t.FLIDATE,t.ATA_TIME,t.MAWB_PREFIX,t.MAWB_NO,t.HAWB_NO,t.AWB_ORG,t.AWB_DEST,t.SHIPPER,t.SHIPPERADDR, "
                         + " t.CUS_CODE,t.CONSIGNEE,t.CONSIGADDR,t.CNEE,t.AGENT,t.AGENT_CODE,t.SPIECE,t.PCSGOODS,t.GWGOODS,t.DELIVERED,t.GOODSCONTENT " +
                         " from " +
                         "(select distinct lagi.lagi_ident_no," +
                         " max(a.agen_sequ_no) over(partition by substr(a.agen_remarks, 7, 14)," +
                         " a.agen_ident_no order by a.agen_sequ_no desc) as agen_sequence_no," +
                         " row_number() over(partition by substr(a.agen_remarks, 7, 14)," +
                         " a.agen_ident_no order by substr(a.agen_remarks, 7, 14), a.agen_ident_no) as rn," +
                         " substr(a.agen_remarks, 7, 14) AS GROUP_NO," +
                         " SUBSTR(a.agen_remarks, INSTR(a.agen_remarks, 'location') + 9) as location," +
                         " flui.flui_al_2_3_letter_code|| flui.flui_flight_no as FLIGHTNO,"
                         + " to_date('02-01-0001', 'DD-MM-YYYY') + flui.flui_landed_date AS FLIDATE,"
                         + " to_Char(to_date(flui.flui_landed_time, 'hh24miss'), 'hh24:mi:ss') AS ATA_TIME,"
                         + " lagi.lagi_MAWB_PREFIX as MAWB_PREFIX,"
                         + "  lagi.lagi_MAWB_NO as MAWB_NO,"
                         + " lagi.lagi_hawb as HAWB_NO ,"
                         + "lagi.lagi_awb_origin as AWB_ORG,"
                         + "lagi.lagi_awb_dest as AWB_DEST,"
                         + "lagi.lagi_shipper_name as SHIPPER,"
                         + "lagi.lagi_shipper_address as SHIPPERADDR,"
                         + "lagi.LAGI_ORIGINAL_AGENT as CUS_CODE,"
                         + "lagi.lagi_consignee_name as CONSIGNEE, "
                         + "lagi.lagi_consignee_address as CONSIGADDR, "
                         + "lagi.LAGI_CURRENT_AGENT as CNEE,"
                         + "lagi.LAGI_ORIGINAL_AGENT as AGENT,"
                         + "lagi.LAGI_ORIGINAL_AGENT as AGENT_CODE, "
                         + " lagi.lagi_Quantity_expected as SPIECE,"
                         + " lagi.lagi_quantity_received as PCSGOODS,"
                         + " lagi_weight_received as GWGOODS,"
                         + "  lagi.lagi_quantity_delivered as DELIVERED,"
                         + "  lagi.LAGI_GOODS_CONTENT as GOODSCONTENT"
                         + " FROM han_w1_hl.flui flui   JOIN han_w1_hl.PALO palo  on palo.palo_lvg_in = flui.flui_al_2_3_letter_code"
                         + " and palo.palo_flight_no_in = flui.flui_flight_no and(palo.palo_flight_arrival_date = flui.flui_schedule_date)"
                         + " JOIN han_w1_hl.AWBU_AWBPERULD_LIST awbu  on awbu.awbu_uld_isn = palo.palo_uld_isn    and awbu.awbu_uld_serial = palo.palo_serial_no_"
                         + " and awbu.awbu_uld_no = palo.palo_type"
                         + " and awbu.awbu_uld_owner = palo.palo_owner"
                         + " and awbu.awbu_object_type = 'IMPORT AWB'"
                         + " JOIN han_w1_hl.LAGI lagi"
                         + " on awbu.awbu_mawb_prefix = lagi.lagi_mawb_prefix"
                         + " and awbu.awbu_mawb_serial_no = lagi.lagi_mawb_no"
                         + " join (select * from grai_group_additional_info grai where  grai.grai_group_type = 'DATE'"
                         + " and grai.grai_group_code = 'RECEIVED'  and grai.grai_object_group_isn not like '8%' and to_date(grai.grai_value, 'YYYY-MM-DD hh24:mi:ss') >= to_date('" + start.Value.ToString("dd-MM-yyyy HH:mm:ss") + "', 'DD-MM-YYYY hh24:mi:ss')"
                         + " and to_date(grai.grai_value, 'YYYY-MM-DD hh24:mi:ss') <= to_date('" + end.Value.ToString("dd-MM-yyyy HH:mm:ss") + "', 'DD-MM-YYYY hh24:mi:ss')"
                         + " and(select count(dl.grai_object_isn) from grai_group_additional_info dl where"
                         + " dl.grai_object_isn = grai.grai_object_isn  and dl.grai_object_group_isn = grai.grai_object_group_isn"
                         + " and dl.grai_group_type = 'DATE'  and dl.grai_group_code = 'DELIVERED'"
                         + " and to_date(dl.grai_value, 'YYYY-MM-DD hh24:mi:ss') >= to_date(grai.grai_value, 'YYYY-MM-DD hh24:mi:ss') "
                         + " and to_date(dl.grai_value, 'YYYY-MM-DD hh24:mi:ss') <= to_date('" + dateCheck.Value.ToString("dd-MM-yyyy 23:59:59") + "', 'DD-MM-YYYY hh24:mi:ss')"
                         + " ) = 0) GROUP_GRAI on  GROUP_GRAI.grai_object_isn = lagi.lagi_ident_no  JOIN han_w1_hl.agen a on lagi.lagi_ident_no = a.agen_ident_no  where lagi.LAGI_LOCAL_TRANSFER != 'TRANSHIPMENT' "
                        + " and "
                         + "     ("
                         + "     ((select count(ls.lagi_mawb_no) from lagi ls  where  ls.lagi_mawb_prefix = lagi.lagi_mawb_prefix  and ls.lagi_mawb_no = lagi.lagi_mawb_no) = 1"
                         + " and lagi.Lagi_master_ident_no = 0)"
                         + "        or  (lagi.Lagi_master_ident_no != 0) "
                          + "    ) and lagi.LAGI_GOODS_CONTENT!='TEST'" +
                          " and a.agen_status_external='GROUP MOVED' " +
                          " AND a.agen_remarks not like '%moved to location TRS%' " +
                          " and a.agen_remarks like '%has been moved to location%')t where t.rn = 1 order by t.MAWB_NO";
            ;
            List<Layer.ImpAWB> ImpAWBList = new List<Layer.ImpAWB>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {

                    ImpAWBList.Add(GetProperties(reader));
                }
            }
            return ImpAWBList;
        }
    }
}
