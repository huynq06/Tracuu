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
using System.Drawing;
using System.IO;
using Web.Portal.Upload;
using System.Text;
using Web.Portal.Utils;
using System.Reflection;

namespace Web.Portal.Controller
{
    public class IrrManagementController : BaseController
    {
        private DateTime? ata;
        private DateTime? fromDate;
        IAwbIrrService _awbIrrService;
        IHawbIrrService _hawbService;
        IFlightIrrService _flightService;
        ILagiService _lagiService;
        IAWBByULDService _awbByUldService;
        IFlightService _fluiService;
        public IrrManagementController(IAwbIrrService awbIrrService, IHawbIrrService hawbService, ILagiService lagiService, IFlightIrrService flightService, IAWBByULDService awbByUldService, IFlightService fluiService)
        {
            this._awbIrrService = awbIrrService;
            this._hawbService = hawbService;
            this._flightService = flightService;
            this._lagiService = lagiService;
            this._awbByUldService = awbByUldService;
            this._fluiService = fluiService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            string flightNo = string.IsNullOrEmpty(Request["flightNo"]) ? "" : Request["flightNo"].Trim();
            ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Format.ConvertDate(Request["ata"]);
           
            IEnumerable<FlightIrr> flightList = _flightService.GetbyDate(ata.Value);
            if (!string.IsNullOrEmpty(flightNo))
            {
                flightList = flightList.Where(p => p.FLightNo == flightNo).ToList();
            }
            ViewData["flights"] = flightList.ToList();
            ViewBag.TotalRecord = flightList.Count();
            return View();
        }
        public ActionResult Edit(int? id)
        {
          
            var flight = new FlightIrr();
            if (id.HasValue && id.Value != 0)
                flight = _flightService.GetById(id.Value);
            return View(flight);
        }
        public ActionResult Reload(int id)
        {
            var flight = _flightService.GetById(id);
            fromDate = flight.FlightDate;
            int total = 0;
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            List<Layer.ImpAWB> impAwbs = new List<Layer.ImpAWB>();
            int totalPices = 0;
            double totalWeight = 0;
            List<AwbIrr> listAwbIrrDb = _awbIrrService.GetbyFlightID(flight.FlightID).ToList();
            
            IList<Layer.ImpAWB> imps = new DataAccess.ImpAWBAccess().GetCustomByStatus_v2(1,
                                                                                  Int32.MaxValue,
                                                                                  flight.FLightNo.Substring(0, 2), flight.FLightNo.Substring(2),
                                                                                  fromDate,
                                                                                  fromDate, "DAMAGED CARGO",
                                                                                  ref total, ref totalPices, ref totalWeight);
            foreach (var im in imps)
            {
                im.GoodsContent = im.Remarks;
                im.Remarks = "DMGD";

                impAwbs.Add(im);
            }
            impAwbs.AddRange(new DataAccess.ImpAWBAccess().GetCustomByStatus_v2(1,
                                                                             Int32.MaxValue,
                                                                            flight.FLightNo.Substring(0, 2), flight.FLightNo.Substring(2),
                                                                             fromDate,
                                                                             fromDate, "MOVED TO SERVICE RECOVERY",
                                                                          ref total, ref totalPices, ref totalWeight));
            List<Layer.ImpAWB> imAwbsCheck = new List<Layer.ImpAWB>();
            foreach (var item in impAwbs)
            {
                if (imAwbsCheck.Count(x => x.AWB.Trim().Equals(item.AWB.Trim()) && x.HAWB.Trim().Equals(item.HAWB.Trim())) == 0)
                {
                    imAwbsCheck.Add(item);
                }
                else
                {
                    Layer.ImpAWB awbExisted = imAwbsCheck.FirstOrDefault(c => c.AWB.Trim() == item.AWB.Trim() && c.HAWB.Trim() == item.HAWB.Trim());
                    if (awbExisted != null && item.Remarks == "DMGD" && awbExisted.GoodsContent.Substring(10, 14) != item.GoodsContent.Substring(10, 14))
                    {
                        imAwbsCheck.Add(item);
                    }
                }
            }
            List<AwbIrr> listAwbIrr = new List<AwbIrr>();
            List<AwbIrr> listAwbIrr4Update = new List<AwbIrr>();
            List<HawbIrr> listHAwbIrr = new List<HawbIrr>();
            List<HawbIrr> listHAwbIrr4Update = new List<HawbIrr>();
            if (imAwbsCheck.Count > 0)
            {
                foreach (var item in imAwbsCheck)
                {
                    // chưa tồn tại Mawb
                    #region
                    if (listAwbIrrDb.All(c => c.AwbID != item.LAGI_MASTER_ID))
                    {
                        if (!listAwbIrr.Any(x => x.AWB.Trim().Equals(item.AWB.Trim())))
                        {
                            AwbIrr awbIrr = new AwbIrr();
                            awbIrr.AwbGuid = Guid.NewGuid();
                            awbIrr.FlightID = item.FlightID;
                            awbIrr.Prefix = item.Prefix;
                            awbIrr.AWB = item.AWB;
                            awbIrr.GoodsContent = item.GoodsContent;
                            awbIrr.Agent = item.Agent;
                            awbIrr.AwbStatus = 0;
                            awbIrr.AgentCode = item.AgentCode;
                            awbIrr.Shipper = item.Shipper;
                            awbIrr.ShipperADDR = item.ShipperADDR;
                            awbIrr.Consignee = item.Consignee;
                            awbIrr.ConsignADDR = item.ConsignADDR;
                            awbIrr.LAGI_MASTER_PIECES = item.LAGI_MASTER_PIECES;
                            awbIrr.LAGI_MASTER_WEGIHT = item.LAGI_MASTER_WEGIHT;
                            awbIrr.QuantityExpected = item.QuantityExpected;
                            awbIrr.WeightExpected = item.WeightExpected;
                            awbIrr.QuantityReceived = item.QuantityReceived;
                            awbIrr.WeightReceived = item.WeightReceived;
                            awbIrr.WareHouse = item.WareHouse;
                            // awbIrr.DateStatus = item.DateStatus;
                            awbIrr.Remarks = item.Remarks;
                            awbIrr.GOODSNATURE = item.GOODSNATURE;
                            awbIrr.LAGI_MASTER_GOODS = item.LAGI_MASTER_GOODS;
                            awbIrr.AwbIrrCreared = DateTime.Now;
                            awbIrr.Org = item.LAGI_ORIGIN;
                            awbIrr.Des = item.LAGI_DES;
                            awbIrr.AwbID = item.LAGI_MASTER_ID;
                            awbIrr.LagiMasterId = item.LAGI_MASTER_ID;
                            awbIrr.LagiMasterQuantityEx = item.LAGI_MASTER_QUANTITY_EX;
                            awbIrr.LagiMasterWeightEx = item.LAGI_MASTER_WEIGHT_EX;
                            awbIrr.AwbMaster = 1;
                            if (string.IsNullOrEmpty(item.HAWB))
                            {
                                int piecesAwb = 0;
                                string weightAwb = "";
                                string dameTypeAwb = "";
                                //  Utils.Constants.GetMissingContent(item.GoodsContent, item.HAWB, ref piecesAwb, ref weightAwb, ref dameTypeAwb);
                                awbIrr.IrrPieces = piecesAwb;
                                awbIrr.IrrWeight = weightAwb;
                                awbIrr.IrrDameType = dameTypeAwb;
                                awbIrr.ULD = item.ULD.Contains("-") ? item.ULD.Split('-')[1] : "";
                            }
                            listAwbIrr.Add(awbIrr);
                        }

                        int pieces = 0;
                        string weight = "";
                        string dameType = "";
                        string irrDetail = "";
                        Utils.Constants.GetMissingContent(item.GoodsContent, item.HAWB, ref pieces, ref weight, ref dameType, ref irrDetail);
                        HawbIrr hawbIrr = new HawbIrr();
                        hawbIrr.IrrDetails = irrDetail;
                        if (dameType.Trim().ToUpper().Contains("CRUSHED"))
                        {
                            hawbIrr.IrrCrushed = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("TORN"))
                        {
                            hawbIrr.IrrTorn = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("WET"))
                        {
                            hawbIrr.IrrWet = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("MSCA"))
                        {
                            hawbIrr.IrrMsca = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("FDCA"))
                        {
                            hawbIrr.IrrFdca = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("BROKEN"))
                        {
                            hawbIrr.IrrBroken = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("LABEL"))
                        {
                            hawbIrr.IrrWithoutLabel = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("OVCD"))
                        {
                            hawbIrr.IrrOvcd = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("OTHERS"))
                        {
                            hawbIrr.IrrOther = true;
                        }
                        hawbIrr.IrrPices = pieces;
                        hawbIrr.AwbId = item.LAGI_MASTER_ID;
                        hawbIrr.FlightID = item.FlightID;
                        double defaultValue = 0;
                        string str = weight;
                        bool success = double.TryParse(str, out defaultValue);
                        hawbIrr.IrrWeight = defaultValue;
                        hawbIrr.HawbDamge = dameType;
                        hawbIrr.Remark = item.Remarks;
                        hawbIrr.Created = DateTime.Now;
                        hawbIrr.ULD = item.ULD.Contains("-") ? item.ULD.Split('-')[1] : "";
                        hawbIrr.Prefix = item.Prefix;
                        hawbIrr.AWB = item.AWB;
                        hawbIrr.Created = DateTime.Now;
                        hawbIrr.HawbId = item.ID.ToString();
                        hawbIrr.Hawb = item.HAWB;
                        hawbIrr.LAGI_MASTER_PIECES = item.LAGI_MASTER_PIECES;
                        hawbIrr.HawbStatus = 0;
                        hawbIrr.LAGI_MASTER_WEGIHT = item.LAGI_MASTER_WEGIHT;
                        hawbIrr.LagiMasterQuantityEx = item.LAGI_MASTER_QUANTITY_EX;
                        hawbIrr.LagiMasterWeightEx = item.LAGI_MASTER_WEIGHT_EX;
                        hawbIrr.LAGI_MASTER_GOODS = item.LAGI_MASTER_GOODS;
                        hawbIrr.LAGI_QUANTITY_EXPECTED = int.Parse(item.QuantityExpected);
                        hawbIrr.LAGI_WEIGHT_EXPECTED = item.WeightExpected;
                        hawbIrr.LAGI_QUANTITY_RECEIVED = int.Parse(item.QuantityReceived);
                        hawbIrr.LAGI_WEIGHT_RECEIVED = item.WeightReceived;
                        hawbIrr.IrrTimeDuringULDBreakDown = true;
                        hawbIrr.IrrActionPhotoYes = true;
                        hawbIrr.IrrCustomsSealedNo = true;
                        hawbIrr.IrrRemarkCargoManifest = true;
                        hawbIrr.IrrCauseUnknown = true;
                        hawbIrr.IrrActionNo = true;
                        hawbIrr.Org = item.ORGIN;
                        hawbIrr.Des = item.DEST;
                        hawbIrr.IrrGroup = item.GroupNo;
                        //dameType 0:DAMC , 1:DAMA,2 DAMB,3:WETA,4WETB,5WETC,6NA
                        if (flight.FLightNo.ToUpper().Contains("KE") || flight.FLightNo.ToUpper().Contains("JL"))
                            hawbIrr.DameType = 0;
                        else
                        {
                            hawbIrr.DameType = 6;
                        }
                        listHAwbIrr.Add(hawbIrr);
                    }
                    #endregion
                    #region chưa tồn tại Hawb
                    else
                    {
                        
                            var awbDb = _awbIrrService.GetSingleByID(item.LAGI_MASTER_ID, item.FlightID);
                            awbDb.LAGI_MASTER_PIECES = item.LAGI_MASTER_PIECES;
                            awbDb.LAGI_MASTER_WEGIHT = item.LAGI_MASTER_WEGIHT;
                            awbDb.LagiMasterQuantityEx = item.LAGI_MASTER_QUANTITY_EX;
                            awbDb.LagiMasterWeightEx = item.LAGI_MASTER_WEIGHT_EX;
                            listAwbIrr4Update.Add(awbDb);
                            //lay danh sach hawb trong DB
                            List<HawbIrr> listHawbDb = _hawbService.GetbyAwbIdAndFlightId(item.LAGI_MASTER_ID, item.FlightID).ToList();
                             string groupNo = item.GoodsContent.Substring(10, 14);
                       
                            if (listHawbDb.All(c => c.IrrGroup != groupNo))
                            {
                            //ktra xem da ton tại hawb trong chuyen bay chua
                            var listHawbDB = _hawbService.GetbyHawbName(item.HAWB, item.LAGI_MASTER_ID, item.FlightID);
                            if(listHawbDB.Count() > 0)
                            {
                                foreach(var hawbDB in listHawbDB)
                                {
                                    hawbDB.HawbStatus = 0;
                                    listHAwbIrr4Update.Add(hawbDB);
                                }
                            }
                            int pieces = 0;
                                string weight = "";
                                string dameType = "";
                                string irrDetail = "";
                                Utils.Constants.GetMissingContent(item.GoodsContent, item.HAWB, ref pieces, ref weight, ref dameType, ref irrDetail);
                                HawbIrr hawbIrr = new HawbIrr();
                                hawbIrr.IrrDetails = irrDetail;
                                if (dameType.Trim().ToUpper().Contains("CRUSHED"))
                                {
                                    hawbIrr.IrrCrushed = true;
                                }
                                if (dameType.Trim().ToUpper().Contains("TORN"))
                                {
                                    hawbIrr.IrrTorn = true;
                                }
                                if (dameType.Trim().ToUpper().Contains("WET"))
                                {
                                    hawbIrr.IrrWet = true;
                                }
                                if (dameType.Trim().ToUpper().Contains("MSCA"))
                                {
                                    hawbIrr.IrrMsca = true;
                                }
                                if (dameType.Trim().ToUpper().Contains("FDCA"))
                                {
                                    hawbIrr.IrrFdca = true;
                                }
                                if (dameType.Trim().ToUpper().Contains("BROKEN"))
                                {
                                    hawbIrr.IrrBroken = true;
                                }
                                if (dameType.Trim().ToUpper().Contains("LABEL"))
                                {
                                    hawbIrr.IrrWithoutLabel = true;
                                }
                                if (dameType.Trim().ToUpper().Contains("OVCD"))
                                {
                                    hawbIrr.IrrOvcd = true;
                                }
                                if (dameType.Trim().ToUpper().Contains("OTHERS"))
                                {
                                    hawbIrr.IrrOther = true;
                                }
                                hawbIrr.IrrPices = pieces;
                                hawbIrr.AwbId = item.LAGI_MASTER_ID;
                            hawbIrr.FlightID = item.FlightID;
                                double defaultValue = 0;
                                string str = weight;
                                bool success = double.TryParse(str, out defaultValue);
                                hawbIrr.IrrWeight = defaultValue;
                                hawbIrr.HawbDamge = dameType;
                                hawbIrr.Remark = item.Remarks;
                                hawbIrr.Created = DateTime.Now;
                                hawbIrr.ULD = item.ULD.Contains("-") ? item.ULD.Split('-')[1] : "";
                                hawbIrr.Prefix = item.Prefix;
                                hawbIrr.AWB = item.AWB;
                                hawbIrr.Created = DateTime.Now;
                                hawbIrr.HawbId = item.ID.ToString();
                                hawbIrr.Hawb = item.HAWB;
                                hawbIrr.LAGI_MASTER_PIECES = item.LAGI_MASTER_PIECES;
                            hawbIrr.HawbStatus = 0;
                                hawbIrr.LAGI_MASTER_WEGIHT = item.LAGI_MASTER_WEGIHT;
                                hawbIrr.LagiMasterQuantityEx = item.LAGI_MASTER_QUANTITY_EX;
                                hawbIrr.LagiMasterWeightEx = item.LAGI_MASTER_WEIGHT_EX;
                                hawbIrr.LAGI_MASTER_GOODS = item.LAGI_MASTER_GOODS;
                            hawbIrr.LAGI_QUANTITY_EXPECTED = int.Parse(item.QuantityExpected);
                            hawbIrr.LAGI_WEIGHT_EXPECTED = item.WeightExpected;
                            hawbIrr.LAGI_QUANTITY_RECEIVED = int.Parse(item.QuantityReceived);
                            hawbIrr.LAGI_WEIGHT_RECEIVED = item.WeightReceived;
                            hawbIrr.IrrTimeDuringULDBreakDown = true;
                                hawbIrr.IrrActionPhotoYes = true;
                                hawbIrr.IrrCustomsSealedNo = true;
                                hawbIrr.IrrRemarkCargoManifest = true;
                                hawbIrr.IrrCauseUnknown = true;
                                hawbIrr.IrrActionNo = true;
                                hawbIrr.Org = item.ORGIN;
                                hawbIrr.Des = item.DEST;
                                hawbIrr.IrrGroup = item.GroupNo;
                                //dameType 0:DAMC , 1:DAMA,2 DAMB,3:WETA,4WETB,5WETC,6NA
                                if (flight.FLightNo.ToUpper().Contains("KE") || flight.FLightNo.ToUpper().Contains("JL"))
                                    hawbIrr.DameType = 0;
                                else
                                {
                                    hawbIrr.DameType = 6;
                                }
                                listHAwbIrr.Add(hawbIrr);
                            }
                        }
                        //nếu đã tồn tại thi tính tại FFM
                       
                    
                    #endregion

                }


            }
          
            foreach (var item in listAwbIrr)
            {
                _awbIrrService.Add(item);
            }
            foreach (var item in listAwbIrr4Update)
            {
                _awbIrrService.Update(item);
            }
            //   _awbIrrService.Save();
            foreach (var item in listHAwbIrr)
            {
                _hawbService.Add(item);
            }
            foreach (var item in listHAwbIrr4Update)
            {
                _hawbService.Update(item);
            }
            _hawbService.Save();
            message = "Đồng bộ dữ liệu thành công";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        
           
        }
        public ActionResult EditAwbIrr()
        {
            string flightID = Request["flightid"].Trim();
            ViewBag.FlightID = flightID;
            var awb = new AwbIrr();
            return View(awb);
        }
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {
                var userName = Session["accountName"];
                int total = 0;
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                string note = formRequest["flightWeatherDes"];
                var flight = new FlightIrr();
                if (keyValue != 0)
                {
                    flight = _flightService.GetById(keyValue);
                    flight.WeatherRain = Utils.Format.GetNullBooleanIrr(formRequest["flightWeahterRain"]);
                    flight.WeatherOther = Utils.Format.GetNullBooleanIrr(formRequest["flightWeatherOther"]);
                    flight.WeatherDry = Utils.Format.GetNullBooleanIrr(formRequest["flightWeahterDry"]);
                    flight.Des = note;
                    message = "Sửa thông tin chuyến bay thành công";
                    return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                }
                flight.FLightNo = Utils.Format.GetNullString(formRequest["flight"]).ToUpper().Trim();
                flight.FlightDate = Utils.Format.ConvertDate(formRequest["ata"]).Value.Date;
                flight.WeatherRain = Utils.Format.GetNullBooleanIrr(formRequest["flightWeahterRain"]);
                flight.WeatherOther = Utils.Format.GetNullBooleanIrr(formRequest["flightWeatherOther"]);
                flight.WeatherDry = Utils.Format.GetNullBooleanIrr(formRequest["flightWeahterDry"]);
                flight.Des = note;

                fromDate = string.IsNullOrEmpty(Request["ata"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["ata"] + " 00:00");

                List<Layer.ImpAWB> impAwbs = new List<Layer.ImpAWB>();
                int totalPices = 0;
                double totalWeight = 0;
                IList<Layer.ImpAWB> imps = new DataAccess.ImpAWBAccess().GetCustomByStatus_v2(1,
                                                                                      Int32.MaxValue,
                                                                                      flight.FLightNo.Substring(0, 2), flight.FLightNo.Substring(2),
                                                                                      fromDate,
                                                                                      fromDate, "DAMAGED CARGO",
                                                                                      ref total, ref totalPices, ref totalWeight);
                foreach (var im in imps)
                {
                    im.GoodsContent = im.Remarks;
                    im.Remarks = "DMGD";

                    impAwbs.Add(im);
                }
                impAwbs.AddRange(new DataAccess.ImpAWBAccess().GetCustomByStatus_v2(1,
                                                                                 Int32.MaxValue,
                                                                                flight.FLightNo.Substring(0, 2), flight.FLightNo.Substring(2),
                                                                                 fromDate,
                                                                                 fromDate, "MOVED TO SERVICE RECOVERY",
                                                                              ref total, ref totalPices, ref totalWeight));
                List<Layer.ImpAWB> imAwbsCheck = new List<Layer.ImpAWB>();
                foreach (var item in impAwbs)
                {
                    if (imAwbsCheck.Count(x => x.AWB.Trim().Equals(item.AWB.Trim()) && x.HAWB.Trim().Equals(item.HAWB.Trim())) == 0)
                    {
                        imAwbsCheck.Add(item);
                    }
                    else
                    {
                        Layer.ImpAWB awbExisted = imAwbsCheck.FirstOrDefault(c => c.AWB.Trim() == item.AWB.Trim() && c.HAWB.Trim() == item.HAWB.Trim());
                        if (awbExisted != null && item.Remarks == "DMGD" && awbExisted.GoodsContent.Substring(10, 14) != item.GoodsContent.Substring(10, 14))
                        {
                            imAwbsCheck.Add(item);
                        }
                    }
                }
                List<AwbIrr> listAwbIrr = new List<AwbIrr>();
                List<HawbIrr> listHAwbIrr = new List<HawbIrr>();
                if (imAwbsCheck.Count > 0)
                {
                    flight.LandedTime = imAwbsCheck[0].ATATIME;
                    flight.LandedDate = imAwbsCheck[0].FlightDate;
                    flight.Org = imAwbsCheck[0].LOADING;
                    flight.Des = imAwbsCheck[0].DEST;
                    flight.FlightID = imAwbsCheck[0].FlightID;
                    var flightDb = _flightService.GetSingleByID(imAwbsCheck[0].FlightID);
                    if (flightDb != null)
                    {
                        return Json(new { Type = Utils.DisplayMessage.TypeError, Message = "Đã tồn tại chuyến bay trong hệ thống!", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                    }
                    flight.FlightDescription = note;
                    foreach (var item in imAwbsCheck)
                    {
                        if (!listAwbIrr.Any(x => x.AWB.Trim().Equals(item.AWB.Trim())))
                        {
                            AwbIrr awbIrr = new AwbIrr();
                            awbIrr.AwbGuid = Guid.NewGuid();
                            awbIrr.FlightID = item.FlightID;
                            awbIrr.Prefix = item.Prefix;
                            awbIrr.AWB = item.AWB;
                            awbIrr.GoodsContent = item.GoodsContent;
                            awbIrr.Agent = item.Agent;
                            awbIrr.AwbStatus = 0;
                            awbIrr.AgentCode = item.AgentCode;
                            awbIrr.Shipper = item.Shipper;
                            awbIrr.ShipperADDR = item.ShipperADDR;
                            awbIrr.Consignee = item.Consignee;
                            awbIrr.ConsignADDR = item.ConsignADDR;
                            awbIrr.LAGI_MASTER_PIECES = item.LAGI_MASTER_PIECES;
                            awbIrr.LAGI_MASTER_WEGIHT = item.LAGI_MASTER_WEGIHT;
                            awbIrr.QuantityExpected = item.QuantityExpected;
                            awbIrr.WeightExpected = item.WeightExpected;
                            awbIrr.QuantityReceived = item.QuantityReceived;
                            awbIrr.WeightReceived = item.WeightReceived;
                            awbIrr.WareHouse = item.WareHouse;
                            // awbIrr.DateStatus = item.DateStatus;
                            awbIrr.Remarks = item.Remarks;
                            awbIrr.GOODSNATURE = item.GOODSNATURE;
                            awbIrr.LAGI_MASTER_GOODS = item.LAGI_MASTER_GOODS;
                            awbIrr.AwbIrrCreared = DateTime.Now;
                            awbIrr.Org = item.LAGI_ORIGIN;
                            awbIrr.Des = item.LAGI_DES;
                            awbIrr.AwbID = item.LAGI_MASTER_ID;
                            awbIrr.LagiMasterId = item.LAGI_MASTER_ID;
                            awbIrr.LagiMasterQuantityEx = item.LAGI_MASTER_QUANTITY_EX;
                            awbIrr.LagiMasterWeightEx = item.LAGI_MASTER_WEIGHT_EX;
                            awbIrr.AwbMaster = 1;
                            if (string.IsNullOrEmpty(item.HAWB))
                            {
                                int piecesAwb = 0;
                                string weightAwb = "";
                                string dameTypeAwb = "";
                                //  Utils.Constants.GetMissingContent(item.GoodsContent, item.HAWB, ref piecesAwb, ref weightAwb, ref dameTypeAwb);
                                awbIrr.IrrPieces = piecesAwb;
                                awbIrr.IrrWeight = weightAwb;
                                awbIrr.IrrDameType = dameTypeAwb;
                                awbIrr.ULD = item.ULD.Contains("-") ? item.ULD.Split('-')[1] : "";
                            }
                            listAwbIrr.Add(awbIrr);
                        }
                        HawbIrr hawbIrr = new HawbIrr();
                        hawbIrr.AwbId = item.LAGI_MASTER_ID;
                        if (item.Remarks == "DMGD")
                        {
                            int pieces = 0;
                            string weight = "";
                            string dameType = "";
                            string irrDetail = "";
                            Utils.Constants.GetMissingContent(item.GoodsContent, item.HAWB, ref pieces, ref weight, ref dameType, ref irrDetail);

                            hawbIrr.IrrDetails = irrDetail;
                            if (dameType.Trim().ToUpper().Contains("CRUSHED"))
                            {
                                hawbIrr.IrrCrushed = true;
                            }
                            if (dameType.Trim().ToUpper().Contains("TORN"))
                            {
                                hawbIrr.IrrTorn = true;
                            }
                            if (dameType.Trim().ToUpper().Contains("WET"))
                            {
                                hawbIrr.IrrWet = true;
                            }
                            if (dameType.Trim().ToUpper().Contains("MSCA"))
                            {
                                hawbIrr.IrrMsca = true;
                            }
                            if (dameType.Trim().ToUpper().Contains("FDCA"))
                            {
                                hawbIrr.IrrFdca = true;
                            }
                            if (dameType.Trim().ToUpper().Contains("BROKEN"))
                            {
                                hawbIrr.IrrBroken = true;
                            }
                            if (dameType.Trim().ToUpper().Contains("LABEL"))
                            {
                                hawbIrr.IrrWithoutLabel = true;
                            }
                            if (dameType.Trim().ToUpper().Contains("OVCD"))
                            {
                                hawbIrr.IrrOvcd = true;
                            }
                            if (dameType.Trim().ToUpper().Contains("OTHERS"))
                            {
                                hawbIrr.IrrOther = true;
                            }
                            hawbIrr.IrrPices = pieces;

                            double defaultValue = 0;
                            string str = weight;
                            bool success = double.TryParse(str, out defaultValue);
                            hawbIrr.IrrWeight = defaultValue;
                            hawbIrr.HawbDamge = dameType;
                        }
                        else
                        {
                            hawbIrr.IrrDetails = item.GoodsContent.ToUpper().Replace("MOVED TO SERVICE RECOVERY MANUALLY", "").Trim(); ;
                        }
                        hawbIrr.Remark = item.Remarks;
                        hawbIrr.Created = DateTime.Now;
                        hawbIrr.ULD = item.ULD.Contains("-") ? item.ULD.Split('-')[1] : "";
                        hawbIrr.Prefix = item.Prefix;
                        hawbIrr.AWB = item.AWB;
                        hawbIrr.Created = DateTime.Now;
                        hawbIrr.HawbId = item.ID.ToString();
                        hawbIrr.FlightID = item.FlightID;
                        hawbIrr.Hawb = item.HAWB;
                        hawbIrr.HawbStatus = 0;
                        hawbIrr.LAGI_MASTER_PIECES = item.LAGI_MASTER_PIECES;
                        hawbIrr.LAGI_MASTER_WEGIHT = item.LAGI_MASTER_WEGIHT;
                        hawbIrr.LagiMasterQuantityEx = item.LAGI_MASTER_QUANTITY_EX;
                        hawbIrr.LagiMasterWeightEx = item.LAGI_MASTER_WEIGHT_EX;
                        hawbIrr.LAGI_MASTER_GOODS = item.LAGI_MASTER_GOODS;
                        hawbIrr.LAGI_QUANTITY_EXPECTED = int.Parse(item.QuantityExpected);
                        hawbIrr.LAGI_WEIGHT_EXPECTED = item.WeightExpected;
                        hawbIrr.LAGI_QUANTITY_RECEIVED = int.Parse(item.QuantityReceived);
                        hawbIrr.LAGI_WEIGHT_RECEIVED = item.WeightReceived;
                        hawbIrr.IrrTimeDuringULDBreakDown = true;
                        hawbIrr.IrrActionPhotoYes = true;
                        hawbIrr.IrrCustomsSealedNo = true;
                        hawbIrr.IrrRemarkCargoManifest = true;
                        hawbIrr.IrrCauseUnknown = true;
                        hawbIrr.IrrActionNo = true;
                        hawbIrr.Org = item.ORGIN;
                        hawbIrr.Des = item.DEST;
                        hawbIrr.IrrGroup = item.GroupNo;
                        //dameType 0:DAMC , 1:DAMA,2 DAMB,3:WETA,4WETB,5WETC,6NA
                        if (flight.FLightNo.ToUpper().Contains("KE") || flight.FLightNo.ToUpper().Contains("JL"))
                            hawbIrr.DameType = 0;
                        else
                        {
                            hawbIrr.DameType = 6;
                        }
                        listHAwbIrr.Add(hawbIrr);
                    }


                }
                _flightService.Add(flight);
                //  _flightService.Save();
                foreach (var item in listAwbIrr)
                {
                    _awbIrrService.Add(item);
                }
                //   _awbIrrService.Save();
                foreach (var item in listHAwbIrr)
                {
                    _hawbService.Add(item);
                }
                _hawbService.Save();
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult ListAwbIrr()
        {
            string checkAdmin = "false";
            if(WebMatrix.WebData.WebSecurity.CurrentUserName  == "admin")
            {
                checkAdmin = "true";
            }
            string flightID = Request["flightId"].Trim();
            string flightNo = Request["flight"].Trim();
            List<AwbIrr> listAwbIrr = _awbIrrService.GetbyFlightID(flightID).ToList();
            foreach(var item in listAwbIrr)
            {
                string checkDamgeType = "";
                List<HawbIrr> hawbIrr = _hawbService.GetbyAwbId(item.AwbID).ToList();
                if(hawbIrr.Any(c=>c.Remark == "DMGD"))
                {
                    checkDamgeType += "DMGD,";
                }
                if (hawbIrr.Any(c => c.Remark != "DMGD"))
                {
                    checkDamgeType += "DOC,";
                }
                item.LAGI_REMARK = checkDamgeType.Trim(',');
            }
            ViewBag.FlightNo = flightNo;
            ViewBag.FlightID = flightID;
            ViewData["listAwbIrr"] = listAwbIrr.OrderBy(c=>c.AWB.Substring(c.AWB.Length-1)).ThenBy(c=>c.AWB.Substring(c.AWB.Length - 4)).ToList();
            ViewBag.TotalRecord = listAwbIrr.Count();
            ViewBag.CheckAdmin = checkAdmin;
            return View();
        }
        public ActionResult BBBT()
        {
            int? id = string.IsNullOrEmpty(Request["ID"].Trim()) ? 0 : int.Parse(Request["ID"].Trim());
            string awbId = Request["awbId"].Trim();
            string flightId = Request["flightID"].Trim();
            AwbIrr awbIrr = new AwbIrr();
            awbIrr = _awbIrrService.GetSingleByIDAndFlight(awbId,flightId);
            ViewBag.LagiMasterPieces = awbIrr.LAGI_MASTER_PIECES;
            ViewBag.LagiMasterWeight = awbIrr.LAGI_MASTER_WEGIHT;
            ViewBag.LagiMasterPiecesEx = awbIrr.LagiMasterQuantityEx;
            ViewBag.LagiMasterWeightEx = awbIrr.LagiMasterWeightEx;
            var hawb = new HawbIrr();
            if (id.HasValue && id.Value != 0)
            {
                hawb = _hawbService.GetById(id.Value);
            }
            //hawb.IrrDetails = hawb.Hawb + ": " + "P" + hawb.IrrPices + "K" + hawb.IrrWeight + " " + hawb.IrrDes + " " + " LDD IN " + hawb.ULD;
            //lay ra list hawb cung hawb
            List<HawbIrr> listHawbCheck = new List<HawbIrr>();
            if (!string.IsNullOrEmpty(hawb.Hawb.Trim()) || (string.IsNullOrEmpty(hawb.Hawb.Trim()) && hawb.Remark=="DMGD"))
            {
                listHawbCheck = _hawbService.GetbyHawbName(hawb.Hawb, awbId,flightId).ToList();
            }
            if (listHawbCheck.Count < 2)
            {
                if (!string.IsNullOrEmpty(hawb.Hawb.Trim()))
                {
                    //if (!string.IsNullOrEmpty(hawb.IrrDes))
                    //{
                    //    string detail = (hawb.IrrDes + " N " + hawb.IrrDetails).Trim().Trim('N');
                    //    hawb.IrrDetails = hawb.Hawb + ": " + "P" + hawb.IrrPices + "K" + hawb.IrrWeight + " " + GetIrrDes(hawb) + " " + detail + " LDD IN " + hawb.ULD.Replace(" ", "");
                    //}

                    //else
                        hawb.IrrDetails = hawb.Hawb + ": " + "P" + hawb.IrrPices + "K" + hawb.IrrWeight + " " + GetIrrDes(hawb) + " " + hawb.IrrDetails + " " + " LDD IN " + hawb.ULD.Replace(" ", "");
                }

                else
                {
                    //if (!string.IsNullOrEmpty(hawb.IrrDes))
                    //{
                    //    string detail = (hawb.IrrDes + " N " + hawb.IrrDetails).Trim().Trim('N');
                    //    hawb.IrrDetails = "P" + hawb.IrrPices + "K" + hawb.IrrWeight + " " + GetIrrDes(hawb) + " " + detail + " LDD IN " + hawb.ULD.Replace(" ", "");
                    //}

                    //else
                        hawb.IrrDetails = "P" + hawb.IrrPices + "K" + hawb.IrrWeight + " " + GetIrrDes(hawb) + " " + hawb.IrrDetails + " " + " LDD IN " + hawb.ULD.Replace(" ", "");
                }
                if (!string.IsNullOrEmpty(hawb.LAGI_REMARK))
                    hawb.IrrDetails += " <br>" + hawb.LAGI_REMARK.Replace("\n","<br>");
            }
            else
            {
                StringBuilder builder = new StringBuilder();
                if (!string.IsNullOrEmpty(listHawbCheck[0].Hawb.Trim()))
                    builder.Append(hawb.Hawb + ": ");
                foreach (var item in listHawbCheck)
                {
                    //if (!string.IsNullOrEmpty(item.IrrDes))
                    //{
                    //    string detail = (item.IrrDes + " N " + item.IrrDetails).Trim().Trim('N');
                    //    builder.AppendLine("<br>" + "-" + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + detail + " LDD IN " + item.ULD.Replace(" ", "") + " " + item.LAGI_REMARK);
                    //}
                      
                    //else
                        builder.AppendLine("<br>" + "-" + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + item.IrrDetails + " " + " LDD IN " + item.ULD.Replace(" ", "") + " " + item.LAGI_REMARK);
                    if (item.IrrMsca.HasValue && item.IrrMsca == true)
                    {
                        hawb.IrrMsca = true;
                    }
                    if (item.IrrCrushed.HasValue && item.IrrCrushed == true)
                    {
                        hawb.IrrCrushed = true;
                    }
                    if (item.IrrTorn.HasValue && item.IrrTorn == true)
                    {
                        hawb.IrrTorn = true;
                    }
                    if (item.IrrWet.HasValue && item.IrrWet == true)
                    {
                        hawb.IrrWet = true;
                    }
                    if (item.IrrFdca.HasValue && item.IrrFdca == true)
                    {
                        hawb.IrrFdca = true;
                    }
                    if (item.IrrBroken.HasValue && item.IrrBroken == true)
                    {
                        hawb.IrrBroken = true;
                    }
                    if (item.IrrWithoutLabel.HasValue && item.IrrWithoutLabel == true)
                    {
                        hawb.IrrWithoutLabel = true;
                    }
                    if (item.IrrHoled.HasValue && item.IrrHoled == true)
                    {
                        hawb.IrrHoled = true;
                    }
                    if (item.IrrOvcd.HasValue && item.IrrOvcd == true)
                    {
                        hawb.IrrOvcd = true;
                    }
                    if (item.IrrOther.HasValue && item.IrrOther == true)
                    {
                        hawb.IrrOther = true;
                    }
                    if (!string.IsNullOrEmpty(item.LAGI_REMARK))
                        builder.AppendLine("<br>" + hawb.LAGI_REMARK.Replace("\n", "<br>"));
                }
                string irrDess = "";
                foreach (var item in listHawbCheck)
                {
                    if(!string.IsNullOrEmpty(item.IrrDes))
                        irrDess += item.IrrDes + " & ";
                }
                    hawb.IrrDes = irrDess.Trim().Trim('&').Trim();
                hawb.IrrPices = listHawbCheck.Sum(c => c.IrrPices);
                hawb.IrrWeight = listHawbCheck.Sum(c => c.IrrWeight);
                hawb.IrrDetails = builder.ToString();
            
             
            }
            ViewBag.FlightID = flightId;
            FlightIrr flight = _flightService.GetSingleByID(flightId);
            hawb.WeatherRain = flight.WeatherRain;
            hawb.WeatherDry = flight.WeatherDry;
            hawb.WeatherOther = flight.WeatherOther;
            hawb.WeatherDes = flight.WeatherDes;
            ViewBag.FlightNo = flight.FLightNo;
            ViewBag.FlightDate = flight.LandedDate.Value.ToString("dd/MM/yyyy");
            return View(hawb);
        }
        public ActionResult AwbDetailIrr()
        {
            string prefix = Request["prefix"].Trim();
            string awb = Request["awb"].Trim();
            string awbId = Request["awbId"].Trim();
            string flightId = Request["flightID"].Trim();
            var awbDb = _awbIrrService.GetSingleByID(awbId, flightId);
            var flightDb = _flightService.GetSingleByID(flightId);
            ViewBag.FlightID = flightDb.FlightID;
            ViewBag.FflightNo = flightDb.FLightNo;
            ViewBag.AwbId = awbId;
            return View(awbDb);
        }

        public ActionResult ListHawbIrr()
        {
            string awbId = Request["awbId"].Trim();
            string flightId = Request["flightID"].Trim();
            var awbSelect = _awbIrrService.GetSingleByID(awbId, flightId);
            //  AwbIrr awbIrr = new AwbIrr();
            // awbIrr = _awbIrrService.GetSingleByID(awbId);
            //  FlightIrr flight = _flightService.GetSingleByID(awbIrr.FlightID);
            List<HawbIrr> hawbIrr = _hawbService.GetbyAwbIdAndFlightId(awbId,flightId).ToList();
            List<HawbIrr> listHawbIrr = new List<HawbIrr>();
            List<HawbIrr> listHawbIrrFilter = new List<HawbIrr>();
            foreach (var item in hawbIrr)
            {
                item.HawbDes = "";
                if (item.IrrMsca.HasValue && item.IrrMsca == true)
                {
                    item.HawbDes += "MSCA,";
                }
                if (item.IrrCrushed.HasValue && item.IrrCrushed == true)
                {
                    item.HawbDes += "CRUSHED,";
                }
                if (item.IrrTorn.HasValue && item.IrrTorn == true)
                {
                    item.HawbDes += "TORN,";
                }
                if (item.IrrWet.HasValue && item.IrrWet == true)
                {
                    item.HawbDes += "WET,";
                }
                if (item.IrrFdca.HasValue && item.IrrFdca == true)
                {
                    item.HawbDes += "FDCA,";
                }
                if (item.IrrBroken.HasValue && item.IrrBroken == true)
                {
                    item.HawbDes += "BROKEN,";
                }
                if (item.IrrHoled.HasValue && item.IrrHoled == true)
                {
                    item.HawbDes += "HOLED,";
                }
                if (item.IrrOvcd.HasValue && item.IrrOvcd == true)
                {
                    item.HawbDes += "OVCD,";
                }
                if(!listHawbIrrFilter.Any(c => c.Hawb == item.Hawb))
                    {
                    listHawbIrrFilter.Add(item);
                }
                item.HawbDes = item.HawbDes.TrimEnd(',');
                listHawbIrr.Add(item);
            }
            ViewBag.AwbId = awbId;
            ViewBag.FlightId = Request["flightID"].Trim();
            ViewData["ListHawbAll"] = listHawbIrr;
            ViewData["listHawb"] = listHawbIrrFilter.OrderBy(c => c.Hawb).ToList();
            ViewBag.TotalRecord = listHawbIrr.Count();
            return View(awbSelect);
        }
        public string GetIrrDes(HawbIrr item)
        {
            string des = "";
            if (item.IrrMsca.HasValue && item.IrrMsca == true)
            {
                des += "MSCA/";
            }
            if (item.IrrCrushed.HasValue && item.IrrCrushed == true)
            {
                des += "CRUSHED/";
            }
         
            if (item.IrrWet.HasValue && item.IrrWet == true)
            {
                des += "WET/";
            }
            if (item.IrrFdca.HasValue && item.IrrFdca == true)
            {
                des += "FDCA/";
            }
            if (item.IrrBroken.HasValue && item.IrrBroken == true)
            {
                des += "BROKEN/";
            }
            if (item.IrrWithoutLabel.HasValue && item.IrrWithoutLabel == true)
            {
                des += "WITHOUT LABEL/";
            }
            if (item.IrrHoled.HasValue && item.IrrHoled == true)
            {
                des += "HOLED/";
            }
            if (item.IrrOvcd.HasValue && item.IrrOvcd == true)
            {
                des += "OVCD/";
            }
    

            if (!string.IsNullOrEmpty(item.IrrDes))
            {
                if (item.IrrTorn.HasValue && item.IrrTorn == true)
                {
                    des = des.Trim('/');
                    string detail = (item.IrrDes + " & TORN ").Trim();
                    des += " " + detail;
                }
                else
                {
                    des = des.Trim('/');
                    string detail = "";
                    if (string.IsNullOrWhiteSpace(des))
                    {
                        detail =  item.IrrDes.Trim();
                    }
                    else
                    {
                        detail = " & " + item.IrrDes.Trim();
                    }
                    des += " " + detail;
                }
                //else
                //{
                //    string detail = (item.IrrDes + " ").Trim().Trim('N');
                //    des += " " + detail;
                //}
                //string detail = (item.IrrDes + " N " + item.IrrDetails).Trim().Trim('N');
                //des += " " + detail;
            }
            else
            {
                if (item.IrrTorn.HasValue && item.IrrTorn == true)
                {
                    des += "TORN/";
                   
                }
            }
            
            return des.Trim('/');
        }
        public ActionResult ActionSaveBBBT(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var awbIrr = new HawbIrr();
                awbIrr = _hawbService.GetById(keyValue);
                //thời tiết
                //awbIrr.WeatherRain = Utils.Format.GetNullBooleanIrr(formRequest["weatherRain"]);
                //awbIrr.WeatherDry = Utils.Format.GetNullBooleanIrr(formRequest["weatherDry"]);
                //awbIrr.WeatherOther = Utils.Format.GetNullBooleanIrr(formRequest["WeatherOther"]);
                //awbIrr.WeatherDes = Utils.Format.GetNullString(formRequest["weatherDes"]);
                //bất thường
                //awbIrr.IrrMsca = Utils.Format.GetNullBooleanIrr(formRequest["irrMcsa"]);
                //awbIrr.IrrCrushed = Utils.Format.GetNullBooleanIrr(formRequest["irrCrushed"]);
                //awbIrr.IrrTorn = Utils.Format.GetNullBooleanIrr(formRequest["irrTorn"]);
                //awbIrr.IrrWet = Utils.Format.GetNullBooleanIrr(formRequest["irrWet"]);
                //awbIrr.IrrFdca = Utils.Format.GetNullBooleanIrr(formRequest["irrFdca"]);
                //awbIrr.IrrHoled = Utils.Format.GetNullBooleanIrr(formRequest["irrHoled"]);
                //awbIrr.IrrBroken = Utils.Format.GetNullBooleanIrr(formRequest["irrBroken"]);
                //awbIrr.IrrLabel = Utils.Format.GetNullBooleanIrr(formRequest["irrLabel"]);
                //awbIrr.IrrOvcd = Utils.Format.GetNullBooleanIrr(formRequest["irrOvcd"]);
                //awbIrr.IrrOther = Utils.Format.GetNullBooleanIrr(formRequest["irrOther"]);
                //awbIrr.IrrDes = Utils.Format.GetNullString(formRequest["irrDes"]);
                //awbIrr.IrrDetails = Utils.Format.GetNullString(formRequest["irrDetail"]);

                //remark
                awbIrr.IrrRemarkMail = Utils.Format.GetNullBooleanIrr(formRequest["irrRemarkMail"]);
                awbIrr.IrrRemarkCargoManifest = Utils.Format.GetNullBooleanIrr(formRequest["irrRemarkCargoManifest"]);
                awbIrr.IrrRemarkNo = Utils.Format.GetNullBooleanIrr(formRequest["irrRemarkNo"]);
                awbIrr.IrrRemarkOther = Utils.Format.GetNullBooleanIrr(formRequest["irrRemarkOther"]);
                awbIrr.IrrRemarkDes = Utils.Format.GetNullString(formRequest["irrRemarkDes"]);
                awbIrr.IrrCauseUnknown = Utils.Format.GetNullBooleanIrr(formRequest["irrCauseUnknown"]);
                awbIrr.IrrCauseDes = Utils.Format.GetNullString(formRequest["irrCauseDes"]);
                //action
                awbIrr.IrrActionStrapped = Utils.Format.GetNullBooleanIrr(formRequest["irrActionStrapped"]);
                awbIrr.IrrActionRetaped = Utils.Format.GetNullBooleanIrr(formRequest["irrActionRetaped"]);
                awbIrr.IrrActionRepacked = Utils.Format.GetNullBooleanIrr(formRequest["irrActionRepacked"]);
                awbIrr.IrrActionNo = Utils.Format.GetNullBooleanIrr(formRequest["irrActionNo"]);
                awbIrr.IrrActionPhotoYes = Utils.Format.GetNullBooleanIrr(formRequest["irrActionPhotoYes"]);
                awbIrr.IrrActionPhotoNo = Utils.Format.GetNullBooleanIrr(formRequest["irrActionPhotoNo"]);
                awbIrr.IrrCustomsSealedYes = Utils.Format.GetNullBooleanIrr(formRequest["irrCustomsSealedYes"]);
                awbIrr.IrrCustomsSealedNo = Utils.Format.GetNullBooleanIrr(formRequest["irrCustomsSealedNo"]);

                //time
                awbIrr.IrrTimeReceiving = Utils.Format.GetNullBooleanIrr(formRequest["irrTimeReceiving"]);
                awbIrr.IrrTimeDuringULDBreakDown = Utils.Format.GetNullBooleanIrr(formRequest["irrTimeDuringULDBreakDown"]);
                awbIrr.IrrTimeDuringStorage = Utils.Format.GetNullBooleanIrr(formRequest["irrTimeDuringStorage"]);
                awbIrr.IrrTimeDuringDelivery = Utils.Format.GetNullBooleanIrr(formRequest["irrTimeDuringDelivery"]);
                awbIrr.IrrTimeOther = Utils.Format.GetNullBooleanIrr(formRequest["irrTimeOther"]);
                awbIrr.IrrTimeDes = Utils.Format.GetNullString(formRequest["irrTimeDes"]);
                awbIrr.Staff = Utils.Format.GetNullString(formRequest["staff"]);
                awbIrr.Supervisor = Utils.Format.GetNullString(formRequest["sup"]);
                awbIrr.CustomSupervisor = Utils.Format.GetNullString(formRequest["custom"]);
                awbIrr.AgenCreated = string.IsNullOrEmpty(Request["printDate"]) ? new DateTime() : Web.Portal.Utils.Format.ConvertDate(Request["printDate"]);
                _hawbService.Update(awbIrr);
                _awbIrrService.Save();
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
           
        }
        [DocumentExport("TEXT", "DANHSACHBATTHUONG")]
        public ActionResult  Export(int id)
        {
            FlightIrr flight = _flightService.GetById(id);
            List<AwbIrr> listAwbIrr = _awbIrrService.GetbyFlightID(flight.FlightID).ToList();
            StringBuilder content = new StringBuilder();
            #region CX,EK,CZ
            if (flight.FLightNo.Contains("CX") || flight.FLightNo.Contains("EK") || flight.FLightNo.Contains("CZ"))
            {

                content.Append("IRP");
                content.Append(System.Environment.NewLine + flight.FLightNo + "/" + Utils.Format.GetMonthName(flight.LandedDate) + "/" + flight.Org + "-" + flight.Des);
                content.Append(System.Environment.NewLine + "DMGD");
                foreach (var item in listAwbIrr)
                {
                    List<HawbIrr> listHawbIrr = _hawbService.GetbyAwbIdAndFlightId(item.AwbID,flight.FlightID).Where(c => c.Remark == "DMGD").ToList();
                    List<HawbIrr> listDocHawbIrr = _hawbService.GetbyAwbIdAndFlightId(item.AwbID, flight.FlightID).Where(c => c.Remark != "DMGD").ToList();
                    if (listHawbIrr.Count > 1)
                    {
                        //neu tat ca cac hawb deu giong nhau
                        //gop tren 1 dong
                        if (listHawbIrr.All(c => c.Hawb == listHawbIrr[0].Hawb))
                        {
                            string detail = "";
                            foreach (var itemCheck in listHawbIrr)
                            {
                                string uld = itemCheck.ULD.Replace(" ", "");
                                if (detail.Contains(uld))
                                {
                                    string replaceString = "LDD IN " + uld.Trim();
                                    detail = detail.Replace(replaceString, "");
                                }
                                string missingContent = GetMissingContentExportSameHawb(itemCheck).Replace("/", " N ");
                                if (detail.Contains(itemCheck.Hawb))
                                {
                                    string replaceString = "H-" + itemCheck.Hawb.Trim();
                                    missingContent = missingContent.Replace(replaceString, "");
                                }
                                detail += missingContent + " N ";
                            }
                            detail = detail.Trim().TrimEnd('N');
                            if (string.IsNullOrEmpty(listHawbIrr[0].Hawb))
                                content.Append(System.Environment.NewLine + item.Prefix + "-" + item.AWB + "/" + item.Org + item.Des + "/" + "T" + item.LAGI_MASTER_PIECES + "K" + item.LAGI_MASTER_WEGIHT + "/" + detail);
                            else
                                content.Append(System.Environment.NewLine + item.Prefix + "-" + item.AWB + "/" + item.Org + item.Des + "/" + "T" + item.LAGI_MASTER_PIECES + "K" + item.LAGI_MASTER_WEGIHT + "/" + detail);
                        }
                        //tach dong
                        else
                        {
                            content.Append(System.Environment.NewLine + item.Prefix + "-" + item.AWB + "/" + item.Org + item.Des + "/" + "T" + item.LAGI_MASTER_PIECES + "K" + item.LAGI_MASTER_WEGIHT + "/");
                            foreach (var itemHawb in listHawbIrr)
                            {
                                if (string.IsNullOrEmpty(listHawbIrr[0].Hawb))
                                    content.Append(System.Environment.NewLine + "P" + itemHawb.IrrPices
                                    + "K" + itemHawb.IrrWeight + GetMissingContentExport(itemHawb)
                                );
                                else
                                    content.Append(System.Environment.NewLine + "P" + itemHawb.IrrPices
                                  + "K" + itemHawb.IrrWeight + GetMissingContentExport(itemHawb));
                            }
                        }
                    }
                    else
                    {
                        if (listHawbIrr.Count == 1)
                        {
                            if (string.IsNullOrEmpty(listHawbIrr[0].Hawb))
                                content.Append(System.Environment.NewLine + item.Prefix + "-" + item.AWB + "/" + item.Org + item.Des + "/" + "T" + item.LAGI_MASTER_PIECES + "K" + item.LAGI_MASTER_WEGIHT + "/" + "P" + listHawbIrr[0].IrrPices
                                + "K" + listHawbIrr[0].IrrWeight + " " + GetMissingContentExport(listHawbIrr[0])
                            );
                            else
                                content.Append(System.Environment.NewLine + item.Prefix + "-" + item.AWB + "/" + item.Org + item.Des + "/" + "T" + item.LAGI_MASTER_PIECES + "K" + item.LAGI_MASTER_WEGIHT + "/" + "P" + listHawbIrr[0].IrrPices
                               + "K" + listHawbIrr[0].IrrWeight  + GetMissingContentExport(listHawbIrr[0]));
                        }

                    }
                }
                content.Append(System.Environment.NewLine +  "OI/");
                foreach (var item in listAwbIrr)
                {
                    List<HawbIrr> listDocHawbIrr = _hawbService.GetbyAwbId(item.AwbID).Where(c => c.Remark != "DMGD").ToList();
                    if (listDocHawbIrr.Count > 0)
                    {
                        foreach (var itemDoc in listDocHawbIrr)
                        {
                            content.Append(System.Environment.NewLine + item.Prefix + "-" + item.AWB + "/" + item.Org + item.Des + "/" + "T" + item.LAGI_MASTER_PIECES + "K" + item.LAGI_MASTER_WEGIHT + "/" + itemDoc.IrrDetails);
                        }

                        
                    }
                }
                content.Append(System.Environment.NewLine + "SI-WEATHER-" + GetWeatherContent(flight));
                content.Append(System.Environment.NewLine + "BRGDS /");

            }
            #endregion
            #region KE,Jl
            else
            {
                content.Append("IRP");
                content.Append(System.Environment.NewLine + flight.FLightNo + "/" + Utils.Format.GetMonthName(flight.LandedDate) + "/" + flight.Org + "-" + flight.Des);
                foreach (var item in listAwbIrr)
                {
                    content.Append(System.Environment.NewLine + "M-" + item.Prefix + "" + item.AWB + "/" + item.Org + item.Des + "/" + "T" + item.LAGI_MASTER_PIECES + "K" + item.LAGI_MASTER_WEGIHT);
                    List<HawbIrr> listHawbIrr = _hawbService.GetbyAwbIdAndFlightId(item.AwbID,flight.FlightID).Where(c => c.Remark == "DMGD").ToList();
                    List<HawbIrr> listDocHawbIrr = _hawbService.GetbyAwbIdAndFlightId(item.AwbID,flight.FlightID).Where(c => c.Remark != "DMGD").ToList();
                    if(listHawbIrr.Count == 1)
                    {
                        content.Append(System.Environment.NewLine + GetDameType(listHawbIrr[0].DameType.Value) + " - P" + listHawbIrr[0].IrrPices + "K" + listHawbIrr[0].IrrWeight + "" + GetMissingContentExport(listHawbIrr[0]));
                    }
                    else if (listHawbIrr.Count > 1 && listHawbIrr.All(c => c.Hawb == listHawbIrr[0].Hawb))
                    {
                        string detail = "";
                        foreach (var itemCheck in listHawbIrr)
                        {
                            string uld = itemCheck.ULD.Replace(" ", "");
                            if (detail.Contains(uld))
                            {
                                string replaceString = "LDD IN " + uld.Trim();
                                detail = detail.Replace(replaceString, "");
                            }
                            string missingContent = GetMissingContentExportSameHawb(itemCheck).Replace("/", " N ");
                            if (detail.Contains(itemCheck.Hawb))
                            {
                                string replaceString = "H-" + itemCheck.Hawb.Trim();
                                missingContent = missingContent.Replace(replaceString, "");
                            }
                            detail += missingContent + " N ";
                        }
                        detail = detail.Trim().TrimEnd('N');
                        content.Append(System.Environment.NewLine + GetDameType(listHawbIrr[0].DameType.Value) + " - " + detail);
                        //if (string.IsNullOrEmpty(listHawbIrr[0].Hawb))
                        //    content.Append(System.Environment.NewLine + GetDameType(listHawbIrr[0].DameType.Value) + " - " + detail);
                        //else
                        //    content.Append(System.Environment.NewLine + GetDameType(listHawbIrr[0].DameType.Value) + " - " + detail);
                    }
                    else
                    {
                        foreach (var itemhawb in listHawbIrr)
                        {
                            List<HawbIrr> listHawbIrrFilter = listHawbIrr.Where(c => c.Hawb == itemhawb.Hawb).ToList();
                            if (content.ToString().Contains(itemhawb.Hawb))
                                continue;
                            else if(listHawbIrrFilter.Count > 1)
                            {
                                string detail = "";
                                foreach (var itemCheck in listHawbIrrFilter)
                                {
                                    string uld = itemCheck.ULD.Replace(" ", "");
                                    if (detail.Contains(uld))
                                    {
                                        string replaceString = "LDD IN " + uld.Trim();
                                        detail = detail.Replace(replaceString, "");
                                    }
                                    string missingContent = GetMissingContentExportSameHawb(itemCheck).Replace("/", " N ");
                                    if (detail.Contains(itemCheck.Hawb))
                                    {
                                        string replaceString = "H-" + itemCheck.Hawb.Trim();
                                        missingContent = missingContent.Replace(replaceString, "");
                                    }
                                    detail += missingContent + " N ";
                                }
                                detail = detail.Trim().TrimEnd('N');
                                content.Append(System.Environment.NewLine + GetDameType(listHawbIrrFilter[0].DameType.Value) + " - " + detail);
                            }
                            else
                               content.Append(System.Environment.NewLine + GetDameType(itemhawb.DameType.Value) + " - P" + itemhawb.IrrPices + "K" + itemhawb.IrrWeight + "" + GetMissingContentExport(itemhawb));
                        }
                    }
                    
                    if (listDocHawbIrr.Count > 0)
                    {
                        foreach (var itemDoc in listDocHawbIrr)
                        {
                            content.Append(System.Environment.NewLine + "OI/" + itemDoc.IrrDetails);
                        }

                    }

                }
                content.Append(System.Environment.NewLine + "SI-WEATHER-" + GetWeatherContent(flight));
                content.Append(System.Environment.NewLine + "BRGDS /");
            }
            #endregion

            ViewBag.Result = content.ToString().Replace("  "," ");
            return View();

        }

        //[DocumentExport("EXCEL", "DANHSACHBATTHUONG")]
        public ActionResult PrintBBBT()
        {
            int ID  = int.Parse(Request["ID"].Trim());
            string flightId = Request["flightID"].Trim();
            var hawbIrr = new HawbIrr();
            hawbIrr = _hawbService.GetById(ID);
            AwbIrr awbIrr = new AwbIrr();
            awbIrr = _awbIrrService.GetSingleByIDAndFlight(hawbIrr.AwbId,flightId);
            ViewBag.LagiMasterPieces = awbIrr.LAGI_MASTER_PIECES;
            ViewBag.LagiMasterWeight = awbIrr.LAGI_MASTER_WEGIHT;
            ViewBag.LagiMasterPiecesEx = awbIrr.LagiMasterQuantityEx;
            ViewBag.LagiMasterWeightEx = awbIrr.LagiMasterWeightEx;
            FlightIrr flight = _flightService.GetSingleByID(awbIrr.FlightID);
            hawbIrr.WeatherRain = flight.WeatherRain;
            hawbIrr.WeatherDry = flight.WeatherDry;
            hawbIrr.WeatherOther = flight.WeatherOther;
            hawbIrr.WeatherDes = flight.WeatherDes;
            ViewBag.FlightNo = flight.FLightNo;
            ViewBag.FlightDate = flight.LandedDate.Value.ToString("dd/MM/yyyy");
            if (flight.FLightNo.ToUpper().Contains("KE") || flight.FLightNo.ToUpper().Contains("JL"))
            {
                hawbIrr.IrrRemark = GetDameType(hawbIrr.DameType.Value);
            }
            else
            {
                hawbIrr.IrrRemark = "";
            }

            //lay ra list hawb cung hawb
            List<HawbIrr> listHawbCheck = new List<HawbIrr>();
            if (!string.IsNullOrEmpty(hawbIrr.Hawb.Trim()) || (string.IsNullOrEmpty(hawbIrr.Hawb.Trim()) && hawbIrr.Remark == "DMGD"))
            {
               listHawbCheck = _hawbService.GetbyHawbName(hawbIrr.Hawb, awbIrr.AwbID,flightId).ToList();
            }

            if (listHawbCheck.Count < 2)
            {
                if (!string.IsNullOrEmpty(hawbIrr.Hawb.Trim()))
                {
                    //if(!string.IsNullOrEmpty(hawbIrr.IrrDes))
                    //{
                    //    string detail = (hawbIrr.IrrDes + " N " + hawbIrr.IrrDetails).Trim().Trim('N');
                    //    hawbIrr.IrrDetails = hawbIrr.Hawb + ": " + "P" + hawbIrr.IrrPices + "K" + hawbIrr.IrrWeight + " " + GetIrrDes(hawbIrr) + " " + detail + " LDD IN " + hawbIrr.ULD.Replace(" ", "") + " " + hawbIrr.IrrRemark;
                    //}
                       
                    //else
                        hawbIrr.IrrDetails = hawbIrr.Hawb + ": " + "P" + hawbIrr.IrrPices + "K" + hawbIrr.IrrWeight + " " + GetIrrDes(hawbIrr) + " " + hawbIrr.IrrDetails + " " + " LDD IN " + hawbIrr.ULD.Replace(" ", "") + " " + hawbIrr.IrrRemark;
                }
                   
                else
                {
                    //if (!string.IsNullOrEmpty(hawbIrr.IrrDes))
                    //{
                    //    string detail = (hawbIrr.IrrDes + " N " + hawbIrr.IrrDetails).Trim().Trim('N');
                    //    hawbIrr.IrrDetails = "P" + hawbIrr.IrrPices + "K" + hawbIrr.IrrWeight + " " + GetIrrDes(hawbIrr) + " " + detail + " LDD IN " + hawbIrr.ULD.Replace(" ", "") + " " + hawbIrr.IrrRemark;
                    //}
                        
                    //else
                        hawbIrr.IrrDetails = "P" + hawbIrr.IrrPices + "K" + hawbIrr.IrrWeight + " " + GetIrrDes(hawbIrr) + " " + hawbIrr.IrrDetails + " " + " LDD IN " + hawbIrr.ULD.Replace(" ", "") + " " + hawbIrr.IrrRemark;
                }
                if (!string.IsNullOrEmpty(hawbIrr.LAGI_REMARK))
                    hawbIrr.IrrDetails += " <br>" + hawbIrr.LAGI_REMARK.Replace("\n", "<br>") ;

            }
            else
            {
                StringBuilder builder = new StringBuilder();
                if(!string.IsNullOrEmpty(listHawbCheck[0].Hawb.Trim()))
                     builder.Append(hawbIrr.Hawb + ": ");
                foreach (var item in listHawbCheck)
                {
                  
                    if (flight.FLightNo.ToUpper().Contains("KE") || flight.FLightNo.ToUpper().Contains("JL"))
                    {
                        item.IrrRemark = GetDameType(item.DameType.Value);
                    }
                    else
                    {
                        item.IrrRemark = "";
                    }
                    //if (!string.IsNullOrEmpty(item.IrrDes))
                    //{
                    //    string detail = (item.IrrDes + " N " + item.IrrDetails).Trim().Trim('N');
                    //    builder.AppendLine("<br>" + "-" + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + detail + " LDD IN " + item.ULD.Replace(" ", "") + " " + item.IrrRemark);
                    //}
                       
                    //else
                        builder.AppendLine("<br>" + "-" + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + item.IrrDetails + " " + " LDD IN " + item.ULD.Replace(" ", "") + " " + item.IrrRemark);
                    if (item.IrrMsca.HasValue && item.IrrMsca == true)
                    {
                        hawbIrr.IrrMsca = true;
                    }
                    if (item.IrrCrushed.HasValue && item.IrrCrushed == true)
                    {
                        hawbIrr.IrrCrushed = true;
                    }
                    if (item.IrrTorn.HasValue && item.IrrTorn == true)
                    {
                        hawbIrr.IrrTorn = true;
                    }
                    if (item.IrrWet.HasValue && item.IrrWet == true)
                    {
                        hawbIrr.IrrWet = true;
                    }
                    if (item.IrrFdca.HasValue && item.IrrFdca == true)
                    {
                        hawbIrr.IrrFdca = true;
                    }
                    if (item.IrrBroken.HasValue && item.IrrBroken == true)
                    {
                        hawbIrr.IrrBroken = true;
                    }
                    if (item.IrrHoled.HasValue && item.IrrHoled == true)
                    {
                        hawbIrr.IrrHoled = true;
                    }
                    if (item.IrrOvcd.HasValue && item.IrrOvcd == true)
                    {
                        hawbIrr.IrrOvcd = true;
                    }
                    if (item.IrrOther.HasValue && item.IrrOther == true)
                    {
                        hawbIrr.IrrOther = true;
                    }
                    if (!string.IsNullOrEmpty(item.LAGI_REMARK))
                        builder.AppendLine("<br>" + item.LAGI_REMARK);
                }
                string irrDess = "";
                foreach (var item in listHawbCheck)
                {
                    if (!string.IsNullOrEmpty(item.IrrDes))
                        irrDess += item.IrrDes + " & ";
                }
                hawbIrr.IrrDes = irrDess.Trim().Trim('&').Trim();
                hawbIrr.IrrPices = listHawbCheck.Sum(c => c.IrrPices);
                hawbIrr.IrrWeight = listHawbCheck.Sum(c => c.IrrWeight);
                hawbIrr.IrrDetails = builder.ToString();
            }
           
            return View(hawbIrr);
        }
        public static string GetMissingContent(HawbIrr item)
        {
            try
            {
                if(item.Remark.Trim() == "DMGD")
                {
                    item.HawbDes = "";
                    if (item.IrrMsca.HasValue && item.IrrMsca == true)
                    {
                        item.HawbDes += "MSCA/";
                    }
                    if (item.IrrCrushed.HasValue && item.IrrCrushed == true)
                    {
                        item.HawbDes += "CRUSHED/";
                    }
                 
                    if (item.IrrWet.HasValue && item.IrrWet == true)
                    {
                        item.HawbDes += "WET/";
                    }
                    if (item.IrrFdca.HasValue && item.IrrFdca == true)
                    {
                        item.HawbDes += "FDCA/";
                    }
                    if (item.IrrBroken.HasValue && item.IrrBroken == true)
                    {
                        item.HawbDes += "BROKEN/";
                    }
                    if (item.IrrWithoutLabel.HasValue && item.IrrWithoutLabel == true)
                    {
                        item.HawbDes += "WITHOUT LABEL/";
                    }
                    if (item.IrrHoled.HasValue && item.IrrHoled == true)
                    {
                        item.HawbDes += "HOLED/";
                    }
                    if (item.IrrOvcd.HasValue && item.IrrOvcd == true)
                    {
                        item.HawbDes += "OVCD/";
                    }
                    if (item.IrrTorn.HasValue && item.IrrTorn == true)
                    {
                        item.HawbDes += "TORN/";
                    }
                    return "P" + item.IrrPices + " OF H-" + item.Hawb + " " + item.HawbDes.Trim('/') + " " + (string.IsNullOrEmpty(item.IrrDes)? "LDD IN " : item.IrrDes + " LDD IN ") + item.ULD.Replace(" ", "");
                }
                else
                {
                    return string.IsNullOrEmpty(item.IrrDes)? "" : item.IrrDes;
                }
              
            }
            catch (Exception)
            {

            }

            return string.Empty;

        }
        public static string GetMissingContentExport(HawbIrr item)
        {
            try
            {
                if (item.Remark.Trim() == "DMGD")
                {
                    item.HawbDes = "";
                    if (item.IrrMsca.HasValue && item.IrrMsca == true)
                    {
                        item.HawbDes += "MSCA/";
                    }
                    if (item.IrrCrushed.HasValue && item.IrrCrushed == true)
                    {
                        item.HawbDes += "CRUSHED/";
                    }
                   
                    if (item.IrrWet.HasValue && item.IrrWet == true)
                    {
                        item.HawbDes += "WET/";
                    }
                    if (item.IrrFdca.HasValue && item.IrrFdca == true)
                    {
                        item.HawbDes += "FDCA/";
                    }
                    if (item.IrrBroken.HasValue && item.IrrBroken == true)
                    {
                        item.HawbDes += "BROKEN/";
                    }
                    if (item.IrrWithoutLabel.HasValue && item.IrrWithoutLabel == true)
                    {
                        item.HawbDes += "WITHOUT LABEL/";
                    }
                    if (item.IrrHoled.HasValue && item.IrrHoled == true)
                    {
                        item.HawbDes += "HOLED/";
                    }
                    if (item.IrrOvcd.HasValue && item.IrrOvcd == true)
                    {
                        item.HawbDes += "OVCD/";
                    }
                    if (item.IrrTorn.HasValue && item.IrrTorn == true)
                    {
                        item.HawbDes += "TORN/";
                    }
                    if (string.IsNullOrEmpty(item.Hawb.Trim()))
                          return " " + item.HawbDes.Trim('/') + " " + (string.IsNullOrEmpty(item.IrrDetails) ? "" : item.IrrDetails + " ") + (string.IsNullOrEmpty(item.IrrDes) ? "LDD IN " : item.IrrDes + " LDD IN ") + item.ULD.Replace(" ", "");
                    else
                        return " OF H-" + item.Hawb + " " + item.HawbDes.Trim('/') + " " + (string.IsNullOrEmpty(item.IrrDetails) ? "" : item.IrrDetails + " ") + (string.IsNullOrEmpty(item.IrrDes) ? "LDD IN " : item.IrrDes + " LDD IN ") + item.ULD.Replace(" ", "");
                }
                else
                {
                    return string.IsNullOrEmpty(item.IrrDes) ? "" : item.IrrDes;
                }

            }
            catch (Exception)
            {

            }

            return string.Empty;

        }
        public static string GetMissingContentExportSameHawb(HawbIrr item)
        {
            try
            {
                if (item.Remark.Trim() == "DMGD")
                {
                    item.HawbDes = "";
                    if (item.IrrMsca.HasValue && item.IrrMsca == true)
                    {
                        item.HawbDes += "MSCA/";
                    }
                    if (item.IrrCrushed.HasValue && item.IrrCrushed == true)
                    {
                        item.HawbDes += "CRUSHED/";
                    }

                    if (item.IrrWet.HasValue && item.IrrWet == true)
                    {
                        item.HawbDes += "WET/";
                    }
                    if (item.IrrFdca.HasValue && item.IrrFdca == true)
                    {
                        item.HawbDes += "FDCA/";
                    }
                    if (item.IrrBroken.HasValue && item.IrrBroken == true)
                    {
                        item.HawbDes += "BROKEN/";
                    }
                    if (item.IrrWithoutLabel.HasValue && item.IrrWithoutLabel == true)
                    {
                        item.HawbDes += "WITHOUT LABEL/";
                    }
                    if (item.IrrHoled.HasValue && item.IrrHoled == true)
                    {
                        item.HawbDes += "HOLED/";
                    }
                    if (item.IrrOvcd.HasValue && item.IrrOvcd == true)
                    {
                        item.HawbDes += "OVCD/";
                    }
                    if (item.IrrTorn.HasValue && item.IrrTorn == true)
                    {
                        item.HawbDes += "TORN/";
                    }
                    if (string.IsNullOrEmpty(item.Hawb.Trim()))
                        return " " + " P" + item.IrrPices + "K" + item.IrrWeight + item.HawbDes.Trim('/') + " " + (string.IsNullOrEmpty(item.IrrDetails) ? "" : item.IrrDetails + " ") + (string.IsNullOrEmpty(item.IrrDes) ? "LDD IN " : item.IrrDes + " LDD IN ") + item.ULD.Replace(" ", "");
                    else
                        return " H-" + item.Hawb + " P" + item.IrrPices + "K" + item.IrrWeight + " " + item.HawbDes.Trim('/') + " " + (string.IsNullOrEmpty(item.IrrDetails) ? "" : item.IrrDetails + " ") + (string.IsNullOrEmpty(item.IrrDes) ? "LDD IN " : item.IrrDes + " LDD IN ") + item.ULD.Replace(" ", "");
                }
                else
                {
                    return string.IsNullOrEmpty(item.IrrDes) ? "" : item.IrrDes;
                }

            }
            catch (Exception)
            {

            }

            return string.Empty;

        }
        public static string GetWeatherContent(FlightIrr item)
        {
            string result = "";
            try
            {
                if (item.WeatherRain.HasValue && item.WeatherRain == true)
                {
                    result = "RAIN AT RAMP";
                }
                if (item.WeatherDry.HasValue && item.WeatherDry == true)
                {
                    result = "DRY";
                }
            }
            catch (Exception)
            {
            }
            return result;

        }
        public ActionResult EditHawbIrr()
        {
            int? id = string.IsNullOrEmpty(Request["ID"].Trim())? 0 : int.Parse(Request["ID"].Trim());
            string awbId = Request["awbId"].Trim();
            string flightId = Request["flightID"].Trim();
            var hawb = new HawbIrr();
            string check = "true";
            if (id.HasValue && id.Value != 0)
            {
                hawb = _hawbService.GetById(id.Value);
                check = "false";
            }
            ViewBag.AwbId = awbId;
            ViewBag.FlightId = flightId;
            ViewBag.Check = check;
            return View(hawb);
        }
        public ActionResult AddHawbIrr()
        {
            int? id = string.IsNullOrEmpty(Request["ID"].Trim()) ? 0 : int.Parse(Request["ID"].Trim());
            string awbId = Request["awbId"].Trim();
            string flightID = Request["flightID"].Trim();
            var hawb = new HawbIrr();
            string check = "true";
            if (id.HasValue && id.Value != 0)
            {
                hawb = _hawbService.GetById(id.Value);
                check = "false";
            }
            ViewBag.AwbId = awbId;
            ViewBag.Check = check;
            ViewBag.FlightID = flightID;
            return View(hawb);
        }
        public ActionResult SaveHawb(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string awbId = formRequest["keyAwbId"];
                string flightID = formRequest["flightID"];
                var awbDb = _awbIrrService.GetSingleByID(awbId, flightID);
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var hawb = new HawbIrr();
                if (keyValue != 0)
                {
                    hawb = _hawbService.GetById(keyValue);
                }
                hawb.AWB = awbDb.AWB;
                hawb.Prefix = awbDb.Prefix;
                hawb.Created = DateTime.Now;
                hawb.FlightID = awbDb.FlightID;
                hawb.LAGI_MASTER_PIECES = awbDb.LAGI_MASTER_PIECES;
                hawb.LAGI_MASTER_WEGIHT = awbDb.LAGI_MASTER_WEGIHT;
                hawb.LAGI_MASTER_GOODS = awbDb.LAGI_MASTER_GOODS;
                hawb.LagiMasterWeightEx = awbDb.LagiMasterWeightEx;
                hawb.LagiMasterQuantityEx = awbDb.LagiMasterQuantityEx;
                hawb.Org = awbDb.Org;
                hawb.Des = awbDb.Des;
                hawb.Hawb =  Utils.Format.GetNullString(formRequest["hawb"]);
                hawb.AwbId = awbId;
                hawb.ULD = Utils.Format.GetNullString(formRequest["uld"]);
                hawb.IrrPices = Utils.Format.GetNullInteger(formRequest["piece"]);
                hawb.IrrWeight = double.Parse(formRequest["weight"].Trim());
                hawb.DameType = Utils.Format.GetNullInteger(formRequest["dame"]);
                hawb.IrrDetails = Utils.Format.GetNullString(formRequest["irrDetail"]);
                string check = Utils.Format.GetNullString(formRequest["remark"]);
                if(check=="1")
                {
                    hawb.Remark = "DMGD";
                }
                else
                {
                    hawb.Remark = "";
                }
                hawb.IrrMsca = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrMcsa"]);
                hawb.IrrCrushed = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrCrushed"]);
                hawb.IrrTorn = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrTorn"]);
                hawb.IrrWet = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrWet"]);
                hawb.IrrFdca = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrFdca"]);
                hawb.IrrHoled = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrHoled"]);
                hawb.IrrBroken = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrBroken"]);
                hawb.IrrWithoutLabel = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrLabel"]);
                hawb.IrrOvcd = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrOvcd"]);
                hawb.IrrOther = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrOther"]);
                hawb.IrrDes = Utils.Format.GetNullString(formRequest["hawbIrrDes"]);
                hawb.LAGI_REMARK = Utils.Format.GetNullString(formRequest["irrNote"]);
                if (keyValue != 0)
                {
                    _hawbService.Update(hawb);
                }
                else
                {
                    _hawbService.Add(hawb);
                }
                _hawbService.Save();
                message = "Xử lý thông tin thành công";
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            
        }
        public ActionResult SaveAddHawb(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string awbId = formRequest["keyAwbId"];
                string flightID = formRequest["flightID"];
                int ID = int.Parse(formRequest["keyValue"]);
                var awbDb = _awbIrrService.GetSingleByID(awbId,flightID);
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var hawb = new HawbIrr();
                if (keyValue != 0)
                {
                    hawb = _hawbService.GetById(keyValue);
                }
                hawb.AWB = awbDb.AWB;
                hawb.Prefix = awbDb.Prefix;
                hawb.Created = DateTime.Now;
                hawb.FlightID = awbDb.FlightID;
                hawb.LAGI_MASTER_PIECES = awbDb.LAGI_MASTER_PIECES;
                hawb.LAGI_MASTER_WEGIHT = awbDb.LAGI_MASTER_WEGIHT;
                hawb.LAGI_MASTER_GOODS = awbDb.LAGI_MASTER_GOODS;
                hawb.LagiMasterWeightEx = awbDb.LagiMasterWeightEx;
                hawb.LagiMasterQuantityEx = awbDb.LagiMasterQuantityEx;
                hawb.Org = awbDb.Org;
                hawb.Des = awbDb.Des;
                hawb.Hawb = Utils.Format.GetNullString(formRequest["hawb"]);
                hawb.AwbId = awbId;
                hawb.ULD = Utils.Format.GetNullString(formRequest["uld"]);
                hawb.IrrPices = Utils.Format.GetNullInteger(formRequest["piece"]);
                hawb.IrrWeight = double.Parse(formRequest["weight"].Trim());
                hawb.DameType = Utils.Format.GetNullInteger(formRequest["dame"]);
                hawb.IrrDetails = Utils.Format.GetNullString(formRequest["irrDetail"]);
                string check = Utils.Format.GetNullString(formRequest["remark"]);
                if (check == "1")
                {
                    hawb.Remark = "DMGD";
                }
                else
                {
                    hawb.Remark = "";
                }
                hawb.IrrMsca = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrMcsa"]);
                hawb.IrrCrushed = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrCrushed"]);
                hawb.IrrTorn = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrTorn"]);
                hawb.IrrWet = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrWet"]);
                hawb.IrrFdca = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrFdca"]);
                hawb.IrrHoled = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrHoled"]);
                hawb.IrrBroken = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrBroken"]);
                hawb.IrrWithoutLabel = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrLabel"]);
                hawb.IrrOvcd = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrOvcd"]);
                hawb.IrrOther = Utils.Format.GetNullBooleanIrr(formRequest["hawbIrrOther"]);
                hawb.IrrDes = Utils.Format.GetNullString(formRequest["hawbIrrDes"]);
                //if (keyValue != 0)
                //{
                //    _hawbService.Update(hawb);
                //}
               
                    _hawbService.Add(hawb);
                
                _hawbService.Save();
                message = "Xử lý thông tin thành công";
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }

        }
        public string GetDameType(int type)
        {
            string result = "";
            switch (type)
            {
                case 1:
                    result = "DMGA";
                    break;
                case 0:
                    result = "DMGC";
                    break;
                case 2:
                    result = "DMGB";
                    break;
                case 3:
                    result = "WETA";
                    break;
                case 4:
                    result = "WETB";
                    break;
                case 5:
                    result = "WETC";
                    break;
                case 6:
                    result = "N/A";
                    break;
                default:
                    result = "DMGC";
                    break;
            }
            return result;

        }
        public ActionResult DeleteHawb(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            _hawbService.Delete(id);
            _hawbService.Save();
            message = "Đã xóa thông tin Hawb bất thường thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CloseOrOpenHawb()
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            int? id = string.IsNullOrEmpty(Request["ID"].Trim()) ? 0 : int.Parse(Request["ID"].Trim());
            string awbId = Request["awbId"].Trim();
            string flightId = Request["flightID"].Trim();
            var hawb = new HawbIrr();
            hawb = _hawbService.GetById(id.Value);
            if(hawb.HawbStatus!=1)
            {
                _hawbService.CloseHawb(hawb.Hawb, awbId, flightId);
                //lay awb theo Hawb
                IEnumerable<HawbIrr> listHawb = _hawbService.GetbyAwbIdAndFlightId(awbId, flightId);
                if (listHawb.All(c => c.HawbStatus == 1))
                {
                    //close Awb
                    // var awbIrr = _awbIrrService.GetSingleByIDAndFlight(awbId, flightId);
                    _awbIrrService.closeAwbIrr(awbId);
                }
                //_hawbService.Delete(id);
                _hawbService.Save();
                message = "Đã đóng thông tin Hawb bất thường thành công!";
            }
            else
            {
                _hawbService.OpenHawb(hawb.Hawb, awbId, flightId);
                //lay awb theo Hawb
                //IEnumerable<HawbIrr> listHawb = _hawbService.GetbyAwbIdAndFlightId(awbId, flightId);
                //if (listHawb.All(c => c.HawbStatus == 1))
                //{
                //    //close Awb
                //    // var awbIrr = _awbIrrService.GetSingleByIDAndFlight(awbId, flightId);
                //    _awbIrrService.closeAwbIrr(awbId);
                //}
                //_hawbService.Delete(id);
                _hawbService.Save();
                message = "Đã đóng thông tin Hawb bất thường thành công!";
            }
           
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteAwb(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            var awbDb = _awbIrrService.GetById(id);
            var listHawbByAwb = _hawbService.GetbyAwbId(awbDb.AwbID).ToList();
            foreach(var item in listHawbByAwb)
            {
                _hawbService.Delete(item.ID);
            }
            _awbIrrService.Delete(id);
            _awbIrrService.Save();
            message = "Đã xóa thông tin vận đơn thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ReOpen(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            var awbDb = _awbIrrService.GetById(id);
            awbDb.AwbStatus = 0;
            _awbIrrService.Update(awbDb);
            _awbIrrService.Save();
            message = "Đã mở thông tin vận đơn thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CloseAwbIrr(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            string awdId = id.ToString();
            _awbIrrService.closeAwbIrr(awdId);
            _awbIrrService.Save();
            message = "Đã đóng bất thường vận đơn thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetListlagiByName(string dataViewModel)
        {
            var data = new JavaScriptSerializer().Deserialize<LabsAutoCompleteViewModel>(dataViewModel);
            //string data = Request["name"].Trim();
            Flight flightDB = _fluiService.GetSingleByIns(data.flightID);
            var model = _awbByUldService.GetByName(data.Keyword, flightDB.FlightID);
            return Json(new
            {
                data = model
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveAwbIrr(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string awbInput = formRequest["awb"];
                string lagiID = awbInput.Split('/')[1];
                Lagi lagi = _lagiService.GetByLagiIdentity(lagiID);
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var awbIrr = new AwbIrr();
                awbIrr.FlightID = formRequest["flightId"];
                awbIrr.AwbID = lagiID;
                var awbDb = _awbIrrService.GetSingleByID(lagiID, formRequest["flightId"]);
                if (awbDb != null)
                {
                    return Json(new { Type = Utils.DisplayMessage.TypeError, Message = "Đã tồn AWB trong hệ thống!", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                }
                awbIrr.Prefix = lagi.LAGI_MAWB_PREFIX;
                awbIrr.AWB = lagi.LAGI_MAWB_NO.PadLeft(8, '0');
                awbIrr.GOODSNATURE = lagi.LAGI_GOODS_CONTENT;
                awbIrr.LagiMasterQuantityEx = (int)lagi.LAGI_QUANTITY_EXPECTED;
                awbIrr.LagiMasterWeightEx = lagi.LAGI_WEIGHT_EXPECTED.ToString();
                awbIrr.LAGI_MASTER_GOODS = lagi.LAGI_GOODS_CONTENT;
                awbIrr.LAGI_MASTER_PIECES = (int)lagi.LAGI_QUANTITY_RECEIVED;
                awbIrr.LAGI_MASTER_WEGIHT = lagi.LAGI_QUANTITY_RECEIVED.ToString();
                awbIrr.LagiMasterId = lagiID;
                awbIrr.AwbMaster = 1;
               // string check = Utils.Format.GetNullString(formRequest["remark"]);
                _awbIrrService.Add(awbIrr);
                _awbIrrService.Save();
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        [DocumentExport("TEXT", "DANHSACHBATTHUONG")]
        public ActionResult Remark(int id)
        {
            var awbSelect = _awbIrrService.GetById(id);
            List<HawbIrr> hawbIrrs = _hawbService.GetbyAwbIdAndFlightId(awbSelect.AwbID,awbSelect.FlightID).Where(c => c.Remark == "DMGD").ToList();
            StringBuilder content = new StringBuilder();
            foreach (var item in hawbIrrs)
            {
                if (content.ToString().Contains(item.Hawb))
                    continue;
                List<HawbIrr> listHawbCheck = new List<HawbIrr>();
                if (!string.IsNullOrEmpty(item.Hawb.Trim()) || (string.IsNullOrEmpty(item.Hawb.Trim()) && item.Remark == "DMGD"))
                {
                    listHawbCheck = _hawbService.GetbyHawbName(item.Hawb, item.AwbId,awbSelect.FlightID).ToList();
                }
                if (listHawbCheck.Count < 2 && listHawbCheck.Count > 0)
                {
                    if (!string.IsNullOrEmpty(item.Hawb.Trim()))
                    {
                        if (!string.IsNullOrEmpty(item.IrrDes))
                        {
                            string detail = (item.IrrDes + " N " + item.IrrDetails).Trim().Trim('N');
                            item.IrrDetails = "H-"+ item.Hawb + " " + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + detail;
                        }

                        else
                            item.IrrDetails = "H-" + item.Hawb + " " + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + item.IrrDetails;
                    }

                    else
                    {
                        if (!string.IsNullOrEmpty(item.IrrDes))
                        {
                            string detail = (item.IrrDes + " N " + item.IrrDetails).Trim().Trim('N');
                            item.IrrDetails = "H-" + item.Hawb + " " + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + detail;
                        }

                        else
                            item.IrrDetails = "H-" + item.Hawb + " " + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + item.IrrDetails;
                    }
                    content.Append(System.Environment.NewLine + item.IrrDetails.Trim() + "/");
                }
                else
                {
                    string result = "";
                    result += "H-" + item.Hawb + " ";
                    foreach (var hawb in listHawbCheck)
                    {
                        if (!string.IsNullOrEmpty(item.IrrDes))
                        {
                            string detail = (hawb.IrrDes + " N " + hawb.IrrDetails).Trim().Trim('N');
                            result += "P" + hawb.IrrPices + "K" + hawb.IrrWeight + " " + GetIrrDes(hawb) + " " + detail + ",";
                        }

                        else
                            result += "P" + hawb.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(hawb) + " " + hawb.IrrDetails.Replace(" ","") + ",";
                    }
                    content.Append(System.Environment.NewLine+ result.Trim(',') + "/");
                }
               
            }
            ViewBag.Content = content.ToString().Replace("CRUSHED","BEP").Replace("TORN","RACH").Replace("WET","UOT").Replace("HOLED","THUNG").Replace("BROKEN","VO");
            return View();
        }
        [DocumentExport("EXCEL", "DANHSACHBATTHUONG")]
        public ActionResult RemarkFlight(int id)
        {
            FlightIrr flight = _flightService.GetById(id);
            List<AwbIrr> listAwbIrr = _awbIrrService.GetbyFlightID(flight.FlightID).ToList();
            List<IrrRemarkViewModel> listIrrRemark = new List<IrrRemarkViewModel>();
            foreach(var awb in listAwbIrr)
            {
                IrrRemarkViewModel irr = new IrrRemarkViewModel();
                irr.Mawb = awb.Prefix + awb.AWB;
                List<HawbIrr> hawbIrrs = _hawbService.GetbyAwbId(awb.AwbID).Where(c => c.Remark == "DMGD").ToList();
                StringBuilder content = new StringBuilder();
                foreach (var item in hawbIrrs)
                {
                    if (content.ToString().Contains(item.Hawb))
                        continue;
                    List<HawbIrr> listHawbCheck = new List<HawbIrr>();
                    if (!string.IsNullOrEmpty(item.Hawb.Trim()) || (string.IsNullOrEmpty(item.Hawb.Trim()) && item.Remark == "DMGD"))
                    {
                        listHawbCheck = _hawbService.GetbyHawbName(item.Hawb, item.AwbId, flight.FlightID).ToList();
                    }
                    if (listHawbCheck.Count < 2 && listHawbCheck.Count > 0)
                    {
                        if (!string.IsNullOrEmpty(item.Hawb.Trim()))
                        {
                            if (!string.IsNullOrEmpty(item.IrrDes))
                            {
                                string detail = (item.IrrDes + " N " + item.IrrDetails).Trim().Trim('N');
                                item.IrrDetails = "H-" + item.Hawb + " " + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + detail;
                            }

                            else
                                item.IrrDetails = "H-" + item.Hawb + " " + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + item.IrrDetails;
                        }

                        else
                        {
                            if (!string.IsNullOrEmpty(item.IrrDes))
                            {
                                string detail = (item.IrrDes + " N " + item.IrrDetails).Trim().Trim('N');
                                item.IrrDetails = "H-" + item.Hawb + " " + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + detail;
                            }

                            else
                                item.IrrDetails = "H-" + item.Hawb + " " + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + item.IrrDetails;
                        }
                        content.Append(System.Environment.NewLine + item.IrrDetails.Trim() + "/");
                    }
                    else
                    {
                        string result = "";
                        result += "H-" + item.Hawb + " ";
                        foreach (var hawb in listHawbCheck)
                        {
                            if (!string.IsNullOrEmpty(item.IrrDes))
                            {
                                string detail = (hawb.IrrDes + " N " + hawb.IrrDetails).Trim().Trim('N');
                                result += "P" + hawb.IrrPices + "K" + hawb.IrrWeight + " " + GetIrrDes(hawb) + " " + detail + ",";
                            }

                            else
                                result += "P" + hawb.IrrPices + "K" + hawb.IrrWeight + " " + GetIrrDes(hawb) + " " + hawb.IrrDetails.Replace(" ", "") + ",";
                        }
                        content.Append(System.Environment.NewLine + result.Trim(',') + "/");
                    }

                }
                irr.Remark = content.ToString().Trim();
                listIrrRemark.Add(irr);
            }
            ViewData["ListIrr"] = listIrrRemark;
            ViewBag.TitleReport = "Báo cáo Remark bất thường";
            return View();
        }
        [DocumentExport("EXCEL", "BBBG")]
        public ActionResult BBBGFlight(int id)
        {
            FlightIrr flight = _flightService.GetById(id);
            List<AwbIrr> listAwbIrr = _awbIrrService.GetbyFlightID(flight.FlightID).Where(c=>c.Remarks== "DMGD").ToList();
            List<IrrRemarkViewModel> listIrrRemark = new List<IrrRemarkViewModel>();
            foreach (var awb in listAwbIrr)
            {
                IrrRemarkViewModel irr = new IrrRemarkViewModel();
                irr.Mawb = awb.Prefix + awb.AWB;
                List<HawbIrr> hawbIrrs = _hawbService.GetbyAwbIdAndFlightId(awb.AwbID,flight.FlightID).Where(c => c.Remark == "DMGD").OrderBy(c=>c.Hawb).ToList();
                StringBuilder content = new StringBuilder();
                foreach (var item in hawbIrrs)
                {
                    if (content.ToString().Contains(item.Hawb))
                        continue;
                    content.Append(item.Hawb + " ");
                }
                irr.Remark = content.ToString().Trim();
                listIrrRemark.Add(irr);
            }
            ViewData["ListIrr"] = listIrrRemark.OrderBy(c => c.Mawb.Substring(c.Mawb.Length - 1)).ThenBy(c => c.Mawb.Substring(c.Mawb.Length - 4)).ToList(); ;
            ViewBag.TitleReport = "Biên bản bàn giao bất thường";
            return View();
        }
    }
}
