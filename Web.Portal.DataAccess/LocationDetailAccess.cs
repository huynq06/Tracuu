using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Common.ApiViewModel;

namespace Web.Portal.DataAccess
{
    public class LocationDetailAccess : DataBase.OracleProvider
    {
        private LocationDetailViewModel GetProperties(OracleDataReader reader)
        {
            LocationDetailViewModel objLocation = new LocationDetailViewModel();
            objLocation.GroupNo = Convert.ToString(GetValueField(reader, "GROUP_NO", string.Empty));
            objLocation.Location = Convert.ToString(GetValueField(reader, "LOCATION", string.Empty));
            objLocation.Created = Convert.ToDateTime(GetValueDateTimeField(reader, "CREATED", objLocation.Created));
            return objLocation;
        }
        public IList<LocationDetailViewModel> GetListLocation(string lagi_identity)
        {
            IList<LocationDetailViewModel> ListLocation = new List<LocationDetailViewModel>();
            string sql = "SELECT distinct substr(a.agen_remarks,7,14) as GROUP_NO, " +
                         "SUBSTR( a.agen_remarks, INSTR(a.agen_remarks, 'location')+9) as LOCATION, " +
                         "a.agen_creation_datetime as CREATED " +
                         "  from agen a  " +
                         " WHERE 1= 1 " +
                         "and a.agen_status_external='GROUP MOVED' " +
                         "AND a.agen_remarks not like '%moved to location TRS%' " +
                         "and a.agen_remarks like '%has been moved to location%' " +
                         "and a.agen_ident_no  = '" + lagi_identity + "'" +
                         " order by 1,2,3 ";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    ListLocation.Add(GetProperties(reader));
                }
            }
            return ListLocation;

        }
    }
}
