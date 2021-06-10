using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;

namespace Web.Portal.Utils
{
    public class Credentials
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class HttpRequest : IDisposable
    {
        /// <summary>
        /// Url of http server wich request will be created to.
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Get or set timeout in miliseconds
        /// </summary>
        private int _timeout = 30000;
        public int Timeout
        {
            get { return _timeout; }
            set { _timeout = value; }
        }

        /// <summary>
        /// Request content, Json by default.
        /// </summary>
        private string contenttype = "application/json;charset=UTF-8";
        public string ContentType
        {
            get { return contenttype; }
            set { contenttype = value; }
        }

        /// <summary>
        /// User and Password for Basic Authentication
        /// </summary>
        public Credentials Credentials { get; set; }

        public CookieContainer CookieContainer = new CookieContainer();

        public HttpRequest()
        {

        }

        public HttpRequest(string url)
        {
            this.Url = url;
        }

        public string Execute(object obj, string verb, string caller, bool option, string issueKey, ref bool check)
        {

            HttpWebRequest request = CreateRequest(verb, option);
            HttpWebResponse respone;
            try
            {
                WriteStream(request, obj);
                respone = (HttpWebResponse)request.GetResponse();
                check = true;
            }
            catch (WebException ex)
            {
                check = false;
                Log.WriteLog(ex, string.Format("{0}-{1}.txt", caller, DateTime.Now.ToString("yyyy-MM-dd")));
                string rp = ReadResponseFromError(ex);
                if (rp.Contains("Invalid"))
                { }
                else if (rp.Contains("sid"))
                {
                    Utils.HttpRequest rqPdf = new Utils.HttpRequest();
                    rqPdf.Credentials = new Credentials()
                    {
                        UserName = "0106232917.ALS2",
                        Password = "57ab6d30"
                    };
                    string urlPdf = "https://api.einvoice.fpt.com.vn/search-invoice?stax=0106232917&sid=" + issueKey + "&type=json";
                    rqPdf.Url = urlPdf;
                    bool checkAgain = false;
                    string rpAgain = rqPdf.ExecuteReTry(null, "GET", "EinvoicePDF", false, "", ref checkAgain);
                    check = checkAgain;
                    return rpAgain;
                }
                else
                {

                }
                return ReadResponseFromError(ex);
            }
            return ReadResponse(respone);
        }
        public string ExecuteInvoice(object obj, string verb, string caller, bool option, string issueKey, ref bool check, ref bool exception)
        {

            HttpWebRequest request = CreateRequest(verb, option);
            HttpWebResponse respone;
            try
            {
                WriteStream(request, obj);
                respone = (HttpWebResponse)request.GetResponse();
                check = true;
            }
            catch (WebException ex)
            {
                check = false;
                Log.WriteLog(ex, string.Format("{0}-{1}.txt", caller, DateTime.Now.ToString("yyyy-MM-dd")));
                string rp = ReadResponseFromError(ex);
                if (rp.Contains("Invalid"))
                { }
                else if (rp.Contains("sid"))
                {
                    Utils.HttpRequest rqPdf = new Utils.HttpRequest();
                    rqPdf.Credentials = new Credentials()
                    {
                        UserName = "0106232917.ALS2",
                        Password = "57ab6d30"
                    };
                    string urlPdf = "https://api.einvoice.fpt.com.vn/search-invoice?stax=0106232917&sid=" + issueKey + "&type=json";
                    rqPdf.Url = urlPdf;
                    bool checkAgain = false;
                    string rpAgain = rqPdf.ExecuteReTry(null, "GET", "EinvoicePDF", false, "", ref checkAgain);
                    check = checkAgain;
                    exception = true;
                    return rpAgain;
                }
                else
                {

                }
                return ReadResponseFromError(ex);
            }
            return ReadResponse(respone);
        }
        public string ExecuteReTry(object obj, string verb, string caller, bool option, string issueKey, ref bool check)
        {

            HttpWebRequest request = CreateRequest(verb, option);
            HttpWebResponse respone;
            try
            {
                WriteStream(request, obj);
                respone = (HttpWebResponse)request.GetResponse();
                check = true;
            }
            catch (WebException ex)
            {
                check = false;
                Log.WriteLog(ex, string.Format("{0}-{1}.txt", caller, DateTime.Now.ToString("yyyy-MM-dd")));
                string rp = ReadResponseFromError(ex);
                if (rp.Contains("Invalid"))
                { }
               
                else
                {

                }
                return ReadResponseFromError(ex);
            }
            return ReadResponse(respone);
        }

        private HttpWebRequest CreateRequest(string verb, bool option)
        {
            var basicRequest = (HttpWebRequest)WebRequest.Create(Url);
            basicRequest.ContentType = ContentType;
            basicRequest.Method = verb;
            basicRequest.Timeout = Timeout;
            if (option)
            {
                basicRequest.Headers.Add("X-ExperimentalApi", "opt-in");
            }
            basicRequest.CookieContainer = CookieContainer;

            if (Credentials != null)
                basicRequest.Headers.Add("Authorization", "Basic" + " " + EncodeCredentials(Credentials));
            else
                basicRequest.Credentials = System.Net.CredentialCache.DefaultCredentials;

            return basicRequest;
        }


        private void WriteStream(HttpWebRequest request, object obj)
        {
            if (obj != null)
            {
                using (var streamWriter = new StreamWriter(request.GetRequestStream()))
                {
                    if (obj is string)
                        streamWriter.Write(obj);
                    else
                        streamWriter.Write(JsonConvert.SerializeObject(obj));
                }
            }
        }

        private string ReadResponse(HttpWebResponse respone)
        {
            try
            {
                if (respone != null)
                {
                    using (var streamReader = new StreamReader(respone.GetResponseStream()))
                    {
                        return streamReader.ReadToEnd();
                    }
                }
                return string.Empty;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private string ReadResponseFromError(WebException error)
        {
            try
            {
                using (var streamReader = new StreamReader(error.Response.GetResponseStream()))
                {
                    return streamReader.ReadToEnd();
                }
            }
            catch
            {
                return "The remote server returned an error: (503) Server Unavailable.";
            }
        }

        private static string EncodeCredentials(Credentials credentials)
        {
            var strCredentials = string.Format("{0}:{1}", credentials.UserName, credentials.Password);
            var encodedCredentials = Convert.ToBase64String(Encoding.UTF8.GetBytes(strCredentials));
            return encodedCredentials;
        }

        #region Disposable
        // A base class that implements IDisposable. 
        // By implementing IDisposable, you are announcing that 
        // instances of this type allocate scarce resources. 

        // Pointer to an external unmanaged resource. 
        private IntPtr Ptrhandle;
        // Track whether Dispose has been called. 
        private bool disposed = false;

        // Implement IDisposable. 
        // Do not make this method virtual. 
        // A derived class should not be able to override this method. 
        public void Dispose()
        {
            Dispose(true);
            // This object will be cleaned up by the Dispose method. 
            // Therefore, you should call GC.SupressFinalize to 
            // take this object off the finalization queue 
            // and prevent finalization code for this object 
            // from executing a second time.
            GC.SuppressFinalize(this);
        }

        // Dispose(bool disposing) executes in two distinct scenarios. 
        // If disposing equals true, the method has been called directly 
        // or indirectly by a user's code. Managed and unmanaged resources 
        // can be disposed. 
        // If disposing equals false, the method has been called by the 
        // runtime from inside the finalizer and you should not reference 
        // other objects. Only unmanaged resources can be disposed. 
        protected virtual void Dispose(bool disposing)
        {
            // Check to see if Dispose has already been called. 
            if (!this.disposed)
            {
                // If disposing equals true, dispose all managed 
                // and unmanaged resources. 
                if (disposing)
                {
                    // Dispose managed resources.
                }

                // Call the appropriate methods to clean up 
                // unmanaged resources here. 
                // If disposing is false, 
                // only the following code is executed.
                CloseHandle(Ptrhandle);
                Ptrhandle = IntPtr.Zero;

                // Note disposing has been done.
                disposed = true;
            }
        }

        // Use interop to call the method necessary 
        // to clean up the unmanaged resource.
        [System.Runtime.InteropServices.DllImport("Kernel32")]
        private extern static Boolean CloseHandle(IntPtr handle);
        #endregion Dispose
    }
}
