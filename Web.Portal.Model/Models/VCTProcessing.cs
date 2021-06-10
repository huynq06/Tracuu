using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Model.Models
{
    public class VCTProcessing
    {
        public string Labs_IDENT_NO { set; get; }
        public string AWB { set; get; }
        public int pieces { set; get; }
        public string Booking { set; get; }
        public DateTime? TimeOfAcceptance { set; get; }
        public DateTime? CutOffTime { set; get; }
        public string Scale_Status { set; get; }
        public string RCS_Status { set; get; }
        public string TimeSpanToCutOffTIme { set; get; }
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

    }
}
