
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Utils
{
    public class Twitter
    {
        const string TwitterApiBaseUrl = "https://api.twitter.com/1.1/";
        readonly string consumerKey, consumerKeySecret, accessToken, accessTokenSecret;
        readonly HMACSHA1 sigHasher;
        readonly DateTime epochUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        /// <summary>
        /// Creates an object for sending tweets to Twitter using Single-user OAuth.
        /// 
        /// Get your access keys by creating an app at apps.twitter.com then visiting the
        /// "Keys and Access Tokens" section for your app. They can be found under the
        /// "Your Access Token" heading.
        /// </summary>
        public Twitter(string consumerKey, string consumerKeySecret, string accessToken, string accessTokenSecret)
        {
            this.consumerKey = consumerKey;
            this.consumerKeySecret = consumerKeySecret;
            this.accessToken = accessToken;
            this.accessTokenSecret = accessTokenSecret;

            sigHasher = new HMACSHA1(new ASCIIEncoding().GetBytes(string.Format("{0}&{1}", consumerKeySecret, accessTokenSecret)));
        }

        /// <summary>
        /// Sends a tweet with the supplied text and returns the response from the Twitter API.
        /// </summary>
        public Task<string> Tweet(string text)
        {
            var data = new Dictionary<string, string> {
            { "status", text },
            { "trim_user", "1" }
         };

            return SendRequest("statuses/update.json", HttpMethod.POST, data);
        }

        /// <summary>
        /// Search for tweets using the Twitter API.
        /// </summary>
        public Task<string> Search(string search)
        {
            search = Uri.EscapeDataString(search);
            return SendRequest(string.Format("search/tweets.json?q={0}", search), HttpMethod.GET);
        }

        /// <summary>
        /// Retrieve user settings from the Twitter API.
        /// </summary>
        public Task<string> Settings()
        {
            return SendRequest("account/settings.json", HttpMethod.GET);
        }


        Task<string> SendRequest(string url, HttpMethod httpMethod, Dictionary<string, string> data = null)
        {
            var fullUrl = TwitterApiBaseUrl + url;
            Random rand = new Random();

            // Timestamps are in seconds since 1/1/1970.
            var timestamp = (int)((DateTime.UtcNow - epochUtc).TotalSeconds);

            // Add all the OAuth headers and querystring parameters, we'll need to use when constructing the hash.
            var query = url.Split('?');
            if (query.Count() > 1)
            {
                if (data == null) data = new Dictionary<string, string>();
                var pairs = query[1].Split('&');
                foreach (var pair in pairs)
                {
                    var keyvalue = pair.Split('=');
                    data.Add(keyvalue[0], keyvalue[1]);
                }
            }
            data.Add("oauth_consumer_key", consumerKey);
            data.Add("oauth_signature_method", "HMAC-SHA1");
            data.Add("oauth_timestamp", timestamp.ToString());
            data.Add("oauth_nonce", rand.Next(10000000, 999999999).ToString());
            data.Add("oauth_token", accessToken);
            data.Add("oauth_version", "1.0");

            // Generate the OAuth signature and add it to our payload.
            data.Add("oauth_signature", GenerateSignature(fullUrl, data, httpMethod));

            // Build the OAuth HTTP Header from the data.
            string oAuthHeader = GenerateOAuthHeader(data);

            switch (httpMethod)
            {
                case HttpMethod.GET:
                    return SendRequest(fullUrl, oAuthHeader, null, httpMethod);
                case HttpMethod.POST:
                    var formData = new FormUrlEncodedContent(data.Where(kvp => !kvp.Key.StartsWith("oauth_")));
                    return SendRequest(fullUrl, oAuthHeader, formData, httpMethod);
                default: return null;
            }
        }

        /// <summary>
        /// Generate an OAuth signature from OAuth header values.
        /// </summary>
        string GenerateSignature(string url, Dictionary<string, string> data, HttpMethod httpMethod)
        {
            var sigString = string.Join(
               "&",
               data
                  .Union(data)
                  .Select(kvp => string.Format("{0}={1}", Uri.EscapeDataString(kvp.Key), Uri.EscapeDataString(kvp.Value)))
                  .OrderBy(s => s)
            );

            string urlWithoutParameters = url.Split('?')[0];

            var fullSigData = string.Format(
               "{0}&{1}&{2}",
               httpMethod.ToString(),
               Uri.EscapeDataString(urlWithoutParameters),
               Uri.EscapeDataString(sigString.ToString())
            );

            return Convert.ToBase64String(sigHasher.ComputeHash(new ASCIIEncoding().GetBytes(fullSigData.ToString())));
        }

        /// <summary>
        /// Generate the raw OAuth HTML header from the values (including signature).
        /// </summary>
        string GenerateOAuthHeader(Dictionary<string, string> data)
        {
            return "OAuth " + string.Join(
               ",",
               data
                  .Where(kvp => kvp.Key.StartsWith("oauth_"))
                  .Select(kvp => string.Format("{0}=\"{1}\"", Uri.EscapeDataString(kvp.Key), Uri.EscapeDataString(kvp.Value)))
                  .OrderBy(s => s)
            );
        }

        /// <summary>
        /// Send HTTP Request and return the response.
        /// </summary>
        async Task<string> SendRequest(string fullUrl, string oAuthHeader, FormUrlEncodedContent formData, HttpMethod httpMethod)
        {
            using (var http = new HttpClient())
            {
                http.DefaultRequestHeaders.Add("Authorization", oAuthHeader);

                HttpResponseMessage httpResp = null;
                switch (httpMethod)
                {
                    case HttpMethod.GET:
                        httpResp = await http.GetAsync(fullUrl);
                        break;
                    case HttpMethod.POST:
                        httpResp = await http.PostAsync(fullUrl, formData);
                        break;
                }
                var respBody = await httpResp.Content.ReadAsStringAsync();

                return respBody;
            }
        }
        public enum HttpMethod
        {
            POST,
            GET
        }
    }
}
