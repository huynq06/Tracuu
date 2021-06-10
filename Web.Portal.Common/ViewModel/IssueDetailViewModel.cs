using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class IssueDetailViewModel
    {
        public int id { set; get; }
        public string key { set; get; }
        public string self { set; get; }
        public string fields_fixVersions_name { set; get; }
        public DateTime? fields_lastViewed { set; get; }
        public string fields_priority_name { set; get; }
        public int? fields_priority_id { set; get; }
        public string fields_assignee_emailAddress { set; get; }
        public string fields_assignee_displayName { set; get; }
        public string fields_status_name { set; get; }
        public int fields_status_statusCategory_id { set; get; }
        public string fields_status_statusCategory_key { set; get; }
        public string fields_status_statusCategory_name { set; get; }
        public string fields_status_statusCategory_colorName { set; get; }
        public string fields_creator_name { set; get; }
        public string fields_creator_displayName { set; get; }
        public string fields_reporter_name { set; get; }
        public string fields_reporter_displayName { set; get; }
        public DateTime? fields_created { set; get; }
        public string fields_summary { set; get; }
        public DateTime? fields_duedate { set; get; }
        public string AWB { set; get; }
        public string Dest { set; get; }
        public string Booking { set; get; }
        public DateTime? CutOffTime { set; get; }
        public string Comment { set; get; }
        public DateTime? TimeTransition { set; get; }
        public DateTime? Created { set; get; }
        public int? SortValue { set; get; }
        public string FlightType { set; get; }
        public string pieces { set; get; }
        public string weight { set; get; }
        public int fields_status_id { set; get; }
        public int? TimeSpan { set; get; }
        public string TimeSpanToCutOff { set; get; }
        public static string FomatDateTime(int minute)
        {
            string timeSpan = "";
            TimeSpan elapsedTime = new TimeSpan(0, minute, 0);

            int day = elapsedTime.Days;
            int hour = elapsedTime.Hours;
            int min = elapsedTime.Minutes;
            if (day > 0)
            {
                timeSpan = string.Format("{0:D2}d:{1:D2}h:{2:D2}m",
                day,
                hour,
                min
               );

            }
            if (day <= 0)
            {
                if (hour > 1)
                {
                    timeSpan = string.Format("{0:D2}h:{1:D2}m",
               hour,
               min
              );
                }
                else
                {
                    timeSpan = string.Format("{0:D2}m",
               min
              );
                }
            }
            return timeSpan;
        }
        public int TimeFromTrasition { set; get; }
        public DateTime? TimeOfAcceptance { set; get; }
        public string RCS_Status { set; get; }
        public string Scale_Status { set; get; }
    }
}
