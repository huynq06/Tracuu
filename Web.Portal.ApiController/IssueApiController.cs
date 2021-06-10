using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
//using System.Net.Http;
using System.Web;
using System.Web.Http;
using Web.Portal.Common.ViewModel;
using Web.Portal.Service;
using Web.Portal.Utils;
using Web.Portal.DataAccess;
using Newtonsoft.Json;
using System.Net.Http;

namespace Web.Portal.ControllerApi
{
    [RoutePrefix("api/IssueApi")]
    public class IssueApiController : ApiController
    {
        private IIssueService _issueService;
        public IssueApiController(IIssueService issueService)
        {
            this._issueService = issueService;
        }
        [HttpPost]
        public HttpResponseMessage Index(string issue_key)
        {
            try
            {
                if (!string.IsNullOrEmpty(issue_key))
                {
                    Log.WriteLog(issue_key);
                    //ProcessData.UpdateCutOffTime(issue_key);
                    return Request.CreateResponse(HttpStatusCode.OK, "OK");
                }
                 
                else
                {
                    Log.WriteLog(issue_key);
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest,"Bad Request");
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "POST: " + ex.Message);
            }
        }
        [HttpPost]
        public HttpResponseMessage Update(IssueApiViewModel issue)
        {
            try
            {
                if (!string.IsNullOrEmpty(issue.key))
                {
                    Log.WriteLog(issue.key);
                    //ProcessData.UpdateCutOffTime(issue.key);
                    return Request.CreateResponse(HttpStatusCode.OK, "OK");
                }

                else
                {
                    Log.WriteLog(issue.key);
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
