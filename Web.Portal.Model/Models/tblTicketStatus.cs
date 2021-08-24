using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("tblTicketStatus")]
    public class tblTicketStatus
    {
        [Key]
        public int ID { get; set; }
        public System.Guid TicketUID { get; set; }
        public Nullable<System.DateTime> TicketCreatedAt { get; set; }
        public string ActionCode { get; set; }
        public string ActionValue { get; set; }
        public System.DateTime ActionDateTime { get; set; }
        public string BienSoXe { get; set; }
        public Nullable<int> ActionStatus { get; set; }
        [MaxLength(255)]
        public string ActionMessage { get; set; }
        public int TicketType { set; get;}
        public string Note { set; get; }
        public string TrongTai { set; get; }
    }
}
