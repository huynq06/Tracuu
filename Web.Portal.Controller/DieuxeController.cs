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
namespace Web.Portal.Controller
{
    public class DieuxeController : GuestController
    {
        private DateTime? ata;
        IDangKyGoiXeService _dkgxService;
        ICallTruckService _callTruckService;
        public DieuxeController(IDangKyGoiXeService dkgxService, ICallTruckService callTruckService)
        {
            this._dkgxService = dkgxService;
            this._callTruckService = callTruckService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List(int id)
        {
            //string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "" : Request["fno"].Trim();
            //ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Web.Portal.Utils.Format.ConvertDate(Request["ata"]);
            var listTruck = _callTruckService.GetByFloor(id);
            var listTruckCount = _callTruckService.GetAll();
            ViewData["listTruck"] = listTruck;
            ViewBag.EmptySpaceFloor2 = listTruckCount.Count > 0 ? listTruckCount[0].SpaceEmptyFloor2 : 0;
            ViewBag.EmptySpaceFloor1 = listTruckCount.Count > 0 ? listTruckCount[0].SpaceEmptyFloor1 : 0;
            ViewBag.Total = listTruck.Count;
            ViewBag.ID = id.ToString();
            return View();
        }
        public ActionResult Floor1()
        {
            //string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "" : Request["fno"].Trim();
            //ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Web.Portal.Utils.Format.ConvertDate(Request["ata"]);
            var listTruck = _dkgxService.GetListTruckFloor1(50);
            ViewData["listTruck"] = listTruck;
            ViewBag.Total = listTruck.Count;
            return View();
        }
        public ActionResult CallNow(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            //_hawbService.Delete(id);
            //_hawbService.Save();
            message = "Đã xóa thông tin hàng nhanh thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
    }
}
