using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Utils
{
    public class Format
    {

        public static string GetMonthName(DateTime? date)
        {
            string[] MONTH_CHAR = new string[12] { "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" };
            int[] MONTH_NUM = new int[12] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 };
            return date.Value.Day + MONTH_CHAR[Array.IndexOf(MONTH_NUM, date.Value.Month)];
        }
        public static string FormAWB(string awb)
        {
            while(awb.Length<8)
            {
                awb = "0" + awb;
            }
            return awb;
        }
        public static DateTime? ConvertDate(string date)
        {
            try
            {
                System.Globalization.DateTimeFormatInfo dtfi = new System.Globalization.DateTimeFormatInfo();
                dtfi.ShortDatePattern = "dd/MM/yyyy";
                dtfi.DateSeparator = "/";
                return Convert.ToDateTime(date, dtfi);
            }
            catch (Exception)
            {

            }
            return null;
        }
        public static DateTime? ConvertDateTime(string date)
        {
            try
            {
                if (date.Contains("0001"))
                    return DateTime.Now;
                System.Globalization.DateTimeFormatInfo dtfi = new System.Globalization.DateTimeFormatInfo();
                dtfi.ShortDatePattern = "dd/MM/yyyy";
                dtfi.DateSeparator = "/";

                return Convert.ToDateTime(date, dtfi);
            }
            catch (Exception)
            {
                return ConvertDateMMDDYYYY(date);
            }
            return null;
        }
        public static DateTime? ConvertDateMMDDYYYY(string date)
        {
            try
            {
                if (date.Contains("0001"))
                    return DateTime.Now;
                System.Globalization.DateTimeFormatInfo dtfi = new System.Globalization.DateTimeFormatInfo();
                dtfi.ShortDatePattern = "MM/dd/yyyy";
                dtfi.DateSeparator = "/";

                return Convert.ToDateTime(date, dtfi);
            }
            catch (Exception)
            {

            }
            return null;
        }
        public static DateTime? ConvertDateYYYYDDMMMM(string date)
        {
            try
            {
                if (date.Contains("0001"))
                    return DateTime.Now;
                System.Globalization.DateTimeFormatInfo dtfi = new System.Globalization.DateTimeFormatInfo();
                dtfi.ShortDatePattern = "yyyy/dd/MM";
                dtfi.DateSeparator = "/";

                return Convert.ToDateTime(date, dtfi);
            }
            catch (Exception)
            {

            }
            return null;
        }

        public static string FormatValue(Type propertype, object value)
        {
            if (propertype == typeof(DateTime?))
            {
                DateTime? vl = (DateTime?)value;
                return vl.HasValue ? vl.Value.ToString("dd/MM/yyyy HH:mm") : string.Empty;
            }
            return value.ToString();
        }

        public static string GetNullString(string value)
        {
            return (string.IsNullOrEmpty(value)) ? string.Empty : value;

        }
        public static string GetNullString(string value, string defaultvalue)
        {
            return (string.IsNullOrEmpty(value)) ? defaultvalue : value;

        }
        public static int GetNullInteger(string value)
        {
            return (string.IsNullOrEmpty(value) || value.All(char.IsDigit) == false) ? 0 : Convert.ToInt32(value);

        }
        public static int GetNullInteger(string value, int defualtvalue)
        {
            return (string.IsNullOrEmpty(value) || value.All(char.IsDigit) == false) ? defualtvalue : Convert.ToInt32(value);

        }
        public static Int64 GetNullInt64(string value)
        {
            return (string.IsNullOrEmpty(value) || value.All(char.IsDigit) == false) ? 0 : Convert.ToInt64(value);

        }
        public static Int64 GetNullInt64(string value, Int64 defaultvalue)
        {
            return (string.IsNullOrEmpty(value) || value.All(char.IsDigit) == false) ? defaultvalue : Convert.ToInt64(value);

        }
        public static Double GetNullDouble(string value)
        {
            return (string.IsNullOrEmpty(value) || value.All(char.IsDigit) == false) ? 0 : Convert.ToDouble(value);

        }
        public static bool GetNullBoolean(string value)
        {
            return (string.IsNullOrEmpty(value)) ? false : Convert.ToBoolean(value);

        }
        public static string ConvertUrl(string url)
        {
            const string FindText = "áàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ";
            const string ReplText = "aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY";
            int index = -1;
            char[] arrChar = FindText.ToCharArray();
            while ((index = url.IndexOfAny(arrChar)) != -1)
            {
                int index2 = FindText.IndexOf(url[index]);
                url = url.Replace(url[index], ReplText[index2]);
            }
            return url.Replace(" ", "-").Replace("/", "").Replace(":", "").ToLower();
        }
    }
}
