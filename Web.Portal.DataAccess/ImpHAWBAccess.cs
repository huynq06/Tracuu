using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;

using System.Data;
namespace Web.Portal.DataAccess
{
    public class ImpHAWBAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.ImpHAWB GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.ImpHAWB objImpHAWB = new Web.Portal.Layer.ImpHAWB();

           objImpHAWB.Lagi_Ident = Convert.ToString(GetValueField(reader, "LAGI_IDENT_NO", string.Empty));
            objImpHAWB.Lagi_Master_Ident = Convert.ToString(GetValueField(reader, "LAGI_MASTER_IDENT_NO", string.Empty));
            objImpHAWB.HAWB = Convert.ToString(GetValueField(reader, "HAWB_NO", string.Empty));            
            objImpHAWB.QuantityExpected = Convert.ToString(GetValueField(reader, "SPIECE", "0"));
            objImpHAWB.WeightExpected = Convert.ToString(GetValueField(reader, "SWEIGHT", "0"));
            objImpHAWB.QuantityReceived = Convert.ToString(GetValueField(reader, "PCSGOODS", "0"));
            objImpHAWB.WeightReceived = Convert.ToString(GetValueField(reader, "GWGOODS", "0"));
            objImpHAWB.QuantityDelivered = Convert.ToString(GetValueField(reader, "DELIVERED", "0"));
            objImpHAWB.CONSIGNEE= Convert.ToString(GetValueField(reader, "CONSIGNEE", ""));
            objImpHAWB.CONSIGNEEADDR = Convert.ToString(GetValueField(reader, "CONSIGNEEADDR", ""));
            objImpHAWB.GOODSNAME = Convert.ToString(GetValueField(reader, "GOODSNAME", ""));
            objImpHAWB.StatusDelivered = Convert.ToString(GetValueField(reader, "STATUS_DELIVERED", "0"));

            return objImpHAWB;
        }

        public IList<Layer.ImpHAWB> GetByMAWB(string mawb)
        {
            IList<Layer.ImpHAWB> impHAWBs = new List<Layer.ImpHAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.IMPAWB_GETALBY_M", mawb))
            {
                while (reader.Read())
                {
                    
                    impHAWBs.Add(GetProperties(reader));
                }
            }
            return impHAWBs;

        }
        public IList<Layer.ImpHAWB>GetByMawbGroup(string mawb)
        {
            string sql = " select lagi.lagi_ident_no,lagi.lagi_master_ident_no, lagi.lagi_MAWB_NO as MAWB_NO, lagi.lagi_HAWB as HAWB_NO, lagi.lagi_quantity_received as PCSGOODS,"
                             + " lagi.lagi_weight_received as GWGOODS,"
                             + " lagi.lagi_quantity_expected as SPIECE,"
                             + " lagi.lagi_weight_expected as SWEIGHT,"
                             + " lagi.lagi_quantity_delivered as DELIVERED,"
                             + " lagi.lagi_goods_content as GOODSNAME,"
                             + " lagi.lagi_consignee_name as CONSIGNEE, "
                             + " lagi.lagi_consignee_address as CONSIGNEEADDR,"
                             + " (select count(grai_object_isn) from grai_group_additional_info where grai_object_isn = lagi.lagi_ident_no"
                             + " and grai_group_type = 'DATE' and grai_group_code = 'DELIVERED') as STATUS_DELIVERED"
                             + " from lagi lagi where lagi_mawb_prefix || lagi_MAWB_NO = '"+mawb+"'  order by lagi_HAWB";
            IList<Layer.ImpHAWB> impHAWBs = new List<Layer.ImpHAWB>();
            using (OracleDataReader reader =GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {

                    impHAWBs.Add(GetProperties(reader));
                }
            }
            return impHAWBs;
        }
        public IList<Layer.ImpHAWB> GetByHawbByMawb(string mawb)
        {
            IList<Layer.ImpHAWB> impHAWBs = new List<Layer.ImpHAWB>();
            using (OracleDataReader reader = GetScriptOracleDataReader("select lagi.lagi_MAWB_NO as MAWB_NO,"
                                                                       + "lagi.lagi_HAWB as HAWB_NO,"
                                                                       + "lagi.lagi_quantity_received as PCSGOODS,"
                                                                       + " lagi.lagi_weight_received as GWGOODS,"
                                                                       + "lagi.lagi_quantity_expected as SPIECE,"
                                                                       + "lagi.lagi_weight_expected as SWEIGHT,"
                                                                       + "lagi.lagi_quantity_delivered as DELIVERED "
                                                                       + "from lagi lagi where lagi_MAWB_PREFIX||lagi_MAWB_NO = '" + mawb + "'"))
            {
                while (reader.Read())
                {

                    impHAWBs.Add( GetProperties(reader));
                }
            }
            return impHAWBs;

        }
        public Layer.ImpHAWB GetMAWB(string mawb)
        {
          Layer.ImpHAWB impHAWBs = new Layer.ImpHAWB();
            using (OracleDataReader reader =GetScriptOracleDataReader("select lagi.lagi_MAWB_NO as MAWB_NO,"
                                                                      +"lagi.lagi_HAWB as HAWB_NO,"
                                                                      +"lagi.lagi_quantity_received as PCSGOODS,"
                                                                      +" lagi.lagi_weight_received as GWGOODS,"
                                                                      +"lagi.lagi_quantity_expected as SPIECE,"
                                                                      +"lagi.lagi_weight_expected as SWEIGHT,"
                                                                      +"lagi.lagi_quantity_delivered as DELIVERED "
                                                                      + "from lagi lagi where lagi_MAWB_PREFIX||lagi_MAWB_NO = '" + mawb+ "'  and lagi_master_ident_no=0"))
            {
                if (reader.Read())
                {

                    impHAWBs = GetProperties(reader);
                }
            }
            return impHAWBs;

        }
    }
}
