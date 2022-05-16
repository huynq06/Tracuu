using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Web.Portal.Model.Models.QLT
{
    [Table("User")]
    public class User
    {
        public int ID { set; get; }
        public string UserID { set; get; }
        public string UserName { set; get; }
        public DateTime? Dob { set; get; }
        public int OrganizationID { set; get; }
        public string OrganizationName { set; get; }
        public string Title { set; get; }
        public DateTime? StartDate { set; get; }
        public DateTime? EndDate { set; get; }
        public int? UserStatus { set; get; }
        public bool? UserActive { set; get; }
        public DateTime? CreatedDate { set; get; }
        public string CMT { set; get; }
        public string SDT { set; get; }
    }
}
