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
    [RoutePrefix("api/ExportAwbTrackStatusApi")]
    public class ExportAwbTrackStatusApiController : ApiController
    {
        ILabService _labService;
        IVCTService _vctService;
        public ExportAwbTrackStatusApiController(ILabService labService, IVCTService vctService)
        {
            this._labService = labService;
            this._vctService = vctService;
        }
        [HttpGet]
        public HttpResponseMessage Index(string lab_Ident)
        {
            ExportAwbTrackStatusResult result = new ExportAwbTrackStatusResult();
            VCT vct = _vctService.GetByLabIdent(lab_Ident);
            ExportAwbTrackStatusViewModel item = new ExportAwbTrackStatusViewModel();
            List<ExportAwbTrackStatusViewModel> listExport = new List<ExportAwbTrackStatusViewModel>();
            item.ID = 1;
            item.Title = "VCT";
            item.SubTitle = vct.LABS_CREATED_AT.Value.ToString("dd/MM/yyyy HH:mm");
            listExport.Add(item);
            ExportAwbTrackStatusViewModel item2 = new ExportAwbTrackStatusViewModel();
            item2.ID = 2;
            item2.Title = "DIM";
            item2.SubTitle = "";
            if (vct.LABS_DIM_AT != null)
                item2.SubTitle = vct.LABS_DIM_AT.Value.ToString("dd/MM/yyyy HH:mm");
            listExport.Add(item2);
            ExportAwbTrackStatusViewModel item3 = new ExportAwbTrackStatusViewModel();
            item3.ID = 3;
            item3.Title = "Confirmed";
            item3.SubTitle = "";
            if (vct.LABS_CONFIRMED_AT != null)
                item3.SubTitle = vct.LABS_CONFIRMED_AT.Value.ToString("dd/MM/yyyy HH:mm");
            listExport.Add(item3);
            ExportAwbTrackStatusViewModel item4 = new ExportAwbTrackStatusViewModel();
            item4.ID = 4;
            item4.Title = "Departed";
            item4.SubTitle = "";
            listExport.Add(item4);
            if (vct.LABS_CONFIRMED_AT != null)
            {
                result.Status = 2;
            }
            else if (vct.LABS_DIM_AT != null)
            {
                result.Status = 1;
            }
            else
                result.Status = 0;
            result.TrackStatus = listExport;
            return Request.CreateResponse(HttpStatusCode.OK, result);


        }
    }
}
