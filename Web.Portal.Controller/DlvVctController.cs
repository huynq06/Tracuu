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
using Newtonsoft.Json;
using Web.Portal.Utils;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Text;
using System.Net;
using System.Net.Http;

using System.Threading;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KTN")]
    public class DlvVctController : BaseController
    {
        private DateTime? ata;
        IALSC_VCT_TO_DLV_BY_XMLService _vctService;
        public DlvVctController(IALSC_VCT_TO_DLV_BY_XMLService vctService)
        {
            this._vctService = vctService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Edit(int? id)
        {
            var vct = new ALSC_VCT_TO_DLV_BY_XML();
            return View(vct);
        }
        public ActionResult List()
        {
            string vctNo = string.IsNullOrEmpty(Request["vctNo"]) ? "" : Request["vctNo"].Trim();
            ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Format.ConvertDate(Request["ata"]);
            IEnumerable<ALSC_VCT_TO_DLV_BY_XML> listVct = _vctService.GetList(ata.Value);
            if (!string.IsNullOrEmpty(vctNo))
            {
                listVct = listVct.Where(p => p.VCT_NO == vctNo).ToList();
            }
            ViewData["vctLists"] = listVct.ToList();
            ViewBag.TotalRecord = listVct.Count();

            return View();
        }
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {
                var userName = Session["accountName"];
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var vct = new ALSC_VCT_TO_DLV_BY_XML();
                //if (keyValue != 0)
                //{
                //    hawb = _hawbService.GetByID(keyValue);
                //}
                vct.VCT_NO = Utils.Format.GetNullString(formRequest["vct"]).ToUpper().Trim();
                if (keyValue == 0)
                {
                    if (vct.VCT_NO.Trim().Length != 14 || !vct.VCT_NO.StartsWith("300") || !vct.VCT_NO.Trim().All(char.IsDigit))
                    { 
                        message = "SAI ĐỊNH DẠNG VCT";
                        messageType = Utils.DisplayMessage.TypeError;
                        return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                    }
                    var vctDb = _vctService.GetByVCT(vct.VCT_NO);
                    if (vctDb != null)
                    {
                        //update lai thoi gian nhan
                        message = "VCT ĐÃ ĐƯỢC SCAN";
                        messageType = Utils.DisplayMessage.TypeError;
                        return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        vct.SCAN_DATETIME = DateTime.Now;
                        _vctService.Add(vct);
                        _vctService.Save();
                        message = "SCAN VCT THÀNH CÔNG!";
                    }

                }


                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Delete(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            _vctService.Delete(id);
            _vctService.Save();
            message = "Đã xóa thông tin vct thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
    }
}
