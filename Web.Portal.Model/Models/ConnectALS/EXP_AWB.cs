using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("EXP_AWB")]
    public class EXP_AWB
    {
        [Key]
        public decimal AWBID { get; set; }
        public string WAREHOUSE {set;get;}
        public string AWBNO { set; get; }
     //   public DateTime RECEIVED_DATETIME { set; get; }
        public int? BOOKED_PIECES { set; get; }
        public string RECEIVED_STATUS { set; get; }
        public string RECEIVED_DATETIME { set; get; }
        public int? RECEIVED_PIECES { set; get; }
        public string DEPARTED_STATUS { set; get; }
        public string DEPARTED_DATETIME { set; get; }
        public int? DEPARTED_PIECES { set; get; }
        public DateTime? CREATED_AT { set; get; }
        public DateTime? LAST_CHANGED_AT { set; get; }
        public DateTime? UPDATED_AT { set; get; }
        public DateTime? UPDATED_BOOKING { set; get; }
        public string WEIGHT { set; get; }
        public string SHC { set; get; }
        public string USER_ACTION { set; get; }
    }
}
