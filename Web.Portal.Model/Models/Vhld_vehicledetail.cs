using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("HAN_W1_HL.VHLD_VEHICLEDETAIL")]
    public class Vhld_vehicledetail
    {
        [Key]
        public string VHLD_VEHICLEISN { set; get; }
        public string VHLD_AWBPREFIX { set; get; }
        public string VHLD_AWBSERIAL { set; get; }
    }
}
