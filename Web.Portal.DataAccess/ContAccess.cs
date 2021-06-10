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
    public class ContAccess : DataBase.OracleProvider
    {
        private ContViewModel GetProperties(OracleDataReader reader)
        {
            ContViewModel cont = new ContViewModel();
            cont.Name = Convert.ToString(GetValueField(reader, "ULD", string.Empty));
            cont.NetWeight = Convert.ToDouble(GetValueField(reader, "NET_WEIGHT", 0));
            cont.GrossWeight = Convert.ToDouble(GetValueField(reader, "cont", 0));
            cont.TareWeight = Convert.ToDouble(GetValueField(reader, "TARA_WEIGHT", 0));
            cont.Unloading = Convert.ToString(GetValueField(reader, "UNLOADING", string.Empty));
            cont.Remark = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
            return cont;
        }
        public List<ContViewModel> GetListCont(string flup_int)
        {
            string sql = " SELECT distinct "+
                "cont.cont_container || cont.cont_serial_no_ || cont.cont_owner_code as ULD, "+
 "cont.cont_tara as TARA_WEIGHT, " +
 "cont.cont_tara_uld as GROSS_WEIGHT, " +
 "(cont.cont_tara_uld - cont.cont_tara) as NET_WEIGHT, " +
 "cont.cont_dest_offload_location UNLOADING, " +
 "cont.cont_remarks as REMARK " +
  "FROM FLUP flup " +
      "JOIN CONT cont " +
           "ON cont.CONT_FLIGHT_NO_ = flup.flup_flight_no " +
           "and to_date('02-01-0001' , 'DD-MM-YYYY') +cont.CONT_DATE = to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_scheduled_date " +
  "WHERE " +
  "flup.flup_int_number = '"+ flup_int + "'";
            List<ContViewModel> listDlv = new List<ContViewModel>();
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
