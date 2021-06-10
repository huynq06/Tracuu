using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class CapSoAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.CapSo GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.CapSo objCapSo = new Web.Portal.Layer.CapSo();
            objCapSo.QUEUE = Convert.ToString(GetValueField(reader, "QUEUE", string.Empty));
            objCapSo.SPECIAL = Convert.ToInt32(GetValueField(reader, "SPECIAL", 0));
            objCapSo.CREATED = GetValueDateTimeField(reader, "CREATED", objCapSo.CREATED);
            objCapSo.WAIT = objCapSo.CREATED.HasValue ?Math.Round( (DateTime.Now - objCapSo.CREATED.Value).TotalMinutes,0).ToString() : string.Empty;         
            return objCapSo;
        }
        public List<Layer.CapSo> GetData()
        {
            string sql = "select QUEUE,SPECIAL,CREATED from IMP_QUEUE_AWB where Status=0 group by QUEUE,SPECIAL,CREATED";
                              

            List<Layer.CapSo> CapSoList = new List<Layer.CapSo>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {

                    CapSoList.Add(GetProperties(reader));
                }
            }
            return CapSoList;

        }

    }
}
