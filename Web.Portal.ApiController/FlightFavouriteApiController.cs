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
    [RoutePrefix("api/FlightFavourite")]
    public class FlightFavouriteApiController : ApiController
    {
        IFlightFavouriteService _flightService;
        IOrderLagiService _orderLagiService;
        public FlightFavouriteApiController(IFlightFavouriteService flightService, IOrderLagiService orderLagiService)
        {
            this._flightService = flightService;
            this._orderLagiService = orderLagiService;
        }
        [HttpPost]
        public HttpResponseMessage Add(FlightFavouriteViewModel flightViewModel)
        {
            try
            {

                FlightFavourite flight = new FlightFavourite();
                var flightDb = _flightService.GetByFlightId(flightViewModel.FlightID);
                if(flightDb== null)
                {
                    flight.FlightID = flightViewModel.FlightID;
                    flight.Created = DateTime.Now;
                    flight.UserID = flightViewModel.UserID;
                    flight.TokenID = flightViewModel.TokenID;
                    flight.FlightStatus = 0;
                    flight.Description = flightViewModel.Type;
                    flight.FlightActive = true;
                    flight.IsSendNotification = false;
                    _flightService.Add(flight);
                }
                else
                {
                    flightDb.FlightActive = !flightDb.FlightActive;
                    _flightService.Update(flightDb);
                }
                _flightService.Save();
                 
                    return Request.CreateResponse(HttpStatusCode.OK, flightViewModel);
               

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "POST: " + ex.Message);
            }
        }
        [HttpGet]
        public HttpResponseMessage Index(string userId, string type)
        {
            try
            {
                List<FlightFavouriteViewModel> listFlight = new List<FlightFavouriteViewModel>();
                List<FlightFavourite> flights = _flightService.GetAll(Guid.Parse(userId), type).ToList();
                foreach(var item in flights)
                {
                    FlightFavouriteViewModel flightViewModel = new FlightFavouriteViewModel();
                    flightViewModel.FlightID = item.FlightID;
                    flightViewModel.TokenID = item.TokenID;
                    flightViewModel.UserID = item.UserID.Value;
                    listFlight.Add(flightViewModel);
                }
                return Request.CreateResponse(HttpStatusCode.OK, listFlight);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "POST: " + ex.Message);
            }
        }
    }
}
