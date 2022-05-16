using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class UldControlViewModel
    {
        public string ID { set; get; }
        public string LagiMasterID { set; get; }
        public string ULD { set; get; }
        public string Mawb { set; get; }
        public string Hawb { set; get; }
        public string GroupNo { set; get; }
        public string Location { set; get; }
        public int PiecesReceived { set; get; }
        public int PiecesFFM { set; get; }
        public string Compare { set; get; }
        public int TotalPices { set; get; }
        public bool Check { set; get; }
        public DateTime? Created { set; get; }
        public string LocationULD { set; get; }
        public string Result { set; get; }
        public int TotalPiecesHawb { set; get; }
        
    }
}
