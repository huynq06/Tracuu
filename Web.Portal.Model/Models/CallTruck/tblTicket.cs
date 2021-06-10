using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Web.Portal.Model.Models
{
    [Table("tblTicket")]
    public class tblTicket
    {
        [Key]
        public int ID { get; set; }
        public string TicketName { get; set; }
        public string CardNumber { get; set; }
        public Nullable<int> TicketType { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> ExpiredDate { get; set; }
        public Nullable<int> CompanyID { get; set; }
        public Nullable<int> DepartmentID { get; set; }
        public string HoVaTen { get; set; }
        public string CMND { get; set; }
        public string DienThoai { get; set; }
        public string DiaChi { get; set; }
        public string ImagePath { get; set; }
        public string PlateNumber1 { get; set; }
        public string PlateNumber2 { get; set; }
        public Nullable<int> VehicleType { get; set; }
        public Nullable<int> TrongTaiID { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> StopDate { get; set; }
        public Nullable<int> DonGiaThang { get; set; }
        public string VehicleLabel { get; set; }
        public string VehicleColor { get; set; }
        public string VehicleDescription { get; set; }
        public Nullable<int> Status { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> LastTimeModified { get; set; }
        public string LastUserModified { get; set; }
        public Nullable<System.Guid> TicketID { get; set; }
        public Nullable<int> PrintStatus { get; set; }
        public string PrintQrCode { set; get; }
    }
}
