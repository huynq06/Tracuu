using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("HAN_W1_HL.LABS")]
    public class Lab
    {
        [Key]
        public string LABS_IDENT_NO { set; get; }
        public string LABS_MAWB_PREFIX { set; get; }
        public string LABS_MAWB_SERIAL_NO { set; get; }
        public string LABS_SPECIAL_GOODS { set; get; }
        public string LABS_CONTENT { set; get; }
        public string LABS_ORIGIN { set; get; }
        public string LABS_DESTINATION { set; get; }
        public string LABS_MANIFEST_REMARKS { set; get; }
        public string LABS_SHIPPER_NAME { set; get; }
        public string LABS_SHIPPER_ADDRESS { set; get; }
        public string LABS_CONSIGNEE_NAME { set; get; }
        public string LABS_CONSIGNEE_ADDRESS { set; get; }
        public string LABS_REMARKS_2 { set; get; }
        public DateTime LABS_CREATED_AT { set; get; }
        public double LABS_QUANTITY_DEL { set; get; }
        public double LABS_QUANTITY_BOOKED { set; get; }
        public double LABS_WEIGHT_BOOKED { set; get; }
        public double LABS_WEIGHT_MANIF { set; get; }
        public double LABS_WEIGHT_DEL { set; get; }
        public string LABS_AGENT_NAME { set; get; }
    }
}
