using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class HandlingReportViewModel
    {
        public string Date { set; get; }
        public string AWB { set; get; }
        public string Group { set; get; }
        public int Pieces { set; get; }
        public double Weight { set; get; }
        public double ChargeableWeigt { set; get; }
        public DateTime DateCreate { set; get; }
        public string Hawb { set; get; }
        public double ChargeableReal { set; get; }
    }
}
