using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Layer
{
    public class ImpAWB
    {
        public Int64 ID { get; set; }
        public string FlightNo { get; set; }
        public DateTime? FlightDate { get; set; }
        public string ATATIME { get; set; }
        public string Prefix { get; set; }
        public string ORGIN { get; set; }
        public string LOADING { get; set; }
        public string DEST { get; set; }
        public string AWB { get; set; }
        public string HAWB { get; set; }
        public string Agent { get; set;  }
        public string AgentCode { get; set; }
        public string Shipper { get; set; }
        public string ShipperADDR { get; set; }
        public string Consignee { get; set; }
        public string ConsignADDR { get; set; }
        public string QuantityExpected { get; set; }
        public string WeightExpected { get; set; }
        public string QuantityReceived { get; set; }
        public string WeightReceived { get; set; }
        public string QuantityDelivered { get; set; }
        public string WareHouse { get; set; }
        public DateTime? DateIn { get; set; }
        public DateTime? DateOut { get; set; }
        public DateTime? DateStatus { get; set; }
        public string GoodsContent { get; set; }
        public string Remarks { get; set; }
        public string ScheTime { get; set; }
        public DateTime? AgenCreated { get; set; }
        public string Location { set; get; }
        public string GroupNO { set; get; }
        public string SDD { set; get; }
        public string STK { set; get; }
        public string GOODSNATURE { set; get; }
        public string Msg { set; get; }
        public int PiecesIrr { set; get; }
        public double WeightIrr { set; get; }
        public int LAGI_MASTER_PIECES { set; get; }
        public string LAGI_MASTER_WEGIHT { set; get; }
        public string LAGI_MASTER_GOODS { set; get; }
        public string LAGI_REMARK { set; get; }
        public string FlightID { set; get; }
        public string GroupNo { set; get; }
        public string ULD { set; get; }
        public int LAGI_MASTER_QUANTITY_EX { set; get; }
        public string LAGI_MASTER_WEIGHT_EX { set; get; }
        public string LAGI_MASTER_ID { set; get; }
        public string LAGI_ORIGIN { set; get; }
        public string LAGI_DES { set; get; }


    }
}
