using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Portal.Model.Models
{
    [Table("tblDangKyGoiXe")]
    public class tblDangKyGoiXeV1
    {
        [Key]
        public int ID { get; set; }
        public string BienSoXe { get; set; }
        public string TrongTai { get; set; }
        public string LoHang { get; set; }
        public Nullable<int> LoaiHang { get; set; }
        public string TenLaiXe { get; set; }
        public string SoCMND { get; set; }
        public string DienThoai { get; set; }
        public Nullable<int> ViTri { get; set; }
        public Nullable<int> TrangThai { get; set; }
        public Nullable<System.DateTime> ThoiGianDangKy { get; set; }
        public Nullable<System.DateTime> ThoiGianVao { get; set; }
        public Nullable<System.DateTime> ThoiGianRa { get; set; }
        public string GhiChu { get; set; }
        public Nullable<bool> QueryStatus { get; set; }
        public Nullable<int> CallTruck { get; set; }
        public string Remark { get; set; }
        public Nullable<int> SortValue { get; set; }
    }
}
