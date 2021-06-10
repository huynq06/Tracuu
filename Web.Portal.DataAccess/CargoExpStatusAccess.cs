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
    public class CargoExpStatusAccess : DataBase.OracleProvider
    {
        private CargoExpStatus GetProperties(OracleDataReader reader)
        {
            CargoExpStatus cargo = new CargoExpStatus();
            cargo.Status = Convert.ToString(GetValueField(reader, "STATUS", string.Empty));
            cargo.EventTime = GetValueDateTimeField(reader, "DATE_TIME", cargo.EventTime);
            cargo.Pieces = Convert.ToInt32(GetValueField(reader, "PIECES", string.Empty));
            cargo.Weight = Convert.ToString(GetValueField(reader, "WEIGHT", string.Empty));
            cargo.StationWareHouse = "ALSC";
            cargo.Remark = "";
            return cargo;
        }
        public List<CargoExpStatus> GetCargoStatus(string lab_ident)
        {
            List<CargoExpStatus> ListCargo = new List<CargoExpStatus>();
            string sql = "select grai.grai_object_isn as ID, "+
  "'RECEIVED' as STATUS, " +
  "max(GRAI.GRAI_VALUE) as DATE_TIME, " +
  "(select labs.labs_quantity_del from labs where labs.labs_ident_no ='" +lab_ident + "') as PIECES, " +
  "(select labs.labs_weight_del from labs where labs.labs_ident_no ='" +lab_ident + "') as WEIGHT " +
"from han_w1_hl.grai_group_additional_info grai " +
"where grai.grai_group_type = 'DATE' " +
  "and grai.grai_group_code = 'RECEIVED' " +
  "and grai.grai_object_isn ='" +lab_ident + "' " +
 "group by grai.grai_object_isn, grai.grai_group_code " +
 "union all " +
 "select " +
  "grai.grai_object_isn as ID, " +
  "'DEPARTED' as STATUS, " +
  "max(GRAI.GRAI_VALUE) as DATE_TIME, " +
  "(select labs.labs_quantity_del from labs where labs.labs_ident_no ='" +lab_ident + "') as PIECES, " +
  "(select labs.labs_weight_del from labs where labs.labs_ident_no ='" +lab_ident + "') as WEIGHT " +
"from han_w1_hl.grai_group_additional_info grai " +
"where grai.grai_group_type = 'DATE' " +
  "and grai.grai_group_code = 'DELIVERED' " +
  "and grai.grai_object_isn = '" + lab_ident + "' " +
  "and " +
      "(select " +
          "sum(g.grai_value) " +
       "from grai_group_additional_info g " +
       "where " +
            "g.grai_object_isn ='" +lab_ident + "' " +
       "and " +
            "g.grai_group_code = 'DELIVERED' " +
       "and " +
            "g.grai_group_type = 'PIECES') = (select labs.labs_quantity_del from labs where labs.labs_ident_no ='" +lab_ident + "') " +
"group by grai.grai_object_isn, grai.grai_group_code";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    ListCargo.Add(GetProperties(reader));
                }
            }
            return ListCargo;
        }
    }
}
