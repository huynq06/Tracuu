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
        public FindAwbExportController(ILabService labService)
        {
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
            var model = _labService.GetGetByName(data.Keyword,DateTime.Now.AddDays(-7));
            return Json(new
            {
                data = model
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult List()
        {
            string id = Request["awb"];
          //  string id = labs.Split('/')[1].ToString();
            List<FindAwbAwbExportViewModel> ListAwb = new ExpAWBAccess().GetLocationAwb(id);
            FindAwbAwbExportViewModel awb = new FindAwbAwbExportViewModel();
            awb.Remark = "";
            awb.Quantity = ListAwb.Count > 0 ? ListAwb[0].Quantity : "";
            awb.Weight = ListAwb.Count > 0 ? ListAwb[0].Weight : "";
            awb.Dest = ListAwb.Count > 0 ? ListAwb[0].Dest : "";
            if (new AWBDetailExportAccess().CheckCompleteAWB(id))
                awb.Status = "OK";
            else
                awb.Status = "PENDING";
           // awb.Quantity = ListAwb.Count > 0 ? ListAwb[0].Quantity : "";
            foreach (var item in ListAwb)
            {
                if(item.Position != "EDR" && item.Position != "ESW" && !awb.Remark.Contains(item.Position))
                {
                    awb.Remark = awb.Remark + item.Position + ",";
                }
            }
            awb.Remark = awb.Remark.Trim(',');
            return View(awb);
        } 
    }
   
}
