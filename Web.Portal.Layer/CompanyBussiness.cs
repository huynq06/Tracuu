using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class CompanyBussiness
    {
        public int CompanyId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string IdNo { get; set; }
        public int Year { get; set; }        
        public DateTime? Created { get; set; }
        public int ParentId { get; set; }
        public string TypeDoc { get; set; }
        public string Description { get; set; }
        public  string CreatedName { get; set; }
        public  string TableContentOrder { get; set; }
    }
}
