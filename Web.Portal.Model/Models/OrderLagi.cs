using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("OrderLagi")]
    public class OrderLagi
    {
        public int ID { set; get; }
        public Guid? OrderGuid { set; get; }
        public string Name { set; get; }
        public string AgentCode { set; get; }
        public DateTime? Created { set; get; }
        public DateTime? Modified { set; get; }
        public string Descritption { set; get; }
        public Guid? UserID { set; get; }
        public string TokenID { set; get; }
        public int? OrderStatus { set; get; }
    }
}
