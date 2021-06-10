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
    public class CheckMoveIDAAccess : DataBase.OracleProvider
    {
        public bool CheckMoveIDA(string vct_isn)
        {
            bool check = false;
            string sql = "select count(capso.vhcl_ins) as COUNT_VCT from ALSC_CAPSO_T2 capso where capso.vhcl_ins = '" + vct_isn + "'";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    int count = Convert.ToInt32(GetValueField(reader, "COUNT_VCT", 0));
                    if (count > 0)
                        check = true;

                }


            }
            return check;
        }
        public bool CheckMoveAllToIDA(string vct_isn)
        {
            bool check = false;
            if (CheckMoveIDA(vct_isn))
            {
                string sql = "select count(capso.vhcl_ins) as COUNT_VCT from ALSC_CAPSO_T2 capso where capso.vhcl_ins = '" + vct_isn + "'  and (capso.rack_row <> 'IDA' or capso.rack_row <> 'CUS')";
                using (OracleDataReader reader = GetScriptOracleDataReader(sql))
                {
                    if (reader.Read())
                    {
                        int count = Convert.ToInt32(GetValueField(reader, "COUNT_VCT", 0));
                        if (count == 0)
                            check = true;
                    }
                }
            }
            return check;
        }
    }
}
