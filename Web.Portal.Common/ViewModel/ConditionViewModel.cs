using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class ConditionViewModel
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
