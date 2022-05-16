using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class FlightFavouriteViewModel 
    {
        public string FlightID { set; get; }
        public Guid UserID { set; get; }
        public string TokenID { set; get; }
        public string Type { set; get; }
    }
}
