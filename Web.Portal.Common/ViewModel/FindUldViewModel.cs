using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class FindUldViewModel
    {
        public string ULD { set; get; }
        public string Location { set; get; }
        public string Name { set; get; }
        public string Remark { set; get; }
        public DateTime? Created { set; get; }
        public DateTime? Modified { set; get; }
        public string Flight { set; get; }
        public string Weight { set; get; }
        public string UldIns { set; get; }
        public DateTime? FlightDate { set; get; }
    }
}
