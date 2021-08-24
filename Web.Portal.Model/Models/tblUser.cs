using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("tblUser")]
    public class tblUser
    {
        public int ID { set; get; }
        public string Name { set; get; }
        public string Logins { set; get; }
        public string Passwords { set; get; }
        public int Levels { set; get; }
        public string Description { set; get; }
}
}
