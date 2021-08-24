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
    public class QuantityDataAccess :  DataBase.OracleProvider
    {
        private ImportQuantity GetProperties(OracleDataReader reader)
        {
            ImportQuantity import = new ImportQuantity();
            import.Date = Convert.ToString(GetValueField(reader, "DEPARTURE_DATE", string.Empty));
            import.y = Convert.ToInt32(GetValueField(reader, "DEPARTED_WEIGHT", 0));
            return import;
        }
        private ExportQuantity GetPropertiesExp(OracleDataReader reader)
        {
            ExportQuantity export = new ExportQuantity();
            export.Date = Convert.ToString(GetValueField(reader, "DEPARTURE_DATE", string.Empty));
            export.y = Convert.ToInt32(GetValueField(reader, "DEPARTED_WEIGHT", 0));
            return export;
        }

        public List<ImportQuantity> GetData(ref string[] t)
        {
            string sql = "SELECT "+
    "to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_actual_date, 'DD/MM')  AS DEPARTURE_DATE, " +
      "Round(sum(awbu.AWBU_WEIGHT)) as DEPARTED_WEIGHT " +
  "FROM FLUP flup " +
      "JOIN CONT cont " +
           "ON cont.CONT_FLIGHT_NO_ = flup.flup_flight_no " +
           "and to_date('02-01-0001', 'DD-MM-YYYY') + cont.CONT_DATE = to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_scheduled_date " +
      "JOIN AWBU_AWBPERULD_LIST awbu " +
          "on awbu.awbu_uld_isn = cont.cont_uld_isn " +
      "JOIN LABS labs " +
           "on awbu.awbu_mawb_ident_no = labs.LABS_IDENT_NO " +
  "WHERE " +
  "to_date('02-01-0001', 'DD-MM-YYYY') + flup.FLUP_ACTUAL_DATE between to_date('21/06/2021', 'DD/MM/YYYY') and to_date('30/06/2021', 'DD/MM/YYYY') " +
  "AND labs.labs_deleted = 0 " +
  "Group by flup.flup_actual_date " +
  "ORDER BY DEPARTURE_DATE ASC";


            List<ImportQuantity> listQuantity = new List<ImportQuantity>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                int i = 0;
                while (reader.Read())
                {
                    ImportQuantity import = GetProperties(reader);
                    import.x = i;
                    t[i] = import.Date;
                    listQuantity.Add(import);
                    i++;
                }
            }
            return listQuantity;

        }

        public List<ExportQuantity> GetDataExp()
        {
            string sql = "SELECT " +
    "to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_actual_date, 'DD/MM')  AS DEPARTURE_DATE, " +
      "Round(sum(awbu.AWBU_WEIGHT)) as DEPARTED_WEIGHT " +
  "FROM FLUP flup " +
      "JOIN CONT cont " +
           "ON cont.CONT_FLIGHT_NO_ = flup.flup_flight_no " +
           "and to_date('02-01-0001', 'DD-MM-YYYY') + cont.CONT_DATE = to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_scheduled_date " +
      "JOIN AWBU_AWBPERULD_LIST awbu " +
          "on awbu.awbu_uld_isn = cont.cont_uld_isn " +
      "JOIN LABS labs " +
           "on awbu.awbu_mawb_ident_no = labs.LABS_IDENT_NO " +
  "WHERE " +
  "to_date('02-01-0001', 'DD-MM-YYYY') + flup.FLUP_ACTUAL_DATE between to_date('21/06/2021', 'DD/MM/YYYY') and to_date('30/06/2021', 'DD/MM/YYYY') " +
  "AND labs.labs_deleted = 0 " +
  "Group by flup.flup_actual_date " +
  "ORDER BY DEPARTURE_DATE ASC";


            List<ExportQuantity> listQuantity = new List<ExportQuantity>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                int i = 0;
                while (reader.Read())
                {
                    ExportQuantity import = GetPropertiesExp(reader);
                    import.x = i;
                    listQuantity.Add(import);
                    i++;
                }
            }
            return listQuantity;

        }
    }
}
