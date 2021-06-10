using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("HAN_W1_HL.ALSC_VCT_TO_DLV_BY_XML")]
    public class ALSC_VCT_TO_DLV_BY_XML
    {
        public int ID { set; get; }
        public string VCT_NO { set; get; }
        public DateTime SCAN_DATETIME { set; get; }
        public int STATUS { set; get; }
    }
}
