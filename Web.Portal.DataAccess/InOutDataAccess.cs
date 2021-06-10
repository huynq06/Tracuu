using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class InOutDataAccess : DataBase.OracleProvider
    {
        public string GetByTime(string bienso,string date)
        {
            string time = string.Empty;
            string sql = "select to_Char(to_date( VHCL_ARRIVAL_TIME, 'hh24miss'),'hh24:mi:ss') AS ATA_TIME from VEHICLES_REGISTRATION where VEHIC_REG_NO='" + bienso + "'"
                     + " and VHCL_ARRIVAL_DATE = to_date('" + date + "', 'MM-DD-YYYY')";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    time += Convert.ToString(reader[0]) + System.Environment.NewLine;

                }
            }
            return time;

        }
    }
}
