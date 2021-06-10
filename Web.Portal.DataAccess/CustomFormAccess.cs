using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Model.Models;
using Web.Portal.Common.ApiViewModel;

namespace Web.Portal.DataAccess
{
    public class CustomFormAccess :  DataBase.OracleProvider
    {
        private CustomFormViewModel GetProperties(OracleDataReader reader)
        {
            CustomFormViewModel cf = new CustomFormViewModel();
            cf.PXKNo = Convert.ToString(GetValueField(reader, "ID", string.Empty));
            cf.Shipper = Convert.ToString(GetValueField(reader, "SHIPPER", string.Empty));
            cf.Created = Convert.ToString(GetValueField(reader, "Created", string.Empty));
            return cf;
        }
        public List<CustomFormViewModel> GetCustomFormDetail(string lagi_ident)
        {
            string sql = "select ccf.cusf_form_number as ID, a.agen_remarks as SHIPPER,a.agen_creation_datetime as CREATED from lagi l " +
"inner join agen a on l.lagi_ident_no = a.agen_ident_no "+
"inner join cusf_customs_forms ccf on ccf.cusf_ident_no = l.lagi_ident_no "+
"where l.lagi_ident_no = '" + lagi_ident + "' "+
"and a.agen_status_external = 'DOCUMENT WERE HANDED OUT TO'";
            List<CustomFormViewModel> listawb = new List<CustomFormViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listawb.Add(GetProperties(reader));

                }
            }
            return listawb;
        }
    }
}
