using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using Web.Portal.Common.ViewModel;
using System.Data;
namespace Web.Portal.DataAccess
{
    public class ExpAWBAccess : DataBase.OracleProvider
    {
        private Web.Portal.Layer.ExpAWB GetProperties(OracleDataReader reader)
        {
            Web.Portal.Layer.ExpAWB objExpAWB = new Web.Portal.Layer.ExpAWB();

            objExpAWB.ID = Convert.ToInt64(GetValueField(reader, "LAS_INDENT", 0));
            objExpAWB.FlightNo = Convert.ToString(GetValueField(reader, "FLIGHT_NO", string.Empty));
            objExpAWB.FlightDate = Convert.ToDateTime(GetValueDateTimeField(reader, "SCHEDULE_DATE", objExpAWB.FlightDate));
            objExpAWB.ATATIME = Convert.ToString(GetValueField(reader, "DEPARTURE_TIME", string.Empty));
            objExpAWB.Prefix = Convert.ToString(GetValueField(reader, "AWP", string.Empty));
            objExpAWB.AWB = Convert.ToString(GetValueField(reader, "AWB_SERIAL", string.Empty));
            objExpAWB.HAWB = Convert.ToString(GetValueField(reader, "HAWB_NO", string.Empty));
            objExpAWB.ORGIN = Convert.ToString(GetValueField(reader, "AWB_ORG", string.Empty));
            objExpAWB.DEST = Convert.ToString(GetValueField(reader, "AWB_DEST", string.Empty));
            objExpAWB.Agent = Convert.ToString(GetValueField(reader, "CNEE", string.Empty));
            objExpAWB.AgentCode = Convert.ToString(GetValueField(reader, "AGENT_CODE", string.Empty));
            objExpAWB.Shipper = Convert.ToString(GetValueField(reader, "SHIPPER_NAME", string.Empty));
            objExpAWB.ShipperADDR = Convert.ToString(GetValueField(reader, "SHIPPERADDR", string.Empty));
            objExpAWB.Consignee = Convert.ToString(GetValueField(reader, "CONSIGNEE_NAME", string.Empty));
            objExpAWB.ConsignADDR = Convert.ToString(GetValueField(reader, "CONSIGADDR", string.Empty));
            objExpAWB.Quantity = Convert.ToString(GetValueField(reader, "PIECES", string.Empty));
            objExpAWB.Weight = Convert.ToString(GetValueField(reader, "WEIGHT", string.Empty));
            
            return objExpAWB;
        }
        private FindAwbAwbExportViewModel GetFindAwb(OracleDataReader reader)
        {
            FindAwbAwbExportViewModel objExpAWB = new FindAwbAwbExportViewModel();
            objExpAWB.Quantity = Convert.ToString(GetValueField(reader, "QUANTITY", string.Empty));
            objExpAWB.Weight = Convert.ToString(GetValueField(reader, "Weight", string.Empty));
            objExpAWB.Dest = Convert.ToString(GetValueField(reader, "Dest", string.Empty));
            objExpAWB.Position = Convert.ToString(GetValueField(reader, "RACK", string.Empty));
            objExpAWB.Quantity = Convert.ToString(GetValueField(reader, "QUANTITY", string.Empty));

            return objExpAWB;
        }
        public List<FindAwbAwbExportViewModel> GetLocationAwb(string id)
        {
            string sql = " select labs.labs_quantity_del QUANTITY,labs.labs_weight_del WEIGHT,labs.labs_destination DEST, "+
                "sslp.sslp_rack_row RACK from labs "+
 "join locs_locations locs on labs.labs_ident_no = locs.locs_object_isn "+
 "join han_w1_hl.sslp_physical_locations sslp  on locs.locs_physical_isn = sslp.sslp_physical_isn "+
 "where labs.labs_ident_no = '" + id + "'";
            List<FindAwbAwbExportViewModel> listawb = new List<FindAwbAwbExportViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listawb.Add(GetFindAwb(reader));

                }
            }
            return listawb;
        }
        public IList<Layer.ExpAWB> GetPaging(int page, int pageSize, string code, string flightNo, DateTime? fromDate, DateTime? toDate, string hawb, ref int totalRows)
        {
            IList<Layer.ExpAWB> ExpAWBs = new List<Layer.ExpAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.EXPAWB_SEARCH_BY_A", code.Trim(), flightNo.Trim(), GetNullDateTime(fromDate), GetNullDateTime(toDate), hawb.Trim(), page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                    ExpAWBs.Add(GetProperties(reader));
                }
            }
            return ExpAWBs;

        }
        public IList<Layer.ExpAWB> GetPagingAlsx(int page, int pageSize, string code, string flightNo, string fDate, string tDate, string hawb, ref int totalRows)
        {
            IList<Layer.ExpAWB> ExpAWBs = new List<Layer.ExpAWB>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_WEB_ALSC.ALSX_EXPAWB_SEARCH_BY_A", code.Trim(), flightNo.Trim(), fDate, tDate, hawb.Trim(),"", page, pageSize))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                    ExpAWBs.Add(GetProperties(reader));
                }
            }
            return ExpAWBs;

        }
    }
}
