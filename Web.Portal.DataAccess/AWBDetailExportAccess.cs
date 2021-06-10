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
    public class AWBDetailExportAccess : DataBase.OracleProvider
    {
        private AwbExpDetailViewModel GetProperties(OracleDataReader reader)
        {
            AwbExpDetailViewModel awb = new AwbExpDetailViewModel();
            awb.Lab_ident = Convert.ToString(GetValueField(reader, "ID", string.Empty));
            awb.Mawb = Convert.ToString(GetValueField(reader, "MAWB", string.Empty));
            awb.FlightNumber = Convert.ToString(GetValueField(reader, "FLIGHT_NO", string.Empty));
            //awb.GoodsName = Convert.ToString(GetValueField(reader, "GOODSCONTENT", string.Empty));
            awb.Consignee = Convert.ToString(GetValueField(reader, "CONSIGNEE", string.Empty));
            awb.ConsigneeAdd = Convert.ToString(GetValueField(reader, "CONSIGADDR", string.Empty));
            awb.Shipper = Convert.ToString(GetValueField(reader, "SHIPPER", string.Empty));
            awb.ShipperAdd = Convert.ToString(GetValueField(reader, "SHIPPERADDR", string.Empty));
            awb.Quantity = Convert.ToInt32(GetValueField(reader, "PIECES_RECEIVED", string.Empty));
            awb.Weight = Convert.ToInt32(GetValueField(reader, "PIECES_EXPECTED", string.Empty));
            //awb.Pieces_Delivered = Convert.ToInt32(GetValueField(reader, "PIECES_DELIVERED", string.Empty));
            //awb.Weight = Convert.ToString(GetValueField(reader, "WEIGHT", string.Empty));
            awb.Origin = Convert.ToString(GetValueField(reader, "AWB_ORG", string.Empty));
            awb.Destination = Convert.ToString(GetValueField(reader, "AWB_DEST", string.Empty));
            awb.Remark = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
            //awb.StatusDelivered = Convert.ToString(GetValueField(reader, "STATUS_DELIVERED", "0"));
            //awb.Lagi_Master_Identity = Convert.ToString(GetValueField(reader, "LAGI_MASTER", "0"));
            return awb;
        }
        public AwbExpDetailViewModel GetAwbDetailByLagiIdentity(string labIdent)
        {
            string sql = " SELECT distinct " +
    "labs.labs_ident_no as LAS_INDENT, "+
    "flup.FLUP_FLIGHT_NO_LVG || flup.flup_flight_no AS FLIGHT_NO, "+
    "to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_actual_date, 'DD/MM/YYYY')  AS DEPARTURE_DATE, "+
    "flup.FLUP_ACTUAL_TIME AS DEPARTURE_TIME ,"+  
    "labs.LABS_MAWB_PREFIX || labs.LABS_MAWB_SERIAL_NO AS AWB_NO, "+
    "to_char(a.agen_creation_datetime, 'DD-MM-YYYY HH24:MI:SS') as time_awb_created "+
  "FROM FLUP flup "+
    "JOIN CONT cont "+
           "ON cont.CONT_FLIGHT_NO_ = flup.flup_flight_no "+
           "and to_date('02-01-0001' , 'DD-MM-YYYY') +cont.CONT_DATE = to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_scheduled_date "+
      "JOIN AWBU_AWBPERULD_LIST awbu "+
          "on awbu.awbu_uld_isn = cont.cont_uld_isn "+
      "JOIN LABS labs "+
           "on awbu.awbu_mawb_ident_no = labs.LABS_IDENT_NO "+
      "left join agen a "+
           "on labs.labs_ident_no = a.agen_ident_no "+
           //and a.agen_status_external = 'AWB CREATED'
           //--and a.agen_type = 'EXPORT'
           //and a.agen_remarks = 'AWB Created manually'
           //--or a.agen_remarks = 'AWB Created by FWB Message'
  "WHERE "+
  "1 = 1 "+
  "AND labs.labs_deleted = 0" +
  "AND labs.labs_ident_no = '" + labIdent + "'";
            AwbExpDetailViewModel awb = new AwbExpDetailViewModel();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    awb = GetProperties(reader);

                }
            }
            return awb;
        }

        public bool CheckDepartFlight(string labIdent)
        {
            bool check = false;
            string sql = "SELECT "+
  "flup.flup_actual_time as ACTUAL_TIME " +
  ", CASE flup.flup_actual_time " +
           "WHEN '000000' THEN '0' "+
         "ELSE '1' "+
    "END as FLIGHT_DEPARTED "+
"FROM labs labs "+
"join han_w1_hl.book_bookings book on labs.labs_ident_no = book.book_labs_ident "+
"join han_w1_hl.flup flup on flup.flup_int_number = book.book_flight_isn "+
"WHERE  labs.labs_ident_no = '" + labIdent + "'";
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    int depart = Convert.ToInt32(GetValueField(reader, "FLIGHT_DEPARTED", string.Empty));
                    if (depart == 1)
                        check = true;

                }
            }
            return check;
        }
    }
    
}
