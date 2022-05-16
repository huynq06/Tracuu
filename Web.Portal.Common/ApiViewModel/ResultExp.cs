using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class ResultExp
    {
        public GenaralExp GenralExp { set; get; }
        public List<HawbInFlightViewModel> FlightExps { set; get; }
        public List<CargoExpStatus> CargoStatus { set; get; }
        public bool IsFavourite { set; get; }
    }
}
