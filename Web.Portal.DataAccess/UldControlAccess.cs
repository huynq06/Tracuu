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
    public class UldControlAccess : DataBase.OracleProvider
    {
        private UldControlViewModel GetProperties(OracleDataReader reader,string uldName)
        {
            UldControlViewModel uld = new UldControlViewModel();
            uld.ULD = uldName;
            uld.Mawb = Convert.ToString(GetValueField(reader, "MAWB", string.Empty));
            uld.Hawb = Convert.ToString(GetValueField(reader, "HAWB_NO", string.Empty));
            uld.GroupNo = Convert.ToString(GetValueField(reader, "GROUP_NO", string.Empty));
            uld.Location = Convert.ToString(GetValueField(reader, "LOCATION", string.Empty));
            uld.PiecesReceived = Convert.ToInt32(GetValueField(reader, "PIECES_RECEIVED", 0));
            uld.PiecesFFM = Convert.ToInt32(GetValueField(reader, "PIECES_FFM", 0));
            uld.ID = Convert.ToString(GetValueField(reader, "ID", string.Empty));
            uld.LagiMasterID = Convert.ToString(GetValueField(reader, "LAGI_MASTER", string.Empty));
            return uld;
        }
        private AwbuViewModel GetPropertiesAwb(OracleDataReader reader)
        {
            AwbuViewModel awb = new AwbuViewModel();
            awb.Awb = Convert.ToString(GetValueField(reader, "AWB", string.Empty));
            awb.LagiIdent = Convert.ToString(GetValueField(reader, "LAGI_ID", string.Empty));
            awb.PiecesAwbu = Convert.ToInt32(GetValueField(reader, "PIECES_FFM", 0));
            return awb;
        }
        private UldLogViewModel GetPropertiesUld(OracleDataReader reader)
        {
            UldLogViewModel uld = new UldLogViewModel();
            uld.Uld = Convert.ToString(GetValueField(reader, "ULD", string.Empty));
            uld.UldIns = Convert.ToString(GetValueField(reader, "ULDINS", string.Empty));
            uld.Date = Convert.ToString(GetValueField(reader, "CONT_DATE", string.Empty));
            return uld;
        }
        public List<UldControlViewModel> GetListUldByIns(string uldIns,string uldName)
        {
            string sql = "select distinct  "+
"lagi.lagi_mawb_prefix || lagi.lagi_mawb_no as MAWB,  " +
"lagi.lagi_hawb as HAWB_NO,  " +
"l.lagi_ident_no LAGI_MASTER, "+
"j.ID ID,  " +
"j.group_no GROUP_NO,  " +
"j.pieces_received PIECES_RECEIVED,  " +
"sslp.sslp_rack_row || '-' || sslp.sslp_rack_location || '-' || sslp.sslp_rack_height LOCATION,  " +
            "awbu.awbu_pieces_origin PIECES_FFM  " +
"from(select  " +
    "grai.grai_object_isn as ID,  " +
      "grai.grai_object_group_isn as group_no,  " +
     "grai.grai_numeric_value as pieces_received  " +
          "from han_w1_hl.grai_group_additional_info grai  " +
      "where  " +
        "grai.grai_group_type = 'PIECES'  " +
      "and grai.grai_group_code = 'RECEIVED')j  " +
    "join han_w1_hl.grai_group_additional_info grai on j.ID = grai.grai_object_isn and j.group_no = grai.grai_object_group_isn  " +
  "and grai.grai_group_type = 'ULD'  " +
  "and grai.grai_group_code = 'ISN'  " +
    "join han_w1_hl.lagi lagi on j.ID = lagi.lagi_ident_no  " +
     "inner join han_w1_hl.LAGI l on l.lagi_mawb_prefix = lagi.lagi_mawb_prefix and l.lagi_mawb_no = lagi.lagi_mawb_no and l.lagi_master_ident_no = 0  " +
  "join han_w1_hl.AWBU_AWBPERULD_LIST awbu  on grai.grai_value = awbu.awbu_uld_isn  " +
  "and l.lagi_ident_no = awbu.awbu_mawb_ident_no  " +
  "join han_w1_hl.locs_locations locs  " +
     "on lagi.lagi_ident_no = locs.locs_object_isn  " +
     "and grai.grai_object_group_isn = locs.locs_group_isn  " +
"join han_w1_hl.sslp_physical_locations sslp  " +
     "on locs.locs_physical_isn = sslp.sslp_physical_isn  " +
  "where awbu.awbu_uld_isn = '"+uldIns+"'  " +
 "order by 1";
            List<UldControlViewModel> ulds = new List<UldControlViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    UldControlViewModel uld = GetProperties(reader,uldName);
                    ulds.Add(uld);
                }
            }
            return ulds;
        }
        public List<AwbuViewModel> GetListMawbByIns(string uldIns)
        {
            string sql = "select awbu.awbu_mawb_ident_no LAGI_ID,awbu.awbu_mawb_prefix || awbu.awbu_mawb_serial_no AWB,awbu.awbu_pieces_origin PIECES_FFM " +
"from AWBU_AWBPERULD_LIST awbu "+
  "where awbu.awbu_uld_isn = '" + uldIns + "'  ";
            List<AwbuViewModel> awbs = new List<AwbuViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    AwbuViewModel awb = GetPropertiesAwb(reader);
                    awbs.Add(awb);
                }
            }
            return awbs;
        }
        public DateTime? GetCreatedTime(string lagi_ident,string groupNo)
        {
            string sql = "select agen.agen_creation_datetime GROUP_CREATED from agen "+
"where agen.agen_ident_no = '"+ lagi_ident + "' and agen.agen_remarks like '%"+ groupNo + "%' and rownum = 1";

            DateTime? dt = new DateTime();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                if (reader.Read())
                {
                    dt = Convert.ToDateTime(GetValueField(reader, "GROUP_CREATED", 0));
                }

            }

            return dt;
        }

        public List<string> GetListUldByName(string name)
        {
            string sql = "select  cont.cont_container||cont.cont_serial_no_||cont.cont_owner_code ULD,cont.cont_uld_isn ULDINS,cont_date CONT_DATE from cont " +
"where cont.cont_container || cont.cont_serial_no_ || cont.cont_owner_code  like '%"+ name + "%' " +
"and (to_date('02-01-0001' , 'DD-MM-YYYY') +cont.CONT_DATE between sysdate-15 and sysdate+5 or cont_date = 0)";

            List<UldLogViewModel> ulds = new List<UldLogViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    UldLogViewModel uld = GetPropertiesUld(reader);
                    ulds.Add(uld);
                }
            }
            return ulds.Select(y => y.Uld + "/" + y.UldIns + "/" + y.Date).Distinct().ToList();
        }
    }
}
