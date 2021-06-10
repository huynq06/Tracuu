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
using Web.Portal.Controller.vn.cinvoice.api;
using Web.Portal.Common.ViewModel.eInvoiceViewModel;
using System.Threading;

namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC")]
    public class PrintManagementController : BaseController
    {
        IPrintConfigService _iPrintConfigService;
        public PrintManagementController(IPrintConfigService iPrintConfigService)
        {
            this._iPrintConfigService = iPrintConfigService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            var listConfig = _iPrintConfigService.GetAll();
            ViewData["ListConfig"] = listConfig;
            return View();
        }
        public ActionResult EditConfig(int? id)
        {
            var config = new PrintConfig();
            if (id.HasValue && id.Value != 0)
                config = _iPrintConfigService.GetByID(id.Value);
            return View(config);
        }
        public ActionResult ActionConfig(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var config = new PrintConfig();
                if (keyValue != 0)
                {
                    config = _iPrintConfigService.GetByID(keyValue);
                }
                config.PrintName = formRequest["print"].ToString().Trim().ToUpper();

                // holiday.Created = DateTime.Now;

                _iPrintConfigService.Update(config);
                _iPrintConfigService.Save();
                message = "Đã sửa thông tin thành công!";


                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //  string message = "Lỗi";
                string messageType = Utils.DisplayMessage.TypeError;

                return Json(new { Type = messageType, Message = "Error " + ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
