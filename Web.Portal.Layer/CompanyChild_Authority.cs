using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
   public  class CompanyChild_Authority
    {
        public int Id { get; set; }
        public int CompanyChildId { get; set; }
        public int AuthorityTypeId { get; set; }
        public string Description { get; set; }
        public bool HasCheck { get; set; }
        public string AuthorityType { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool Visible { get; set; }
        public string TrangThai { get; set; }
        public string TableContentOrder { get; set; }
        public int Year { get; set; }



    }
}
