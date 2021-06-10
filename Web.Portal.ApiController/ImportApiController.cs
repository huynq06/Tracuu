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
    [RoutePrefix("api/ImportApi")]
    public class ImportApiController : ApiController
    {
        IHermesInvoiceService _iHermesInvoiceService;
        public ImportApiController(IHermesInvoiceService iHermesInvoiceService)
        {
            this._iHermesInvoiceService = iHermesInvoiceService;
        }
        public HttpResponseMessage Index(string lagi_identity)
        {
            try
            {
                if (!string.IsNullOrEmpty(lagi_identity))
                {
                    List<HawbInFlightViewModel> listInvoice = new DataAccess.HawbInFlightAccess().GetListHawbInFlight(lagi_identity).ToList();
                    return Request.CreateResponse(HttpStatusCode.OK, listInvoice);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Bad Request");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "POST: " + ex.Message);
            }
        }
    }
}
