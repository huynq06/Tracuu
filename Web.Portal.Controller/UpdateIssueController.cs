using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Web.Portal.Common.ViewModel;
using Web.Portal.Service;

namespace Web.Portal.Controller
{
  //  [RoutePrefix("api/UpdateIssue")]
    //public class UpdateIssueController : ApiController
    //{
    //    private IIssueService _issueService;
    //    public UpdateIssueController(IIssueService issueService)
    //    {
    //        this._issueService = issueService;
    //    }
    //    [HttpPost]
    //    public HttpResponseMessage Index(IssueApiViewModel issueViewModel)
    //    {
    //        try
    //        {
    //            return Request.CreateResponse(HttpStatusCode.OK, issueViewModel.key);

    //        }
    //        catch (Exception ex)
    //        {
    //            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "POST: " + ex.Message);
    //        }
    //    }
    //}
}
