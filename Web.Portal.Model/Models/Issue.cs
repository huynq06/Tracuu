using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("Issues")]
    public class Issue
    {
        public int id { set; get; }
        public string key { set; get; }
        public string self { set; get; }
        public string fields_summary { set; get; }
        public DateTime? fields_duedate { set; get; }
        public DateTime fields_created { set; get; }
        public string fields_reporter_displayName { set; get; }
        public string fields_issuetype_description { set; get; }
        public string fields_issuetype_name { set; get; }
        public string fields_status_name { set; get; }
        public int fields_status_id { set; get; }
        public string fields_status_statusCategory_name { set; get; }
        public int fields_status_statusCategory_id { set; get; }
    }
}
