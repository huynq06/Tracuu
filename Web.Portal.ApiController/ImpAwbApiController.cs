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
using Web.Portal.Common.ViewModel;

namespace Web.Portal.ControllerApi
{
    [RoutePrefix("api/ImpAwbApi")]
    public class ImpAwbApiController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Index(string awb)
        {
            ResultImp result = new ResultImp();
            List<AwbDetailViewModel> listGenaralImp = new AwbDetailAccess().GetAwbGeneralDetail(awb, "ALL");
            return Request.CreateResponse(HttpStatusCode.OK, listGenaralImp);
        }
        //[HttpGet()]
        //public HttpResponseMessage GetLagi(string awb)
        //{
        //    ResultImp result = new ResultImp();
        //    List<AwbDetailViewModel> listGenaralImp = new AwbDetailAccess().GetAwbGeneralDetail(awb, "ALL");
        //    return Request.CreateResponse(HttpStatusCode.OK, listGenaralImp);
        //}
    }
}
