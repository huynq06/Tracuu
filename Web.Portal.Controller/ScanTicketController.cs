using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using System.Web.Mvc;
using Web.Portal.Common;
using Web.Portal.Common.ViewModel;
using System.Web.Script.Serialization;
using System.Xml.Linq;
using Web.Portal.DataAccess;
using Web.Portal.Common.ApiViewModel;
using System.IO;
namespace Web.Portal.Controller
{
    public class ScanTicketController : GuestController
    {
        IDangKyGoiXeService _dkgxService;
        IDangKyVaoRaService _dkvrService;
        ILocationConfigService _locationService;
        public ScanTicketController(IDangKyGoiXeService dkgxService, IDangKyVaoRaService dkvrService, ILocationConfigService locationService)
        {
            this._dkgxService = dkgxService;
            this._dkvrService = dkvrService;
            this._locationService = locationService;
        }
        public ActionResult In()
        {
            return View();
        }
        public ActionResult ActionIn(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                string syn_id = formRequest["syncid"].ToString().Trim();
                tblDangKyVaoRa item = _dkvrService.GetByGuid(syn_id);
                if (item.GhiChu == "HH")
                {
                    message = "VÉ XE ĐÃ ĐƯỢC XÁC NHẬN VÀO!";
                    return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                }
                item.NgayGioVaoThuc = DateTime.Now;
                item.GhiChu = "HH";
                _dkvrService.Update(item);
                _dkvrService.Subbmit(); 
                message = "CẬP NHẬT GIỜ VÀO XE " + item.BienSoXe + " THÀNH CÔNG!";
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.StackTrace, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Out()
        {
            return View();
        }
    }
}
