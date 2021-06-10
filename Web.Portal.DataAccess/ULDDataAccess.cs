using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class ULDDataAccess:Web.Portal.DataBase.DataProviderService
    {
        private Web.Portal.Layer.ULD GetProperties(System.Data.IDataReader reader)
        {
            Web.Portal.Layer.ULD objULD = new Web.Portal.Layer.ULD();
            objULD.NETWEIGHT= Convert.ToString(GetValueField(reader, "NETWEIGHT", string.Empty));
            objULD.ULDID= Convert.ToString(GetValueField(reader, "ULDID", string.Empty));
            objULD.AWB = Convert.ToString(GetValueField(reader, "AWBID", string.Empty));
            objULD.FCODE = Convert.ToString(GetValueField(reader, "FCODE", string.Empty));
            return objULD;
        }
        private Web.Portal.Layer.ULDDETAILS GetPropertiesDetails(System.Data.IDataReader reader)
        {
            Web.Portal.Layer.ULDDETAILS objULD = new Web.Portal.Layer.ULDDETAILS();
            objULD.ULD = Convert.ToString(GetValueField(reader, "ULDID", string.Empty));
            objULD.AWB = Convert.ToString(GetValueField(reader, "AWBID", string.Empty));
            objULD.WEIGHT = Convert.ToString(GetValueField(reader, "WEIGHT", string.Empty));
            return objULD;
        }
        public List<Web.Portal.Layer.ULD> GetByID(string awb,string flightno,string date)
        {
            List<Web.Portal.Layer.ULD> ULDList = new List<Layer.ULD>();
            string sql = "select mi.AWBID AWBID, mi.ULDID ULDID,mi.FLIGHTCODE FCODE,(select (TOTAL_WEIGHT-DOLLY_WEIGHT-TARE_WEIHGT)   from EXP_DEADLOAD_WEIGHT where FLIGHTCODE=mi.FLIGHTCODE and ULDID=mi.ULDID) as NETWEIGHT"
                        + " from RPT_MANIFEST mi  inner join"
                        + " AP_FLIGHT FL on FL.FLIGHTCODE = mi.FLIGHTCODE  where mi.AWBID = '" + awb + "'";
            using (System.Data.IDataReader reader = CommandScriptDataReader(sql))
            {

                while (reader.Read())
                    ULDList.Add( GetProperties(reader));

            }
            return ULDList;
        }
      
        public List<Web.Portal.Layer.ULDDETAILS> GetByULD(string Fcode,string awb,string uld,string fno,string fdate)
        {
            List<Web.Portal.Layer.ULDDETAILS> ULDList = new List<Layer.ULDDETAILS>();
            
            string sql = "select ULDID,AWBID,WEIGHT from RPT_MANIFEST rmi  where  ULDID='" + uld + "'  and rmi.AWBID!='"+awb+ "' and rmi.FLIGHTCODE='" + Fcode+"'";
            using (System.Data.IDataReader reader = CommandScriptDataReader(sql))
            {

                while (reader.Read())
                    ULDList.Add(GetPropertiesDetails(reader));

            }
            return ULDList;
        }

    }
}
