using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    public class CheckGetIn
    {
        public string Awb_Prefix { set; get; }
        public string Awb_Serial { set; get; }
        public string GoodId { set; get; }
        public int Pieces_Per_GoodId { set; get; }
        public int GetIn_Status { set; get; }
        public int Awb_Pieces_Received { set; get; }
        public int Group_Pices_Received { set; get; }
        public string Agent { set; get; }
        public string Good_Content { set; get; }
        public int GetIn_Process { set; get; }
        public int INT_OUT_STATUS { set; get; }
    }
}
