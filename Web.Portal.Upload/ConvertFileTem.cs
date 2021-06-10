using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Upload
{
    public class ConvertFileTem
    {
        public static List<FileTem> ConvertJsonToList(string jsonFile)
        {
            try
            {
                System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                return oSerializer.Deserialize<List<FileTem>>(jsonFile);
            }
            catch (Exception)
            {

            }
            return new List<FileTem>();
        }
    }
}
