using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("HolidayConfig")]
    public class HolidayConfig
    {
        public int ID { set; get; }
        public string Description { set; get; }
        public DateTime? DateHoliday { set; get; }
        public DateTime? Created { set; get; }
    }
}
