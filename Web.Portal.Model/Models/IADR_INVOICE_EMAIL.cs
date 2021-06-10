using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("HAN_W1_HL.IADR_INVOICE_EMAIL")]
    public class IADR_INVOICE_EMAIL
    {
      
        public int ID { set; get; }
        public double IADR_ADDRESS_ISN { set; get; }
        public string EMAIL { set; get; }
        public string NAME { set; get; }
    }
}
