using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class FWBViewModel
    {
        public DateTime? Created { set; get; }
        public int StatusMessage { set; get; }
        public string Description { set; get; }
        public string URL { set; get; }
    }
}
