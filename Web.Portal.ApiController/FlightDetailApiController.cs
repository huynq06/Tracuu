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

namespace Web.Portal.ControllerApi
{
    [RoutePrefix("api/FlightDetailApi")]
    public class FlightDetailApiController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Index(string id)
        {

            List<AwbDetailViewModel> listAwb = new List<AwbDetailViewModel>();
            listAwb = new AwbDetailAccess().GetAwbByFlight(id);
            if(listAwb.Count > 0)
            {
                foreach (var item in listAwb)
                {
                    int delivery = int.Parse(item.StatusDelivered);
                    int pxk = item.Status_PXK;
                    int received = item.Check_Received;
                    if (delivery > 0)
                    {
                        item.Status_Goods = 3;
                    }
                    else if (pxk > 0)
                    {
                        item.Status_Goods = 2;
                    }
                    else if (received > 0)
                    {
                        item.Status_Goods = 1;
                    }
                    else
                    {
                        item.Status_Goods = 0;
                    }
                }
            }
            
            return Request.CreateResponse(HttpStatusCode.OK, listAwb);


        }
    }
}
