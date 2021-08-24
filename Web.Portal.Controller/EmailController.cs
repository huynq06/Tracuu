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
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KTX,KTN")]
    public class EmailController : BaseController
    {
        IIADR_INVOICE_ADDRESSESService _iadrAddService;
        IIADR_INVOICE_EMAILService _iadrEmailService;
        public EmailController(IIADR_INVOICE_ADDRESSESService iadrAddService, IIADR_INVOICE_EMAILService iadrEmailService)
        {
            this._iadrAddService = iadrAddService;
            this._iadrEmailService = iadrEmailService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            List<IADR_INVOICE_EMAIL> listEmail = _iadrEmailService.GetListEmail().ToList();
            List<EmailViewModel> listEmailViewModel = new List<EmailViewModel>();
            foreach(var item in listEmail)
            {
                EmailViewModel email = new EmailViewModel();
                if(listEmailViewModel.All(c=>c.Name != item.NAME))
                {
                    email.ID = item.ID;
                    email.Name = item.NAME;
                    email.Email = item.EMAIL;
                    listEmailViewModel.Add(email);
                }
            }
            ViewData["listEmail"] = listEmailViewModel;
            return View();
        }
        public ActionResult Edit(int? id)
        {
            var email = new IADR_INVOICE_EMAIL();
            if (id.HasValue && id.Value != 0)
                email = _iadrEmailService.GetByID(id.Value);
            return View(email);
        }
        public ActionResult Action(FormCollection formRequest)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            string name = Utils.Format.GetNullString(formRequest["name"]).Trim();
            string email = Utils.Format.GetNullString(formRequest["email"]).Trim();
            var emailItem = new IADR_INVOICE_EMAIL();
            List<IADR_INVOICE_ADDRESSES> listIadrInvoiceAdd = new List<IADR_INVOICE_ADDRESSES>();
            listIadrInvoiceAdd = _iadrAddService.GetByName(name).ToList();
            int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
            if (keyValue != 0)
            {
                emailItem = _iadrEmailService.GetByID(keyValue);
            }
            if (keyValue == 0)
            {
                if(_iadrEmailService.CheckExistEmail(listIadrInvoiceAdd[0].IADR_ADDRESS_ISN))
                {
                    _iadrEmailService.Update(name, email);
                    _iadrEmailService.Save();
                    message = "Đã sửa thông tin Email thành công!";
                }
                else
                {
                    foreach (var item in listIadrInvoiceAdd)
                    {
                        IADR_INVOICE_EMAIL emailObj = new IADR_INVOICE_EMAIL();
                        emailObj.EMAIL = email;
                        emailObj.IADR_ADDRESS_ISN = item.IADR_ADDRESS_ISN;
                        emailObj.NAME = item.IADR_NAME_1;
                        _iadrEmailService.Add(emailObj);

                    }
                    _iadrEmailService.Save();
                    message = "Đã thêm mới Email thành công!";
                }
             
            }
            else
            {
                _iadrEmailService.Update(name, email);
                _iadrEmailService.Save();
                message = "Đã sửa thông tin Email thành công!";
            }
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetListULDByName(string dataViewModel)
        {
            var data = new JavaScriptSerializer().Deserialize<CopmanyViewModel>(dataViewModel);
            //string data = Request["name"].Trim();
            var model = _iadrAddService.GetListULDByName(data.KeyWord);
            return Json(new
            {
                data = model
            }, JsonRequestBehavior.AllowGet);
        }
    }
    public class CopmanyViewModel
    {
        public string KeyWord { set; get; }
    }
}
