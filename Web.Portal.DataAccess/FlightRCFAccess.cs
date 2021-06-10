using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class FlightRCFAccess : Web.Portal.DataBase.DataProvider
    {
        private Layer.FlightRCF GetProperties(System.Data.IDataReader reader)
        {
            Layer.FlightRCF objFlightRCF = new Layer.FlightRCF();

            objFlightRCF.FlightNo = Convert.ToString(GetValueField(reader, "FlightNo", string.Empty));
            objFlightRCF.TimeCheck = Convert.ToInt32(GetValueField(reader, "TimeCheck", 0));
            

            return objFlightRCF;
        }
        public IList<Layer.FlightRCF> GetAll()
        {
            IList<Layer.FlightRCF> FlightRCFList = new List<Layer.FlightRCF>();
            using (System.Data.IDataReader reader = CommandScriptDataReader("select * from FlightRCF"))
            {
                while (reader.Read())
                {
                    FlightRCFList.Add(GetProperties(reader));

                }

            }
            return FlightRCFList;
        }
    }
}
