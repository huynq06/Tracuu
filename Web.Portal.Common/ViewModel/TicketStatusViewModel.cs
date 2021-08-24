using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class TicketStatusViewModel
    {
        public int ID { set; get; }
        public string BSX { set; get; }
        public Guid TicketID { set; get; }
        public DateTime Created { set; get; }
        public string CheckIn { set; get; }
        public string BarieIn { set; get; }
        public string CheckOut { set; get; }
        public string BarieOut { set; get; }
        public string Location { set; get; }
        public int WaitingTime { set; get; }
        public string SLA { set; get; }
        public string LoaiXe { set; get; }
        public string LoaiVe { set; get; }
        public string ServedTime { set; get; }
        public DateTime? CheckInMonthly { set; get; }
        public DateTime? CheckOutMonthly { set; get; }
        public DateTime? TimeCallTruck { set; get; }
        public DateTime? TimeCheckIn { set; get; }
        public DateTime? TimeCheckOut { set; get; }
        public string AWB { set; get; }

    }
}
