using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("NotifyAWB")]
    public class NotifyAWB
    {
        public int ID { set; get; }
        public Guid? Flight_ID { set; get; }
        public string FlightNo { set; get; }
        public int NotifyPoint { set; get; }
        public DateTime? Created { set; get; }
    }
}
