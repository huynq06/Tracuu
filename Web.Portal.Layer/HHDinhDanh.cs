using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class HHDinhDanh
    {
        public Int64 ID { get; set; }
        public string MessageId { get; set; }
        public string PathFile { get; set; }
        public string Dec_Issuer { get; set; }
        public string Dec_Reference { get; set; }
        public DateTime? Dec_Issue { get; set; }
        public int Dec_Function { get; set; }
        public string Cus_Name { get; set; }
        public string Cus_Identity { get; set; }
        public string Port_Name { get; set; }
        public string Port_Identity { get; set; }
        public string Te_TransportIdentity { get; set; }
        public DateTime? Te_ArrivalDeparture { get; set; }
        public string Te_HouseBillOfLading { get; set; }
        public string Te_MasterBillOfLading { get; set; }
        public string Te_CargoCtrlNo { get; set; }
        public int Te_CargoPiece { get; set; }
        public string Te_PieceUnitCode { get; set; }
        public DateTime? Created { get; set; }
    }
}
