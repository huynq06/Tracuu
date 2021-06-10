using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("Print")]
    public class Print
    {
        //     ,[PrintIns]
        //,[PrintType]
        //,[PrintRetry]
        //,[PrintUser]
        //,[Created]
        //,[ThreadInstance]
        //,[Status]
        //,[MessageLog]
        //,[PrintLink]
        //,[PrintShareLink]
        //,[GroupName]
        //,[Copy]
        public int ID { set; get; }
        public string PrintIns { set; get; }
        public string PrintType { set; get; }
        public int? PrintRetry { set; get; }
        public string PrintUser { set; get; }
        public DateTime? Created { set; get; }
        public bool Status { set; get; }
        public string PrintLink { set; get; }
    }
}
