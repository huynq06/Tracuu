using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class CompanyChild
    {
        public int CompanyChildId { get; set; }
        public int CompanyId { get; set; }
        public int ParentId { get; set; }        
        public string TypeDoc { get; set; }
        public string Description { get; set; }
        public int Year { get; set; }
        public DateTime? Created { get; set; }
        public string CreatedName { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
