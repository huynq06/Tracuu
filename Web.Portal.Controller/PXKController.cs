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
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC")]
    public class PXKController : BaseController
    {
        private DateTime? ata;
        IPXKService _pxkService;
        public PXKController(IPXKService pxkService)
        {
            this._pxkService = pxkService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Web.Portal.Utils.Format.ConvertDate(Request["ata"]);
            var listPXK = _pxkService.GetByDate(ata).OrderBy(c => c.Created).ToList();
           
            List<PXKViewModel> pxkControls = new List<PXKViewModel>();

            foreach (var item in listPXK)
            {
                PXKViewModel pxk = new PXKViewModel();
                pxk.VCTNo = item.VCT;
                pxk.PXKNo = item.PXK;
                pxk.AWB = item.AWB;
                pxk.Hawb = item.Hawb;
                pxk.quantity = item.Pieces;
                pxk.weight = item.Weight;
                pxk.WaitingTime = item.Finish.HasValue? (int)Math.Round((item.Finish.Value - item.Created.Value).TotalMinutes, 0) : 0;
                pxk.Created = item.Created.Value;
                pxk.Location = item.UserName;
                pxk.GroupNumer = item.GroupNumer;
                pxk.Finish = item.Finish;
                if (pxk.WaitingTime > 30)
                {
                    pxk.SLA = false;
                }
               else
                {
                    pxk.SLA = true;
                }
                pxkControls.Add(pxk);
            }
            ViewData["pxklist"] = pxkControls;
            return View();
        }
        [DocumentExport("EXCEL", "Kiem soat PXK")]
        public ActionResult Export()
        {
            ata = string.IsNullOrEmpty(Request["ata"]) ? ata : Web.Portal.Utils.Format.ConvertDate(Request["ata"]);
            var listPXK = _pxkService.GetByDate(ata).OrderBy(c => c.Created).ToList();
            ViewBag.ATA = ata.Value.ToString("dd-MM-yyyy");
            List<PXKViewModel> pxkControls = new List<PXKViewModel>();

            foreach (var item in listPXK)
            {
                PXKViewModel pxk = new PXKViewModel();
                pxk.VCTNo = item.VCT;
                pxk.PXKNo = item.PXK;
                pxk.AWB = item.AWB;
                pxk.Hawb = item.Hawb;
                pxk.quantity = item.Pieces;
                pxk.weight = item.Weight;
                pxk.WaitingTime = item.Finish.HasValue ? (int)Math.Round((item.Finish.Value - item.Created.Value).TotalMinutes, 0) : 0;
                pxk.Created = item.Created.Value;
                pxk.Location = item.UserName;
                pxk.GroupNumer = item.GroupNumer;
                pxk.Finish = item.Finish;
                if (pxk.WaitingTime > 30)
                {
                    pxk.SLA = false;
                }
                else
                {
                    pxk.SLA = true;
                }
                pxkControls.Add(pxk);
            }
            ViewBag.Total = pxkControls.Count;
            ViewBag.OK = pxkControls.Where(c => c.SLA == true).ToList().Count;
            ViewBag.Fail = pxkControls.Where(c => c.SLA == false).ToList().Count;
            ViewData["pxklist"] = pxkControls;
            return View();
        }
    }
}
