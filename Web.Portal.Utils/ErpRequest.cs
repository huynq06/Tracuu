using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Utils
{
    public class ErpRequest
    {
        public static async Task<String> Command(string tranid,string type, string url)
        {
            var client = new HttpClient { BaseAddress = new Uri("http://10.0.10.2:8011") };
            //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.accessToken);
            var byteArray = Encoding.ASCII.GetBytes("toan.nguyen:Toan2019");
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/soap+xml"));

            StringBuilder xml = new StringBuilder();
            System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();
            xmlDoc.Load(url);
            string[] prRequest = new string[2];
            prRequest[0] = tranid;
            prRequest[1] = type;
            string requestFomat = string.Format(xmlDoc.OuterXml.ToString(), prRequest);
            var httpContent = new StringContent(requestFomat, Encoding.UTF8, "application/soap+xml");
            // HttpResponseMessage response = await client.GetAsync("/sap/bc/srt/rfc/sap/zws_get_int/910/zsv_get_int/zsv_get_int");
            HttpResponseMessage response = await client.PostAsync("/sap/bc/srt/rfc/sap/zws_get_int/910/zsv_get_int/zsv_get_int", httpContent);
            //  MessageBox.Show(response.StatusCode.ToString());
            if (response.StatusCode == HttpStatusCode.OK)
            {
               return await response.Content.ReadAsStringAsync();

            }
            return string.Empty;
        }
    }
}
