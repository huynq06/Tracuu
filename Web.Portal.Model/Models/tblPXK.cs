using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model
{
    [Table("tblPXK")]
    public class tblPXK
    {
        public int ID { set; get; }
        public string PXK { set; get; }
        public string VCT { set; get; }
        public DateTime? Created { set; get; }
        public string AWB { set; get; }
        public string Hawb { set; get; }
        public double? Pieces { set; get; }
        public double? Weight { set; get; }
        public int Status { set; get; }
        public string Note { set; get; }
        public int? GroupNumer { set; get; }
        public string UserName { set; get; }
        public DateTime? SOP { set; get; }
        public DateTime? Finish { set; get; }
    }
}
