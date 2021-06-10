using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using Newtonsoft.Json;
namespace WCustomService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class CheckDecNo : ICheckDecNo
    {
        public static string Serialize(object dataToSerialize)
        {
            if (dataToSerialize == null) return null;

            using (System.IO.StringWriter stringwriter = new System.IO.StringWriter())
            {
                var serializer = new System.Xml.Serialization.XmlSerializer(dataToSerialize.GetType());
                serializer.Serialize(stringwriter, dataToSerialize);
                return stringwriter.ToString();
            }
        }

        public string GetData(string value)
        {
            try
            {
                Web.Portal.DataAccess.Prad_Pre_Advice_Access access = new Web.Portal.DataAccess.Prad_Pre_Advice_Access();
                List<Web.Portal.Common.ViewModel.Prad_Pre_AdviceViewModel> result = access.GetDataPrad(value);
                List<DecNoItem> decNoItemList = new List<DecNoItem>();
                // foreach(var item in result)
                // {
                decNoItemList.Add(new DecNoItem() { AIRLINE_CODE = "AIRLINE_CODE" });
                //}
                return Serialize(result);
            }
            catch (Exception ex)
            {

                return Serialize(new Message() { Status = false, messageReturn = ex.Message });
            }


        }
        public class Message
        {
            public int ID { set; get; }
            public string messageReturn { set; get; }
            public bool Status { set; get; }
        }
    }
}
