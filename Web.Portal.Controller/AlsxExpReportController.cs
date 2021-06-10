using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using System.Web.Script.Serialization;
using System.Xml.Linq;
using Web.Portal.DataAccess;
using Web.Portal.Common.ApiViewModel;
using System.IO;
namespace Web.Portal.Controller
{
    public class AlsxExpReportController : BaseController
    {
        IEXP_AWBService _expService;
        private DateTime? fromDate;
        private DateTime? toDate;
        public AlsxExpReportController(IEXP_AWBService expService)
        {
            this._expService = expService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            ShowData();
            return View();
        }
        [DocumentExport("EXCEL", "BANG KE ALSX")]
        public ActionResult Export()
        {
            ShowData();
            ViewBag.TitleReport = "BẢNG KÊ ALSX";


            return View();
        }
        public void ShowData()
        {
            string warehouse = Request["warehouse"].Trim();
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]).Value.AddDays(1);
            List<EXP_AWB> listAwb = _expService.GetByDate(fromDate, toDate, warehouse).ToList();
            List<EXP_AWB> listResults = new List<EXP_AWB>();
            foreach(var item in listAwb)
            {
               
                    string goodContent = "";
                    string weight = "";
                    int piecesReceive = 0;
                    new CheckShcAlsxAccess().ContainDG(item.AWBID.ToString(), ref goodContent, ref weight,ref piecesReceive);
                    item.SHC = goodContent;
                    item.WEIGHT = weight;
                    item.RECEIVED_PIECES = piecesReceive;
                    if (!item.SHC.Contains("DG") && item.BOOKED_PIECES == item.RECEIVED_PIECES)
                    {
                        listResults.Add(item);
                    }
                
               
            }
            ViewBag.FromDate = fromDate.Value.ToString("dd/MM/yyyy");
            ViewBag.ToDate = toDate.Value.AddDays(-1).ToString("dd/MM/yyyy");
            ViewBag.Total = listResults.Count;
           ViewData["listAwb"] = listResults;
        }
    }
}
