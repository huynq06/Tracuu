using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class CustomDetailViewModel
    {
        public GetInViewModel GetIn { set; get; }
        public GetOutViewModel GetOut { set; get; }
        public DKXDViewModel Dkxd { set; get; }
        public KVGSViewModel Kvgs { set; get; }
    }
}
