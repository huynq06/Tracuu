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
    public class FindUldController : GuestController
    {
        private DateTime? ata;
        IUldLogService _uldLogService;
        public FindUldController(IUldLogService uldLogService)
        {
            this._uldLogService = uldLogService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetListUldsByName(string dataViewModel)
        {
            var data = new JavaScriptSerializer().Deserialize<UldLogAutoCompleteViewModel>(dataViewModel);
            //string data = Request["name"].Trim();
            var model = new UldControlAccess().GetListUldByName(data.Keyword);
            return Json(new
            {
                data = model
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListUld()
        {
            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "" : Request["fno"].Trim();
            ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Web.Portal.Utils.Format.ConvertDate(Request["ata"]);
            List<FindUldViewModel> listULD = new ExpAWBAccess().GetUldByFlight(flightNo, ata.Value.ToString("dd/MM/yyyy"));
            foreach(var uld in listULD)
            {
                var uldDB = _uldLogService.GetByUldIns(uld.UldIns);
                if(uldDB !=null)
                {
                    uld.Modified = uldDB.Modified.HasValue ? uldDB.Modified : uldDB.Created;
                    uld.Location = uldDB.Remark;
                }
            }
            ViewData["listULD"] = listULD;
            return View();
        }
        public ActionResult List()
        {
            string uldIns = Request["uld"];
            string date = Request["date"];
            FindUldViewModel uld = new FindUldViewModel();
            if (date != "0")
            {
                 uld = new ExpAWBAccess().GetDetailUld(uldIns);
            }
            else
            {
                uld = new ExpAWBAccess().GetDetailUldOffLoad(uldIns);
            }
            //  string id = labs.Split('/')[1].ToString();
        
            uld.Remark = "";
            UldLog uldDb = _uldLogService.GetByUldIns(uldIns);
            if(uldDb != null)
            {
                uld.Remark = uldDb.Remark;
                uld.Created = uldDb.Created;
                uld.Modified = uld.Modified;
            }
            return View(uld);
        }
        public ActionResult Save(string uldViewModel)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            var uldLogViewModel = new JavaScriptSerializer().Deserialize<FindUldViewModel>(uldViewModel);
            try
            {

                UldLog uld = _uldLogService.GetByUldIns(uldLogViewModel.UldIns);
                if (uld == null)
                {
                    uld = new UldLog();
                    uld.UldIns = uldLogViewModel.UldIns;
                    uld.Remark = uldLogViewModel.Remark.ToUpper();
                    uld.Created = DateTime.Now;
                    _uldLogService.Add(uld);
                }
                else
                {
                    uld.Remark = uldLogViewModel.Remark.ToUpper();
                    uld.Modified = DateTime.Now;
                    _uldLogService.Update(uld);
                }
                    _uldLogService.Save();
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
