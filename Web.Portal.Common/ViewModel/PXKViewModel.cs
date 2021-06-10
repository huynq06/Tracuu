using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class PXKViewModel
    {
        public int ID { set; get; }
        public string PXKNo { set; get; }
        public int TimeToIDA { set; get; }
        public int WaitingTime { set; get; }
        public DateTime Created { set; get; }
        public string VCTNo { set; get; }
        public string AWB { set; get; }
        public string Hawb { set; get; }
        public double? quantity { set; get; }
        public double? weight { set; get; }
        public string Location { set; get; }
        public int? GroupNumer { set; get; }
        public int OverTime { set; get; }
        public bool SLA { set; get; }
        public DateTime? Finish { set; get; }
    }
}
