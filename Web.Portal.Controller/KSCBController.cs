using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using Web.Portal.Common;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using Web.Portal.DataAccess;
using System.Web.Script.Serialization;
using MoralesLarios.Linq;
using QRCoder;
using System.Drawing;
using System.IO;
using Web.Portal.Upload;
using System.Text;

namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KTN")]
    public class KSCBController : BaseController
    {
        IFlightService _flightService;
        IULDByFlightService _uldByFlightService;
        ILocationService _locationService;
        IULD_TYPEService _uld_TypeService;
        IFlightConfigService _flightConfigService;
        ItblMissionService _missionService;
        private DateTime? fromDate;
        private DateTime? toDate;
        public KSCBController(IFlightService flightService, IULDByFlightService uldByFlightService,
            ILocationService locationService, IULD_TYPEService uld_TypeService, IFlightConfigService flightConfigService, ItblMissionService missionService)
        {
            this._flightService = flightService;
            this._uldByFlightService = uldByFlightService;
            this._locationService = locationService;
            this._uld_TypeService = uld_TypeService;
            this._flightConfigService = flightConfigService;
            this._missionService = missionService;
        }
        public ActionResult Index()
        {
            //int count = _flightService.GetAll().ToList().Count;

            return View();
        }
        public ActionResult List()
        {

            //int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            //int pageSize = string.IsNullOrEmpty(Request["ps"]) ? 10 : Convert.ToInt32(Request["ps"]);
            //string code = string.IsNullOrEmpty(Request["code"]) ? string.Empty : Request["code"].Trim();
            //IList<ULDByFlight> uldList = _uldByFlightService.GetListPaging(page,
            //                                                                  pageSize,
            //                                                                  code,
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            //                                                                  ref total);
            List<FlightViewModel> listFlightViewModel = new List<FlightViewModel>();
            var listFlight = _flightService.GetAll().Where(c => c.Status == false).ToList();
            //var listFlight = _flightService.GetAllByDate(fromDate.Value, toDate.Value.AddDays(1)).Where(c => c.Status == false).ToList();
            foreach (var flight in listFlight)
            {
                FlightViewModel flightViewModel = new FlightViewModel();
                flightViewModel.FlightID = flight.FlightID;
                flightViewModel.ULDTotal = _uldByFlightService.TotalULDByFlight(flight.FlightID);
                flightViewModel.ULDProcessing = _uldByFlightService.ProcessingULDByFlight(flight.FlightID);
                flightViewModel.ULDRemain = _uldByFlightService.RemainULDByFlight(flight.FlightID);
                flightViewModel.ULDFinish = _uldByFlightService.FinishtULDByFlight(flight.FlightID);
                listFlightViewModel.Add(flightViewModel);
            }
            ViewData["ListFlightViewModel"] = listFlightViewModel;
            ViewData["ListFlight"] = _flightService.GetAll().Where(c => c.Status == false).ToList();

            //ViewData["ListULDByFlight"] = uldList.ToList();
            //ViewBag.TotalRecord = total;
            //// ViewBag.Status = status;
            //ViewBag.PageCurrent = (page - 1) * pageSize;
            //ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingsgn", total, page, pageSize);
            return View();
        }
        public ActionResult UldList()
        {
            int total = 0;
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            //                                                                  ref total);
            var listFlight = _flightService.GetAllByDate(fromDate.Value, toDate.Value.AddDays(1)).Where(c => c.Status == false).ToList();
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? 10 : Convert.ToInt32(Request["ps"]);
            string code = string.IsNullOrEmpty(Request["code"]) ? string.Empty : Request["code"].Trim();
            IList<ULDByFlight> uldList = _uldByFlightService.GetListPaging(listFlight, page,
                                                                              pageSize,
                                                                              code,
                                                                              ref total);
            ViewData["ListULDByFlight"] = uldList.ToList();
            ViewBag.TotalRecord = total;
            // ViewBag.Status = status;
            ViewBag.PageCurrent = (page - 1) * pageSize;
            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingsgn", total, page, pageSize);
            return View();
        }
        public ActionResult LocationList()
        {
            var listLocation = _locationService.GetAll().Where(c => c.ID != 13 && c.ID !=14);
            var listFlight = _flightService.GetAll().Where(c => c.Status == false).ToList();
            var listULDProcess = _uldByFlightService.GetListULDProcessing();
            var listULDType = _uld_TypeService.GetAll();
            List<ULDViewModel> listULDViewModel = (from uld in listULDProcess
                                                   join uldTpye in listULDType on uld.ULD_TYPE equals uldTpye.ID
                                                   join flight in listFlight on uld.Flight_ID equals flight.FlightID
                                                   select new ULDViewModel
                                                   {
                                                       UldID = uld.ID,
                                                       Flight_ID = uld.Flight_ID,
                                                       ULDName = uld.Name,
                                                       Status = uld.Status,
                                                       StatusMessage = uld.StatusMessage,
                                                       FlightNumber = uld.FlightNumber,
                                                       ULDType = uldTpye.Name,
                                                       StartTime = uld.StartTime.Value,
                                                       NotifyMessage = uld.NotifyMessage,
                                                       Note = uld.Note,
                                                       LocationID = uld.LocationID.Value,
                                                       UldOperation = uldTpye.TimeOperation,
                                                       UldNotify = uldTpye.TimeNotify.Value,
                                                       FlightNUmber = flight.FlightNumber,
                                                   }).ToList();
            List<LocationViewModel> listLocationViewModel = listLocation.ToList().LeftJoin(                    /// Source Collection  
                    listULDViewModel,                        /// Inner Collection  
                    p => p.LocationID,                                /// PK  
                    a => a.LocationID,                                /// FK  
                    (p, a) => new { MyLocation = p, MyULD = a })   /// Result Collection  
                    .Select(a => new LocationViewModel
                    {
                        LocationID = a.MyLocation.LocationID,
                        LocationName = a.MyLocation.LocationName,
                        ULDName = a.MyULD != null ? a.MyULD.ULDName : "",
                        UldID = a.MyULD != null ? a.MyULD.UldID : 0,
                        FlightID = a.MyULD != null ? a.MyULD.Flight_ID : Guid.Empty,
                        ULDType = a.MyULD != null ? a.MyULD.ULDType : "",
                        UldOperation = a.MyULD != null ? a.MyULD.UldOperation : 0,
                        UldNotify = a.MyULD != null ? a.MyULD.UldNotify : 0,
                        StartTime = a.MyULD != null ? a.MyULD.StartTime.Value : DateTime.MinValue,
                        FlightNumber = a.MyULD != null ? a.MyULD.FlightNumber : "",
                        Status = a.MyULD != null ? a.MyULD.Status : 0
                    }).ToList();
            int count = listLocationViewModel.Count();
            ViewData["ListLocation"] = listLocationViewModel;
            return View();
        }
        public ActionResult Flightasign(Guid id)
        {
            var flight = _flightService.GetById(id);
            ViewData["ULD_TYPEList"] = _uld_TypeService.GetAll().OrderBy(c=>c.STT).ToList();
            ViewData["LocationList"] = _locationService.GetLocationFree().ToList(); ;
            return View(flight);
        }

        public JsonResult GetListULDByName(string dataViewModel)
        {
            var data = new JavaScriptSerializer().Deserialize<Web.Portal.Common.ViewModel.DataViewModel>(dataViewModel);
            var model = _uldByFlightService.GetListULDByName(data.keyWord, data.ID);
            return Json(new
            {
                data = model
            }, JsonRequestBehavior.AllowGet);
        }
        [ValidateInput(true)]
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {
                Guid flightID = Guid.Parse(formRequest["keyValue"]);

                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                var ULDByFlightObject = new ULDByFlight();
                ULDByFlightObject.Name = Utils.Format.GetNullString(formRequest["barCode"]);
                ULDByFlightObject.Warning = Utils.Format.GetNullBoolean(formRequest["warning"]);
                ULDByFlightObject.Note = Utils.Format.GetNullString(formRequest["note"]);
                ULDByFlightObject.LocationID = Utils.Format.GetNullInteger(formRequest["locationID"]);
                ULDByFlightObject.ULD_TYPE = Utils.Format.GetNullInteger(formRequest["uld_typeID"]);
                ULDByFlightObject.StartTime = DateTime.Now;
                //Khoa location
                //Update trang thai

                var uldByFlightDB = _uldByFlightService.GetByCondtion(ULDByFlightObject.Name.Trim(), flightID);

                if (uldByFlightDB != null)
                {
                    if (uldByFlightDB.Status != 0)
                    {
                        message = "ULD ĐÃ ĐƯỢC XỬ LÝ";
                        messageType = Utils.DisplayMessage.TypeError;
                        return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        if (ULDByFlightObject.ULD_TYPE.Value == 5 || ULDByFlightObject.ULD_TYPE.Value == 6)
                        {
                            if (ULDByFlightObject.LocationID != 13 && ULDByFlightObject.LocationID != 14)
                            {
                                message = "KHÔNG THỂ MOVE MÂM ULD QL/ICR ĐẾN VỊ TRÍ BREAKDOWN";
                                messageType = Utils.DisplayMessage.TypeError;
                                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                            }
                            uldByFlightDB.Status = CommonConstants.FinishProcess;
                            uldByFlightDB.LocationID = ULDByFlightObject.LocationID;
                            uldByFlightDB.Note = ULDByFlightObject.Note;
                            uldByFlightDB.ULD_TYPE = ULDByFlightObject.ULD_TYPE;
                            uldByFlightDB.StartTime = ULDByFlightObject.StartTime;
                            uldByFlightDB.FinishTime = ULDByFlightObject.StartTime;
                            uldByFlightDB.NotifyID = CommonConstants.NotifyStart;
                            //uldByFlightDB.NotifyMessage = CommonConstants.NotifyStartMessage;
                            uldByFlightDB.StatusMessage = CommonConstants.StatusFinish;
                            uldByFlightDB.Priority = 0;
                            _uldByFlightService.Update(uldByFlightDB);
                            _uldByFlightService.Save();
                        }
                        else if (ULDByFlightObject.ULD_TYPE.Value == 7)
                        {
                            if (ULDByFlightObject.LocationID == 13 || ULDByFlightObject.LocationID == 14)
                            {
                                message = "VUI LÒNG CHỌN LOẠI ULD QL/ICR ĐỂ MOVE ĐẾN VỊ TRÍ QL/ICR";
                                messageType = Utils.DisplayMessage.TypeError;
                                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                            }
                            //kiem tra xe vi tri duoc gan da co uld nao chua
                            if (_uldByFlightService.CheckExist(ULDByFlightObject.LocationID.Value))
                            {
                                _locationService.LockLocation(ULDByFlightObject.LocationID.Value);
                            }
                            uldByFlightDB.Status = CommonConstants.StartProcess;
                            uldByFlightDB.LocationID = ULDByFlightObject.LocationID;
                            uldByFlightDB.Note = ULDByFlightObject.Note;
                            uldByFlightDB.ULD_TYPE = ULDByFlightObject.ULD_TYPE;
                            uldByFlightDB.StartTime = ULDByFlightObject.StartTime;
                            uldByFlightDB.NotifyID = CommonConstants.NotifyStart;
                            uldByFlightDB.StatusMessage = CommonConstants.StatusStart;
                            uldByFlightDB.Priority = 2;
                            _uldByFlightService.Update(uldByFlightDB);
                            _uldByFlightService.Save();
                        }
                        else
                        {
                            if (_uldByFlightService.CheckExist(ULDByFlightObject.LocationID.Value))
                            {
                                message = "KHÔNG THỂ MOVE ĐẾN VỊ TRÍ ĐÃ CÓ MÂM AKE";
                                messageType = Utils.DisplayMessage.TypeError;
                                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                            }
                            if (ULDByFlightObject.LocationID == 13 || ULDByFlightObject.LocationID == 14)
                            {
                                message = "VUI LÒNG CHỌN LOẠI ULD QL/ICR ĐỂ MOVE ĐẾN VỊ TRÍ QL/ICR";
                                messageType = Utils.DisplayMessage.TypeError;
                                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                            }
                            uldByFlightDB.Status = CommonConstants.StartProcess;
                            uldByFlightDB.LocationID = ULDByFlightObject.LocationID;
                            uldByFlightDB.Note = ULDByFlightObject.Note;
                            uldByFlightDB.ULD_TYPE = ULDByFlightObject.ULD_TYPE;
                            uldByFlightDB.StartTime = ULDByFlightObject.StartTime;
                            uldByFlightDB.NotifyID = CommonConstants.NotifyStart;
                            //uldByFlightDB.NotifyMessage = CommonConstants.NotifyStartMessage;
                            uldByFlightDB.StatusMessage = CommonConstants.StatusStart;
                            uldByFlightDB.Priority = 2;
                            _locationService.LockLocation(ULDByFlightObject.LocationID.Value);
                            _uldByFlightService.Update(uldByFlightDB);
                            _uldByFlightService.Save();
                        }
                        message = "MOVE BARCODE THÀNH CÔNG";
                        //IronBarCode.BarcodeWriter.CreateBarcode(ReportItem.Code,
                        // BarcodeWriterEncoding.Code128).SaveAsJpeg(Server.MapPath("/Files/BarCode/"+ReportItem.Code+".jpg"));
                        return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                    }


                }

                else
                {
                    message = "KHÔNG TỒN TẠI ULD";
                    messageType = Utils.DisplayMessage.TypeError;
                    return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.StackTrace, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Export()
        {
            return View();
        }
        public ActionResult ExportList()
        {
            //string code = Guid.NewGuid().ToString();

            //QRCodeGenerator qrGenerator = new QRCodeGenerator();
            //QRCodeData data = qrGenerator.CreateQrCode(code, QRCodeGenerator.ECCLevel.Q);
            //QRCode qrCode = new QRCode(data);

            //System.Web.UI.WebControls.Image imgBarCode = new System.Web.UI.WebControls.Image();
            //imgBarCode.Height = 50;
            //imgBarCode.Width = 50;
            //using (Bitmap bitMap = qrCode.GetGraphic(5))
            //{
            //    using (MemoryStream ms = new MemoryStream())
            //    {
            //        bitMap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
            //        byte[] byteImage = ms.ToArray();
            //        imgBarCode.ImageUrl = "data:image/png;base64," + Convert.ToBase64String(byteImage);
            //    }
            //    ViewBag.ImageData = imgBarCode.ImageUrl;
            //}
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            //                                                                  ref total);
            List<FlightViewModel> listFlightViewModel = new List<FlightViewModel>();
            // var listFlight = _flightService.GetAll().Where(c => c.Status == false).ToList();
            var listFlight = _flightService.GetAllByDate(fromDate.Value, toDate.Value.AddDays(1)).ToList();
            foreach (var flight in listFlight)
            {
                FlightViewModel flightViewModel = new FlightViewModel();
                flightViewModel.FlightID = flight.FlightID;
                flightViewModel.ULDTotal = _uldByFlightService.TotalULDByFlight(flight.FlightID);
                flightViewModel.ULDProcessing = _uldByFlightService.ProcessingULDByFlight(flight.FlightID);
                flightViewModel.ULDRemain = _uldByFlightService.RemainULDByFlight(flight.FlightID);
                flightViewModel.ULDFinish = _uldByFlightService.FinishtULDByFlight(flight.FlightID);
                listFlightViewModel.Add(flightViewModel);
            }
            ViewData["ListFlightViewModel"] = listFlightViewModel;
            ViewData["ListFlight"] = listFlight;
            return View();
        }
        [DocumentExport("EXCEL", "BAO CAO CHUYEN BAY")]
        public ActionResult ExportData(Guid id)
        {
            
            var flight = _flightService.GetById(id);
            var uldList = _uldByFlightService.GetListULDByFlightGuid(id);
            ViewBag.Flight = flight.FlightNumber;
            ViewBag.ATA = flight.LandedDate.Value.ToString("dd/MM/yyyy HH:mm");
            ViewBag.SOP = flight.LandedDate.Value.AddMinutes(flight.SOPTIME.Value).ToString("dd/MM/yyyy HH:mm");
            ViewBag.Finish = flight.FinishTime.HasValue ? flight.FinishTime.Value.ToString("dd/MM/yyyy HH:mm") : "";
            var locationList = _locationService.GetAll().ToList();
            var uldTypeList = _uld_TypeService.GetAll().ToList();
            List<ULDReceiveViewModel> uldReceives = new ULDReceiveAccess().GetULDReceiveByFlight(flight);
            if (uldReceives.Count > 0)
            {
                if (uldReceives.Any(c => c.ReceiveDate.HasValue))
                {
                    ViewBag.FirstReceive = uldReceives.Min(c => c.ReceiveDate).Value.ToString("dd/MM/yyyy HH:mm");
                    ViewBag.LastReceive = uldReceives.Max(c => c.ReceiveDate).Value.ToString("dd/MM/yyyy HH:mm");
                }
                else
                {
                    ViewBag.FirstReceive = "";
                    ViewBag.LastReceive = "";
                }

            }
            else
            {
                ViewBag.FirstReceive = "";
                ViewBag.LastReceive = "";
            }
            List<ULDViewModel> listUldViewModel = uldList.ToList().LeftJoin(                    /// Source Collection  
                    locationList,                        /// Inner Collection  
                    p => p.LocationID,                                /// PK  
                    a => a.LocationID,                                /// FK  
                    (p, a) => new { MyUld = p, MyLocation = a })   /// Result Collection  
                    .Select(a => new ULDViewModel
                    {
                        ULDName = a.MyUld.Name,
                        UldID = a.MyUld.ID,
                        NotifyID = a.MyUld.NotifyID,
                        LocationName = a.MyUld.LocationID.HasValue ? a.MyLocation.LocationName : "",
                        ULDTypeID = a.MyUld.ULD_TYPE,
                        StartTime = a.MyUld.StartTime.HasValue? a.MyUld.StartTime : a.MyUld.StartTime,
                        FinishTime = a.MyUld.FinishTime.HasValue ? a.MyUld.FinishTime : a.MyUld.FinishTime,
                        TimeOperation = (a.MyUld.StartTime.HasValue && a.MyUld.FinishTime.HasValue) ? (int)Math.Round((a.MyUld.FinishTime.Value - a.MyUld.StartTime.Value).TotalMinutes, 0) : 0,
                        Note = a.MyUld.Note
                    }).ToList();
            listUldViewModel = listUldViewModel.ToList().LeftJoin(                    /// Source Collection  
                    uldTypeList,                        /// Inner Collection  
                    p => p.ULDTypeID,                                /// PK  
                    a => a.ID,                                /// FK  
                    (p, a) => new { MyUld = p, MyUldType = a })   /// Result Collection  
                    .Select(a => new ULDViewModel
                    {
                        ULDName = a.MyUld.ULDName,
                        UldID = a.MyUld.UldID,
                        LocationName = a.MyUld.LocationName,
                        StartTime = a.MyUld.StartTime,
                        NotifyID = a.MyUld.NotifyID,
                        FinishTime = a.MyUld.FinishTime,
                        TimeOperation = a.MyUld.TimeOperation,
                        ULDType = a.MyUld.ULDTypeID.HasValue ? a.MyUldType.Name : "",
                        Note = a.MyUld.Note,
                        StandartTime = a.MyUldType != null ? a.MyUldType.TimeOperation : 0,
                    }).ToList();
            ViewData["UldList"] = uldList;
            ViewData["UldListView"] = listUldViewModel.OrderBy(c => c.ULDName).ToList();
            ViewBag.FirstMove = listUldViewModel.Min(c => c.StartTime).Value.ToString("dd/MM/yyyy HH:mm");
            return View(flight);


        }
        public ActionResult ReOpen(Guid id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            var flight = _flightService.GetById(id);
            flight.Status = false;
            _flightService.Update(flight);
            _flightService.Save();
            message = "Đã mở lại chuyến bay " + flight.FlightNumber;
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Import(int id)
        {
            ViewBag.ID = id;
            return View();
        }
        public ActionResult ImportFile(FormCollection formRequest)
        {
            try
            {

                string id = Request["fileImportattach"];
                string fileImport = string.Empty;
                string nameFile = string.Empty;

                if (!string.IsNullOrEmpty(id))
                {
                    List<FileTem> fileJsonUpload = new List<FileTem>();

                    fileJsonUpload = ConvertFileTem.ConvertJsonToList(id);
                    foreach (var item in fileJsonUpload)
                    {
                        fileImport = item.key;
                        nameFile = item.caption;
                    }

                }
                int groupid = Utils.Format.GetNullInteger(formRequest["keyValue"]);
                //  string groupName = "checker";
                string message = ActionExcel(Server.MapPath(DisplayUrl.UrlUploadFile + fileImport), groupid);

                string messageType = message.Equals("OK") ? Utils.DisplayMessage.TypeSuccess : Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Utils.DisplayMessage.TypeError, Message = ex.StackTrace, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult FinishULD(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            var uldDB = _uldByFlightService.GetByID(id);
            _locationService.UnLockLocation(uldDB.LocationID.Value);
            uldDB.Status = CommonConstants.FinishProcess;
            uldDB.FinishTime = DateTime.Now;
            uldDB.StatusMessage = CommonConstants.StatusFinish;
            uldDB.Priority = 0;
            _uldByFlightService.Update(uldDB);
            _uldByFlightService.Save();
            message = "Hoàn thành Khai thác ULD " + uldDB.Name;
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddNote(int id)
        {
            var uldDB = _uldByFlightService.GetByID(id);
            var flight = _flightService.GetById(uldDB.Flight_ID);
            ViewBag.Flight = flight.FlightNumber;
            return View(uldDB);
        }
        public ActionResult AddNoteAction(FormCollection formRequest)
        {
            try
            {
                int uldID = int.Parse(formRequest["keyValue"]);

                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                var uldDB = _uldByFlightService.GetByID(uldID);
                uldDB.Note = Utils.Format.GetNullString(formRequest["note"]);
                _uldByFlightService.Update(uldDB);
                _uldByFlightService.Save();
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.StackTrace, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult FinishFlight(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            var flightDB = _flightService.GetSingleByID(id);
            int uldProcess = _uldByFlightService.ProcessingULDByFlight(flightDB.FlightID);
            if (uldProcess > 0)
            {
                message = "KHÔNG THỂ ĐÓNG CHUYẾN DO CÒN ULD ĐANG Ở VỊ TRÍ KHAI THÁC";
                messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            flightDB.Status = true;
            flightDB.FinishTime = DateTime.Now;
            _flightService.Update(flightDB);
            _flightService.Save();
            message = "Hoàn thành Khai thác Chuyến bay " + flightDB.FlightNumber;
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ReloadFlight(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            var flightDB = _flightService.GetSingleByID(id);
            var listUldDB = _uldByFlightService.GetListULDByFlightGuid(flightDB.FlightID);
            var flightHermes = new GetFlightFromHermes().GetFlight(flightDB);
            if (flightDB.FlightType != flightHermes.FlightType || flightDB.FlightTypeOfAirCraft != flightHermes.FlightTypeOfAirCraft)
            {
                flightDB.FlightType = flightHermes.FlightType;
                var flightConfig = new FlightConfig();
                if ((flightDB.FlightLetter == "CX" || flightDB.FlightLetter == "KA") && flightDB.FlightType == "P")
                {
                    flightConfig = _flightConfigService.GetAll().SingleOrDefault(c => c.FlightNumber == flightDB.FlightLetter && c.FlightType == flightDB.FlightType && c.FlightTypeOfAirCraft.Contains(flightDB.FlightTypeOfAirCraft));
                }
                else
                {
                    flightConfig = _flightConfigService.GetAll().SingleOrDefault(c => c.FlightNumber == flightDB.FlightLetter && c.FlightType == flightDB.FlightType);
                }
                if (flightConfig != null)
                {
                    flightDB.FlightTypeOfAirCraft = flightHermes.FlightTypeOfAirCraft;
                    flightDB.SOPTIME = flightConfig.SopTime;
                    flightDB.AlertTime1 = flightConfig.AlertTime1;
                    flightDB.AlertTime2 = flightConfig.AlertTime2;
                    flightDB.AlertTime3 = flightConfig.AlertTime3;
                }
            }
            //load danh sach uld
            var listuldFromHermes = new ULDByFlightAccess().GetULDByFlight(flightDB);
            if (listuldFromHermes.Count > listUldDB.Count)
            {
                foreach (var uld in listuldFromHermes)
                {
                    if (listUldDB.All(c => c.Name != uld.Name))
                    {
                        var newUld = new ULDByFlight();
                        newUld.Name = uld.Name;
                        newUld.Status = 0;
                        newUld.StatusMessage = "Waiting";
                        newUld.FlightNumber = flightDB.FlightNumber;
                        newUld.Flight_ID = flightDB.FlightID;
                        newUld.Priority = 1;
                        _uldByFlightService.Add(newUld);
                    }
                }
            }
            _flightService.Update(flightDB);
            _flightService.Save();
            message = "Reload Thành công " + flightDB.FlightNumber;
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteULD(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            var uldDB = _uldByFlightService.GetByID(id);
            _locationService.UnLockLocation(uldDB.LocationID.Value);
            uldDB.Status = 0;
            uldDB.LocationID = null;
            uldDB.FinishTime = null;
            uldDB.ULD_TYPE = null;
            uldDB.StartTime = null;
            uldDB.NotifyID = null;
            uldDB.StatusMessage = "";
            uldDB.Priority = 1;
            _uldByFlightService.Update(uldDB);
            _uldByFlightService.Save();
            message = "Đã xóa ULD " + uldDB.Name;
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        //xu ly SOP
        [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN")]
        public ActionResult SopTime()
        {
            ViewData["ConfigSopList"] = _flightConfigService.GetAll().ToList();
            return View();
        }
        [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN")]
        public ActionResult Edit(int? id)
        {
            var flightConfig = new FlightConfig();
            if (id.HasValue && id.Value != 0)
                flightConfig = _flightConfigService.GetById(id.Value);
            return View(flightConfig);
        }
        [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN")]
        [ValidateInput(false)]
        public ActionResult ActionSop(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var flightConfig = new FlightConfig();
                if (keyValue != 0)
                {
                    flightConfig = _flightConfigService.GetById(keyValue);
                }
                flightConfig.FlightNumber = Utils.Format.GetNullString(formRequest["flightNumber"]);
                flightConfig.FlightType = Utils.Format.GetNullString(formRequest["flightType"]);
                flightConfig.FlightTypeOfAirCraft = Utils.Format.GetNullString(formRequest["flightAirCraftType"]);
                flightConfig.SopTime = Utils.Format.GetNullInteger(formRequest["sop"]);
                flightConfig.SHCTIME = Utils.Format.GetNullInteger(formRequest["shc"]);
                flightConfig.AlertSHC1 = Utils.Format.GetNullInteger(formRequest["alertSHC1"]);
                flightConfig.AlertSHC2 = Utils.Format.GetNullInteger(formRequest["alertSHC2"]);
                flightConfig.FinalLoad = Utils.Format.GetNullInteger(formRequest["final"]);
                //  string messageType = Utils.DisplayMessage.TypeSuccess;

                if (keyValue == 0)
                {
                    _flightConfigService.Add(flightConfig);
                    _flightConfigService.Save();
                    message = "Đã thêm mới SOP thành công!";
                }
                else
                {
                    _flightConfigService.Update(flightConfig);
                    _flightConfigService.Save();
                    message = "Đã sửa thông tin SOP thành công!";
                }

                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string message = "Lỗi";
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult DeleteSop(int? id)
        {
            try
            {
                string message = "Vui lòng chọn SOP cần xóa!";
                string messageType = Utils.DisplayMessage.TypeSuccess;
                if (id.HasValue)
                {
                    _flightConfigService.Delete(id.Value);
                    _flightConfigService.Save();
                    message = "Đã xóa thông tin SOP thành công!";
                }

                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        //xu ly Warning Time
        [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN")]
        public ActionResult WarningTime()
        {
            ViewData["UldTypeList"] = _uld_TypeService.GetAll().ToList();
            return View();
        }
        [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN")]
        public ActionResult EditWarningTime(int? id)
        {
            var uld_type = new ULD_TYPE();
            if (id.HasValue && id.Value != 0)
                uld_type = _uld_TypeService.GetById(id.Value);
            return View(uld_type);
        }
        [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN")]
        public ActionResult ActionWarning(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var uld_type = new ULD_TYPE();
                if (keyValue != 0)
                {
                    uld_type = _uld_TypeService.GetById(keyValue);
                }
                uld_type.Name = Utils.Format.GetNullString(formRequest["name"]);
                uld_type.TimeNotify = Utils.Format.GetNullInteger(formRequest["timeNotify"]);
                uld_type.TimeOperation = Utils.Format.GetNullInteger(formRequest["timeOperation"]);
                uld_type.STT = Utils.Format.GetNullInteger(formRequest["stt"]);
                //  string messageType = Utils.DisplayMessage.TypeSuccess;

                if (keyValue == 0)
                {
                    _uld_TypeService.Add(uld_type);
                    _uld_TypeService.Save();
                    message = "Đã thêm mới Loại thành công!";
                }
                else
                {
                    _uld_TypeService.Update(uld_type);
                    _uld_TypeService.Save();
                    message = "Đã sửa thông tin Loại ULD thành công!";
                }

                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string message = "Lỗi";
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult DeleteWarning(int? id)
        {
            try
            {
                string message = "Vui lòng chọn ULD Type cần xóa!";
                string messageType = Utils.DisplayMessage.TypeSuccess;
                if (id.HasValue)
                {
                    _uld_TypeService.Delete(id.Value);
                    _uld_TypeService.Save();
                    message = "Đã xóa thông tin ULD Type thành công!";
                }

                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        private string ActionExcel(string fileName, int groupID)
        {
            string connectionExcel = string.Format(System.Configuration.ConfigurationManager.ConnectionStrings[(fileName.LastIndexOf(".xlsx") == -1 ? "CNSEXCEL03" : "CNSEXCEL07")].ToString(), fileName);
            try
            {

                System.Data.OleDb.OleDbConnection connExcel = new System.Data.OleDb.OleDbConnection(connectionExcel);
                System.Data.OleDb.OleDbCommand cmdExcel = new System.Data.OleDb.OleDbCommand();
                connExcel.Open();
                tblMission mission = new tblMission();
                System.Data.DataTable dataTable = connExcel.GetOleDbSchemaTable(System.Data.OleDb.OleDbSchemaGuid.Tables, null);
                System.Text.StringBuilder messageError = new StringBuilder();

                foreach (System.Data.DataRow dataRows in dataTable.Rows)
                {
                    if (dataRows["TABLE_NAME"].ToString().ToUpper().Trim().Equals("PHANCA$"))
                    {
                        string query = "SELECT * FROM [" + dataRows["TABLE_NAME"] + "]";
                        cmdExcel = new System.Data.OleDb.OleDbCommand(query, connExcel);
                        System.Data.OleDb.OleDbDataReader reader = cmdExcel.ExecuteReader();
                        //new MissionAccess().Delete(groupID);
                        while (reader.Read())
                        {
                            if (!string.IsNullOrEmpty(reader[0].ToString().Trim()))
                                _missionService.Add(new tblMission
                                {
                                    GroupID = groupID,
                                    GroupName = "",
                                    MissionName = reader[3].ToString().Trim(),
                                    StaffName = reader[1].ToString().Trim(),
                                    CaLV = reader[2].ToString().Trim(),
                                    Location = reader[0].ToString().Trim(),
                                    Note = reader[4].ToString().Trim(),
                                    Created = DateTime.Now
                                });
                        }
                        _missionService.Save();
                        reader.Dispose();
                        return "UPLOAD SUCCESS!";

                    }


                }



            }
            catch (Exception ex)
            {
                return connectionExcel + "-" + ex.Message;

            }
            return string.Empty;
        }


        public ActionResult PrintGroupNo()
        {
            return View();
        }
        public ActionResult PrintGroupNoProcess(int prefix,int length,int start,int count)
        {
            long startNumber = long.Parse(prefix.ToString() + start.ToString().PadLeft((length - prefix.ToString().Length), '0'));
            long endNumber = startNumber + count;
            List<GroupQrCodeViewModel> listGroup = new List<GroupQrCodeViewModel>();
            for( long i= startNumber;i<endNumber;i++)
            {
                GroupQrCodeViewModel group = new GroupQrCodeViewModel();
                group.GroupNo = i.ToString();
                QRCodeGenerator qrGenerator = new QRCodeGenerator();
                QRCodeData data = qrGenerator.CreateQrCode(i.ToString(), QRCodeGenerator.ECCLevel.Q);
                QRCode qrCode = new QRCode(data);

                System.Web.UI.WebControls.Image imgBarCode = new System.Web.UI.WebControls.Image();
                imgBarCode.Height = 50;
                imgBarCode.Width = 50;
                using (Bitmap bitMap = qrCode.GetGraphic(5))
                {
                    using (MemoryStream ms = new MemoryStream())
                    {
                        bitMap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                        byte[] byteImage = ms.ToArray();
                        imgBarCode.ImageUrl = "data:image/png;base64," + Convert.ToBase64String(byteImage);
                    }
                    group.Img = imgBarCode.ImageUrl;
                }
                listGroup.Add(group);
            }
            ViewData["listPrint"] = listGroup;
            return View();
        }

    }
}
