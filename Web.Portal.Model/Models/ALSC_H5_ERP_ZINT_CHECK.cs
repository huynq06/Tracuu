using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("HAN_W1_HL.ALSC_H5_ERP_ZINT_CHECK")]
    public class ALSC_H5_ERP_ZINT_CHECK
    {
        [Key]
        public string INVOICE_ISN { set; get; }
        public string INVOICE_TYPE { set; get; }
        public string ZO_HEADER_ID { set; get; }
        public string ZO_BILL_ID { set; get; }
        public string TYPE { set; get; }
        public string SALE_ORG { set; get; }
        public string DOC_DATE { set; get; }
        public string BILLING_DATE { set; get; }
        public int STATUSCODE { set; get; }
        public int EXISTED { set; get; }
        public string REQUESTXML { set; get; }
        public string RESPONSEXML { set; get; }

    }
}
