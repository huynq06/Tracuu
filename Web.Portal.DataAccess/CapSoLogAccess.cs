using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class CapSoLogAccess:DataBase.DataProvider
    {
        public Layer.CapSoLog GetProperties(System.Data.IDataReader reader)
        {
            Layer.CapSoLog CapSoLog = new Layer.CapSoLog();
            
            CapSoLog.ID = Convert.ToString(GetValueField(reader, "QNO", string.Empty));
            CapSoLog.MAWB = Convert.ToString(GetValueField(reader, "MAWB", string.Empty));
            CapSoLog.HAWB = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            CapSoLog.AWBRemain = Convert.ToInt32(GetValueField(reader, "AWBRemain", 1));
            return CapSoLog;
        }
        public IList<Layer.CapSoLog> GetAllBy(DateTime? date)
        {
            IList<Layer.CapSoLog> CapSoLogList = new List<Layer.CapSoLog>();
            using (System.Data.IDataReader reader = CommandScriptDataReader("select QNO,MAWB,HAWB,AWBRemain from QMSTickets.dbo.LogCapSo where Convert(date,Created)=Convert(date,'" + date.Value.ToString("yyyy-MM-dd")+"')"))
            {

                while (reader.Read())
                    CapSoLogList.Add(GetProperties(reader));

            }
            return CapSoLogList;
        }
    }
}
