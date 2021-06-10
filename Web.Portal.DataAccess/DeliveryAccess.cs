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
    public class DeliveryAccess : DataBase.OracleProvider
    {
        private DeliveryViewModel GetProperties(OracleDataReader reader)
        {
            DeliveryViewModel dlv = new DeliveryViewModel();
            dlv.Group = Convert.ToString(GetValueField(reader, "GROUPNAME", string.Empty));
            dlv.Pieces = Convert.ToInt16(GetValueField(reader, "PIECES", 0));
            dlv.Created = Convert.ToDateTime(GetValueDateTimeField(reader, "CREATED", dlv.Created));
            return dlv;
        }
        public List<DeliveryViewModel> GetDeliveryDetail(string lagi_ident)
        {
            string sql = "select grai.grai_object_group_isn as GROUPNAME, " +
"grai.grai_value as PIECES, " +
"grai.grai_group_deleted_date as CREATED from grai_group_additional_info grai " +
"where grai.grai_object_isn = '" + lagi_ident + "' " +
"and grai.grai_group_type = 'PIECES' and grai.grai_group_code = 'DELIVERED'";
            List<DeliveryViewModel> listDlv = new List<DeliveryViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listDlv.Add(GetProperties(reader));

                }
            }
            return listDlv;
        }
    }
}
