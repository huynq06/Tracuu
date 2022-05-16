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
    public class FindAwbExportController : GuestController
    {
        ILabService _labService;
        IAwbLogService _awbLogSerivce;
        public FindAwbExportController(ILabService labService,IAwbLogService awbLogService)
        {
            this._awbLogSerivce = awbLogService;
            this._labService = labService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetListLabsByName(string dataViewModel)
        {
            var data = new JavaScriptSerializer().Deserialize<LabsAutoCompleteViewModel>(dataViewModel);
            //string data = Request["name"].Trim();
            var model = _labService.GetGetByName(data.Keyword,DateTime.Now.AddDays(-15));
            return Json(new
            {
                data = model
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult List()
        {
            string id = Request["awb"];
          //  string id = labs.Split('/')[1].ToString();
            List<FindAwbAwbExportViewModel> listAwbAccess = new ExpAWBAccess().GetDetailAwb(id);
            FindAwbAwbExportViewModel awb = new FindAwbAwbExportViewModel();
            awb.Remark = "";
            if (listAwbAccess.Count > 0) {
                awb.Lab_Idents = id;
                awb.AWB = listAwbAccess[0].AWB;
                awb.Quantity = listAwbAccess[0].Quantity;
                awb.Weight = listAwbAccess[0].Weight;
                awb.RemainQuantity = listAwbAccess[0].RemainQuantity;
                awb.RemainWeigth = listAwbAccess[0].RemainWeigth;
                awb.Warning = "";
                awb.Position = "";
                awb.Dest = listAwbAccess[0].Dest;
              //  awb.Notify = "";
            
                //awb.Warning = "LÔ HÀNG CHƯA ĐƯỢC SET VỊ TRÍ";
                awb.Booking = listAwbAccess[0].Booking;
                if (new AWBDetailExportAccess().CheckCompleteAWB(id))
                    awb.Status = "OK";
                else
                    awb.Status = "PENDING";
                AwbLog awbLog = _awbLogSerivce.GetByLabs_Idents(id);
                if (awb.RemainQuantity == 0)
                    awb.Remark = "HÀNG ĐÃ LOAD HẾT LÊN MÂM";
                if (awbLog != null)
                {
                    awb.Remark = awbLog.Remark;
                }
              
            }

            // awb.Quantity = ListAwb.Count > 0 ? ListAwb[0].Quantity : "";
            foreach (var item in listAwbAccess)
            {
                if (item.Position != "EDR" && item.Position != "ESW" && item.Position != "EBL" && !awb.Position.Contains(item.Position))
                {
                    awb.Position = awb.Position + item.Position + ",";
                }
            }
            awb.Remark = awb.Remark.Trim(',');
            return View(awb);
        } 
        public ActionResult Save(string awbViewModel)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            var AwbLogViewModel = new JavaScriptSerializer().Deserialize<AwbLogViewModel>(awbViewModel);
            try
            {

                AwbLog awb = _awbLogSerivce.GetByLabs_Idents(AwbLogViewModel.Labs_Idents);
                if (awb == null)
                {
                    awb = new AwbLog();
                    awb.Lab_Idents = AwbLogViewModel.Labs_Idents;
                    awb.Remark = AwbLogViewModel.Note.ToUpper();
                    awb.Created = DateTime.Now;
                    _awbLogSerivce.Add(awb);
                }
                else
                {
                    awb.Remark = AwbLogViewModel.Note.ToUpper();
                    awb.Modified = DateTime.Now;
                    _awbLogSerivce.Update(awb);
                }
                _awbLogSerivce.Save();
                message = "Đã xử lý thông tin thành công!";
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                 messageType = Utils.DisplayMessage.MessageError;
                return Json(new { Type = messageType, Message = ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                throw;
            }
        }
    }
   
}
