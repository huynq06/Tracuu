using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("OrderLagiDetail")]
    public class OrderLagiDetail
    {
       public int ID {set;get;}
      public string Mawb {set;get;}
      public string Hawb {set;get;}
      public string LagiId {set;get;}
      public string Note {set;get;}
        public Guid? OrderID { set; get; }
        public bool? IsFavourite { set; get; }
    }
}
