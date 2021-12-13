using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("AwbIrr")]
    public  class AwbIrr
    {
        public int ID { get; set; }
        public string AwbID { get; set; }
        public string FlightID { get; set; }
        public string Prefix { get; set; }
        public string AWB { get; set; }
        public string HAWB { get; set; }
        public string GoodsContent { get; set; }
        public string Agent { get; set; }
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
        public Nullable<System.DateTime> DateStatus { get; set; }
        public Nullable<System.DateTime> DateOut { get; set; }
        public string Remarks { get; set; }
        public Nullable<System.DateTime> AgenCreated { get; set; }
        public string Location { get; set; }
        public string GOODSNATURE { get; set; }
        public string GroupNo { get; set; }
        public Nullable<int> LAGI_MASTER_PIECES { get; set; }
        public string LAGI_MASTER_WEGIHT { get; set; }
        public string LAGI_MASTER_GOODS { get; set; }
        public string LAGI_REMARK { get; set; }
        public string ULD { get; set; }
        public Nullable<bool> WeatherRain { get; set; }
        public Nullable<bool> WeatherDry { get; set; }
        public Nullable<bool> WeatherOther { get; set; }
        public string WeatherDes { get; set; }
        public Nullable<bool> IrrMsca { get; set; }
        public Nullable<bool> IrrCrushed { get; set; }
        public Nullable<bool> IrrTorn { get; set; }
        public Nullable<bool> IrrWet { get; set; }
        public Nullable<bool> IrrFdca { get; set; }
        public Nullable<bool> IrrHoled { get; set; }
        public Nullable<bool> IrrBroken { get; set; }
        public Nullable<bool> IrrLabel { get; set; }
        public Nullable<bool> IrrOvcd { get; set; }
        public Nullable<bool> IrrOther { get; set; }
        public string IrrDes { get; set; }
        public string IrrDetails { get; set; }
        public Nullable<bool> IrrRemarkMail { get; set; }
        public Nullable<bool> IrrRemarkCargoManifest { get; set; }
        public Nullable<bool> IrrRemarkNo { get; set; }
        public Nullable<bool> IrrRemarkOther { get; set; }
        public string IrrRemarkDes { get; set; }
        public Nullable<bool> IrrActionStrapped { get; set; }
        public Nullable<bool> IrrActionRetaped { get; set; }
        public Nullable<bool> IrrActionRepacked { get; set; }
        public Nullable<bool> IrrActionNo { get; set; }
        public Nullable<bool> IrrActionPhotoYes { get; set; }
        public Nullable<bool> IrrActionPhotoNo { get; set; }
        public Nullable<bool> IrrCustomsSealedYes { get; set; }
        public Nullable<bool> IrrCustomsSealedNo { get; set; }
        public Nullable<bool> IrrTimeReceiving { get; set; }
        public Nullable<bool> IrrTimeDuringULDBreakDown { get; set; }
        public Nullable<bool> IrrTimeDuringStorage { get; set; }
        public Nullable<bool> IrrTimeDuringDelivery { get; set; }
        public Nullable<bool> IrrTimeOther { get; set; }
        public string IrrTimeDes { get; set; }
        public Nullable<bool> IrrCauseUnknown { get; set; }
        public string IrrCauseDes { get; set; }
        public Nullable<int> AwbStatus { get; set; }
        public Nullable<System.DateTime> AwbIrrCreared { get; set; }
        public string AwbIrrDes { get; set; }
        public Guid? AwbGuid { set; get; }
        public int? IrrPieces { set; get; }
        public string IrrWeight { set; get; }
        public string IrrDameType { set; get; }
        public string IrrRemark { set; get; }
        public string Org { set; get; }
        public string Des { set; get; }
        public int? LagiMasterQuantityEx { set; get; }
        public string LagiMasterWeightEx { set; get; }
        public string LagiMasterId { set; get; }
        public int AwbMaster { set; get; }
    }
}
