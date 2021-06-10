using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class VCTViewModel
    {
        public string VCTNo { set; get; }
        public string BSXNo { set; get; }
        public string DriverName { set; get; }
        public string DriverID { set; get; }
        public DateTime? DateIn { set; get; }
        public DateTime? DateOut { set; get; }
    }
}
