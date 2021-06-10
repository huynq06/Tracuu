using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class FlightFlupViewModel 
    {
   
        public string FLightNumber { set; get; }
     
      
    
        public DateTime ETD { set; get; }
     
   
        public int FinalLoad { set; get; }
        public DateTime? SLA { set; get; }
        public string RemainTime { set; get; }
        public int? TotalULD { set; get; }
        public int? RemainULD { set; get; }
        public int? NeedPosition { set; get; }
        public int? ManPower { set; get; }
        public string Remark { set; get; }
    

    }
}
