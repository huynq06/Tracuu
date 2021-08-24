using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using Web.Portal.DataAccess;

namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KTX")]
    public class IssueManagementController : BaseController
    {
        IIssueService _issueService;
        IIssue_detailService _issueDetailService;
        IVCTService _iVctService;
        IFLightFlupService _flightService;
        public IssueManagementController(IIssueService issueService, IIssue_detailService issueDetailService, 
            IVCTService iVctService, IFLightFlupService flightService)
        {
            this._issueService = issueService;
            this._flightService = flightService;
            this._issueDetailService = issueDetailService;
            this._iVctService = iVctService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Edit(int? id)
        {
            //int? id = int.Parse(Request["id"]);
            //int check = int.Parse(Request["check"]);
            var vct = new VCT();
            if (id.HasValue && id.Value != 0)
                vct = _iVctService.GetByID(id.Value);
            return View(vct);
        }
        public ActionResult List(int id)
        {
            List<VCT> listVct = _iVctService.GetAllToday(id).ToList();
            ViewData["VCTList"] = listVct;
            if (id == 0)
                return View();
            else if (id == 1)
                return View("~/Views/IssueManagement/Dim.cshtml");
            else if (id == 2)
                return View("~/Views/IssueManagement/ScaleOne.cshtml");
            else
                return View("~/Views/IssueManagement/ScaleSecond.cshtml");
        }
        public ActionResult Dim(int id)
        {
            var vct = _iVctService.GetByID(id);
            vct.AWB_STATUS = 1;
            vct.LABS_DIM_AT = DateTime.Now;
            _iVctService.Update(vct);
            _iVctService.Save();
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;

            message = "LÔ HÀNG ĐÃ HOÀN THÀNH ĐO DIM!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Undo()
        {
            int? id = int.Parse(Request["id"]);
            var vct = _iVctService.GetByID(id.Value);
            vct.AWB_STATUS -= 1;
            vct.LABS_DIM_AT = null;
            _iVctService.Update(vct);
            _iVctService.Save();
          
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;

            message = "HOÀN TÁC THÀNH CÔNG!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Transfer()
        {
            int? id = int.Parse(Request["id"]);
            int value = int.Parse(Request["value"]);
            var vct = _iVctService.GetByID(id.Value);
            vct.LOCATION = value;
            vct.AWB_STATUS = 2;
            vct.LABS_PROCESS_AT = DateTime.Now;
            _iVctService.Update(vct);
            _iVctService.Save();
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
         
            message = "LÔ HÀNG ĐÃ CHUYỂN TỚI CÂN" + value.ToString() + "!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult TransferToScaleSecond()
        {
            int? id = int.Parse(Request["id"]);
            //int value = int.Parse(Request["value"]);
            var vct = _iVctService.GetByID(id.Value);
            vct.LOCATION = 2;
            vct.AWB_STATUS = 2;
            vct.LABS_PROCESS_AT = DateTime.Now;
            _iVctService.Update(vct);
            _iVctService.Save();
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;

            message = "LÔ HÀNG ĐÃ CHUYỂN TỚI CÂN" + 2.ToString() + "!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult TransferToScaleOne()
        {
            int? id = int.Parse(Request["id"]);
            //int value = int.Parse(Request["value"]);
            var vct = _iVctService.GetByID(id.Value);
            vct.LOCATION = 2;
            vct.AWB_STATUS = 2;
            vct.LABS_PROCESS_AT = DateTime.Now;
            _iVctService.Update(vct);
            _iVctService.Save();
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;

            message = "LÔ HÀNG ĐÃ CHUYỂN TỚI CÂN" + 1.ToString() + "!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Action(FormCollection formRequest)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
            var vct = new VCT();
            if (keyValue != 0)
            {
                vct = _iVctService.GetByID(keyValue);
            }
            string booking = Utils.Format.GetNullString(formRequest["booking"]);
            vct.BOOKING_FLIGHT = booking;
            string flup_ID = new CutOffTimeAccess().GetCutOffTimeByBooking(booking);
            if (!string.IsNullOrEmpty(flup_ID))
            {
                var flight = _flightService.GetByFlightID(flup_ID);
                vct.CutOffTime = flight.LAT;
            }
            //if (vct.BOOKING_FLIGHT != booking.Trim())
            //{
            //    //Lay lai cutofftime
            //    vct.BOOKING_FLIGHT = booking;
            //    string flup_ID = new CutOffTimeAccess().GetCutOffTimeByBooking(booking);
            //    if(!string.IsNullOrEmpty(flup_ID))
            //    {
            //        var flight = _flightService.GetByFlightID(flup_ID);
            //        vct.CutOffTime = flight.LAT;
            //    }
            //}
            // issueDetail.pieces = Utils.Format.GetNullString(formRequest["pieces"]);
            _iVctService.Update(vct);
            _issueDetailService.Save();
            message = "Đã sửa thông tin AWB thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddNote(int id)
        {
            var vctDB = _iVctService.GetByID(id);
           
            return View(vctDB);
        }
        public ActionResult AddNoteAction(FormCollection formRequest)
        {
            try
            {
                int uldID = int.Parse(formRequest["keyValue"]);

                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                var vctDB = _iVctService.GetByID(uldID);
                vctDB.Note = Utils.Format.GetNullString(formRequest["note"]);
                _iVctService.Update(vctDB);
                _iVctService.Save();
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.StackTrace, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult AWBConfirm()
        {
            return View();
        }
        public ActionResult AWBConfirmList()
        {
            List<VCT> listVct = _iVctService.GetConfirm().ToList();
            List<VCTConfirmViewModel> listVCTViewModels = new List<VCTConfirmViewModel>();
            if(listVct.Count > 0)
            {
                foreach (var item in listVct)
                {
                    if (listVCTViewModels.All(c => c.LABS_IDENT_NO != item.LABS_IDENT_NO))
                    {
                        VCTConfirmViewModel vct = new VCTConfirmViewModel();
                        vct.ID = item.ID;
                        vct.LABS_IDENT_NO = item.LABS_IDENT_NO;
                        vct.LABS_AWB = item.LABS_AWB;
                        vct.BOOKING_FLIGHT = item.BOOKING_FLIGHT;
                        vct.LABS_CONFIRMED_AT = item.LABS_CONFIRMED_AT;
                        vct.TimeFromConfirm = (int)Math.Round((DateTime.Now - vct.LABS_CONFIRMED_AT.Value).TotalMinutes, 0);
                        listVCTViewModels.Add(vct);
                    }
                  
            }
            }
          
            ViewData["VCTList"] = listVCTViewModels;
            return View();
        }
        public ActionResult ActionConfrim(int id)
        {
            var vct = _iVctService.GetByID(id);
            vct.ConfirmStatus = 2;
            vct.LABS_ASIGNED_AT = DateTime.Now;
            _iVctService.Update(vct);
            _iVctService.Save();
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;

            message = "LÔ HÀNG ĐÃ HOÀN THÀNH KÝ XÁC NHẬN!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
    }
}
