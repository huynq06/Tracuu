using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Web.Portal.Model.Models
{
    [Table("HawbManagement")]
    public class HawbManagement
    {
        public int ID { set; get; }
        public string Hawb { set; get; }
        public string Mawb { set; get; }
        public string Flight { set; get; }
        public DateTime? ATA { set; get; }
        public DateTime? Created { set; get; }
       
    }
}
