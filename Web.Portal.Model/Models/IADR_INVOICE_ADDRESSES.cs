using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("HAN_W1_HL.IADR_INVOICE_ADDRESSES")]
    public class IADR_INVOICE_ADDRESSES
    {
        [Key]
        public double IADR_ADDRESS_ISN { set; get; }
        public string IADR_NAME_1 { set; get; }
       
    }
}
