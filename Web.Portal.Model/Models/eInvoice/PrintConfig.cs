using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("PrintConfig")]
    public class PrintConfig
    {
        public int ID { set; get; }
        public string PrintUser { set; get; }
        public string Description { set; get; }
        public string PrintName { set; get; } 
    }
}
