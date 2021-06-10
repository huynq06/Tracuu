using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Web.Portal.Model.Models
{
    [Table("LocationConfig")]
    public class LocationConfig
    {
        [Key]
        public int ID { get; set; }
        public Nullable<int> Floor { get; set; }
        public Nullable<int> TotalSpace { get; set; }
        public Nullable<int> ThresholdPoint { get; set; }
    }
}
