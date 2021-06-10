using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("HawbInAwb")]
    public class HawbInAwb
    {
        public int ID { set; get; }
        public Guid? FlightID { set; get; }
        public Guid? AWB_ID { set; get; }
        public string HAWB { set; get; }
        public int? CheckValue { set; get; }
        public int? Process { set; get; }
        public DateTime? TimeFinish { set; get; }
        public bool? Bql { set; get; }
        public int? Lagi_Identity { set; get; }
        public bool? Fast { set; get; }
    }
}
