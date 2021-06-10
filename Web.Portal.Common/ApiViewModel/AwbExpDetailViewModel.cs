using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class AwbExpDetailViewModel
    {
        public string Lab_ident { set; get; }
        public string Mawb { set; get; }
        public double Quantity { set; get; }
        public double Weight { set; get; }
        public string Consignee { set; get; }
        public string ConsigneeAdd { set; get; }
        public string Shipper { set; get; }
        public string ShipperAdd { set; get; }
        public string Origin { set; get; }
        public string Destination { set; get; }
        public string Remark { set; get; }
        public string ATA_Date { set; get; }
        public string ATA_Time { set; get; }
        public string Schedule_Date { set; get; }
        public string Schedule_Time { set; get; }
        public string FlightNumber { set; get; }
        public int Status { set; get; }
        public string Commodity { set; get; }
        public DateTime Created { set; get; }
        public string Agent { set; get; }
    }
}
