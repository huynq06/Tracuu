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
    public class Prad_Pre_Advice_Access : DataBase.OracleProvider
    {
        private Prad_Pre_AdviceViewModel GetProperties(OracleDataReader reader)
        {
            Prad_Pre_AdviceViewModel prad = new Prad_Pre_AdviceViewModel();
            prad.AIRLINE_CODE = Convert.ToString(GetValueField(reader, "AIRLINECODE", string.Empty));
            prad.FLIGHT_NUMBER = Convert.ToString(GetValueField(reader, "AWB", string.Empty));
            prad.FLIGHT_SHCEDULE_DATE = Convert.ToString(GetValueField(reader, "FLIGHTSCHEDULE", string.Empty));
            prad.SODD = Convert.ToString(GetValueField(reader, "SODD", string.Empty));
            prad.SOTK = Convert.ToString(GetValueField(reader, "SOTK", string.Empty));
            prad.Status = Convert.ToString(GetValueField(reader, "CUSTOMSTATUS", string.Empty));
            prad.NUMBER_OF_PIECES = Convert.ToDouble(GetValueField(reader, "QUANTITY", 0));
        
            return prad;
        }
        public List<Prad_Pre_AdviceViewModel> GetDataPrad(string textInput)
        {
            string sql = "select prad.prad_airline_code as AIRLINECODE, " +
"prad.prad_flight_number as FLIGHTNUMBER, " +
"prad.prad_flight_schedule_date as FLIGHTSCHEDULE," +
"prad.prad_unique_reference_no as SODD," +
"prad.prad_movement_type as CUSTOMSTATUS," +
"prad.prad_origin_id as SOTK, " +
"prad.prad_number_of_pieces as QUANTITY from prad_pre_advice prad " +
"where prad.prad_awb_number = 0 and prad.prad_unique_reference_no = '" + textInput + "' or prad.prad_origin_id = '" +textInput + "'" +
"order by prad.prad_create_datetime desc";
            List<Prad_Pre_AdviceViewModel> ListPre_Prad = new List<Prad_Pre_AdviceViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    ListPre_Prad.Add(GetProperties(reader));
                }
            }
            return ListPre_Prad;

        }
    }
}
