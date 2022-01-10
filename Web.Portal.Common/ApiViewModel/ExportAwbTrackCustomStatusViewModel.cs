using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class ExportAwbTrackCustomStatusViewModel
    {

        public string SDD { set; get; }
        public string STK { set; get; }
        public int GetInStatus { set; get; }
        public int GetInPieces { set; get; }
        public string GetInMessage { set; get; }
        public DateTime? GetInCreated { set; get; }
        public string GetInDate { set; get; }
        public int GetOutStatus { set; get; }
        public int GetOutPieces { set; get; }
        public string GetOutMessage { set; get; }
        public DateTime? GetOutCreated { set; get; }
        public string GetOutDate { set; get; }
    }
}
