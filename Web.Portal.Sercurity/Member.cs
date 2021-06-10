using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Sercurity
{
    public class Member
    {
        public int MemberId { get; set; }
        public int UserId { get; set; }

        public string UserName { get; set; }
        public string Code { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public int GroupId { get; set; }
        public string Avatar { get; set; }
        public string Rank { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
    }
}
