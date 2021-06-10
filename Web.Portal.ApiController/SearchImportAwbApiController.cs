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
    [RoutePrefix("api/SearchImportAwbApi")]
    public class SearchImportAwbApiController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Index(string awb)
        {
            ResultImp result = new ResultImp();
            List<GeneralImp> listGenaralImp = new SearchImpAwbAccess().GetAwbDetail(awb);
            if(listGenaralImp.Count == 0)
            {
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            else
            {
                if(listGenaralImp.Count == 1)
                {
                    result.GenralImp = listGenaralImp[0];
                    result.FlightImps = new HawbInFlightAccess().GetListFlight(listGenaralImp[0].Lagi_Ident);
                    result.CargoStatus = new CargoStatusAccess().GetCargoStatus(listGenaralImp[0].Lagi_Ident);
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
                else
                {
                    int count = listGenaralImp.Count - 1;
                    listGenaralImp[0].Hawb = "TÁCH " + count + " HAWB";
                    result.GenralImp = listGenaralImp.SingleOrDefault(c => c.Lagi_Master_Ident == "0");
                    result.FlightImps = new HawbInFlightAccess().GetListFlight(listGenaralImp.SingleOrDefault(c => c.Lagi_Master_Ident == "0").Lagi_Ident);
                    result.CargoStatus = new CargoStatusAccess().GetCargoStatus(listGenaralImp.SingleOrDefault(c => c.Lagi_Master_Ident == "0").Lagi_Ident);
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
           
        }
    }
}
