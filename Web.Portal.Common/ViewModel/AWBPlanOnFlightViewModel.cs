using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class AWBPlanOnFlightViewModel
    {
        public string AWB { set; get; }
        public string PIECES_FWB { set; get; }
        public string WEIGHT_FWB { set; get; }
        public string PIECES_FFM { set; get; }
        public string WEIGHT_FFM { set; get; }
        public string PIECES_FHL { set; get; }
        public string WEIGHT_FHL { set; get; }
        public string Nature { set; get; }
        public string SHC { set; get; }
        public string Remark { set; get; }
        public string CheckCondition { set; get; }
        public string Note { set; get; }
        public string Lagi_Master_Ident { set; get; }
        public int LastAwb { get { return int.Parse(AWB.Substring(AWB.Length-1)); } }
    }
}
