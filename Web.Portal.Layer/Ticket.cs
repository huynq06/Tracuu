using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class Ticket
    {
        public string ID { get; set; }
        public int TicketService { get; set; }
        public DateTime? TicketTime { get; set; }
        public DateTime? ReadTime { get; set; }
    }
}
