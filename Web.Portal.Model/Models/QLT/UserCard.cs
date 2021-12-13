using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models.QLT
{
    [Table("UserCard")]
    public class UserCard
    {
        public int ID { set; get; }
        public int? UserID { set; get; }
        public string UserCode { set; get; }
        public string UserCardID { set; get; }
        public DateTime? StartDate { set; get; }
        public DateTime? ExpiredDate { set; get; }
        public DateTime? ColectionDate { set; get; }
        public int? UserOrder { set; get; }
    }
}
