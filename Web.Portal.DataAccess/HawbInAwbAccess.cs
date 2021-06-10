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
    public class HawbInAwbAccess : DataBase.OracleProvider
    {
        private HawbInAwb GetProperties(OracleDataReader reader)
        {
            HawbInAwb hawb = new HawbInAwb();
            hawb.Lagi_Identity = Convert.ToInt32(GetValueField(reader, "LAGI_INDENT_NO", 0));
            hawb.HAWB = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            return hawb;
        }
        public List<HawbInAwb> GetHawbInAwb(AWBByULD awb, Flight flight)
        {

            string sql = "SELECT l.lagi_ident_no as LAGI_INDENT_NO,l.LAGI_HAWB as HAWB FROM LAGI l " +
                "WHERE " +
               " l.lagi_flight_date_in =" + flight.FLUI_LANDED_DATE +
             " AND (l.lagi_mawb_prefix||l.lagi_mawb_no) = '" + awb.AWB + "'";
            List<HawbInAwb> hawbs = new List<HawbInAwb>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    HawbInAwb hawb = GetProperties(reader);
                    if (!string.IsNullOrEmpty(hawb.HAWB))
                    {
                        hawbs.Add(hawb);
                    }
                }
            }
            return hawbs;
        }
    }
}
