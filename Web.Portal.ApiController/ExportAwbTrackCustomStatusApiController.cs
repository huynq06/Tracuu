using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Web.Portal.Common.ApiViewModel;
using Web.Portal.Service;
using Web.Portal.Utils;
using Web.Portal.DataAccess;
using Newtonsoft.Json;
using Web.Portal.Model.Models;

namespace Web.Portal.ControllerApi
{
    [RoutePrefix("api/ExportAwbTrackCustomStatusApi")]
    public class ExportAwbTrackCustomStatusApiController : ApiController
    {

        [HttpGet]
        public HttpResponseMessage Index(string labIdent)
        {

            List<ExportAwbTrackCustomStatusViewModel> listExportCustom = new List<ExportAwbTrackCustomStatusViewModel>();
            listExportCustom = new CustomAccess().ExportAwbCustomStatus(labIdent);
            if (listExportCustom[0].GetInCreated == null)
            {
                listExportCustom = new List<ExportAwbTrackCustomStatusViewModel>();
            }

            return Request.CreateResponse(HttpStatusCode.OK, listExportCustom);
        }

    }
}
