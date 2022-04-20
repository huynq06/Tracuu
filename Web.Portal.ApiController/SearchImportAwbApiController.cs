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
using System.Text;

namespace Web.Portal.ControllerApi
{
    [RoutePrefix("api/SearchImportAwbApi")]
    public class SearchImportAwbApiController : ApiController
    {
        IAwbIrrService _awbIrrService;
        IHawbIrrService _hawbService;
        public SearchImportAwbApiController(IAwbIrrService awbIrrService, IHawbIrrService hawbService)
        {
            this._awbIrrService = awbIrrService;
            this._hawbService = hawbService;
        }
        [HttpGet]
        public HttpResponseMessage Index(string awb)
        {
            ResultImp result = new ResultImp();
            List<GeneralImp> listGenaralImp = new SearchImpAwbAccess().GetAwbDetail(awb.Trim().ToUpper());
            if(listGenaralImp.Count == 0)
            {
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            else
            {
                if (listGenaralImp.Count == 1)
                {
                    result.GenralImp = listGenaralImp[0];
                    if(!string.IsNullOrEmpty(listGenaralImp[0].Hawb.Trim()))
                    {
                        HawbIrr hawbIrr = new HawbIrr();
                         hawbIrr = _hawbService.GetSingleByID(listGenaralImp[0].Lagi_Ident);
                        if(hawbIrr != null)
                        {
                            List<HawbIrr> listHawbCheck = new List<HawbIrr>();
                            listHawbCheck = _hawbService.GetbyHawbId(listGenaralImp[0].Lagi_Ident).ToList();
                            if (listHawbCheck.Count < 2)
                            {
                                if (!string.IsNullOrEmpty(hawbIrr.Hawb.Trim()))
                                {
                                    hawbIrr.IrrDetails = hawbIrr.Hawb + ": " + "P" + hawbIrr.IrrPices + "K" + hawbIrr.IrrWeight + " " + GetIrrDes(hawbIrr) + " " + hawbIrr.IrrDetails;
                                }

                                else
                                {
                                    hawbIrr.IrrDetails = "P" + hawbIrr.IrrPices + "K" + hawbIrr.IrrWeight + " " + GetIrrDes(hawbIrr) + " " + hawbIrr.IrrDetails;
                                }
                                if (!string.IsNullOrEmpty(hawbIrr.LAGI_REMARK))
                                    hawbIrr.IrrDetails += " <br>" + hawbIrr.LAGI_REMARK.Replace("\n", "<br>");
                                hawbIrr.IrrPices = listHawbCheck.Sum(c => c.IrrPices);
                                hawbIrr.IrrWeight = listHawbCheck.Sum(c => c.IrrWeight);
                                result.FlightImps = new HawbInFlightAccess().GetListFlight(listGenaralImp[0].Lagi_Ident);
                                result.CargoStatus = new CargoStatusAccess().GetCargoStatus(listGenaralImp[0].Lagi_Ident);
                                result.GenralImp.Remark = hawbIrr.IrrDetails;
                                return Request.CreateResponse(HttpStatusCode.OK, result);
                            }
                            else
                            {
                                StringBuilder builder = new StringBuilder();
                                if (!string.IsNullOrEmpty(listHawbCheck[0].Hawb.Trim()))
                                    builder.Append(hawbIrr.Hawb + ": ");
                                foreach (var item in listHawbCheck)
                                {
                                    builder.AppendLine("<br>" + "-" + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + item.IrrDetails + " " + " LDD IN " + item.ULD.Replace(" ", "") + " " + item.IrrRemark);
                                    if (!string.IsNullOrEmpty(item.LAGI_REMARK))
                                        builder.AppendLine("<br>" + item.LAGI_REMARK);
                                }

                                hawbIrr.IrrPices = listHawbCheck.Sum(c => c.IrrPices);
                                hawbIrr.IrrWeight = listHawbCheck.Sum(c => c.IrrWeight);
                                hawbIrr.IrrDetails = builder.ToString();
                                result.FlightImps = new HawbInFlightAccess().GetListFlight(listGenaralImp[0].Lagi_Ident);
                                result.CargoStatus = new CargoStatusAccess().GetCargoStatus(listGenaralImp[0].Lagi_Ident);
                                result.GenralImp.Remark = builder.ToString();
                                return Request.CreateResponse(HttpStatusCode.OK, result);
                            }
                        }
                        else
                        {
                           
                            //HawbIrr hawbIrr = _hawbService.GetSingleByID(listGenaralImp[0].Lagi_Ident);
                            if (true)
                            {
                                List<HawbIrr> listHawbCheck = new List<HawbIrr>();
                                // listHawbCheck = _hawbService.GetbyHawbId(listGenaralImp[0].Lagi_Ident).ToList();
                                listHawbCheck = new HawbInAwbAccess().GetIrrByHawb(listGenaralImp[0].Lagi_Ident, listGenaralImp[0].Hawb);
                                if(listHawbCheck.Count ==0)
                                {
                                    result.FlightImps = new HawbInFlightAccess().GetListFlight(listGenaralImp[0].Lagi_Ident);
                                    result.CargoStatus = new CargoStatusAccess().GetCargoStatus(listGenaralImp[0].Lagi_Ident);
                                    return Request.CreateResponse(HttpStatusCode.OK, result);
                                }
                                else if (listHawbCheck.Count < 2)
                                {
                                    if (!string.IsNullOrEmpty(listGenaralImp[0].Hawb))
                                    {
                                        hawbIrr.IrrDetails = listGenaralImp[0].Hawb + ": " + "P" + listHawbCheck[0].IrrPices + "K" + listHawbCheck[0].IrrWeight + " " + GetIrrDes(hawbIrr) + " " + hawbIrr.IrrDetails;
                                    }

                                    else
                                    {
                                        hawbIrr.IrrDetails = "P" + listHawbCheck[0].IrrPices + "K" + listHawbCheck[0].IrrWeight + " " + GetIrrDes(listHawbCheck[0]) + " " + listHawbCheck[0].IrrDetails;
                                    }
                                    if (!string.IsNullOrEmpty(hawbIrr.LAGI_REMARK))
                                        hawbIrr.IrrDetails += " <br>" + hawbIrr.LAGI_REMARK.Replace("\n", "<br>");
                                    hawbIrr.IrrPices = listHawbCheck.Sum(c => c.IrrPices);
                                    hawbIrr.IrrWeight = listHawbCheck.Sum(c => c.IrrWeight);
                                    result.FlightImps = new HawbInFlightAccess().GetListFlight(listGenaralImp[0].Lagi_Ident);
                                    result.CargoStatus = new CargoStatusAccess().GetCargoStatus(listGenaralImp[0].Lagi_Ident);
                                    result.GenralImp.Remark = hawbIrr.IrrDetails;
                                    return Request.CreateResponse(HttpStatusCode.OK, result);
                                }
                                else
                                {
                                    StringBuilder builder = new StringBuilder();
                                    if (!string.IsNullOrEmpty(listGenaralImp[0].Hawb))
                                        builder.Append(listGenaralImp[0].Hawb + ": ");
                                    foreach (var item in listHawbCheck)
                                    {
                                        builder.AppendLine("<br>" + "-" + "P" + item.IrrPices + "K" + item.IrrWeight + " " + GetIrrDes(item) + " " + item.IrrDetails + " " + " LDD IN " + item.ULD.Replace(" ", "") + " " + item.IrrRemark);
                                        if (!string.IsNullOrEmpty(item.LAGI_REMARK))
                                            builder.AppendLine("<br>" + item.LAGI_REMARK);
                                    }

                                    hawbIrr.IrrPices = listHawbCheck.Sum(c => c.IrrPices);
                                    hawbIrr.IrrWeight = listHawbCheck.Sum(c => c.IrrWeight);
                                    hawbIrr.IrrDetails = builder.ToString();
                                    result.FlightImps = new HawbInFlightAccess().GetListFlight(listGenaralImp[0].Lagi_Ident);
                                    result.CargoStatus = new CargoStatusAccess().GetCargoStatus(listGenaralImp[0].Lagi_Ident);
                                    result.GenralImp.Remark = builder.ToString();
                                    return Request.CreateResponse(HttpStatusCode.OK, result);
                                }
                            }
                            else
                            {
                                result.FlightImps = new HawbInFlightAccess().GetListFlight(listGenaralImp[0].Lagi_Ident);
                                result.CargoStatus = new CargoStatusAccess().GetCargoStatus(listGenaralImp[0].Lagi_Ident);
                                return Request.CreateResponse(HttpStatusCode.OK, result);
                            }
                        }
                       
                    }
                    else
                    {
                        result.FlightImps = new HawbInFlightAccess().GetListFlight(listGenaralImp[0].Lagi_Ident);
                        result.CargoStatus = new CargoStatusAccess().GetCargoStatus(listGenaralImp[0].Lagi_Ident);
                        return Request.CreateResponse(HttpStatusCode.OK, result);
                    }
                    
                }
                else
                {
                    int count = listGenaralImp.Count - 1;
                    listGenaralImp[0].Hawb = "TÁCH " + count + " HAWB";
                    result.GenralImp = listGenaralImp.SingleOrDefault(c => c.Lagi_Master_Ident == "0");
                    result.FlightImps = new HawbInFlightAccess().GetListFlight(listGenaralImp.SingleOrDefault(c => c.Lagi_Master_Ident == "0").Lagi_Ident);
                    result.CargoStatus = new CargoStatusAccess().GetCargoStatus(listGenaralImp.SingleOrDefault(c => c.Lagi_Master_Ident == "0").Lagi_Ident);
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }

           
        }
        public string GetIrrDes(HawbIrr item)
        {
            string des = "";
            if (item.IrrMsca.HasValue && item.IrrMsca == true)
            {
                des += "MSCA/";
            }
            if (item.IrrCrushed.HasValue && item.IrrCrushed == true)
            {
                des += "CRUSHED/";
            }

            if (item.IrrWet.HasValue && item.IrrWet == true)
            {
                des += "WET/";
            }
            if (item.IrrFdca.HasValue && item.IrrFdca == true)
            {
                des += "FDCA/";
            }
            if (item.IrrBroken.HasValue && item.IrrBroken == true)
            {
                des += "BROKEN/";
            }
            if (item.IrrWithoutLabel.HasValue && item.IrrWithoutLabel == true)
            {
                des += "WITHOUT LABEL/";
            }
            if (item.IrrHoled.HasValue && item.IrrHoled == true)
            {
                des += "HOLED/";
            }
            if (item.IrrOvcd.HasValue && item.IrrOvcd == true)
            {
                des += "OVCD/";
            }


            if (!string.IsNullOrEmpty(item.IrrDes))
            {
                if (item.IrrTorn.HasValue && item.IrrTorn == true)
                {
                    des = des.Trim('/');
                    string detail = (item.IrrDes + " & TORN ").Trim();
                    des += " " + detail;
                }
                else
                {
                    des = des.Trim('/');
                    string detail = "";
                    if (string.IsNullOrWhiteSpace(des))
                    {
                        detail = item.IrrDes.Trim();
                    }
                    else
                    {
                        detail = " & " + item.IrrDes.Trim();
                    }
                    des += " " + detail;
                }
                //else
                //{
                //    string detail = (item.IrrDes + " ").Trim().Trim('N');
                //    des += " " + detail;
                //}
                //string detail = (item.IrrDes + " N " + item.IrrDetails).Trim().Trim('N');
                //des += " " + detail;
            }
            else
            {
                if (item.IrrTorn.HasValue && item.IrrTorn == true)
                {
                    des += "TORN/";

                }
            }

            return des.Trim('/');
        }
    }
}
