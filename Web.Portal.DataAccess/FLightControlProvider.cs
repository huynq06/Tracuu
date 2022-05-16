using Microsoft.ApplicationBlocks.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class FLightControlProvider
    {
        private string Connection = System.Configuration.ConfigurationManager.ConnectionStrings["ALSC_FlightControl"].ToString();
        public FLightControlProvider()
        {

        }
        protected Int64 CommandStore64(string nameProcedure, params object[] parameters)
        {
            return Convert.ToInt64(SqlHelper.ExecuteScalar(Connection, nameProcedure, parameters));
        }
        protected Int32 CommandStore32(string nameProcedure, params object[] parameters)
        {
            return Convert.ToInt32(SqlHelper.ExecuteScalar(Connection, nameProcedure, parameters));
        }
        protected int CommandScriptReturn(string script)
        {
            return Convert.ToInt32(SqlHelper.ExecuteScalar(Connection, CommandType.Text, script));
        }
        protected IDataReader CommandDataReader(string nameProcedure, params object[] parameters)
        {
            return SqlHelper.ExecuteReader(Connection, nameProcedure, parameters);
        }

        protected void CommandScript(string script)
        {
            SqlHelper.ExecuteNonQuery(Connection, CommandType.Text, script);
        }
        protected IDataReader CommandScriptDataReader(string script)
        {
            return SqlHelper.ExecuteReader(Connection, CommandType.Text, script);
        }
        protected object GetValueField(IDataReader reader, string FieldName, object DefaultValue)
        {

            if (Enumerable.Range(0, reader.FieldCount)
                   .Select(reader.GetName)
                   .Contains(FieldName, StringComparer.OrdinalIgnoreCase) && reader[FieldName] != DBNull.Value)
                return reader[FieldName];
            return DefaultValue;
        }
        protected DateTime? GetValueDateTimeField(IDataReader reader, string FieldName, DateTime? DefaultValue)
        {

            if (Enumerable.Range(0, reader.FieldCount)
                   .Select(reader.GetName)
                   .Contains(FieldName, StringComparer.OrdinalIgnoreCase) && reader[FieldName] != DBNull.Value)
                return Convert.ToDateTime(reader[FieldName]);
            return DefaultValue;
        }
        protected object GetNullDateTime(DateTime? dateValue)
        {
            if (dateValue.HasValue)
                return dateValue;
            else
                return DBNull.Value;
        }
    }
}
