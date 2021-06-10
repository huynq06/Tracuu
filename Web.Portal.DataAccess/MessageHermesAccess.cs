using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class MessageHermesAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.MessageHermes GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.MessageHermes objMessageHermes = new Web.Portal.Layer.MessageHermes();

            objMessageHermes.LagiId = Convert.ToInt64(GetValueField(reader, "LAGI_IDENT_NO", 0));
            objMessageHermes.FlightNo = Convert.ToString(GetValueField(reader, "FLIGHTNO", string.Empty));
            objMessageHermes.FlightDate = Convert.ToDateTime(GetValueDateTimeField(reader, "FLIDATE", objMessageHermes.FlightDate));
            objMessageHermes.ATATIME = Convert.ToString(GetValueField(reader, "ATA_TIME", string.Empty));
            objMessageHermes.ScheTime = Convert.ToString(GetValueField(reader, "SCHETIME", string.Empty));
            objMessageHermes.INTERNAL_NUMBER = Convert.ToString(GetValueField(reader, "INTERNAL_NUMER", string.Empty));
            objMessageHermes.MSGSENT = Convert.ToString(GetValueField(reader, "MSGSENT", string.Empty));
            objMessageHermes.MSGCOMPLETED = Convert.ToString(GetValueField(reader, "MSGCOMPLETED", string.Empty));
            objMessageHermes.MSGFILE = Convert.ToString(GetValueField(reader, "MSGFILE", string.Empty));
            objMessageHermes.MSGDATE = Convert.ToDateTime(GetValueDateTimeField(reader, "MSGDATE", objMessageHermes.MSGDATE));
            objMessageHermes.MSGCODE = Convert.ToString(GetValueField(reader, "MSGCODE", string.Empty));
            objMessageHermes.MSGVALUE = Convert.ToString(GetValueField(reader, "MSGVALUE", string.Empty));
            objMessageHermes.Prefix = Convert.ToString(GetValueField(reader, "MAWB_PREFIX", string.Empty));
            objMessageHermes.AWB = Convert.ToString(GetValueField(reader, "MAWB_NO", string.Empty));
            objMessageHermes.HAWB = Convert.ToString(GetValueField(reader, "HAWB_NO", string.Empty));
            objMessageHermes.GoodsContent = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            objMessageHermes.ORGIN = Convert.ToString(GetValueField(reader, "AWB_ORG", string.Empty));
            objMessageHermes.LOADING = Convert.ToString(GetValueField(reader, "AWB_ORG_LOAD", string.Empty));
            objMessageHermes.DEST = Convert.ToString(GetValueField(reader, "AWB_DEST", string.Empty));
            objMessageHermes.Agent = Convert.ToString(GetValueField(reader, "AGENT", string.Empty));
            objMessageHermes.AgentCode = Convert.ToString(GetValueField(reader, "AGENT_CODE", string.Empty));
            objMessageHermes.Shipper = Convert.ToString(GetValueField(reader, "SHIPPER", string.Empty));
            objMessageHermes.ShipperADDR = Convert.ToString(GetValueField(reader, "SHIPPERADDR", string.Empty));
            objMessageHermes.Consignee = Convert.ToString(GetValueField(reader, "CONSIGNEE", string.Empty));
            objMessageHermes.ConsignADDR = Convert.ToString(GetValueField(reader, "CONSIGADDR", string.Empty));
            objMessageHermes.QuantityExpected = Convert.ToString(GetValueField(reader, "SPIECE", "0"));
            objMessageHermes.WeightExpected = Convert.ToString(GetValueField(reader, "SWEIGHT", "0"));
            objMessageHermes.QuantityReceived = Convert.ToString(GetValueField(reader, "PCSGOODS", "0"));
            objMessageHermes.WeightReceived = Convert.ToString(GetValueField(reader, "GWGOODS", "0"));
            objMessageHermes.QuantityDelivered = Convert.ToString(GetValueField(reader, "DELIVERED", "0"));
            objMessageHermes.GoodsContent = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            return objMessageHermes;
        }

        public List<Layer.MessageHermes> GetCustomByEmail(string msgCode,string msgType,string code, string fno, DateTime? fromDate, DateTime? toDate)
        {
            List<Layer.MessageHermes> MessageHermess = new List<Layer.MessageHermes>();
            string script = "select distinct"
                            +" flui.flui_al_2_3_letter_code FCODE,"
                            + "flui.flui_flight_no AS FLIGHTNO, "                           
                            +" to_date('02-01-0001', 'DD-MM-YYYY') + flui.flui_landed_date AS ATADATE,"
                            +" to_Char(to_date(flui.flui_landed_time, 'hh24miss'), 'hh24:mi:ss') AS ATATIME,"
                            +"flui.FLUI_INTERNAL_NUMBER as INTERNAL_NUMER,                           "
                            +" lagi.lagi_MAWB_PREFIX as MAWB_PREFIX,"
                            +"lagi.lagi_MAWB_NO as MAWB_NO,"                        
                            +"lagi.lagi_quantity_received as PCSGOODS,"
                            +"lagi.lagi_weight_received as GWGOODS,"
                            +"lagi.lagi_quantity_expected as SPIECE,"
                             +"lagi.lagi_weight_expected as SWEIGHT,"
                             +"lagi.lagi_quantity_delivered as DELIVERED,"
                             + "kund.kund_name_1 CONSIGNEE,kund.kund_street_1 ||','|| kund.kund_street_2||','||kund.kund_city||','||kund.kund_state_province||','||kund.kund_country CONSIGADDR,"
                             + "lagi.lagi_goods_content as GOODSCONTENT,"
                             +"mo.MESG_SENT as MSGSENT,"
                             +"mo.MESG_COMPLETED as MSGCOMPLETED,"
                             +"ms.Mess_Message_Filename as MSGFILE,"
                             +"ms.mess_message_datetime as MSGDATE,"
                             +"msc.Mesc_Sub_Code as MSGCODE,"
                             +"msc.Mesc_Value as MSGVALUE"
                             +" FROM han_w1_hl.flui flui"
                             +" JOIN han_w1_hl.PALO palo"
                             +"      on palo.palo_lvg_in = flui.flui_al_2_3_letter_code"
                             +" and palo.palo_flight_no_in = flui.flui_flight_no"
                             +"      and(palo.palo_flight_arrival_date = flui.flui_schedule_date"                            
                             +")"
                                 
                             +" JOIN han_w1_hl.AWBU_AWBPERULD_LIST awbu"
                             +"   on awbu.awbu_uld_isn = palo.palo_uld_isn"
                             +" and awbu.awbu_uld_serial = palo.palo_serial_no_"
                             +" and awbu.awbu_uld_no = palo.palo_type"
                             +" and awbu.awbu_uld_owner = palo.palo_owner"
                             +" and awbu.awbu_object_type = 'IMPORT AWB'"
                             +" JOIN han_w1_hl.LAGI lagi"
                             +"  on awbu.awbu_mawb_prefix = lagi.lagi_mawb_prefix"
                            +" and awbu.awbu_mawb_serial_no = lagi.lagi_mawb_no"
                            +" inner join  VN_SHARE_HL.MESG_MESSAGE_OBJECTS mo  on mo.mesg_object_isn = lagi.lagi_ident_no"
                            +" inner join VN_SHARE_HL.MESS_MESSAGES ms on ms.Mess_Message_Isn = mo.mesg_message_isn"
                            +" inner join VN_SHARE_HL.MESC_MESSAGES_CODES msc on msc.mesc_message_isn = mo.mesg_message_isn"
                            +" inner join KUND kund on kund.kund_customer_no_ = lagi.lagi_consignee_number"
                            + " where  msc.mesc_sub_code = '"+msgCode+"' and ms.Mess_Message_type = '"+msgType+"' and"
                            +" ('"+code+ "' = 'ALL' or flui.flui_al_2_3_letter_code = '" + code + "')"
                            + " and(lagi.LAGI_LOCAL_TRANSFER != 'TRANSHIPMENT')"
                            +"  and('"+fno+ "' = 'ALL' or flui.flui_flight_no = '" + fno + "')"
                            +" and lagi.Lagi_master_ident_no = 0"
                             +"   and   ( flui.flui_landed_date is not null and flui.flui_landed_time is not null and"
                            + " to_date('02-01-0001 ' || to_Char(to_date(flui.flui_landed_time, 'hh24miss'), 'hh24:mi:ss'), 'DD-MM-YYYY hh24:mi:ss') + flui.flui_landed_date >=to_date('"+fromDate.Value.ToString("yyyy-MM-dd HH:mm:ss")+"','YYYY-MM-DD hh24:mi:ss')"
                            + " and   to_date('02-01-0001 ' || to_Char(to_date(flui.flui_landed_time, 'hh24miss'), 'hh24:mi:ss'), 'DD-MM-YYYY hh24:mi:ss') + flui.flui_landed_date <= to_date('" + toDate.Value.ToString("yyyy-MM-dd HH:mm:ss") + "','YYYY-MM-DD hh24:mi:ss')"
                            + " ) and lagi.LAGI_DELETED = 0 ";

            using (OracleDataReader reader = GetScriptOracleDataReader(script))
            {
                while (reader.Read())
                {
                    MessageHermess.Add(GetProperties(reader));
                }
            }
            return MessageHermess;

        }
    }
}
