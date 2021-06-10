using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class TicketViewModel
    {
        public int ID { set; get; }
        public Nullable<System.Guid> TicketID { get; set; }
        public string BSX { set; get; }
        public string CompanyName { set; get; }
        public DateTime? ExpiredDate { set; get; }
        public string PrintQrCode { set; get; }

    }
}
