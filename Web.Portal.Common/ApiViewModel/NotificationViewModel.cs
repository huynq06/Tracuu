using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class NotificationViewModel
    {
        public string deviceId { set; get; }
        public bool isAndroiodDevice { set; get; }
        public string title { set; get; }
        public string body { set; get; }
    }
}
