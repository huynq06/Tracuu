using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("AwbLog")]
    public class AwbLog
    {
        public int ID { set; get; }
        public string Remark { set; get; }
        public string Lab_Idents { set; get; }
        public DateTime? Created { set; get; }
        public DateTime? Modified { set; get; }
    }
}
