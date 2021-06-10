using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class FlightImp
    {
        public string FlightNumber { set; get; }
        public string FlightDate { set; get; }
        public string FightTime { set; get; }
        public string SHCDate { set; get; }
        public string SHCTime { set; get; }
        public string ETA { set; get; }
        public string Origin { set; get; }
        public string Des { set; get; }
        public int Pieces { set; get; }
        public string Weight { set; get; }
        public string Remark { set; get; }
    }
}
