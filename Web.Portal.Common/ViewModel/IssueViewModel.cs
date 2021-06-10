using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class IssueViewModel
    {
        public int IssueID { set; get; }
        public string AWB { set; get; }
        public string Quantity { set; get; }
        public string Weight { set; get; }
        public string Booking { set; get; }
        public int? fields_priority_id { set; get; }
        public DateTime? CreatedDate { set; get; }
        public string Comment { set; get; }
        public DateTime? TimeTransition { set; get; }
        public string TimeSpanToCutOffTIme { set; get; }
        public int PriorityID { set; get; }
        public string PriorityName { set; get; }
        public int TimeSpan { set; get; }
        public int Minute { set; get; }
        public int Priority { set; get; }
        public int Sort_Value { set; get; }
        public int TimeFromTrasition { set; get; }
        public DateTime? TimeOfAcceptance { set; get; }
        public string FlightType { set; get; }
        public string RCS_Status { set; get; }
        public string Scale_Status { set; get; }
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
                    timeSpan= string.Format("{0:D2}h:{1:D2}m",
               hour,
               min
              );
                }
                else
                {
                    timeSpan=  string.Format("{0:D2}m",
               min
              );
                }
            }
            return timeSpan;
        }
       

    }
}
