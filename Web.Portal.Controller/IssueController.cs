using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using Web.Portal.DataAccess;
using Web.Portal.Utils;

namespace Web.Portal.Controller
{
    public class IssueController : GuestController
    {
        IIssueService _issueService;
        IIssue_detailService _issueDetailService;
        IFormService _formService;
        IConditionService _conditionService;
        IVCTService _iVctService;
        public static int a = 0;

        public IssueController(IIssueService issueService, IIssue_detailService issueDetailService,
            IFormService formService, IConditionService conditionService, IVCTService iVctService)
        {
            this._issueService = issueService;
            this._issueDetailService = issueDetailService;
            this._formService = formService;
            this._conditionService = conditionService;
            this._iVctService = iVctService;
        }
        //public IssueController(IIssueService issueService)
        //{
        //    this._issueService = issueService;
        //}
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            try
            {
                var modelIssueDetail = _iVctService.GetAllToday(0).ToList();


                if (modelIssueDetail.Count > 0)
                {
                    List<IssueViewModel> listIssue = (from iss in modelIssueDetail

                                                      select new IssueViewModel
                                                      {
                                                          IssueID = iss.ID,
                                                          AWB = iss.LABS_AWB,
                                                          Quantity = iss.LABS_QUANTITY_BOOKED.ToString(),
                                                          Weight = iss.LABS_WEIGHT_BOOKED.ToString(),
                                                          Booking = iss.BOOKING_FLIGHT,
                                                          CreatedDate = iss.LABS_CREATED_AT.Value,
                                                          Sort_Value = iss.SortValue.Value,
                                                          FlightType = iss.CargoType,
                                                          TimeTransition = iss.LABS_DIM_AT.HasValue ? iss.LABS_DIM_AT : null,
                                                          TimeSpan = iss.CutOffTime.HasValue ? (int)Math.Round((iss.CutOffTime.Value - DateTime.Now).TotalMinutes, 0) : 10000,
                                                          TimeSpanToCutOffTIme = iss.CutOffTime.HasValue ? IssueViewModel.FomatDateTime((int)Math.Round((iss.CutOffTime.Value - DateTime.Now).TotalMinutes, 0)) : string.Empty,
                                                          Minute = iss.CutOffTime.HasValue ? (int)Math.Round((iss.CutOffTime.Value - DateTime.Now).TotalMinutes, 0) : 100000
                                                      }).ToList();
                    var listResult = listIssue.ToList().OrderByDescending(p => p.Sort_Value).ThenBy(x => x.CreatedDate).ToList();
                    ViewData["listIssue"] = listResult;
                    ViewBag.TotalRecord = listIssue.ToList().Count;
                }
                else
                {
                    List<IssueViewModel> listIssue = new List<IssueViewModel>();
                    ViewData["listIssue"] = listIssue.ToList();
                }
                return View();
            }
            catch (Exception ex)
            {


                List<IssueViewModel> listIssue = new List<IssueViewModel>();
                ViewData["listIssue"] = listIssue.ToList();
                return View();
            }

        }
        public ActionResult Processing()
        {
            return View();
        }
        public ActionResult ProcessingList()
        {
            List<VCT> listVCTScaleOne = _iVctService.GetAllToday(2).OrderByDescending(c => c.LABS_RECIEVED).ThenBy(c=>c.LABS_PROCESS_AT).Take(5).ToList();
            List<VCT> listVCTScaleSecond = _iVctService.GetAllToday(3).OrderByDescending(c=>c.LABS_RECIEVED).ThenBy(c=>c.LABS_PROCESS_AT).Take(5).ToList();
            ViewData["listVCTScaleOne"] = listVCTScaleOne;
            ViewData["listVCTScaleSecond"] = listVCTScaleSecond;
            return View();
        }
        public ActionResult Waiting()
        {
            return View();
        }
        public ActionResult WaitingList()
        {
            List<IssueDataViewModel> listAwaiConfirmIssue = ProcessData.GetListIssueFromAPI("297");
            List<ConditionViewModel> listCondition = new List<ConditionViewModel>();
            List<IssueDetailViewModel> listIssueDetail = new List<IssueDetailViewModel>();
            if (listAwaiConfirmIssue.Count > 0)
            {
                foreach (var issue in listAwaiConfirmIssue)
                {
                    var listConditionByIssue = new List<ConditionViewModel>();
                    var issueDetail = ProcessData.GetIssueDetailFromAPI(issue.key, ref listConditionByIssue);
                    listCondition.AddRange(listConditionByIssue);
                    listIssueDetail.Add(issueDetail);
                }
            }
            ViewData["ListIssueDetail"] = listIssueDetail.OrderBy(c => c.fields_priority_id).ThenByDescending(p => p.SortValue).ThenBy(x => x.Created).ToList();
            ViewData["ListCondition"] = listCondition;


            return View();
        }
        public ActionResult Handling()
        {
            return View();
        }
        public ActionResult HandlingList()
        {
            var listExistIssues = ProcessData.GetListIssueFromAPI("298");
            var listProcessIssues = ProcessData.GetListIssueFromAPI("299");
            List<IssueDataViewModel> listIssueData = new List<IssueDataViewModel>();
            List<IssueViewModel> listIssue = new List<IssueViewModel>();
            if (listExistIssues.Count > 0)
            {
                listIssueData.AddRange(listExistIssues);
            }
            if (listProcessIssues.Count > 0)
            {
                listIssueData.AddRange(listProcessIssues);
            }
            
            List<Issue_detail> listIssueDetail = new List<Issue_detail>();
            if (listIssueData.Count > 0)
            {
                foreach (var issue in listIssueData)
                {
                    var issueDetail = ProcessData.GetIssueDetail(issue.key);
                    listIssueDetail.Add(issueDetail);
                }
                List<VCTProcessing> vctProcessing = new VCTProcessingAccess().GetData(listIssueDetail).ToList();
                listIssue = (from iss in listIssueDetail
                             join vct in vctProcessing on iss.AWB.Trim().Replace("-", "") equals vct.AWB.Trim().Replace("-", "")

                             select new IssueViewModel
                             {
                                 IssueID = iss.id,
                                 AWB = iss.AWB,
                                 Quantity = iss.pieces,
                                 Weight = iss.weight,
                                 Booking = iss.Booking,
                                 CreatedDate = iss.Created.Value,
                                 Priority = iss.fields_priority_id.Value,
                                 PriorityName = iss.fields_priority_name,
                                 Sort_Value = iss.SortValue.Value,
                                 FlightType = iss.FlightType,
                                 TimeOfAcceptance = vct.TimeOfAcceptance,
                                 RCS_Status = vct.RCS_Status,
                                 Scale_Status = vct.Scale_Status,
                                 TimeFromTrasition = vct.Scale_Status == "WAITING" ? (int)Math.Round((DateTime.Now - iss.TimeTransition.Value).TotalMinutes, 0) : 0,
                                 Comment = string.IsNullOrWhiteSpace(iss.Comment) ? "" : iss.Comment.Replace("Sent from Mobile for Jira", ""),
                                 TimeTransition = iss.TimeTransition.HasValue ? iss.TimeTransition : null,
                                 TimeSpan = iss.CutOffTime.HasValue ? (int)Math.Round((iss.CutOffTime.Value - DateTime.Now).TotalMinutes, 0) : 10000,
                                 TimeSpanToCutOffTIme = iss.CutOffTime.HasValue ? IssueViewModel.FomatDateTime((int)Math.Round((iss.CutOffTime.Value - DateTime.Now).TotalMinutes, 0)) : string.Empty,
                                 Minute = iss.CutOffTime.HasValue ? (int)Math.Round((iss.CutOffTime.Value - DateTime.Now).TotalMinutes, 0) : 100000
                             }).ToList();
                ViewData["listIssue"] = listIssue.OrderBy(c => c.Priority).ThenByDescending(c => c.TimeFromTrasition).ThenByDescending(c => c.Sort_Value).ThenBy(x => x.CreatedDate).ToList();
            }
           
            return View();
        }

    }
}
