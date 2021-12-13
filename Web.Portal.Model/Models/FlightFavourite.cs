using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("FlightFavourite")]
    public class FlightFavourite
    {
      public int ID {set;get;}
      public string FlightID {set;get;}
      public DateTime? Created {set;get;}
      public Guid? UserID {set;get;}
      public string TokenID {set;get;}
      public int? FlightStatus {set;get;}
      public string Description {set;get;}
      public bool IsSendNotification {set;get;}
        public bool? FlightActive { set; get; }
    }
}
