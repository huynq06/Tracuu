using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("CUSTOMSERVICE.CARGO_OUT")]
    public class CARGO_OUT
    {
        public string TEQUIP_CARGOCTRLNO { set; get; }

        public DateTime CREATED { set; get; }
    }
}
