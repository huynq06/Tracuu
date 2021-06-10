using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("ULD_TYPE")]
    public class ULD_TYPE
    {
        public int ID { set; get; }
        public string Name { set; get; }
        public int? TimeOperation { set; get; }
        public int? TimeNotify { set; get; }
        public int? STT { set; get; }
    }
}
