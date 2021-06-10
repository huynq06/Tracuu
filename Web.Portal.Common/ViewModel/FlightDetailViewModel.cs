using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class FlightDetailViewModel
    {
        public string AWB_PREFIX { set; get; }
        public string AWB_SERIAL { set; get; }
        public int Pieces_Bill { set; get; }
        public double Weight_Bill { set; get; }
        public int Pieces_FFM { set; get; }
        public string GoodsName { set; get; }
        public string SHC { set; get; }
        public int TotalHawb { set; get; }
        public string Remark { set; get; }

    }
}
