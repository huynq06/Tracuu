using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Web.Portal.Common.ViewModel;
using Web.Portal.Service;
using Web.Portal.Utils;
using Web.Portal.DataAccess;
using Newtonsoft.Json;
using Web.Portal.Model.Models;
using Web.Portal.Common.ApiViewModel;

namespace Web.Portal.ControllerApi
{
    [RoutePrefix("api/ReportQuantityApi")]
    public class ReportQuantityApiController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Index()
        {
            try
            {
                string[] listtick = new string[10];
                QuantityReportChart report = new QuantityReportChart();
                report.Imports = new QuantityDataAccess().GetData(ref listtick); 
                report.Exports = new QuantityDataAccess().GetDataExp();
                report.TickValues = listtick;
                report.TotalImport = 0;
                report.TotalExport = 0;
                
              
                    return Request.CreateResponse(HttpStatusCode.OK, report);

               


            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "POST: " + ex.Message);
            }
        }
    }
}
