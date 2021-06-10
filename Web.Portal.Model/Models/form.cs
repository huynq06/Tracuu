using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Web.Portal.Model.Models
{
    [Table("form")]
    public class form
    {
        public int ID { set; get; }
        public string author { set; get; }
        public string AWB { set; get; }
        public string quantity { set; get; }
        public string weight { set; get; }
        public string booking { set; get; }
        public bool custom_status { set; get; }
        public string car_number { set; get; }
        public string phone_number { set; get; }
        public string email { set; get; }
        public string issue_key { set; get; }
        public DateTime createdDate { set; get; }
        public DateTime? lastUpdated { set; get; }
        public DateTime? CutoffTime { set; get; }
    }
}
