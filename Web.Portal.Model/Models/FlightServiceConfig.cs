using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Web.Portal.Model.Models
{
    [Table("FlightServiceConfig")]
    public class FlightServiceConfig
    {
        public int ID { set; get; }
        public int Position { set; get; }
        public int FinishTimePerUld { set; get; }
        public int ManPerUld { set; get; }
   
    }
}
