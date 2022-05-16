using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class UserCardViewModel
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
        public int UserCardIndex { set; get; }
        public string UserCardID { set; get; }
        public DateTime? StartCardDate { set; get; }
        public DateTime? ExpiredDate { set; get; }
        public DateTime? ColectionDate { set; get; }
    }
}
