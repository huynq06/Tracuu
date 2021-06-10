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
    public class CargoStatusAccess : DataBase.OracleProvider
    {
        private CargoStatus GetProperties(OracleDataReader reader)
        {
            CargoStatus cargo = new CargoStatus();
            cargo.Status = Convert.ToString(GetValueField(reader, "STATUS", string.Empty));
            cargo.EventTime = GetValueDateTimeField(reader, "DATE_TIME", cargo.EventTime);
            cargo.Pieces = Convert.ToInt32(GetValueField(reader, "PIECES", string.Empty));
            cargo.Weight = Convert.ToString(GetValueField(reader, "WEIGHT", string.Empty));
            cargo.StationWareHouse = "ALSC";
            cargo.Remark = "";
            return cargo;
        }
        public List<CargoStatus> GetCargoStatus(string lagi_ident)
        {
            List<CargoStatus> ListCargo = new List<CargoStatus>();
            string sql = "select "+
      "lagi.lagi_ident_no as ID, " +
      "'RECEIVED' as STATUS, " +
      "to_char(lagi.lagi_date_first_pkg_rec, 'YYYY-MM-DD') || ' ' || SUBSTR(lagi.lagi_time_first_pkg_rec, 0, 2) || ':' || SUBSTR(lagi.lagi_time_first_pkg_rec, 3, 2) || ':' || SUBSTR(lagi.lagi_time_first_pkg_rec, 5, 2) as DATE_TIME, " +
      "lagi.lagi_quantity_received as PIECES, " +
      "lagi.lagi_weight_received as WEIGHT " +
"from lagi " +
"where " +
      "lagi.lagi_ident_no = '" + lagi_ident+ "' " +
    "and " +
      "lagi.lagi_quantity_received = lagi.lagi_quantity_expected " +
"union all " +
  "select " +
      "efba.efba_object_isn as ID, " +
      "'CONSIGNEE NOTIFIED' as STATUS, " +
      "to_char(efba.efba_date_created, 'YYYY-MM-DD') || ' ' || SUBSTR(efba.efba_time_created, 0, 2) || ':' || SUBSTR(efba.efba_time_created, 3, 2) || ':' || SUBSTR(efba.efba_time_created, 5, 2) as DATE_TIME, " +
      "(select lagi.lagi_quantity_received from lagi where lagi.lagi_ident_no = '" + lagi_ident+ "') as PIECES, " +
      "(select lagi.lagi_weight_received from lagi where lagi.lagi_ident_no = '" + lagi_ident+ "') as WEIGHT " +
  "from " +
      "VN_SHARE_HL.EFBA_EMAILFAXBATCH efba " +
 "where " +
      "rownum = 1 " +
    "and " +
      "efba.efba_object_isn = '" + lagi_ident+ "' " +
    "and " +
      "efba.efba_template_code = 'NOAE' " +
"union all " +
  "select " +
      "efba.efba_object_isn as ID, " +
      "'CONSIGNEE NOTIFIED' as STATUS, " +
      "to_char(efba.efba_date_created, 'YYYY-MM-DD') || ' ' || SUBSTR(efba.efba_time_created, 0, 2) || ':' || SUBSTR(efba.efba_time_created, 3, 2) || ':' || SUBSTR(efba.efba_time_created, 5, 2) as DATE_TIME, " +
      "(select lagi.lagi_quantity_received from lagi where lagi.lagi_ident_no = '" + lagi_ident+ "') as PIECES, " +
      "(select lagi.lagi_weight_received from lagi where lagi.lagi_ident_no = '" + lagi_ident+ "') as WEIGHT " +
  "from " +
      "VN_SHARE_HL.EFBA_EMAILFAXBATCH efba " +
  "where " +
      "rownum = 1 " +
    "and " +
      "efba.efba_object_isn = (select lagi.lagi_master_ident_no from lagi where lagi.lagi_ident_no = '" + lagi_ident+ "') " +
    "and " +
      "efba.efba_template_code = 'NOAE' " +
    "and " +
      "efba.efba_object_isn != 0 " +
"union all " +
  "select " +
      "lagi.lagi_ident_no as ID, " +
      "'DELIVERED' as STATUS, " +
      "to_char(lagi.lagi_date_latest_pkg_del, 'YYYY-MM-DD') || ' ' || SUBSTR(lagi.lagi_time_latest_pkg_deli, 0, 2) || ':' || SUBSTR(lagi.lagi_time_latest_pkg_deli, 3, 2) || ':' || SUBSTR(lagi.lagi_time_latest_pkg_deli, 5, 2) as DATE_TIME, " +
      "lagi.lagi_quantity_received as PIECES, " +
      "lagi.lagi_weight_received as WEIGHT " +
"from lagi " +
"where " +
      "lagi.lagi_ident_no = '" + lagi_ident+ "' " +
    "and " +
      "lagi.lagi_quantity_delivered = lagi.lagi_quantity_expected";
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
