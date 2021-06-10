using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("AWBByULD")]
    public class AWBByULD
    {
        public int ID { set; get; }
        public Guid? ULD_ID { set; get; }
        public Guid Flight_ID { set; get; }
        public string AWB { set; get; }
        public string SHC { set; get; }
        public int? CheckValue { set; get; }
        public int? Process { set; get; }
        public int? Lagi_Identity { set; get; }
        public DateTime? TimeFinish { set; get; }
        public Guid? AWB_ID { set; get; }
        public bool? HaveMultiHawb { set; get; }
    }
}
