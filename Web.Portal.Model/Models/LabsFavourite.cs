using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("LabsFavourite")]
    public class LabsFavourite
    {
        [Key]
        public int ID { set; get; }
        public string Lab_Ident { set; get; }
        public DateTime? Created { set; get; }
        public Guid? UserId { set; get; }
        public string TokenID { set; get; }
        public int? Lab_Status { set; get; }
        public string Description { set; get; }
        public bool IsSendNotification { set; get; }
        public bool? LabActive { set; get; }
    }
}
