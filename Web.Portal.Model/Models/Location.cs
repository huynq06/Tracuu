using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("Location")]
    public class Location
    {
        public int ID { set; get; }
        public string LocationName { set; get; }
        public bool? Status { set; get; }
        public int LocationID { set; get; }
    }
}
