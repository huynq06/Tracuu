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
    public class CheckGetInAlsxAccess :  DataBase.OracleProvider
    {
        //public string ID_XML { set; get; }
        //public string WareHouse { set; get; }
        //public string AWB { set; get; }
        //public int Pieces_XML { set; get; }
        //public int Pieces_H5 { set; get; }
        //public string SDD { set; get; }
        //public DateTime Created { set; get; }
        //public string Booking { set; get; }
        //public int Pieces_Custom { set; get; }
        //public string PreMessage { set; get; }
        //public string Message_Custom { set; get; }
        //public int GetInStatus { set; get; }
        //public int GetInProcess { set; get; }
        private GetInAlsxViewModel GetProperties(OracleDataReader reader)
        {
            GetInAlsxViewModel awb = new GetInAlsxViewModel();
            awb.ID_XML = Convert.ToString(GetValueField(reader, "ID", string.Empty));
            awb.AWB_PREFIX = Convert.ToString(GetValueField(reader, "AWB_PREFIX", string.Empty));
            awb.AWB_SERIAL = Convert.ToString(GetValueField(reader, "AWB_NO", string.Empty));
            awb.WareHouse = Convert.ToString(GetValueField(reader, "WAREHOUSE", string.Empty));
            awb.Pieces_XML = Convert.ToInt32(GetValueField(reader, "AWB_PIECES", 0));
            awb.Pieces_H5 = Convert.ToInt32(GetValueField(reader, "PIECES_H5", 0));
            awb.SDD = Convert.ToString(GetValueField(reader, "GOODSID", string.Empty));
            awb.SDD_CUSTOM = Convert.ToString(GetValueField(reader, "SDD", string.Empty));
            awb.Message_Custom = Convert.ToString(GetValueField(reader, "TQ", string.Empty));
            awb.Pieces_Custom = Convert.ToInt32(GetValueField(reader, "PIECES_CUSTOM", 0));
            awb.Pieces_Status3 = Convert.ToInt32(GetValueField(reader, "PIECES_STATUS3", 0));
            awb.Labs_ID = Convert.ToString(GetValueField(reader, "Labs_ID", string.Empty));
            // awb.GetOut_status = Convert.ToInt32(GetValueField(reader, "GETOUT_STATUS", 0));
            //   awb.GetIn_Status = Convert.ToInt32(GetValueField(reader, "GETIN_STATUS", 0));
            awb.Created = GetValueDateTimeField(reader, "CREATED_AT", awb.Created);
            awb.UCR_PIECES = Convert.ToInt32(GetValueField(reader, "XML_PIECES", 0));
            awb.GETIN_PIECES = Convert.ToInt32(GetValueField(reader, "GETIN_PIECES", 0));
            awb.GETOUT_PIECES = Convert.ToInt32(GetValueField(reader, "GETOUT_PIECES", 0));
            awb.RECEIVED = Convert.ToInt32(GetValueField(reader, "RECEIVED", 0));
            awb.DEPARTED = Convert.ToInt32(GetValueField(reader, "DEPARTED", 0));
            awb.GETIN_CREATED = GetValueDateTimeField(reader, "GETIN_CREATED", awb.GETIN_CREATED);
            awb.GETOUT_CREATED = GetValueDateTimeField(reader, "GETOUT_CREATED", awb.GETOUT_CREATED);
            awb.Status = 1;
          
           
            if (awb.RECEIVED == 0)
            {
                awb.RECEIVED_CHECK = 0;
                awb.RECEIVED_DATETIME = "";
                awb.Check3 = 0;
            }
            else
            {
                awb.Check3 = 1;
                awb.RECEIVED_CHECK = awb.Pieces_Status3;
                awb.RECEIVED_DATETIME = Convert.ToString(GetValueField(reader, "RECEIVED_DATETIME", string.Empty));
            }
            if(awb.DEPARTED==0)
            {
                awb.Check4 = 0;
                awb.DEPARTED_CHECK = 0;
                awb.DEPARTED_DATETIME = "";
            }
            else
            {
                awb.Check4 = 1;
                awb.DEPARTED_CHECK = awb.Pieces_Status3;
                awb.DEPARTED_DATETIME = Convert.ToString(GetValueField(reader, "DEPARTURE_DATETIME", string.Empty));
            }
           
            awb.AWB = awb.AWB_PREFIX + awb.AWB_SERIAL;
            return awb;
        }
        public List<GetInAlsxViewModel> GetData(string fDate,string tDate,string wareHouse)
        {
            string sql = "SELECT distinct au.warehouse,au.awb_prefix,au.awb_no,au.awb_pieces,labs.labs_created_at as CREATED_AT, au.awb_weight,au.goodsid as GOODSID,  " +
                "to_char(labs.LABS_DATE_STATUS_4_SET, 'YYYY-MM-DD') || ' ' || labs.LABS_TIME_STATUS_4_SET as RECEIVED_DATETIME, " +
"labs.labs_quantity_booked as PIECES_H5,labs.labs_quantity_manif,au.ucr_pieces as XML_PIECES,ci.created as GETIN_CREATED,co.created as GETOUT_CREATED, " +
            "hhwd.hawb_pcs_exp,prad.prad_unique_reference_no as SDD, ci.tequip_cargopiece as GETIN_PIECES,co.tequip_cargopiece as GETOUT_PIECES, " +
            "prad.prad_movement_type as TQ,prad.prad_number_of_pieces as PIECES_CUSTOM, hhwd.hawb_pcs_exp as PIECES_STATUS3, labs.labs_ident_no as Labs_ID, " +
            "(SELECT count(l.labs_ident_no) FROM labs l WHERE 1 = 1 "+
 "AND l.labs_deleted = 0 "+
 "AND l.labs_quantity_del > 0 "+
 "and((SELECT sum(grai.grai_value) from grai_group_additional_info grai where grai.grai_object_isn = l.labs_ident_no "+
        "and grai.grai_group_type = 'PIECES' and grai.grai_group_code = 'RECEIVED') = l.labs_quantity_del) "+
 "and l.labs_mawb_prefix not like '%Z%' "+
 "and l.labs_ident_no = labs.labs_ident_no) as RECEIVED, "+
 "(select count(distinct t.LABS_INDENT) from( SELECT l.labs_ident_no as LABS_INDENT "+
  "FROM FLUP flup JOIN CONT cont "+
           "ON cont.CONT_FLIGHT_NO_ = flup.flup_flight_no "+
           "and to_date('02-01-0001' , 'DD-MM-YYYY') +cont.CONT_DATE = to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_scheduled_date "+
      "JOIN AWBU_AWBPERULD_LIST awbu "+
          "on awbu.awbu_uld_isn = cont.cont_uld_isn "+
      "JOIN LABS l "+
           "on awbu.awbu_mawb_ident_no = l.LABS_IDENT_NO "+
  "WHERE 1 = 1 "+
     "and l.labs_ident_no = labs.labs_ident_no "+
      "AND l.labs_deleted = 0 "+
      "AND flup.FLUP_ACTUAL_TIME != ' '"+
      "AND flup.flup_actual_date != 0 ) t) as DEPARTED, "+
      "(select distinct t.DEPARTURE_DATETIME from (SELECT "+
  "to_char(to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_actual_date, 'DD/MM/YYYY') || ' ' || flup.FLUP_ACTUAL_TIME  AS DEPARTURE_DATETIME "+
     "FROM FLUP flup JOIN CONT cont ON cont.CONT_FLIGHT_NO_ = flup.flup_flight_no "+
  "and to_date('02-01-0001', 'DD-MM-YYYY') + cont.CONT_DATE = to_date('02-01-0001', 'DD-MM-YYYY') + flup.flup_scheduled_date "+
  "JOIN AWBU_AWBPERULD_LIST awbu on awbu.awbu_uld_isn = cont.cont_uld_isn "+
  "JOIN LABS l on awbu.awbu_mawb_ident_no = l.LABS_IDENT_NO "+
  "WHERE 1 = 1 and l.labs_ident_no = labs.labs_ident_no "+
  "AND l.labs_deleted = 0 AND flup.FLUP_ACTUAL_TIME != ' ' "+
  "AND flup.flup_actual_date != 0 and rownum = 1  ORDER BY DEPARTURE_DATETIME DeSC ) t) as DEPARTURE_DATETIME "+
                "from report.alsx_truck_acceptance_upload au " +
"left join labs on labs.labs_mawb_prefix = au.awb_prefix "+
 "and labs.labs_mawb_serial_no = au.awb_no "+
" left join prad_pre_advice prad on prad.prad_unique_reference_no = au.goodsid " +
 "left join hawb_house_waybill_details hhwd  on hhwd.hawb_house_number = prad.prad_customs_reference_no  " +
  "left join customservice.cargo_inout ci "+
  "on ci.tequip_cargoctrlno = au.goodsid and ci.contentmessage = 'Thành công' "+
  "left join customservice.cargo_out co "+
  "on co.tequip_cargoctrlno = au.goodsid and co.contentmessage = 'Thành công' "+
"where cast(au.last_modified_time as date) between to_date('" + fDate + "', 'dd/mm/yyyy') " +
"and to_date('"+ tDate + "', 'dd/mm/yyyy') + 1"
 +" and('" + wareHouse + "' = 'ALL' or UPPER(au.warehouse) = '" + wareHouse + "') and au.goodsid is not null " +
"order by au.awb_no, au.awb_prefix";
            List<GetInAlsxViewModel> listawb = new List<GetInAlsxViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listawb.Add(GetProperties(reader));

                }
            }
            return listawb;
        }
    }
}
