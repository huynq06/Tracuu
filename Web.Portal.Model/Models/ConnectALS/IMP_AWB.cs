using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("IMP_AWB")]
    public class IMP_AWB
    {
        [Key]
        public decimal AWBID { get; set; }
        public string ALS_CODE { get; set; }
        public string FLIGHT_NUMBER { get; set; }
        public string SCHEDULE_DATE { get; set; }
        public string SCHEDULE_TIME { get; set; }
        public string EXPECTED_DATE { get; set; }
        public string EXPECTED_TIME { get; set; }
        public string LANDED_DATE { get; set; }
        public string LANDED_TIME { get; set; }
        public string MAWB { get; set; }
        public string HAWB { get; set; }
        public string AOO { get; set; }
        public string AOD { get; set; }
        public string SHIPPER { get; set; }
        public string CONSIGNEE { get; set; }
        public string CONSIGNEE_ADDR { get; set; }
        public Nullable<int> RECEIVED_PIECES { get; set; }
        public Nullable<decimal> RECEIVED_WEIGHT { get; set; }
        public string NATURE { get; set; }
        public string SHC { get; set; }
        public string REMARK { get; set; }
        public Nullable<System.DateTime> MOVING_DATETIME { get; set; }
        public Nullable<int> EXPECTED_PIECES { get; set; }
        public Nullable<decimal> EXPECTED_WEIGHT { get; set; }
        public Nullable<decimal> CHARGABLE_WEIGHT { get; set; }
        public Nullable<double> RECEIVED_STATUS { get; set; }
        public Nullable<System.DateTime> RECEIVED_DATE { get; set; }
        public string RECEIVED_TIME { get; set; }
        public Nullable<double> DELIVERED_STATUS { get; set; }
        public Nullable<int> DELIVERED_PIECES { get; set; }
        public Nullable<System.DateTime> DELIVERED_DATE { get; set; }
        public string DELIVERED_TIME { get; set; }
        public Nullable<double> XML_UPLOAD_STATUS { get; set; }
        public string XML_UPLOAD_FILE { get; set; }
        public Nullable<System.DateTime> XML_UPLOAD_DATETIME { get; set; }
        public string ACK_STATUS { get; set; }
        public string ACK_MESSAGE { get; set; }
        public Nullable<System.DateTime> CREATED_AT { get; set; }
        public Nullable<System.DateTime> UPDATED_AT { get; set; }
    }
}
