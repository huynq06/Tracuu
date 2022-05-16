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
    public class HawbInFlightAccess : DataBase.OracleProvider
    {
        private HawbInFlightViewModel GetProperties(OracleDataReader reader)
        {
            HawbInFlightViewModel objHawb = new HawbInFlightViewModel();
            objHawb.FlightNo = Convert.ToString(GetValueField(reader, "FLIGHT_NO", string.Empty));
            objHawb.ScheduleDate = Convert.ToString(GetValueField(reader, "SCHEDULED_DATE", string.Empty));
            objHawb.ScheduleTime = Convert.ToString(GetValueField(reader, "SCHEDULED_TIME", string.Empty));
            objHawb.ATADate = Convert.ToString(GetValueField(reader, "ATA_DATE", string.Empty));
            objHawb.ATATime = Convert.ToString(GetValueField(reader, "ATA_TIME", string.Empty));
            objHawb.PiecesReceive = Convert.ToInt32(GetValueField(reader, "pieces_received", string.Empty));
            objHawb.WeightsReceive = Convert.ToDouble(GetValueField(reader, "we", string.Empty));
            objHawb.EstimateDate = Convert.ToString(GetValueField(reader, "EST_DATE", string.Empty));
            objHawb.EstimateTime = Convert.ToString(GetValueField(reader, "EST_TIME", string.Empty));
            objHawb.GoodName = Convert.ToString(GetValueField(reader, "GOOD_NAME", string.Empty));
            objHawb.ULD = Convert.ToString(GetValueField(reader, "ULD", string.Empty));
            return objHawb;
        }
        private FlightImp GetPropertiesFlight(OracleDataReader reader)
        {
            FlightImp objFlight = new FlightImp();
            objFlight.FlightNumber= Convert.ToString(GetValueField(reader, "FLIGHT_NUMBER", string.Empty));
            objFlight.FlightDate = Convert.ToString(GetValueField(reader, "ATA_DATE", string.Empty));
            objFlight.SHCDate = Convert.ToString(GetValueField(reader, "SHC_DATE", string.Empty));
            objFlight.SHCTime = Convert.ToString(GetValueField(reader, "SHC_TIME", string.Empty));
            objFlight.FightTime = Convert.ToString(GetValueField(reader, "ATA_TIME", string.Empty));
            objFlight.ETA = objFlight.SHCDate;
            objFlight.Pieces = Convert.ToInt32(GetValueField(reader, "PIECES_PER_FLIGHT", string.Empty));
            objFlight.Weight = Convert.ToString(GetValueField(reader, "WEIGHT_PER_FLIGHT", string.Empty));
            objFlight.Remark = "";
            objFlight.Origin = Convert.ToString(GetValueField(reader, "FLIGHT_ORIGIN", string.Empty));
            objFlight.Des = Convert.ToString(GetValueField(reader, "FLIGHT_DESTINATION", string.Empty));

            return objFlight;
        }
        public IList<HawbInFlightViewModel> GetListHawbInFlight(string lagi_identity)
        {
            IList<HawbInFlightViewModel> ListHawbInFlight = new List<HawbInFlightViewModel>();
            using (OracleDataReader reader = GetByOracleDataReader("ECARGO.GET_HAWB_IN_FLIGHT", lagi_identity))
            {
                while (reader.Read())
                {
                    ListHawbInFlight.Add(GetProperties(reader));
                }
            }
            return ListHawbInFlight;

        }
        public IList<HawbInFlightViewModel> GetListMawbInFlight(string lab_identity)
        {
            IList<HawbInFlightViewModel> ListHawbInFlight = new List<HawbInFlightViewModel>();
            string sql = "SELECT "+
  "to_char(labs.labs_ident_no) as LAS_INDENT, "+
  "flup.FLUP_FLIGHT_NO_LVG || flup.flup_flight_no AS FLIGHT_NO, " +
  "to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_scheduled_date, 'DD-MM-YYYY') as SCHEDULED_DATE, " +
"to_char(to_date(flup.flup_scheduled_time, 'HH24MISS'), 'HH24:MI:SS') as SCHEDULED_TIME, " +
"to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_actual_date, 'DD-MM-YYYY') AS ATA_DATE, " +
"to_char(to_date(flup.flup_actual_time, 'HH24MISS'), 'HH24:MI:SS') as ATA_TIME, " +
"to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_estimated_date, 'DD-MM-YYYY') AS EST_DATE, "+
"to_char(to_date(flup.flup_estimated_time, 'HH24MISS'), 'HH24:MI:SS') as EST_TIME, " +
 " labs.LABS_TIME_STATUS_4_SET as RECEIVED_TIME, "+
 "labs.LABS_MAWB_PREFIX || '-' || labs.LABS_MAWB_SERIAL_NO as MAWB, "+
 "labs.labs_quantity_del as pieces_received, " +
 "labs.labs_weight_del as we, " +
 "labs.labs_content, "+
 "labs.labs_volume_delivered as volumne "+
"FROM labs labs "+
"join han_w1_hl.book_bookings book on labs.labs_ident_no = book.book_labs_ident " +
"join han_w1_hl.flup flup on flup.flup_int_number = book.book_flight_isn "+
"WHERE labs.labs_ident_no = '" + lab_identity + "'";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    ListHawbInFlight.Add(GetProperties(reader));
                }
            }
            return ListHawbInFlight;

        }

        public List<FlightImp> GetListFlight(string lagi_ident)
        {
            List<FlightImp> ListFlight = new List<FlightImp>();
            string sql = "SELECT distinct "+
  "iawbd.flight_no as FLIGHT_NUMBER, "+
  "iawbd.ata_date as ATA_DATE, " +
  "iawbd.ata_time as ATA_TIME, " +
  "iawbd.scheduled_date as SHC_DATE, " +
  "iawbd.scheduled_time as SHC_TIME, " +

  "flui.Flui_Loading_Location as FLIGHT_ORIGIN, " +
  "'HAN' as FLIGHT_DESTINATION, " +
  "sum(iawbd.group_quantity_received) as PIECES_PER_FLIGHT, " +
  "sum(iawbd.group_weight_received) as WEIGHT_PER_FLIGHT " +
"FROM REPORT.ALSC_IMP_AWB_GROUP_DETAILS iawbd " +
"JOIN flui on flui.flui_internal_number = iawbd.flight_id " +
"inner join han_w1_hl.grai_group_additional_info grai on grai.grai_object_group_isn = iawbd.group_no and grai.grai_group_type = 'PIECES' and grai.grai_group_code='RECEIVED' " +
"WHERE iawbd.id in (select lagi.lagi_ident_no from lagi where lagi.lagi_ident_no = '" + lagi_ident + "' or lagi.lagi_master_ident_no =  '" + lagi_ident + "') " +
"GROUP BY " +
  "iawbd.flight_no, " +
  "iawbd.ata_date, " +
  "iawbd.ata_time, " +
    "iawbd.scheduled_date, " +

      "iawbd.scheduled_time, " +

  "flui.Flui_Loading_Location";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    ListFlight.Add(GetPropertiesFlight(reader));
                }
            }
            return ListFlight;
        }
    }
}
