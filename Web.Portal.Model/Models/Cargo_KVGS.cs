using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("CUSTOMSERVICE.CARGO_KVGS")]

    public class Cargo_KVGS
    {

        public string MESSAGEID { set; get; }
        public DateTime DEC_ISSUE { set; get; }
        public string EQ_TRANSPORTIDENTITY { set; get; }

        public string EQ_CARGOCTRLNO { set; get; }
        public int EQ_CARGOPIECE { set; get; }
        public double EQ_CARGOWEIGHT { set; get; }

        public string EQ_CUSTOMSREFERENCE { set; get; }
        public DateTime EQ_TIMEEXPORT { set; get; }
        public string EQ_CUSTOMSSTATUS { set; get; }
        public string EQ_ENTERPRISENAME { set; get; }
        public string EQ_MASTERBILLOFLADING { set; get; }
        public string EQ_HOUSEBILLOFLADING { set; get; }
        public DateTime? EQ_ARRIVALDEPARTURE { set; get; }
        public DateTime CREATED { set; get; }
    }
}
