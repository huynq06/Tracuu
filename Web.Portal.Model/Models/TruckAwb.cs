using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("TruckAwb")]
    public class TruckAwb
    {
        [Key]
        public int ID { set; get; }
        public int TruckID { set; get; }
        public string Booking { set; get; }
        public string AWB { set; get; }
        public int Quantity { set; get; }
        public int TotalQuantity { set; get; }
    }
}
