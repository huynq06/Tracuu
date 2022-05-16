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
    [RoutePrefix("api/LabFavourite")]
    public class LabFavouriteApiController : ApiController
    {
        ILabsFavouriteService _labService;
        public LabFavouriteApiController(ILabsFavouriteService labService)
        {
            this._labService = labService;
        }
        [HttpPost]
        public HttpResponseMessage Add(LabFavouriteViewModel labViewModel)
        {
            try
            {

                LabsFavourite lab = new LabsFavourite();
                var labDb = _labService.GetByLabId(labViewModel.Lab_Idents);
                if (labDb == null)
                {
                    lab.Lab_Ident = labViewModel.Lab_Idents;
                    lab.Created = DateTime.Now;
                    lab.UserId = labViewModel.UserID;
                    lab.TokenID = labViewModel.TokenID;
                    lab.Lab_Status = 0;
                    lab.Description = "";
                    lab.LabActive = true;
                    lab.IsSendNotification = false;
                    _labService.Add(lab);
                }
                else
                {
                    labDb.LabActive = !labDb.LabActive;
                    _labService.Update(labDb);
                }
                _labService.Save();

                return Request.CreateResponse(HttpStatusCode.OK, labViewModel);


            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "POST: " + ex.Message);
            }
        }
    }
}
