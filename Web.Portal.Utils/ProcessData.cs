using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Common.ViewModel;
using Web.Portal.DataAccess;
using Web.Portal.Model.Models;

namespace Web.Portal.Utils
{
    public class ProcessData
    {
        public static List<IssueDataViewModel> GetListIssueFromAPI(string queue)
        {
            string response = "";
            List<IssueDataViewModel> listIssueResult = new List<IssueDataViewModel> { };
            try
            {
                HttpRequest rq = new HttpRequest();
                rq.Credentials = new Credentials()
                {
                    UserName = AppSetting.USER_NAME,
                    Password = AppSetting.PASSWORD
                };
                string url = "http://support.als.com.vn:8882/rest/servicedeskapi/servicedesk/21/queue/" + queue + "/issue";
                rq.Url = url;
                bool check = false;
                string rp = rq.Execute(null, "GET", "", true, queue + " GetListIssueFromAPI", ref check);
                //data_Issue data_Issue = JsonConvert.DeserializeObject<data_Issue>(rp);
                var data = (JArray)Newtonsoft.Json.Linq.JObject.Parse(rp)["values"];
                var results = data.ToArray();
                if (results.Length > 0)
                {
                    for (int i = 0; i < results.Length; i++)
                    {
                        IssueDataViewModel issue = new IssueDataViewModel();
                        issue.id = int.Parse(Convert.ToString(results[i]["id"]));
                        issue.key = Convert.ToString(results[i]["key"]);
                        issue.self = Convert.ToString(results[i]["self"]);
                        issue.fields_summary = Convert.ToString(results[i]["fields"]["summary"]);

                        issue.fields_created = Convert.ToDateTime(results[i]["fields"]["created"]);
                        //issue.fields_reporter_displayName = Convert.ToString(results[i]["fields"]["reporter"]["displayName"]);
                        //issue.fields_issuetype_description = Convert.ToString(results[i]["fields"]["issuetype"]["description"]);
                        //issue.fields_issuetype_name = Convert.ToString(results[i]["fields"]["issuetype"]["name"]);
                        issue.fields_status_name = Convert.ToString(results[i]["fields"]["status"]["name"]);
                        issue.fields_status_id = int.Parse(Convert.ToString(results[i]["fields"]["status"]["id"]));
                        issue.fields_status_statusCategory_name = Convert.ToString(results[i]["fields"]["status"]["statusCategory"]["name"]);
                        issue.fields_status_statusCategory_id = int.Parse(Convert.ToString(results[i]["fields"]["status"]["statusCategory"]["id"]));
                        listIssueResult.Add(issue);
                    }
                }
                return listIssueResult;
            }
            catch (Exception ex)
            {
                Log.WriteLog(ex.ToString() + " " + response + "---" + queue, "GetListIssueFromAPI");
                return listIssueResult;
            }

        }
        public static IssueDetailViewModel GetIssueDetailFromAPI(string issueKey, ref List<ConditionViewModel> listCondition)
        {

            IssueDetailViewModel issue_detail = new IssueDetailViewModel();
            string rp = "";
            try
            {
                HttpRequest rq = new HttpRequest();
                rq.Credentials = new Credentials()
                {
                    UserName = AppSetting.USER_NAME,
                    Password = AppSetting.PASSWORD
                };
                string url = "http://support.als.com.vn:8882/rest/api/2/issue/" + issueKey;
                rq.Url = url;
                bool check = false;
                rp = rq.Execute(null, "GET", "", false, issueKey + " GetIssueDetailFromAPI", ref check);
                //data_Issue data_Issue = JsonConvert.DeserializeObject<data_Issue>(rp);
                var jOject = Newtonsoft.Json.Linq.JObject.Parse(rp);
                issue_detail.id = int.Parse(Convert.ToString(jOject["id"]));
                issue_detail.key = Convert.ToString(jOject["key"]);
                //issue_detail.self = Convert.ToString(jOject["self"]);
                //issue_detail.fields_fixVersions_name = "";
                //var fields_lastViewed = jOject["fields"]["lastViewed"].ToString();
                //if (!string.IsNullOrWhiteSpace(fields_lastViewed))
                //{
                //    issue_detail.fields_lastViewed = Convert.ToDateTime(jOject["fields"]["lastViewed"]);
                //}
                //else
                //{
                //    issue_detail.fields_lastViewed = null;
                //}
                if (!string.IsNullOrWhiteSpace(jOject["fields"]["priority"].ToString()))
                {
                    issue_detail.fields_priority_name = Convert.ToString(jOject["fields"]["priority"]["name"]);
                    issue_detail.fields_priority_id = int.Parse(Convert.ToString(jOject["fields"]["priority"]["id"]));
                }
                //issue_detail.fields_status_name = Convert.ToString(jOject["fields"]["status"]["name"]);
                //issue_detail.fields_status_id = int.Parse(Convert.ToString(jOject["fields"]["status"]["id"]));
                //issue_detail.fields_status_statusCategory_id = int.Parse(Convert.ToString(jOject["fields"]["status"]["statusCategory"]["id"]));
                //issue_detail.fields_status_statusCategory_key = Convert.ToString(jOject["fields"]["status"]["statusCategory"]["key"]);
                //issue_detail.fields_status_statusCategory_name = Convert.ToString(jOject["fields"]["status"]["statusCategory"]["name"]);
                //issue_detail.fields_status_statusCategory_colorName = Convert.ToString(jOject["fields"]["status"]["statusCategory"]["colorName"]);
                issue_detail.AWB = Convert.ToString(jOject["fields"]["customfield_11900"]);
                issue_detail.Booking = string.IsNullOrWhiteSpace(jOject["fields"]["customfield_11805"].ToString()) ? "" : Convert.ToString(jOject["fields"]["customfield_11805"]);
                //issue_detail.Dest = string.IsNullOrWhiteSpace(jOject["fields"]["customfield_11806"].ToString()) ? "" : Convert.ToString(jOject["fields"]["customfield_11806"]);
                //issue_detail.fields_summary = Convert.ToString(jOject["fields"]["summary"]);
                issue_detail.weight = Convert.ToString(jOject["fields"]["customfield_11803"]);
                issue_detail.pieces = Convert.ToString(jOject["fields"]["customfield_11804"]);
                //issue_detail.fields_duedate = null;
                issue_detail.Created = Convert.ToDateTime(jOject["fields"]["created"]);
                issue_detail.SortValue = int.Parse(Convert.ToString(jOject["fields"]["customfield_12008"]));
                issue_detail.CutOffTime = string.IsNullOrWhiteSpace(jOject["fields"]["customfield_12003"].ToString()) ? issue_detail.CutOffTime : Convert.ToDateTime(Convert.ToString(jOject["fields"]["customfield_12003"]));
                issue_detail.FlightType = string.IsNullOrWhiteSpace(jOject["fields"]["customfield_12010"].ToString()) ? "" : Convert.ToString(jOject["fields"]["customfield_12010"]);
                issue_detail.TimeTransition = DateTime.Now;
                var dataCondition = (JArray)Newtonsoft.Json.Linq.JObject.Parse(Convert.ToString(jOject["fields"]))["customfield_11800"];
                var resultCondition = dataCondition.ToArray();
                issue_detail.TimeSpan = issue_detail.CutOffTime.HasValue ? (int)Math.Round((issue_detail.CutOffTime.Value - DateTime.Now).TotalMinutes, 0) : issue_detail.TimeSpan;
                issue_detail.TimeSpanToCutOff = issue_detail.TimeSpan.HasValue ? IssueViewModel.FomatDateTime(issue_detail.TimeSpan.Value) : string.Empty;

                for (int i = 0; i < resultCondition.Length; i++)
                {
                    ConditionViewModel condition = new ConditionViewModel();
                    condition.id_condittion = int.Parse(Convert.ToString(resultCondition[i]["id"]));
                    condition.name = Convert.ToString(resultCondition[i]["name"]);
                    condition.@checked = Convert.ToBoolean(resultCondition[i]["checked"]);
                    condition.mandatory = Convert.ToBoolean(resultCondition[i]["mandatory"]);
                    condition.option = Convert.ToBoolean(resultCondition[i]["option"]);
                    condition.rank = int.Parse(Convert.ToString(resultCondition[i]["rank"]));
                    condition.issue_id = issue_detail.id;
                    condition.issue_key = issue_detail.key;
                    listCondition.Add(condition);
                }
            }
            catch (Exception ex)
            {

                Log.WriteLog(ex.ToString() + rp + "-------------" + issueKey, "GetIssueDetailFromAPI");
            }
            return issue_detail;
        }
        public static Issue_detail GetIssueDetail(string issueKey)
        {
            Issue_detail issue_detail = new Issue_detail();
            string rp = "";
            try
            {
                HttpRequest rq = new HttpRequest();
                rq.Credentials = new Credentials()
                {
                    UserName = AppSetting.USER_NAME,
                    Password = AppSetting.PASSWORD
                };
                string url = "http://support.als.com.vn:8882/rest/api/2/issue/" + issueKey;
                rq.Url = url;
                bool check = false;
                rp = rq.Execute(null, "GET", "", false, issueKey + " GetIssueDetailFromAPI", ref check);
                var jOject = Newtonsoft.Json.Linq.JObject.Parse(rp);
                issue_detail.id = int.Parse(Convert.ToString(jOject["id"]));
                issue_detail.key = Convert.ToString(jOject["key"]);
                if (!string.IsNullOrWhiteSpace(jOject["fields"]["priority"].ToString()))
                {
                    issue_detail.fields_priority_name = Convert.ToString(jOject["fields"]["priority"]["name"]);
                    issue_detail.fields_priority_id = int.Parse(Convert.ToString(jOject["fields"]["priority"]["id"]));
                }
                issue_detail.AWB = Convert.ToString(jOject["fields"]["customfield_11900"]);
                issue_detail.Booking = string.IsNullOrWhiteSpace(jOject["fields"]["customfield_11805"].ToString()) ? "" : Convert.ToString(jOject["fields"]["customfield_11805"]);
                issue_detail.pieces = Convert.ToString(jOject["fields"]["customfield_11804"]);
                issue_detail.Created = Convert.ToDateTime(jOject["fields"]["created"]);
                issue_detail.SortValue = int.Parse(Convert.ToString(jOject["fields"]["customfield_12008"]));
                issue_detail.CutOffTime = string.IsNullOrWhiteSpace(jOject["fields"]["customfield_12003"].ToString()) ? issue_detail.CutOffTime : Convert.ToDateTime(Convert.ToString(jOject["fields"]["customfield_12003"]));
                issue_detail.FlightType = string.IsNullOrWhiteSpace(jOject["fields"]["customfield_12010"].ToString()) ? "" : Convert.ToString(jOject["fields"]["customfield_12010"]);
                var dataCondition = (JArray)Newtonsoft.Json.Linq.JObject.Parse(Convert.ToString(jOject["fields"]))["customfield_11800"];
                issue_detail.TimeTransition = GetTranstionFromAPI(issueKey);
                
            }
            catch (Exception ex)
            {
                Log.WriteLog(ex.ToString() + rp + "-------------" + issueKey, "GetIssueDetailFromAPI");
            }
            return issue_detail;
        }
        public static string GetBookingByIssueKey(string issueKey)
        {
            string booking = "";
            string rp = "";
            try
            {
                HttpRequest rq = new HttpRequest();
                rq.Credentials = new Credentials()
                {
                    UserName = AppSetting.USER_NAME,
                    Password = AppSetting.PASSWORD
                };
                string url = "http://support.als.com.vn:8882/rest/api/2/issue/" + issueKey;
                rq.Url = url;
                bool check = false;
                rp = rq.Execute(null, "GET", "", false, issueKey + " GetIssueDetailFromAPI", ref check);
                //data_Issue data_Issue = JsonConvert.DeserializeObject<data_Issue>(rp);
                var jOject = Newtonsoft.Json.Linq.JObject.Parse(rp);
                booking = string.IsNullOrWhiteSpace(jOject["fields"]["customfield_11805"].ToString()) ? "" : Convert.ToString(jOject["fields"]["customfield_11805"]);
            }
            catch (Exception ex)
            {

                Log.WriteLog(ex.ToString() + rp + "-------------" + issueKey, "GetIssueDetailFromAPI");
            }
            return booking;
        }
       
        public static DateTime GetTranstionFromAPI(string issueKey)
        {
            DateTime dt = new DateTime();
            string response = "";
            try
            {
                HttpRequest rq = new HttpRequest();
                rq.Credentials = new Credentials()
                {
                    UserName = AppSetting.USER_NAME,
                    Password = AppSetting.PASSWORD
                };
                string url = "http://support.als.com.vn:8882/rest/api/2/issue/" + issueKey + "?expand=changelog";
                rq.Url = url;
                bool check = false;
                response = rq.Execute(null, "GET", "", false, issueKey + " GetDateTimeTranformFromAPI", ref check);
                var jOject = Newtonsoft.Json.Linq.JObject.Parse(response);
                if (jOject["changelog"]["histories"].Count() > 1)
                {
                    dt = Convert.ToDateTime(Convert.ToString(jOject["changelog"]["histories"][1]["created"]));
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog(ex.ToString() + response + "------" + issueKey, "GetDateTimeTranformFromAPI");
            }
            return dt;
        }


    }
}
