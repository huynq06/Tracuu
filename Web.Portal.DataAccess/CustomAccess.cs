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
        private ExportAwbTrackCustomStatusViewModel GetProperties(OracleDataReader reader)
        {
            ExportAwbTrackCustomStatusViewModel item = new ExportAwbTrackCustomStatusViewModel();
            item.SDD = Convert.ToString(GetValueField(reader, "GOODS_ID", string.Empty));
            item.STK = Convert.ToString(GetValueField(reader, "STK", string.Empty));
            item.GetInStatus = Convert.ToInt32(GetValueField(reader, "GETIN_STATUS", 0));
            item.GetInPieces = Convert.ToInt32(GetValueField(reader, "GETIN_PIECE", 0));
            item.GetInMessage = Convert.ToString(GetValueField(reader, "GETIN_MSG", string.Empty));
            item.GetInCreated = GetValueDateTimeField(reader, "GETIN_CREATED", item.GetInCreated);
            item.GetInDate = item.GetInCreated.HasValue ? item.GetInCreated.Value.ToString("dd/MM/yyyy HH:mm") : "";
            item.GetOutStatus = Convert.ToInt32(GetValueField(reader, "GETOUT_STATUS", 0));
            item.GetOutPieces = Convert.ToInt32(GetValueField(reader, "GETOUT_PIECE", 0));
            item.GetOutMessage = Convert.ToString(GetValueField(reader, "GETOUT_MSG", string.Empty));
            item.GetOutCreated = GetValueDateTimeField(reader, "GETOUT_CREATED", item.GetOutCreated);
            item.GetOutDate = item.GetOutCreated.HasValue ? item.GetOutCreated.Value.ToString("dd/MM/yyyy HH:mm") : "";

            return item;
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
            "where cargo.status = 1 and (cargo.tequip_housebilloflading = '" + hawb + "' or '" + hawb + "'='ALL') and cargo.tequip_masterbilloflading = '" + awb + "'";
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
        public List<ExportAwbTrackCustomStatusViewModel> ExportAwbCustomStatus(string labIdent)
        {
            string sql = "select ci.tequip_masterbilloflading AWB, "+
"ci.tequip_cargoctrlno GOODS_ID, "+
"ci.tequip_cargopiece GETIN_PIECE, "+
"ci.dec_customsreference STK, " +
 "ci.status GETIN_STATUS, ci.contentmessage GETIN_MSG, "+
 "co.tequip_cargopiece GETOUT_PIECE, " +
 "ci.created GETIN_CREATED,co.status GETOUT_STATUS,co.contentmessage GETOUT_MSG, " +
 "co.created GETOUT_CREATED from  hawb_house_waybill_details hh " +
"join labs on hh.hawb_master_isn = labs.labs_fwbm_serial_no "+
"left join customservice.cargo_inout ci on ci.tequip_cargoctrlno = hh.hawb_house_number "+
"left join customservice.cargo_out co on co.tequip_cargoctrlno = hh.hawb_house_number "+
"where labs.labs_ident_no = '" + labIdent + "'";
            List<ExportAwbTrackCustomStatusViewModel> status = new List<ExportAwbTrackCustomStatusViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    ExportAwbTrackCustomStatusViewModel awb = GetProperties(reader);
                    if(awb.GetInCreated.HasValue)
                      status.Add(GetProperties(reader));
                }
            }
            return status;
        }
    }
}
