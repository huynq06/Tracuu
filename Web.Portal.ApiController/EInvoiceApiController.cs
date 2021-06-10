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
    [RoutePrefix("api/EInvoiceApi")]
    public class EInvoiceApiController : ApiController
    {

        IHermesInvoiceService _iHermesInvoiceService;
        IHermesInvoiceDetailService _iHermesInvoiceDetailService;
        IPrintService _iPrintService;
        IActionLogService _iActionLogService;
        IResponseMessageService _iResponseMessageService;

        public EInvoiceApiController(IHermesInvoiceService iHermesInvoiceService,
            IHermesInvoiceDetailService iHermesInvoiceDetailService, IPrintService iPrintService,
            IActionLogService iActionLogService, IResponseMessageService iResponseMessageService)
        {
            this._iHermesInvoiceService = iHermesInvoiceService;
            this._iHermesInvoiceDetailService = iHermesInvoiceDetailService;
            this._iPrintService = iPrintService;
            this._iActionLogService = iActionLogService;
            this._iResponseMessageService = iResponseMessageService;
        }
        [HttpGet]
        public HttpResponseMessage Index(string invoiceid)
        {
            try
            {
                HermesInvoice invoice = new HermesInvoice();
                if (!string.IsNullOrEmpty(invoiceid))
                {
                    invoice =  _iHermesInvoiceService.GetByInvoiceID(invoiceid);

                    if(invoice == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, invoice);
                    }
                    else if (invoice.InvoiceIsn == null)
                    {
                        HermesInvoice invoiceReference = null;
                        return Request.CreateResponse(HttpStatusCode.OK, invoiceReference);
                    }
                    else
                    {
                        List<InvoiceApiViewModel> listInvoiceViewModel = new List<InvoiceApiViewModel>();
                        InvoiceApiViewModel invoiceModel = new InvoiceApiViewModel();
                        invoiceModel.InvoiceID = invoiceid;
                        invoiceModel.InvoiceNumber = invoice.InvoiceNumber;
                        invoiceModel.eInvoiceNumber = invoice.Sequence.ToString().PadLeft(7, '0');
                        invoiceModel.InvoiceStatus = invoice.InvoiceStatus.Value;
                        invoiceModel.InvoiceDescription = invoice.InvoiceDescription;
                        invoiceModel.Awb = invoice.AWB;
                        invoiceModel.Hawb = invoice.Hawb;
                        invoiceModel.Form = "01GTKT0/001";
                        if (invoice.ObjectType == "IMPORT AWB")
                        {
                            invoiceModel.Serial = "AN/20E";
                        }
                        else
                        {
                            invoiceModel.Serial = "AX/20E";
                        }
                        return Request.CreateResponse(HttpStatusCode.OK, invoiceModel);
                    }
                  
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
    }
}
