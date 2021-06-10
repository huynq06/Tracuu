using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Utils
{
    public class AppSetting
    {
        public static string GetAppConfig(string key)
        {
            return System.Configuration.ConfigurationManager.AppSettings[key] ?? "";
        }
        public static string USER_NAME
        {
            get { return GetAppConfig("username"); }
        }

        public static string PASSWORD
        {
            get { return GetAppConfig("password"); }
        }
    }
}
