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
    [RoutePrefix("api/SearchExportAwbApi")]
    public class SearchExportAwbApiController : ApiController
    {
        ILabService _labService;
        ILabsFavouriteService _labFavourite;
        public SearchExportAwbApiController(ILabService labService, ILabsFavouriteService labFavourite)
        {
            this._labService = labService;
            this._labFavourite = labFavourite;
        }
        [HttpGet]
        public HttpResponseMessage Index(string awb)
        {
            ResultExp result = new ResultExp();
            Lab lab = _labService.GetByMawb(awb);
            if (lab == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, result);
            }
            else
            {
                
                GenaralExp exp = new GenaralExp();
                exp.Lab_Ident = lab.LABS_IDENT_NO;
                exp.Mawb = lab.LABS_MAWB_PREFIX + lab.LABS_MAWB_SERIAL_NO;
                exp.Origin = lab.LABS_ORIGIN;
                exp.Dest = lab.LABS_DESTINATION;
                exp.Commodity = lab.LABS_CONTENT;
                exp.Pieces = (int)lab.LABS_QUANTITY_DEL;
                exp.Weight = lab.LABS_WEIGHT_DEL.ToString();
                exp.Remark = lab.LABS_REMARKS_2;
                result.GenralExp = exp;
                LabsFavourite labFav = _labFavourite.GetByLabId(lab.LABS_IDENT_NO);
                if (labFav == null || labFav.LabActive == false)
                {
                    result.IsFavourite = false;
                }
                else
                {
                    result.IsFavourite = true;
                }
                result.FlightExps = new HawbInFlightAccess().GetListMawbInFlight(lab.LABS_IDENT_NO).ToList();
                result.CargoStatus = new CargoExpStatusAccess().GetCargoStatus(lab.LABS_IDENT_NO);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }

        }
    }
}
