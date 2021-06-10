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
    public class VCTAccess : DataBase.OracleProvider
    {
        public string GetGoodsIdentityByPXK(string pxk)
        {
            string sql = " select lagi.lagi_mawb_prefix MAWB_PREFIX," +
                        " lagi.lagi_mawb_no MAWB_NO, lagi.lagi_hawb HAWB_NO from CUSF_CUSTOMS_FORMS ccf" +
                        " join lagi on lagi.lagi_ident_no = ccf.cusf_ident_no " +
                        " where ccf.cusf_form_number = '" + pxk + "'";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {

                if (reader.Read())
                {
                    return reader["MAWB_PREFIX"].ToString() + (reader["MAWB_NO"].ToString().Length < 8 ? "0" + reader["MAWB_NO"].ToString() : reader["MAWB_NO"].ToString()) + reader["HAWB_NO"].ToString();
                }


            }
            return string.Empty;
        }
        public string GetAwbByPXK(string pxk)
        {
            string sql = " select lagi.lagi_mawb_prefix MAWB_PREFIX," +
                        " lagi.lagi_mawb_no MAWB_NO, lagi.lagi_hawb HAWB_NO, lagi.lagi_quantity_received QUANTIY from CUSF_CUSTOMS_FORMS ccf" +
                        " join lagi on lagi.lagi_ident_no = ccf.cusf_ident_no " +
                        " where ccf.cusf_form_number = '" + pxk + "'";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {

                if (reader.Read())
                {
                    return reader["QUANTIY"].ToString() + ";" + reader["MAWB_PREFIX"].ToString() + (reader["MAWB_NO"].ToString().Length < 8 ? reader["MAWB_NO"].ToString().PadLeft(8, '0') : reader["MAWB_NO"].ToString()) + reader["HAWB_NO"].ToString() + ";" + reader["MAWB_PREFIX"].ToString() + reader["MAWB_NO"].ToString() + ";" + reader["HAWB_NO"].ToString();
                }


            }
            return string.Empty;
        }
        private VCTViewModel GetProperties(OracleDataReader reader)
        {
            VCTViewModel vct = new VCTViewModel();
            vct.VCTNo = Convert.ToString(GetValueField(reader, "VCTNO", string.Empty));
            vct.DriverName = Convert.ToString(GetValueField(reader, "DRIVERNAME", string.Empty));
            vct.DriverID = Convert.ToString(GetValueField(reader, "DRIVERID", string.Empty));
            vct.BSXNo = Convert.ToString(GetValueField(reader, "BSXNO", string.Empty));
            vct.DateIn = GetValueDateTimeField(reader, "DATEIN", vct.DateIn);
            vct.DateOut = GetValueDateTimeField(reader, "DATEOUT", vct.DateOut);
            return vct;
        }
        public VCTViewModel GetVCTDetail(string lagi_ident)
        {
            string sql = "select distinct vhcr.vhcl_cfs_number as VCTNO,cusf.cusf_form_number as PXKNo, "+
"vhld.vhld_releasetype ," +
"vhcr.vhcl_driver_id as DRIVERID, " +
"vhcr.vhcl_driver_name AS DRIVERNAME, " +
"to_char(to_date(vhcr.vhcl_arrival_date || ' ' || vhcr.vhcl_arrival_time, 'dd/mm/RR HH24:MI:SS'), 'mm/dd/RR HH24:MI:SS') as DATEIN, "+
"to_char(to_date(vhcr.vhcl_left_date || ' ' || vhcr.vhcl_left_time, 'dd/mm/RR HH24:MI:SS'), 'mm/dd/RR HH24:MI:SS') as DATEOUT, " +
"vhcr.vehic_reg_no AS BSXNO " +
"from vhld_vehicledetail vhld " +
"join cusf_customs_forms cusf on cusf.cusf_ident_no = vhld.vhld_objectisn " +
"join vehicles_registration vhcr on vhld.vhld_vehicleisn = vhcr.vhcl_isn_no " +
"join lagi l on l.lagi_ident_no = cusf.cusf_ident_no " +
"where vhld.vhld_releasetype = 'RELEASE NOTE' and l.lagi_ident_no = '"+ lagi_ident + "'";
            VCTViewModel vct = new VCTViewModel();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    vct = GetProperties(reader);
                }
            }
            return vct;
        }
        public VCTViewModel GetVCTExportDetail(string lab_ident)
        {
            string sql = "select distinct vhcr.vhcl_cfs_number as VCTNO, " +
"vhld.vhld_releasetype ," +
"vhcr.vhcl_driver_id as DRIVERID, " +
"vhcr.vhcl_driver_name AS DRIVERNAME, " +
"to_char(to_date(vhcr.vhcl_arrival_date || ' ' || vhcr.vhcl_arrival_time, 'dd/mm/RR HH24:MI:SS'), 'mm/dd/RR HH24:MI:SS') as DATEIN, " +
"to_char(to_date(vhcr.vhcl_left_date || ' ' || vhcr.vhcl_left_time, 'dd/mm/RR HH24:MI:SS'), 'mm/dd/RR HH24:MI:SS') as DATEOUT, " +
"vhcr.vehic_reg_no AS BSXNO " +
"from labs " +
"join agen on agen.agen_ident_no = labs.labs_ident_no " +
"join vhld_vehicledetail vhld on vhld.vhld_objectisn = labs.labs_ident_no " +
"join vehicles_registration vhcr on vhcr.vhcl_isn_no = vhld.vhld_vehicleisn " +
"where agen.agen_status_external = 'EXPORT LANDSIDE RECEPTION ENTRY COMPLETED' and labs.labs_ident_no = '" + lab_ident + "'";
            VCTViewModel vct = new VCTViewModel();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    vct = GetProperties(reader);
                }
            }
            return vct;
        }
    }
}
