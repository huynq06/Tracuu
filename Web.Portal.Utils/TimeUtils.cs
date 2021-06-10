using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Utils
{
    public static class TimeUtils
    {
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
                if (hour >= 1)
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
        public static string CheckConditionInOut(DateTime? barrierIn, DateTime Created, int location)
        {
            string message = "KHÔNG ĐẠT";
            if (!barrierIn.HasValue)
            {
                message = "N/A";
                return message;

            }
            int waitingTime = (int)Math.Round((barrierIn.Value - Created).TotalMinutes, 0);
            if (location == 1)
            {

                TimeSpan start1 = new TimeSpan(0, 0, 0); //10 o'clock
                TimeSpan end2 = new TimeSpan(16, 0, 0); //12 o'clock
                TimeSpan now = Created.TimeOfDay;

                if ((now > start1) && (now < end2))
                {
                    if (waitingTime <= 20)
                    {
                        message = "ĐẠT";
                    }
                    //match found
                }
                else
                {
                    if (waitingTime <= 45)
                    {
                        message = "ĐẠT";
                    }
                }
            }
            else
            {
                if (waitingTime <= 30)
                {
                    message = "ĐẠT";
                }
            }
            return message;

        }
        public static string CheckCondition(DateTime CheckIn, DateTime Created,int location)
        {
            string message = "KHÔNG ĐẠT";
            //if(!barrierIn.HasValue)
            //{
            //    message = "N/A";
            //    return message;
              
            //}
            int waitingTime = (int)Math.Round((CheckIn - Created).TotalMinutes, 0);
            if (location == 1)
            {

                TimeSpan start1 = new TimeSpan(0, 0, 0); //10 o'clock
                TimeSpan end2 = new TimeSpan(16, 0, 0); //12 o'clock
                TimeSpan now = Created.TimeOfDay;

                if ((now > start1) && (now < end2))
                {
                    if(waitingTime <=20)
                    {
                        message = "ĐẠT";
                    }
                    //match found
                }
                else
                {
                    if (waitingTime <= 45)
                    {
                        message = "ĐẠT";
                    }
                }
            }
            else
            {
                if(waitingTime <=30)
                {
                    message = "ĐẠT";
                }
            }
            return message;

        }

        public static string GetTime(DateTime? Created, DateTime? Input)
        {
            string outPut = "";
            if (!Input.HasValue)
            {
                return outPut;
            }
            else {
                if(Created.Value.Day == Input.Value.Day)
                {
                    outPut = Input.Value.ToString("HH:mm");
                }
                else
                {
                    outPut = Input.Value.ToString("HH:mm +1");
                }

            } 
            return outPut;
        }
    }
}
