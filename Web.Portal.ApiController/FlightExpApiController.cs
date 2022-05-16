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
    [RoutePrefix("api/FlightExpApi")]
    public class FlightExpApiController : ApiController
    {
        private DateTime? fromDate;
        private DateTime? toDate;
        [HttpGet] 
        public HttpResponseMessage Index(string page,string pageSize,string code,string flightNo,string fda,string tda)
        {

            int total = 0;
            int pageInput = string.IsNullOrEmpty(page) ? 1 : Convert.ToInt32(page);
            int pageSizeInput = string.IsNullOrEmpty(pageSize) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(pageSize);

            string codeInput = string.IsNullOrEmpty(code) ? "ALL" : code.Trim();

            string flightNoInput = string.IsNullOrEmpty(flightNo) ? "ALL" : flightNo.Trim();

            fromDate = string.IsNullOrEmpty(fda) ? fromDate : Web.Portal.Utils.Format.ConvertDate(fda);
            toDate = string.IsNullOrEmpty(tda) ? toDate : Web.Portal.Utils.Format.ConvertDate(tda);
            IList<Layer.FlightExport> flights = new DataAccess.FlightExportAccess().GetPagingMobile(pageInput,
                                                                                  pageSizeInput,
                                                                                  codeInput,
                                                                                  flightNoInput,
                                                                                  fromDate,
                                                                                  toDate,

                                                                                  ref total);
          
            ResultFlightExp result = new ResultFlightExp();
            result.total = total;
            result.Flights = flights.ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);


        }
        [HttpGet]
        public HttpResponseMessage GetAllFlight()
        {
            ResultFlightExp result = new ResultFlightExp();
            result.total = 0;
            result.Flights = new DataAccess.FlightExportAccess().GetAllFlight().ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);


        }
    }
}
