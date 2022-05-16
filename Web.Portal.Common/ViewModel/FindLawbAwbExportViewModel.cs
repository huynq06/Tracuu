using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class FindAwbAwbExportViewModel
    {
        public string Lab_Idents { set;get; }
        public string AWB { set; get; }
        public string Booking { set; get; }
        public int Quantity { set; get; }
        public double Weight { set; get; }
        public string Dest { set; get; }
        public string Position { set; get; }
        public string Remark { set; get; }
        public string Status { set; get; }
        public int RemainQuantity { set; get; }
        public double RemainWeigth { set; get; }
        public string Warning { set; get; }
        public string Notify { set; get; }

    }
}
