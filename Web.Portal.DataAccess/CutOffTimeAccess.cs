using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class CutOffTimeAccess : DataBase.OracleProvider
    {
        private string GetProperties(OracleDataReader reader)
        {
            string id = "";
            id = Convert.ToString(GetValueField(reader, "FLUP_ID", string.Empty));
            return id;
        }
        public string GetCutOffTimeByBooking(string booking)
        {
            string id = "";
            string sql= "select  flup.flup_int_number  as FLUP_ID " +
                "from flup " +
                "where to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_scheduled_date, 'DDMON') = substr('"+ booking + "', instr('" + booking + "', '/') + 1, instr('" + booking + "', '/', -1)) " +
                "and to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_scheduled_date, 'YYYY') = to_char(sysdate, 'YYYY') " +
                "and flup.flup_flight_no_lvg || flup.flup_flight_no = substr('"+ booking + "', 0, instr('"+ booking + "', '/') - 1) ";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    id = GetProperties(reader);
                }
            }
            return id;
        }
    }
}
