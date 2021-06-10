using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class CargoSpecial
    {
        public string PREFIX { get; set; }
        public string MAWB { get; set; }
        public string HAWB { set; get; }
        public string TYPE { get; set; }
        public string POSITION { get; set; }
        public string GROUPID { get; set; }
        public string PIECES { set; get; }
        public string WEIGHT { set; get; }
        public string PIECES_RECEIVED { set; get; }
        public string WEIGHT_RECEIVED { set; get; }
        public string SHC { set; get; }
        public string ID { set; get; }
        public int SUM_PIECES_RECEIVED { set; get; }
        public double SUM_WEIGHT_RECEIVED { set; get; }
        public int check { set; get; }
    }
}
