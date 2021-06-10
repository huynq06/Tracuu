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
    public class CheckGetInController : GuestController
    {
        public ActionResult Index()
        {
            
            return View();
        }
        public ActionResult List()
        {
            string DateCreated = Request["date"];
            List<CheckGetIn> listCheckGetIns = new CheckGetInAccess().CheckGetInToday(DateCreated);
            List<CheckGetIn> listCheckGetInReults = listCheckGetIns.Where(c => c.GetIn_Process == -1 || c.INT_OUT_STATUS != 1).ToList();
            int count = listCheckGetIns.Count;
            ViewData["listGetIn"] = listCheckGetInReults;
            return View();
        }
    }
}
