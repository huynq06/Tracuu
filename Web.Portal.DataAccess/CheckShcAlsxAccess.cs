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
    public class CheckShcAlsxAccess : DataBase.OracleProvider
    {
        public void ContainDG(string lab_ident, ref string content, ref string Weight,ref int pieces)
        {
            //bool check = false;
            string sql = "select labs.labs_quantity_del QUANTITY, labs.labs_weight_booked WEIGHT,labs.labs_special_goods CONTENT from labs where labs.labs_ident_no = '" + lab_ident + "'";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                     content = Convert.ToString(GetValueField(reader, "CONTENT", string.Empty));
                    Weight = Convert.ToString(GetValueField(reader, "WEIGHT", string.Empty));
                    pieces = Convert.ToInt32(GetValueField(reader, "QUANTITY", string.Empty));
                }
            }
            //return check;
        }
    }
}
