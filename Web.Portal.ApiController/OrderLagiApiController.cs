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
    [RoutePrefix("api/OrderLagi")]
    public class OrderLagiApiController : ApiController
    {
        IOrderLagiDetailService _orderLagiDetailService;
        IOrderLagiService _orderLagiService;
        public OrderLagiApiController(IOrderLagiDetailService orderLagiDetailService, IOrderLagiService orderLagiService)
        {
            this._orderLagiDetailService = orderLagiDetailService;
            this._orderLagiService = orderLagiService;
        }
        [HttpPost]
        public HttpResponseMessage Add(OrderLagiViewModel orderDetails)
        {
            try
            {
                if (orderDetails.OrderLagiDetails.Count >0)
                {
                    OrderLagi order = new OrderLagi();
                    order.OrderGuid = Guid.NewGuid();
                    order.Created = DateTime.Now;
                    order.UserID = orderDetails.UserID;
                    order.TokenID = orderDetails.TokenID;
                    order.Name = "";
                    _orderLagiService.Add(order);
                    foreach(var item in orderDetails.OrderLagiDetails)
                    {
                        OrderLagiDetail orderLagiDetails = new OrderLagiDetail();
                        orderLagiDetails.LagiId = item.lId;
                        orderLagiDetails.Mawb = item.mawb;
                        orderLagiDetails.Hawb = item.hawb;
                        orderLagiDetails.OrderID = order.OrderGuid;
                        orderLagiDetails.Note = "";
                        orderLagiDetails.IsFavourite = item.isFavourite;
                        _orderLagiDetailService.Add(orderLagiDetails);
                    }
                    _orderLagiService.Save();
                    OrderLagiResultViewModel orderResult = new OrderLagiResultViewModel();
                    orderResult.ID = order.ID;
                    orderResult.OrderId = order.OrderGuid;
                    orderResult.UserId = order.UserID;
                    orderResult.OrderLagiDetails = orderDetails.OrderLagiDetails;
                    orderResult.Created = order.Created.Value;
                    return Request.CreateResponse(HttpStatusCode.OK, orderResult);
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
        [HttpGet]
        public HttpResponseMessage Index(string id)
        {
            try
            {
                List<OrderLagiResultViewModel> listOrderResult = new List<OrderLagiResultViewModel>();
                List<OrderLagi> listOrderLagi = _orderLagiService.GetAll(Guid.Parse(id)).ToList();
                foreach(var item in listOrderLagi)
                {
                    List<OrderLagiDetailViewModel> orderLagiViewModels = new List<OrderLagiDetailViewModel>();
                    OrderLagiResultViewModel orderResult = new OrderLagiResultViewModel();
                    orderResult.ID = item.ID;
                    orderResult.OrderId = item.OrderGuid;
                    orderResult.UserId = item.UserID;
                    orderResult.Created = item.Created.Value;
                    List<OrderLagiDetail> orderLagiDetails = _orderLagiDetailService.GetByOrderId(item.OrderGuid.Value).ToList();
                    foreach(var itemDetail in orderLagiDetails)
                    {
                        OrderLagiDetailViewModel orderViewModel = new OrderLagiDetailViewModel();
                        orderViewModel.lId = itemDetail.LagiId;
                        orderViewModel.hawb = itemDetail.Hawb;
                        orderViewModel.mawb = itemDetail.Mawb;
                        orderViewModel.isFavourite = itemDetail.IsFavourite.HasValue ? itemDetail.IsFavourite.Value : false;
                        orderLagiViewModels.Add(orderViewModel);
                    }
                    orderResult.OrderLagiDetails = orderLagiViewModels;
                    listOrderResult.Add(orderResult);
                }
                return Request.CreateResponse(HttpStatusCode.OK, listOrderResult);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "POST: " + ex.Message);
            }
        }
    }
}
