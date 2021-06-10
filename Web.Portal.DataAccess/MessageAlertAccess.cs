using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class MessageAlertAccess : DataBase.DataProvider
    {
        private Web.Portal.Layer.MessageAlert GetProperties(IDataReader reader)
        {
            Web.Portal.Layer.MessageAlert objMessageAlert = new Web.Portal.Layer.MessageAlert();

            objMessageAlert.ID = Convert.ToString(GetValueField(reader, "ID", string.Empty));
            objMessageAlert.Title = Convert.ToString(GetValueField(reader, "Title", string.Empty));           

            return objMessageAlert;
        }
        public IList<Layer.MessageAlert> GetAll()
        {
            IList<Layer.MessageAlert> MessageAlerts = new List<Layer.MessageAlert>();
            using (IDataReader reader =CommandScriptDataReader("select ID,Title from MessageAlert"))
            {
                while (reader.Read())
                {
                    
                    MessageAlerts.Add(GetProperties(reader));
                }
            }
            return MessageAlerts;

        }
    }
}
