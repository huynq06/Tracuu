using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Upload
{
    public class DisplayUrl
    {
        public const string UrlUploadFile = "/Files/Upload/";
        public const string UrlAvatar = "/Files/Avatar/";
        public const string LinkDownload = "<a href='/Files/Upload/{0}'>{1}</a>";

        public static string FormatUrlAvatar(string fileName)
        {
            return string.IsNullOrEmpty(fileName.Trim()) ? string.Empty : UrlAvatar + "/" + fileName;
        }
    }
}
