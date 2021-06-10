using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("HAN_W1_HL.LAGI")]
    public class Lagi
    {
        [Key]
        public string LAGI_IDENT_NO { set; get; }
        public string LAGI_MAWB_PREFIX { set; get; }
        public string LAGI_MAWB_NO { set; get; }
        public string LAGI_HAWB { set; get; }
        public double LAGI_QUANTITY_RECEIVED { set; get; }
        public string LAGI_SHIPMENT_REMARKS { set; get; }
        public string LAGI_SHIPPER_NAME { set; get; }
        public string LAGI_SHIPPER_ADDRESS { set; get; }
        public string LAGI_CONSIGNEE_NAME { set; get; }
        public string LAGI_CONSIGNEE_ADDRESS { set; get; }
        public double LAGI_QUANTITY_EXPECTED { set; get; }
        public double LAGI_WEIGHT_EXPECTED { set; get; }
        public string LAGI_TSO { set; get; } 

    }
}
