using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class ExportUldByFlightViewModel
    {
        public List<UldControlViewModel> listUldControl;
        public string StartOperation { set; get; }
        public string StopOperation { set; get; }
        public string ULD { set; get; }
        public string Location { set; get; }
    }
}
