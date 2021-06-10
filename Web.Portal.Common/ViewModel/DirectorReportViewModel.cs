using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class DirectorReportViewModel
    {
        public string RECEIVED_DATE { set; get; }
        public double CX { set; get; }
        public double KE { set; get; }
        public double JL { set; get; }
        public double EK { set; get; }
        public double UPS { set; get; }
        public double CI { set; get; }
        public double Total
        {
            get { return CI + CX + JL + KE + UPS + EK; }
        }
    }
}
