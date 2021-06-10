using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class ResultImp
    {
        public GeneralImp GenralImp { set; get; }
        public List<FlightImp> FlightImps { set; get; }
        public List<CargoStatus> CargoStatus { set; get; }
    }
}
