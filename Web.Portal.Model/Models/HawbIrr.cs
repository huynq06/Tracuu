using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("HawbIrr")]

    public class HawbIrr
    {
        public int ID { get; set; }
        public string AwbId { get; set; }
        public string HawbId { get; set; }

        public Nullable<bool> WeatherRain { get; set; }
        public Nullable<bool> WeatherDry { get; set; }
        public Nullable<bool> WeatherOther { get; set; }
        public string WeatherDes { get; set; }
        public Nullable<bool> IrrMsca { get; set; }
        public Nullable<bool> IrrCrushed { get; set; }
        public Nullable<bool> IrrTorn { get; set; }
        public Nullable<bool> IrrWet { get; set; }
        public Nullable<bool> IrrFdca { get; set; }
        public Nullable<bool> IrrLabel { get; set; }
        public Nullable<bool> IrrBroken { get; set; }
        public Nullable<bool> IrrHoled { get; set; }
        public Nullable<bool> IrrWithoutLabel { get; set; }
        public Nullable<bool> IrrOvcd { get; set; }
        public Nullable<bool> IrrOther { get; set; }
        public string IrrDes { get; set; }
        public Nullable<int> IrrPices { get; set; }
        public Nullable<double> IrrWeight { get; set; }
        public string ULD { get; set; }
        public Nullable<System.DateTime> Created { get; set; }
        public Nullable<int> HawbStatus { get; set; }
        public string HawbDes { get; set; }
        public Guid? AwbGuid { set; get; }
        public string HawbDamge { set; get; }
        public string Remark { set; get; }
        public string Prefix { set; get; }
        public string AWB { set; get; }
        public string Hawb { set; get; }
        public int? DameType { set; get; }
        public string IrrDetails { get; set; }
        public Nullable<bool> IrrRemarkMail { get; set; }
        public Nullable<bool> IrrRemarkCargoManifest { get; set; }
        public Nullable<bool> IrrRemarkNo { get; set; }
        public Nullable<bool> IrrRemarkOther { get; set; }
        public string IrrRemarkDes { get; set; }
        public string IrrRemark { get; set; }
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
        public Nullable<int> LAGI_MASTER_PIECES { get; set; }
        public string LAGI_MASTER_WEGIHT { get; set; }
        public string LAGI_MASTER_GOODS { get; set; }
        public string LAGI_REMARK { get; set; }
        public string Org { set; get; }
        public string Des { set; get; }
        public int? LagiMasterQuantityEx { set; get; }
        public string LagiMasterWeightEx { set; get; }
        public int? IrrTotalPices { set; get; }
        public double IrrTotalWeight { set; get; }
        public DateTime? AgenCreated { set; get; }
        public string IrrGroup { set; get; }
        public string Staff { set; get; }
        public string Supervisor { set; get; }
        public string FlightID { set; get; }
        public int? LAGI_QUANTITY_RECEIVED { set; get; }
        public string LAGI_WEIGHT_RECEIVED { set; get; }
        public int? LAGI_QUANTITY_EXPECTED { set; get; }
        public string LAGI_WEIGHT_EXPECTED { set; get; }
    }
}
