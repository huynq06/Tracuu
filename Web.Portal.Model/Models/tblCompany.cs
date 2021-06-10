using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Web.Portal.Model.Models
{
    [Table("tblCompany")]
    public class tblCompany
    {
        public int ID { set; get; }
        public string Name { set; get; }
    }
}
