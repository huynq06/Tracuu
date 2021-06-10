using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class AWBByULDViewModel
    {
  
        public string AWB { set; get; }
        public string SHC { set; get; }
        public Guid Flight_ID { set; get; }
        public int? CheckValue { set; get; }
        public int TimeFinish { set; get; }
        public Guid? AWB_ID { set; get; }
        public bool? HaveMultiHawb { set; get; }
    }
}
