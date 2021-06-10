using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("CallTruck")]
    public class CallTruck
    {
        [Key]
        public int ID { get; set; }
        public string BSX { get; set; }
        public string Location { get; set; }
        public string Note { get; set; }
        public string Remark { get; set; }
        public string VCT { get; set; }
        public Nullable<int> Floor { get; set; }
        public Nullable<int> SpaceEmptyFloor1 { get; set; }
        public Nullable<int> SpaceEmptyFloor2 { get; set; }
        public Nullable<int> SortValue { get; set; }
        public Nullable<System.DateTime> Created { get; set; }
       
    }
}
