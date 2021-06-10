using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Model.Models;
namespace Web.Portal.DataAccess
{
    public class VCTProcessingAccess : DataBase.OracleProvider
    {
        private VCTProcessing GetProperties(OracleDataReader reader)
        {
            VCTProcessing objVCTProcessing = new VCTProcessing();
            objVCTProcessing.Labs_IDENT_NO = Convert.ToString(GetValueField(reader, "LABS_IDENT_NO", string.Empty));
            objVCTProcessing.AWB = Convert.ToString(GetValueField(reader, "AWB", string.Empty));
            objVCTProcessing.pieces = Convert.ToInt32(GetValueField(reader, "PIECES", 0));
            objVCTProcessing.Booking = Convert.ToString(GetValueField(reader, "VCT_REMARK", 0));
            objVCTProcessing.TimeOfAcceptance = GetValueDateTimeField(reader, "TIME_OF_ACCEPTANCE", objVCTProcessing.TimeOfAcceptance);
            objVCTProcessing.Scale_Status = Convert.ToString(GetValueField(reader, "SCALE_STATUS", string.Empty));
            objVCTProcessing.RCS_Status = Convert.ToString(GetValueField(reader, "RCS_STATUS", DateTime.Now));
            objVCTProcessing.CutOffTime = GetValueDateTimeField(reader, "CUTOFF_TIME", objVCTProcessing.CutOffTime);
            objVCTProcessing.TimeSpanToCutOffTIme = objVCTProcessing.CutOffTime.HasValue ? VCTProcessing.FomatDateTime((int)Math.Round((objVCTProcessing.CutOffTime.Value - DateTime.Now).TotalMinutes, 0)) : string.Empty;
            return objVCTProcessing;
        }
        public List<VCTProcessing> GetData(List<Issue_detail> issues)
        {
            string builder = "";
            if (issues.Count > 0)
            {
                builder = "and (labs.labs_mawb_prefix||labs.labs_mawb_serial_no) in (";
                for (int i = 0; i < issues.Count; i++)
                {
                    if (i != (issues.Count - 1))
                    {
                        builder = builder + "'" + issues[i].AWB.Trim().Replace("-","") + "',";
                    }
                    else
                    {
                        builder = builder + "'" + issues[i].AWB.Trim().Replace("-", "") + "')";
                    }

                }
            }
            string sql = "SELECT DISTINCT labs.labs_ident_no,labs.labs_fwbm_serial_no,(labs.labs_mawb_prefix||labs.labs_mawb_serial_no) as AWB,labs.labs_quantity_booked as PIECES,vhld.vhld_reception_remarks as VCT_REMARK, " +
  "substr(vhld.vhld_reception_remarks, 0, instr(vhld.vhld_reception_remarks, '/') - 1) as BOOKING_FLIGHT," +
  "substr(vhld.vhld_reception_remarks, instr(vhld.vhld_reception_remarks, '/') + 1, instr(vhld.vhld_reception_remarks, '/', -1)) as BOOKING_DATE," +
  "(select min(ag.agen_creation_datetime) from agen ag where ag.agen_ident_no = labs.labs_ident_no and ag.agen_status_external = 'GROUP VOLUMED' group by ag.agen_ident_no) as TIME_OF_ACCEPTANCE, " +
   "(select to_date(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_lat_date || ' ' || to_char(to_date(flup.flup_lat_time, 'HH24MISS'), 'HH24:MI:SS'), 'dd/mm/RR HH24:MI:SS') " +
   "from flup where " +
      "to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_scheduled_date, 'DDMON') = substr(vhld.vhld_reception_remarks, instr(vhld.vhld_reception_remarks, '/') + 1, instr(vhld.vhld_reception_remarks, '/', -1)) " +
      "and to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_scheduled_date, 'YYYY') = to_char(sysdate, 'YYYY') " +
      "and flup.flup_flight_no_lvg || flup.flup_flight_no = substr(vhld.vhld_reception_remarks, 0, instr(vhld.vhld_reception_remarks, '/') - 1) " +
   ") as CUTOFF_TIME, " +
  "CASE " +
    "WHEN labs.labs_quantity_del = 0 THEN 'WAITING' " +
    "WHEN labs.labs_quantity_del > 0 and labs.labs_quantity_del < labs.labs_quantity_booked THEN 'PROCESSING' " +
    " WHEN labs.labs_quantity_del = labs.labs_quantity_booked THEN 'DONE' " +
  "END AS SCALE_STATUS, " +
  "CASE " +
    "WHEN(select rcs.RCS_STATUS FROM REPORT.EXP_DAILY_AWB rcs WHERE rcs.IDENT_NO = labs.labs_ident_no) is null THEN 'WAITING' " +
    "WHEN(select rcs.RCS_STATUS FROM REPORT.EXP_DAILY_AWB rcs WHERE rcs.IDENT_NO = labs.labs_ident_no) = 1 THEN 'DONE' " +
  "END AS RCS_STATUS " +
"from labs " +
"join book_bookings book on book.book_labs_ident = labs.labs_ident_no " +
"join agen on agen.agen_ident_no = labs.labs_ident_no " +
"join vhld_vehicledetail vhld on vhld.vhld_objectisn = labs.labs_ident_no " +
"join vehicles_registration vhcl on vhcl.vhcl_isn_no = vhld.vhld_vehicleisn " +
"where " +
"labs.labs_created_at between trunc(sysdate) and trunc(sysdate)+1 " +
    builder +
  "and agen.agen_status_external = 'EXPORT LANDSIDE RECEPTION ENTRY COMPLETED' " +
"order by  RCS_STATUS DESC, SCALE_STATUS DESC";
            List<VCTProcessing> ListVCTProcessing = new List<VCTProcessing>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    ListVCTProcessing.Add(GetProperties(reader));
                }
            }
            return ListVCTProcessing;

        }
    }
}
