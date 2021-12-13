﻿using System;
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
            objExpAWB.AWB = Convert.ToString(GetValueField(reader, "PREFIX", string.Empty)) + "-" + Convert.ToString(GetValueField(reader, "SERIAL", string.Empty));
            objExpAWB.Quantity = Convert.ToInt32(GetValueField(reader, "QUANTITY", 0));
            objExpAWB.Weight = Convert.ToDouble(GetValueField(reader, "Weight", 0));
            objExpAWB.Dest = Convert.ToString(GetValueField(reader, "Dest", string.Empty));
            objExpAWB.Position = Convert.ToString(GetValueField(reader, "RACK", string.Empty));
            int quantiManifest = Convert.ToInt32(GetValueField(reader, "QTY_MANIF", 0));
            objExpAWB.RemainQuantity = objExpAWB.Quantity - Convert.ToInt32(GetValueField(reader, "DEPARTED_PIECES", 0));
            objExpAWB.RemainWeigth = objExpAWB.Weight - Convert.ToDouble(GetValueField(reader, "DEPARTED_WEIGHT", 0));
            //if (quantiManifest <= objExpAWB.Quantity)
            //{
            //    objExpAWB.RemainQuantity = objExpAWB.Quantity - Convert.ToInt32(GetValueField(reader, "QTY_MANIF", 0));
            //    objExpAWB.RemainWeigth = objExpAWB.Weight - Convert.ToDouble(GetValueField(reader, "WEIGHT_MANIF", 0));
            //}
            //else
            //{
            //    double result = quantiManifest / objExpAWB.Quantity;
            //    int a = (int)Math.Ceiling(result);
            //    objExpAWB.RemainQuantity = objExpAWB.Quantity * a - quantiManifest;
            //    objExpAWB.RemainWeigth = objExpAWB.Weight* a - Convert.ToDouble(GetValueField(reader, "WEIGHT_MANIF", 0));
            //}
        
            objExpAWB.Booking = Convert.ToString(GetValueField(reader, "BOOKING", string.Empty));

            return objExpAWB;
        }
        public List<FindAwbAwbExportViewModel> GetLocationAwb(string id)
        {
            string sql = " select labs.labs_quantity_del QUANTITY,labs.labs_weight_del WEIGHT,labs.labs_destination DEST, "+
                "sslp.sslp_rack_row RACK from labs "+
                 "left join awbu_awbperuld_list awbu "+
         "on awbu.awbu_mawb_ident_no = labs.labs_ident_no "+
         "and awbu.awbu_object_type = 'EXPORT AWB' "+
 "join locs_locations locs on labs.labs_ident_no = locs.locs_object_isn " +
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
        public List<FindAwbAwbExportViewModel> GetDetailAwb(string id)
        {
            string sql = " select labs.labs_mawb_prefix PREFIX,labs_mawb_serial_no SERIAL, labs.labs_quantity_booked QUANTITY,labs.labs_weight_booked WEIGHT,labs.labs_destination DEST, " +
                "sslp.sslp_rack_row RACK, " +
               "(select sum(awbu.awbu_pieces) from awbu_awbperuld_list awbu where awbu.awbu_mawb_ident_no = labs.labs_ident_no and awbu.awbu_object_type = 'EXPORT AWB') DEPARTED_PIECES," +
   "(select sum(awbu.awbu_weight) from awbu_awbperuld_list awbu where awbu.awbu_mawb_ident_no = labs.labs_ident_no and awbu.awbu_object_type = 'EXPORT AWB') DEPARTED_WEIGHT " +
                "from labs " +
                    "left join awbu_awbperuld_list awbu " +
         "on awbu.awbu_mawb_ident_no = labs.labs_ident_no " +
         "and awbu.awbu_object_type = 'EXPORT AWB' " +
                 "join locs_locations locs on labs.labs_ident_no = locs.locs_object_isn " +
 "join han_w1_hl.sslp_physical_locations sslp  on locs.locs_physical_isn = sslp.sslp_physical_isn " +
 "where labs.labs_deleted = 0 and labs.labs_ident_no = '" + id + "'";
     
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
