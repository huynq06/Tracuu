using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class QueueAWB
    {
        public string MAWB { get; set; }
        public string HAWB { get; set; }
        public string INVOICENO { get; set; }
        public DateTime? INVOICECREATED { get; set; }
        public string EMPLOYEE { get; set; }
        public string QUEUE { get; set; }
        public DateTime? QUEUECREATED { get; set; }

    }
}
