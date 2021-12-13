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
    [RoutePrefix("api/ImpAwbDetailApi")]
    public class ImpAwbDetailApiController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Index(string lagi_id)
        {
            ResultImp result = new ResultImp();
            AwbDetailViewModel imp = new AwbDetailAccess().GetAwbDetailStatus(lagi_id);
            if (imp.Pieces_Received == 0)
            {
                imp.Status = 0;
            }
            else if (imp.Pieces_Received < imp.Pieces_Expected)
            {
                imp.Status = 1;
            }
            else if (imp.Pieces_Received == imp.Pieces_Expected && imp.Pieces_Delivered < imp.Pieces_Expected)
            {
                imp.Status = 2;
            }
            else
            {
                imp.Status = 3;
            }
            CustomDetailViewModel custom = new Common.ApiViewModel.CustomDetailViewModel();
            custom.GetIn = new CustomAccess().GetInCheck(imp.Mawb, imp.Hawb);
            custom.GetOut = new CustomAccess().GetOutCheck(imp.Mawb, imp.Hawb);
            custom.Dkxd = new CustomAccess().DKXDCheck(imp.Mawb, imp.Hawb);
            custom.Kvgs = new CustomAccess().KVGSCheck(imp.Mawb, imp.Hawb);
            if(custom.Dkxd.DKXDstatus == 1)
            {
                imp.Status_Goods = 0;
                if(custom.GetIn.GetInstatus == 1)
                {
                    imp.Status_Goods = 1;
                    if(custom.Kvgs.KVGSstatus == 1)
                    {
                        imp.Status_Goods = 2;
                        if(custom.GetOut.GetInstatus == 1)
                        {
                            imp.Status_Goods = 3;
                        }
                    }
                }
            }
            else
            {
                imp.Status_Goods = -1;
            }
            return Request.CreateResponse(HttpStatusCode.OK, imp);
        }
    }
}
