using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class OrderLagiResultViewModel
    {
        public int ID { set; get; }
        public Guid? OrderId { set; get; }
        public Guid? UserId { set; get; }
        public DateTime Created { set; get; }
        public List<OrderLagiDetailViewModel> OrderLagiDetails { set; get; }
    }
}
