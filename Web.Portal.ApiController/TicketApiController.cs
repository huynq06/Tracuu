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
    [RoutePrefix("api/TicketApi")]
    public class TicketApiController : ApiController
    {
        ItblTicketStatusService _ticketService;
        public TicketApiController(ItblTicketStatusService ticketService)
        {
            this._ticketService = ticketService;
        }
        [HttpGet]
        public HttpResponseMessage Index()
        {
            try
            {
                List<TruckApiViewModel> listTruck = new List<TruckApiViewModel>();
                IEnumerable<tblTicketStatus> listTicket = _ticketService.GetAll();
                foreach(var ticket in listTicket)
                {
                    TruckApiViewModel truck = new TruckApiViewModel();
                    truck.ID = ticket.ID;
                    truck.Ticket = ticket;
                    listTruck.Add(truck);

                }
                return Request.CreateResponse(HttpStatusCode.OK, listTruck);

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "POST: " + ex.Message);
            }
        }
    }
}
