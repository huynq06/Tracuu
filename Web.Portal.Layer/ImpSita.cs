using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class ImpSita
    {
        public Int64 LAGI_INDENT_NO { get; set; }
        public string AIRLINE { get; set; }
        public string FLIGHT_NO { get; set; }
        public string FLT_ORG { get; set; }
        public string FLT_DEST { get; set; }
        public DateTime? SCHEDULE_DATE { get; set; }
        public string SCHEDULE_TIME { get; set; }
        public DateTime? ATA_DATE { get; set; }
        public string ATA_TIME { get; set; }
        public string PREFIX { get; set; }
        public string SERIAL_NO { get; set; }
        public string HAWB { get; set; }
        public string AWB_ORG { get; set; }
        public string AWB_DEST { get; set; }
        public int AWB_EXPECTED_PIECES { get; set; }
        public string AWB_EXPECTED_WEIGHT { get; set; }
        public string NATURE { get; set; }
        public string CONSIGNEE_NAME { get; set; }
        public string SHIPPER_NAME { get; set; }
        public int RECEIVED_STATUS { get; set; }
        public DateTime? RECEIVED_DATE { get; set; }
        public string RECEIVED_TIME { get; set; }
        public int RECEIVED_PIECES { get; set; }
        public string RECEIVED_WEIGHT { get; set; }
        public int DELIVERED_STATUS { get; set; }
        public DateTime? DELIVERED_DATE { get; set; }
        public string DELIVERED_TIME { get; set; }
        public int DELIVERED_PIECES { get; set; }
        public string DELIVERED_WEIGHT { get; set; }
        public int DOC_ARRIVED_STATUS { get; set; }
        public DateTime? DOC_ARRIVED_DATE { get; set; }
        public string DOC_ARRIVED_TIME { get; set; }
        public int FFM_PIECES { get; set; }
        public string FFM_WEIGHT { get; set; }
        public int RCF_SENT { get; set; }
        public int NFD_SENT { get; set; }
        public int AWR_SENT { get; set; }
        public int DLV_SENT { get; set; }



    }
}
