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
    public class CustomAccess : DataBase.OracleProvider
    {
        private GetInViewModel GetInProperties(OracleDataReader reader)
        {
            GetInViewModel getIn = new GetInViewModel();
            getIn.Created = GetValueDateTimeField(reader, "CREATED", getIn.Created);
            getIn.GetInstatus = getIn.Created.HasValue ? 1 : 0;
            return getIn;
        }
        public GetInViewModel GetInCheck(string awb,string hawb)
        {
            string sql = "select cargo.Created as CREATED from  customservice.cargo_inout cargo " +
            "where cargo.tequip_masterbilloflading = '" + awb + "' and (cargo.tequip_housebilloflading = '" + hawb + "' or '" + hawb + "'='ALL')";
            GetInViewModel getIn = new GetInViewModel();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    getIn = GetInProperties(reader);
                }
            }
            return getIn;
        }
        private GetOutViewModel GetOutProperties(OracleDataReader reader)
        {
            GetOutViewModel getOut = new GetOutViewModel();
            getOut.Created = GetValueDateTimeField(reader, "CREATED", getOut.Created);
            getOut.GetInstatus = getOut.Created.HasValue ? 1 : 0;
            return getOut;
        }
        public GetOutViewModel GetOutCheck(string awb, string hawb)
        {
            string sql = "select cargo.Created as CREATED from  customservice.cargo_out cargo " +
            "where (cargo.tequip_housebilloflading = '" + hawb + "' or '" + hawb + "'='ALL') and cargo.tequip_masterbilloflading = '" + awb + "'";
            GetOutViewModel getOut = new GetOutViewModel();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    getOut = GetOutProperties(reader);
                }
            }
            return getOut;
        }
        private DKXDViewModel DKXDProperties(OracleDataReader reader)
        {
            DKXDViewModel dkxd = new DKXDViewModel();
            dkxd.Created = GetValueDateTimeField(reader, "CREATED", dkxd.Created);
            dkxd.DKXDstatus = dkxd.Created.HasValue ? 1 : 0;
            return dkxd;
        }
        public DKXDViewModel DKXDCheck(string awb, string hawb)
        {
            string sql = "select cargo.Created as CREATED from  customservice.cargo_hhdd cargo " +
            "where (cargo.te_housebilloflading = '" + hawb + "' or '" + hawb + "'='ALL') and cargo.te_masterbilloflading = '" + awb + "'";
            DKXDViewModel getOut = new DKXDViewModel();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    getOut = DKXDProperties(reader);
                }
            }
            return getOut;
        }
        private KVGSViewModel KVGSProperties(OracleDataReader reader)
        {
            KVGSViewModel kvgs = new KVGSViewModel();
            kvgs.Created = GetValueDateTimeField(reader, "CREATED", kvgs.Created);
            kvgs.KVGSstatus = kvgs.Created.HasValue ? 1 : 0;
            return kvgs;
        }
        public KVGSViewModel KVGSCheck(string awb, string hawb)
        {
            string sql = "select cargo.Created as CREATED from  customservice.cargo_kvgs cargo " +
            "where (cargo.eq_housebilloflading = '" + hawb + "' or '" + hawb + "'='ALL') and cargo.eq_masterbilloflading = '" + awb + "'";
            KVGSViewModel getOut = new KVGSViewModel();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    getOut = KVGSProperties(reader);
                }
            }
            return getOut;
        }
    }
}
