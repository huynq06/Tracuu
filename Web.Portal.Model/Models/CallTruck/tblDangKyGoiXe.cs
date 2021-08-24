using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model
{
    [Table("tblDangKyGoiXe")]
    public class tblDangKyGoiXe
    {
        public int ID { set; get; }
        public string BienSoXe { set; get; }
        public string TrongTai { set; get; }
        public string LoHang { set; get; }
        public int? LoaiHang { set; get; }
        public string TenLaiXe { set; get; }
        public string SoCMND { set; get; }
        public int? ViTri { set; get; }
        public int? TrangThai { set; get; }
        public DateTime? ThoiGianDangKy { set; get; }
        public DateTime? ThoiGianVao { set; get; }
        public DateTime? ThoiGianRa { set; get; }
        public string GhiChu { set; get; }
        public string DienThoai { set; get; }
        public bool? QueryStatus { set; get; }
       public int? CallTruck { set; get; }
        public int? SortValue { set; get; }
        public string Remark { set; get; }
        public string UserName { set; get; }
        public string Note { set; get; }
        public DateTime? GioGoi { set; get; }
        public Guid? SynID { set; get; }
        public int TruckStatus { set; get; }

    }
}
    