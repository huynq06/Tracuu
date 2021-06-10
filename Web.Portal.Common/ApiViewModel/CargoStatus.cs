using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class CargoStatus
    {
        public string Status { set; get; }
        public string StationWareHouse { set; get; }
        public DateTime? EventTime { set; get; }
        public int Pieces { set; get; }
        public string Weight { set; get; }
        public string Remark { set; get; }
    }
}
