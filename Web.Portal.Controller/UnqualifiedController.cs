using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Web.Portal.Controller
{
    public class UnqualifiedController : GuestController
    {
        public ActionResult Index()
        {
            HTTP_GET();
            return View();
            //using (Stream stream = response.GetResponseStream())
            //{
            //    StreamReader sr = new StreamReader(stream);
            //    strresult = sr.ReadToEnd();
            //    sr.Close();
            //}
        }
        public async void HTTP_GET()
        {
            HttpMessageHandler handler = new HttpClientHandler()
            {
            };

            var httpClient = new HttpClient(handler)
            {
                BaseAddress = new Uri("http://support.als.com.vn:8882/rest/api/2/issue/ALSCKT-3/properties/proforma.forms.i1"),
                Timeout = new TimeSpan(0, 2, 0)
            };

            httpClient.DefaultRequestHeaders.Add("ContentType", "application/json");

            //This is the key section you were missing    
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes("huy.nguyen.quang:hoangtuech@1");
            string val = System.Convert.ToBase64String(plainTextBytes);
            httpClient.DefaultRequestHeaders.Add("Authorization", "Basic " + val);

            var method = new HttpMethod("GET");

            HttpResponseMessage response = httpClient.GetAsync("http://support.als.com.vn:8882/rest/api/2/issue/ALSCKT-2").Result;
            //string content = string.Empty;
            HttpContent content = response.Content;

            string result = await content.ReadAsStringAsync();

            Issue issue = JsonConvert.DeserializeObject<Issue>(result);
            var jOject = JObject.Parse(result);
            var userGuid = Convert.ToString(jOject["fields"]["issuetype"]["self"]);
            var field = JsonConvert.DeserializeObject<object>(issue.fields.ToString());
            

        }
    }
    public class Issue
    {
        public string expand { set; get; }
        public int id { set; get; }
        public string self { set; get; }
        public string key { set; get; }
        public object fields { set; get; }
    }
}
