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
    public class FlightRequest
    {
        public static async Task<String> Command(string url)
        {
            var client = new HttpClient { BaseAddress = new Uri("https://wsfly1.viagsnoibai.com/als.asmx?WSDL") };
            //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.accessToken);
            //var byteArray = Encoding.ASCII.GetBytes("toan.nguyen:Toan2019");
            //client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/soap+xml"));

            StringBuilder xml = new StringBuilder();
            System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();
            xmlDoc.Load(url);
            string[] prRequest = new string[3];
            prRequest[0] = "01/07/2021";
            prRequest[1] = "als";
            prRequest[2] = "als@04052018";
            string requestFomat = string.Format(xmlDoc.OuterXml.ToString(), prRequest);
            var httpContent = new StringContent(requestFomat, Encoding.UTF8, "application/soap+xml");
            // HttpResponseMessage response = await client.GetAsync("/sap/bc/srt/rfc/sap/zws_get_int/910/zsv_get_int/zsv_get_int");
            HttpResponseMessage response = await client.PostAsync("https://wsfly1.viagsnoibai.com/als.asmx?WSDL", httpContent);
            //  MessageBox.Show(response.StatusCode.ToString());
            if (response.StatusCode == HttpStatusCode.OK)
            {
                return await response.Content.ReadAsStringAsync();

            }
            return string.Empty;
        }
        public static String CommandTest(string url)
        {
           
          

            StringBuilder xml = new StringBuilder();
            System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();
            xmlDoc.Load(url);
            string[] prRequest = new string[3];
            prRequest[0] = "01/07/2021";
            prRequest[1] = "als";
            prRequest[2] = "als@04052018";
            string requestFomat = string.Format(xmlDoc.OuterXml.ToString(), prRequest);
     
            // HttpResponseMessage response = await client.GetAsync("/sap/bc/srt/rfc/sap/zws_get_int/910/zsv_get_int/zsv_get_int");
            
            return string.Empty;
        }
    }
}
