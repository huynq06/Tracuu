using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class OrderLagiViewModel
    {
        public Guid? UserID { set; get; }
        public string TokenID { set; get; }
        public List<OrderLagiDetailViewModel> OrderLagiDetails { set; get; }
    }
}
