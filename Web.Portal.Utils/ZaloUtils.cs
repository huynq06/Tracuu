using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZaloCSharpSDK;
using ZaloApiConnection;

namespace Web.Portal.Utils
{
    public static class ZaloUtils
    {
        public static bool SendZalo(string account, string message, ref string zalo, ref string forward)
        {
            try
            {

                long oaId = 1464994683716471464;//OA ID            
                string secret = "0xpfE1u4JF72oH8gLlHZ";
                ZaloOaInfo zaloOaInfo = new ZaloCSharpSDK.ZaloOaInfo(oaId, secret);
                ZaloOaClient oaClient = new ZaloOaClient(zaloOaInfo);
                Newtonsoft.Json.Linq.JObject jprofile = oaClient.getProfile(Convert.ToInt64(account));
                zalo = jprofile["data"]["displayName"].ToString();
                long uid = Convert.ToInt64(jprofile["data"]["userId"].ToString());
                oaClient.sendTextMessage(uid, message);
                return true;
            }
            catch (Exception ex)
            {
                Log.WriteLog(ex.Message);
                forward = ex.Message;
                return false;
            }
        }
    }
}
