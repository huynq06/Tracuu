using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("Issue_detail")]
    public class Issue_detail
    {
        public int id { set; get; }
        public string key { set; get; }
        public string self { set; get; }
        public string fields_fixVersions_name { set; get; }
        public DateTime? fields_lastViewed { set; get; }
        public string fields_priority_name { set; get; }
        public int? fields_priority_id { set; get; }
        public string fields_assignee_emailAddress { set; get; }
        public string fields_assignee_displayName { set; get; }
        public string fields_status_name { set; get; }
        public int fields_status_statusCategory_id { set; get; }
        public string fields_status_statusCategory_key { set; get; }
        public string fields_status_statusCategory_name { set; get; }
        public string fields_status_statusCategory_colorName { set; get; }
        public string fields_creator_name { set; get; }
        public string fields_creator_displayName { set; get; }
        public string fields_reporter_name { set; get; }
        public string fields_reporter_displayName { set; get; }
        public DateTime? fields_created { set; get; }
        public string fields_summary { set; get; }
        public DateTime? fields_duedate { set; get; }
        public string AWB { set; get; }
        public string Dest { set; get; }
        public string Booking { set; get; }
        public DateTime? CutOffTime { set; get; }
        public string Comment { set; get; }
        public DateTime? TimeTransition { set; get; }
        public DateTime? Created { set; get; }
        public int? SortValue { set; get; }
        public string FlightType { set; get; }
        public string pieces { set; get; }
        public string weight { set; get; }
        public int fields_status_id { set; get; }
    }
}
