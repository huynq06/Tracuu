using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models.UatEInvoice
{
    [Table("ResponseMessage")]
    public class UatResponseMessage
    {
        public int ID { set; get; }
        public string ReturnCodeField { set; get; }
        public string ErrorMessageField { set; get; }
        public string KeyField { set; get; }
        public DateTime Created { set; get; }
        public string ApiType { set; get; }
    }
}
