using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Portal.Service;

namespace Web.Portal.Controller
{
    public class ErrorController : BaseController
    {
        IErrorService _errorService;
        public ErrorController(IErrorService errorService)
        {
            this._errorService = errorService;
        }
        public ActionResult Index()
        {
            var model = _errorService.GetAll();
            ViewData["ErrorList"] = model.ToList();
            ViewBag.TotalRecord = model.ToList().Count;
            return View();
        }
    }
}