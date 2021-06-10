using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("ULDByFlight")]
    public class ULDByFlight
    {
        public int ID { set; get; }
        public string Name { set; get; }
        public int? Status { set; get; }
        public Guid Flight_ID { set; get; }
        public string FlightNumber { set; get; }
        public int? ULD_TYPE { set; get; }
        public int? LocationID { set; get; }
        public string Note { set; get; }
        public DateTime? StartTime { set; get; }
        public DateTime? FinishTime { set; get; }
        public bool? Warning { set; get; }
        public int? NotifyID { set; get; }
        public string NotifyMessage { set; get; }
        public string StatusMessage { set; get; }
        public int? Priority { set; get; }
        public string SHC { set; get; }
        public int? CheckValue { set; get; }


    }
}
