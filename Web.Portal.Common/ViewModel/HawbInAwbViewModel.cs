using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class HawbInAwbViewModel
    {
        public int ID { set; get; }
        public string FlightNumeber { set; get; }
        public string AWB { set; get; }
        public string HAWB { set; get; }
        public bool? Fast { set; get; }
        public Guid? FlightID { set; get; }
    }
}
