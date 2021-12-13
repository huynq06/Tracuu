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
    public class AwbDetailAccess : DataBase.OracleProvider
    {
        
        private AwbDetailViewModel GetProperties(OracleDataReader reader)
        {
            AwbDetailViewModel awb = new AwbDetailViewModel();
            awb.Lagi_Identity = Convert.ToString(GetValueField(reader, "ID", string.Empty));
            awb.Mawb = Convert.ToString(GetValueField(reader, "MAWB", string.Empty));
            awb.Hawb = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            awb.FlightNumber = Convert.ToString(GetValueField(reader, "FLIGHT_NO", string.Empty));
            awb.GoodsName = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            awb.Consignee = Convert.ToString(GetValueField(reader, "CONSIGNEE", string.Empty));
            awb.ConsigneeAdd = Convert.ToString(GetValueField(reader, "CONSIGADDR", string.Empty));
            awb.Shipper = Convert.ToString(GetValueField(reader, "SHIPPER", string.Empty));
            awb.ShipperAdd = Convert.ToString(GetValueField(reader, "SHIPPERADDR", string.Empty));
            awb.Pieces_Received = Convert.ToInt32(GetValueField(reader, "PIECES_RECEIVED", 0));
            awb.Pieces_Expected = Convert.ToInt32(GetValueField(reader, "PIECES_EXPECTED", 0));
            awb.Pieces_Delivered = Convert.ToInt32(GetValueField(reader, "PIECES_DELIVERED", 0));
            awb.Weight = Convert.ToString(GetValueField(reader, "WEIGHT", string.Empty));
            awb.Weight_Expected = Convert.ToString(GetValueField(reader, "WEIGHT_EXPECTED", string.Empty));
            awb.Origin = Convert.ToString(GetValueField(reader, "AWB_ORG", string.Empty));
            awb.Destination = Convert.ToString(GetValueField(reader, "AWB_DEST", string.Empty));
            awb.Remark = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
            awb.StatusDelivered = Convert.ToString(GetValueField(reader, "STATUS_DELIVERED", "0"));
            awb.Lagi_Master_Identity = Convert.ToString(GetValueField(reader, "LAGI_MASTER", "0"));
            awb.LAGI_TSO = Convert.ToString(GetValueField(reader, "LAGI_TSO", string.Empty));
            awb.Status_Goods = Convert.ToInt32(GetValueField(reader, "STATUS_GOODS", 0));
            awb.Status_PXK = Convert.ToInt32(GetValueField(reader, "STATUS_PXK", 0));
            awb.Check_Received = Convert.ToInt32(GetValueField(reader, "CHECK_RECEIVE", 0));
            
            return awb;
        }
        public AwbDetailViewModel GetAwbDetailByLagiIdentity(string lagiIdent)
        {
            string sql = " SELECT distinct " +
      "lagi.lagi_ident_no as ID, "+
      "flui.flui_al_2_3_letter_code || flui.flui_flight_no AS FLIGHT_NO, " +
        "to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flui.flui_schedule_date, 'DD-MM-YYYY') as SCHEDULED_DATE, " +
      "to_char(to_date(flui.flui_schedule_time, 'HH24MISS'), 'HH24:MI:SS') as SCHEDULED_TIME, " +
      "to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flui.flui_landed_date, 'DD-MM-YYYY') AS ATA_DATE, " +
      "to_char(to_date(flui.flui_landed_time, 'HH24MISS'), 'HH24:MI:SS') as ATA_TIME, " +
      "lagi.lagi_mawb_prefix || lagi.lagi_mawb_no as MAWB, " +
      "lagi.LAGI_HAWB as HAWB, " +
      "lagi.lagi_quantity_received as PIECES, " +
      "lagi.lagi_weight_received as WEIGHT " +
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
        "and lagi.lagi_flight_no_in = awbu.awbu_flight_no " +
        "and to_date('02-01-0001' , 'DD-MM-YYYY') +lagi.lagi_flight_date_in = awbu.awbu_flight_date " +
    "WHERE " +
      "1 = 1 " +
      "AND lagi.lagi_deleted = 0 " +
      "AND lagi.lagi_ident_no = '" + lagiIdent + "'";
            AwbDetailViewModel awb = new AwbDetailViewModel();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    awb = GetProperties(reader);
                    
                }
            }
            return awb;
        }
        public List<AwbDetailViewModel> GetAwbDetail(string mawb,string hawb)
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
       "lagi.lagi_tso as LAGI_TSO, " +
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
                             "lagi.lagi_shipment_remarks as REMARK, " +
                             " (select count(grai_object_isn) from grai_group_additional_info where grai_object_isn = lagi.lagi_ident_no" +
                             " and grai_group_type = 'DATE' and grai_group_code = 'DELIVERED') as STATUS_DELIVERED " +
    "FROM LAGI lagi " +
           "WHERE " +
                "1 = 1 " +     
      "AND lagi.lagi_deleted = 0 " +
      "AND ('" + mawb + "'='ALL' or (lagi.LAGI_MAWB_PREFIX ||  lagi.LAGI_MAWB_NO) = '" + mawb + "') " +
      "AND ('" + hawb + "'='ALL' or lagi.LAGI_HAWB = '" + hawb + "')";
            List<AwbDetailViewModel> listawb = new List<AwbDetailViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listawb.Add(GetProperties(reader));

                }
            }
            return listawb;
        }
        public AwbDetailViewModel GetAwbDetailStatus(string lagi_ident)
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
       "lagi.lagi_tso as LAGI_TSO, " +
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
                             "lagi.lagi_shipment_remarks as REMARK, " +
                             " (select count(grai_object_isn) from grai_group_additional_info where grai_object_isn = lagi.lagi_ident_no" +
                             " and grai_group_type = 'DATE' and grai_group_code = 'DELIVERED') as STATUS_DELIVERED " +
    "FROM LAGI lagi " +
           "WHERE " +
                "1 = 1 " +
      "AND lagi.lagi_deleted = 0 and lagi.lagi_ident_no = '" + lagi_ident + "'";
            AwbDetailViewModel awb = new AwbDetailViewModel();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    awb = GetProperties(reader);

                }
            }
            return awb;
        }
        public List<AwbDetailViewModel> GetAwbGeneralDetail(string mawb, string hawb)
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
       "lagi.lagi_tso as LAGI_TSO, " +
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
      "AND lagi.lagi_deleted = 0 " +
        "and lagi.lagi_ident_no NOT IN( "+
         "SELECT l.lagi_ident_no FROM han_w1_hl.lagi l WHERE EXISTS( SELECT 1 FROM han_w1_hl.lagi t2 " +
        "WHERE t2.lagi_mawb_no = l.lagi_mawb_no "+
         "and t2.lagi_mawb_prefix = l.lagi_mawb_prefix "+
         "AND t2.lagi_ident_no <> l.lagi_ident_no "+
         "and t2.lagi_deleted = 0) "+
        "AND l.lagi_hawb = ' ')" +
      "AND ('" + mawb + "'='ALL' or (lagi.LAGI_MAWB_PREFIX ||  lagi.LAGI_MAWB_NO) = '" + mawb + "') " +
      "AND ('" + hawb + "'='ALL' or lagi.LAGI_HAWB = '" + hawb + "')";
            List<AwbDetailViewModel> listawb = new List<AwbDetailViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listawb.Add(GetProperties(reader));

                }
            }
            return listawb;
        }
        public List<AwbDetailViewModel> GetAwbDetailByMawb(string mawb)
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
       "lagi.lagi_tso as LAGI_TSO, " +
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
                             "lagi.lagi_shipment_remarks as REMARK, " +
                             " (select count(grai_object_isn) from grai_group_additional_info where grai_object_isn = lagi.lagi_ident_no" +
                             " and grai_group_type = 'DATE' and grai_group_code = 'DELIVERED') as STATUS_DELIVERED " +
    "FROM LAGI lagi " +
           "WHERE " +
                "1 = 1 " +
      "AND lagi.lagi_deleted = 0 " +
      "AND ('" + mawb + "'='ALL' or (lagi.LAGI_MAWB_PREFIX ||  lagi.LAGI_MAWB_NO) like '" + mawb + "') ";
            List<AwbDetailViewModel> listawb = new List<AwbDetailViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listawb.Add(GetProperties(reader));

                }
            }
            return listawb;
        }
        public DateTime? GetTimeTransferLagi(string lagiIdent)
        {
            DateTime? dt = new DateTime();
            string sql = "select a.agen_creation_datetime as CREATED from Agen a " +
                         "where a.agen_status_external = 'GROUP MOVED' AND " +
                         "a.agen_ident_no = '" + lagiIdent + "'" +
                         " and rownum = 1 " +
                         "order by a.agen_creation_datetime desc";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                  dt = Convert.ToDateTime(GetValueDateTimeField(reader, "CREATED", dt));

                }
            }
            return dt;
        }

        public List<AwbDetailViewModel> GetAwbByFlight(string flightID)
        {
            string sql = " select distinct "+
                   "lagi.lagi_ident_no as ID, " +
"lagi.lagi_mawb_prefix || lagi.lagi_mawb_no as MAWB, " +
"lagi.lagi_hawb as HAWB, " +
"lagi.lagi_quantity_received as PIECES_EXPECTED, " +
"lagi.lagi_weight_received as WEIGHT_EXPECTED, " +
"sum(j.pieces_received) as PIECES_RECEIVED, " +
"sum(j.weight_received) as WEIGHT, " +
  "0 STATUS_GOODS, " +
     "lagi.lagi_tso as LAGI_TSO, " +
      "lagi.lagi_goods_content GOODSCONTENT, " +
  "(select case when l.lagi_quantity_received < l.lagi_quantity_expected then 0 " +
 "else 1 end as Check_Receive from lagi l where l.lagi_ident_no = lagi.lagi_ident_no) as CHECK_RECEIVE, " +
    "(select count(grai_object_isn) from grai_group_additional_info where grai_object_isn = lagi.lagi_ident_no " +
                             "and grai_group_type = 'DATE' and grai_group_code = 'DELIVERED') as STATUS_DELIVERED ," +
                             "(select count(ccf.cusf_form_number) from lagi l " +
"inner join cusf_customs_forms ccf on ccf.cusf_ident_no = l.lagi_ident_no " +
"where l.lagi_ident_no = lagi.lagi_ident_no " +
") as STATUS_PXK, " +
"lagi.LAGI_SHIPPER_NAME SHIPPER, " +
"lagi.LAGI_CONSIGNEE_NAME CONSIGNEE, " +
"lagi.LAGI_SHIPMENT_REMARKS as REMARK " +
"from ( select k.*,grai.grai_numeric_value as weight_received " +
  "from ( select grai.grai_object_isn as ID, " +
      "grai.grai_object_group_isn as group_no, " +
     "grai.grai_numeric_value as pieces_received " +
          "from han_w1_hl.grai_group_additional_info grai " +
      "where  grai.grai_group_type = 'PIECES' and grai.grai_group_code = 'RECEIVED')k " +
    "join han_w1_hl.grai_group_additional_info grai on k.ID = grai.grai_object_isn and k.group_no = grai.grai_object_group_isn " +
  "and grai.grai_group_type = 'WEIGHT' " +
  "and grai.grai_group_code = 'RECEIVED' )j " +
  "join han_w1_hl.grai_group_additional_info grai on j.ID = grai.grai_object_isn and j.group_no = grai.grai_object_group_isn " +
  "and grai.grai_group_type = 'FLIGHT' " +
  "and grai.grai_group_code = 'ISN' " +
  "join han_w1_hl.flui flui on grai.grai_value = flui.flui_internal_number " +
  "join han_w1_hl.lagi lagi on j.ID = lagi.lagi_ident_no " +
  "where flui.flui_internal_number = '"+ flightID + "' " +
 "group by lagi.lagi_ident_no,lagi.lagi_mawb_prefix || lagi.lagi_mawb_no, " +
 "lagi.lagi_hawb,lagi.lagi_quantity_received, " +
 "lagi.lagi_weight_received,lagi.LAGI_SHIPPER_NAME,lagi.LAGI_CONSIGNEE_NAME, " +
 "lagi.LAGI_SHIPMENT_REMARKS,lagi.lagi_goods_content,lagi.lagi_ident_no,lagi.lagi_tso";
            List<AwbDetailViewModel> listawb = new List<AwbDetailViewModel>();
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
