using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("Condition")]
    public class Condition
    {
        public int ID { set; get; }
        public string name { set; get; }
        public bool @checked { set; get; }
        public bool mandatory { set; get; }
        public bool option { set; get; }
        public int id_condittion { set; get; }
        public int rank { set; get; }
        public int issue_id { set; get; }
        public string issue_key { set; get; }
   
    }
}
