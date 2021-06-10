using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("ActionLog")]
    public class ActionLog
    {
        public int ID { set; get; }
        public string ActionName { set; get; }
        public string ActionType { set; get; }
        public DateTime? Created { set; get; }
        public string UserName { set; get; }
        public int UserID { set; get; }
        public string InvoiceID { set; get; }
    }
}
