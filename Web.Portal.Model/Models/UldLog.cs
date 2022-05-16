using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("UldLog")]
    public class UldLog
    {
        public int ID { set; get; }
        public string Location { set; get; }
        public string Name { set; get; }
        public string Remark { set; get; }
        public DateTime? Created { set; get; }
        public DateTime? Modified { set; get; }
        public string Flight { set; get; }
        public string Weight { set; get; }
        public string UldIns { set; get; }
    }
}
