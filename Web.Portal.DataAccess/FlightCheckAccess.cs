using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class FlightCheckAccess : Web.Portal.DataBase.DataProvider
    {
        private Layer.FlightCheck GetProperties(System.Data.IDataReader reader)
        {
            Layer.FlightCheck objFlightCheck = new Layer.FlightCheck();

            objFlightCheck.FlightNo = Convert.ToString(GetValueField(reader, "FlightNo", string.Empty));
            objFlightCheck.FlightDate = GetValueDateTimeField(reader, "FligthDate", objFlightCheck.FlightDate);
            objFlightCheck.FlightTime = Convert.ToString(GetValueField(reader, "FlightTime", string.Empty));
            objFlightCheck.FType = Convert.ToString(GetValueField(reader, "FType", string.Empty));

            return objFlightCheck;
        }
        public void Add(Layer.FlightCheck objFlightCheck)
        {
            CommandStore32("FLight_Add", objFlightCheck.FlightNo, objFlightCheck.FlightDate,objFlightCheck.FlightTime,objFlightCheck.FType,objFlightCheck.Created);
        }
        public IList<Layer.FlightCheck> GetAll(DateTime? FromDate)
        {
            IList<Layer.FlightCheck> FlightCheckList = new List<Layer.FlightCheck>();
            using (System.Data.IDataReader reader = CommandDataReader("FLight_GetByDate", GetNullDateTime(FromDate)))
            {
                while (reader.Read())
                {
                    FlightCheckList.Add(GetProperties(reader));
                    
                }
                
            }
            return FlightCheckList;
        }
    }
}
