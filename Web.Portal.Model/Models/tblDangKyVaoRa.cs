using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    [Table("tblDangKyVaoRa")]
    public class tblDangKyVaoRa
    {
        [Key]
        public System.Int64 ID { get; set; }
        public string BienSoXe { get; set; }
        public string TrongTai { get; set; }
        public Nullable<int> Floor { get; set; }
        public Nullable<int> TrangThai { get; set; }
        public Nullable<System.DateTime> NgayGioVao { get; set; }
        public Nullable<System.DateTime> NgayGioVaoThuc { get; set; }
        public Nullable<System.DateTime> NgayGioRa { get; set; }
        public string SyncID { set; get; }
        public string GhiChu { set; get; }
        public string TicketName { set; get; }
        public string HoVaTen { set; get; }
        public string CMND { set; get; }
        public int LoaiXe { set; get; }

    }
}
