using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("tblMission")]
    public class tblMission
    {
        public int ID { set; get; }
        public int GroupID { set; get; }
        public string MissionName { set; get; }
        public string StaffName { set; get; }
        public DateTime? StartTime { set; get; }
        public DateTime? FinishTime { set; get; }
        public string Note { set; get; }
        public DateTime? Created { set; get; }
        public string GroupName { set; get; }
        public string CaLV { set; get; }
        public string Location { set; get; }
    }
}
