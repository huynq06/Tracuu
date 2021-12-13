using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Utils
{
    public class Constants
    {

        public const string AVATAR_URL = "/Files/Avatar/{0}";
        public const string UPLOAD_URL = "/Files/Upload/{0}";      
        public const string ALERT_FL = "Chuyến bay {0} đã hạ cánh lúc {1} giờ {2} phút ";
        public const string ALERT_ATA = "Đã đến giờ nhận tài liệu chuyến bay {0} ";
        public const string ALERT_RCF = "Điện RCF hoặc IRP chuyến bay {0} ngày {1} còn {2} phút ";
        public const string TRANSLATE = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q={0}&tl=vi&client=tw-ob";
        public const string ALERT_COL = "Thời gian xử lý hàng lạnh chuyến bay {0} còn {1} phút ";
        public const string ALERT_COL_Finish = "Đã hết Thời gian xử lý hàng lạnh chuyến bay {0}";
        public const string DOWNLOAD_URL = "<a href='/download/index/{0}?fn={1}'  data-toggle='tooltip' title='Tải file đính kèm'>{2}</a>";
      
        public static string GetActive(bool Active)
        {
            if (Active == true)

                return "<span class='btn blue btn-outline btn-circle btn-sm active'><b>ON</b></span>";
            else
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>OFF</b></span>";

        }
        public static string Check(bool Active)
        {
            if (Active == true)

                return "<span class='btn blue btn-outline btn-circle btn-sm active'><b>OK</b></span>";
            else
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>NOT OK</b></span>";

        }
        public static string CheckStatusAwb(int Active)
        {
            if (Active == 1)

                return "<span class='btn blue btn-outline btn-circle btn-sm active'><b>OK</b></span>";
            else
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>ERROR</b></span>";

        }
        public static string Check(int Active)
        {
            if (Active == 0)
                return "";
            else if(Active == 1)
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>NOT OK</b></span>";
            else
                return "<span class='btn blue btn-outline btn-circle btn-sm active'><b>OK</b></span>";
            

        }
        public static string CheckReceived(int Active,int total)
        {
          
          if (Active == 1)
                return "<span class='btn blue btn-outline btn-circle btn-sm active'><b>"+ total + "/" + total +"</b></span>";
          
            else
                return "<span class='btn yellow btn-outline btn-circle btn-sm active'><b>" + 0 + "/" + total + "</b></span>";


        }
        public static string GetActiveMail(string Active)
        {
            if (Active.Equals("1"))

                return "<span class='btn blue btn-outline btn-circle btn-sm active'><b>ĐÃ GỬI</b></span>";
            else
                return "<span class='btn yellow btn-outline btn-circle btn-sm active'><b>CHƯA GỬI</b></span>";

        }
        public static string GetDelivery(int delivery,int receive)
        {
            if (delivery>=receive)

                return "<span class='btn blue btn-outline btn-circle btn-sm active'><b>ĐÃ GIAO HÀNG</b></span>";
            else
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>CHƯA GIAO HÀNG</b></span>";

        }
        public static string GetDelivery(string status)
        {
            if (Convert.ToInt32(status)>0)

                return "<span class='btn blue btn-outline btn-circle btn-sm active'><b>ĐÃ GIAO HÀNG</b></span>";
            else
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>CHƯA GIAO HÀNG</b></span>";

        }
        public static string GetStatus(int status)
        {
            if (status == 0)
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>HÀNG CHƯA VỀ</b></span>";
            else if(status ==1)
                return "<span class='btn yellow btn-outline btn-circle btn-sm active'><b>ĐÃ VÀO KHO</b></span>";
            else if(status == 2)
                return "<span class='btn green btn-outline btn-circle btn-sm active'><b>ĐÃ KHAI THÁC XONG</b></span>";
            else
                return "<span class='btn blue btn-outline btn-circle btn-sm active'><b>ĐÃ TRẢ HÀNG</b></span>";
        }
        public static string GetInStatus(int status,string message)
        {
             if (status == 0)
                return "<span class='btn yellow btn-outline btn-circle btn-sm active'><b>GET IN " + message + " TK </b></span>";
            else if (status == 2)
                return "<span class='btn green btn-outline btn-circle btn-sm active'><b>ĐÃ GET IN HẾT</b></span>";
            else
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>GET IN " + message + " TK</b></span>";
        }
        public static string AwbStatus(int status)
        {
            if (status == 0)
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>KHÔNG HỢP LỆ</b></span>";
            else 
                return "<span class='btn blue btn-outline btn-circle btn-sm active'><b>HỢP LỆ</b></span>";
           
        }
        public static string GetOutStatus(int status,string message)
        {
            if (status == 0)
                return "<span class='btn yellow btn-outline btn-circle btn-sm active'><b>GET OUT " + message + " TK </b></span>";
            else if (status == 2)
                return "<span class='btn green btn-outline btn-circle btn-sm active'><b>ĐÃ GET OUT HẾT</b></span>";
            else
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>GET OUT " + message + " TK</b></span>";
        }
        public static string CheckStatus(int status)
        {
            if (status == 0)
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>CHƯA NHẬN ĐỦ HÀNG</b></span>";
            else if (status == 1)
                return "<span class='btn yellow btn-outline btn-circle btn-sm active'><b>ĐÃ NHẬN ĐỦ HÀNG</b></span>";
            else if (status == 2)
                return "<span class='btn green btn-outline btn-circle btn-sm active'><b>ĐÃ CÓ PXK</b></span>";
            else
                return "<span class='btn blue btn-outline btn-circle btn-sm active'><b>ĐÃ TRẢ HÀNG</b></span>";
        }
        public static string GetStatusExport(int status)
        {
            if (status == 0)
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>CHƯA VÀO KHO</b></span>";
            else if (status == 1)
                return "<span class='btn yellow btn-outline btn-circle btn-sm active'><b>ĐÃ VÀO KHO</b></span>";
            else
                return "<span class='btn green btn-outline btn-circle btn-sm active'><b>ĐÃ RỜI KHO</b></span>";
            
        }
        public static string GetStatusTruck(string status)
        {
            if (status == "KHÔNG ĐẠT")
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>KHÔNG ĐẠT</b></span>";
            else if (status == "N/A")
                return "<span class='btn yellow btn-outline btn-circle btn-sm active'><b>N/A</b></span>";
            else
                return "<span class='btn green btn-outline btn-circle btn-sm active'><b>ĐẠT</b></span>";

        }
        public static string GetScanStatus(int status)
        {
            if (status == 0)
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>WAITING</b></span>";
            else 
                return "<span class='btn green btn-outline btn-circle btn-sm active'><b>DELIVERED</b></span>";
         

        }
        public static string GetAwbIrrStatus(int? status)
        {
            if (status.HasValue)
            {
                if (status == 0)
                    return "<span class='btn red btn-outline btn-circle btn-sm active'><b>OPEN</b></span>";
                else 
                    return "<span class='btn green btn-outline btn-circle btn-sm active'><b>CLOSE</b></span>";
            }
           
            else
            {
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>OPEN</b></span>";
            }

        }
        public static string GetStatusPrint(int status)
        {
            if (status == 0)
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>Waiting</b></span>";
            else if (status == 1)
                return "<span class='btn yellow btn-outline btn-circle btn-sm active'><b>In Queue</b></span>";
            else
                return "<span class='btn green btn-outline btn-circle btn-sm active'><b>Printed</b></span>";

        }
        public static string GetStatusERP(int status)
        {
            if (status == 0)
                return "<span class='btn red btn-outline btn-circle btn-sm active'><b>MISSING</b></span>";
            else if (status == 1)
                return "<span class='btn green btn-outline btn-circle btn-sm active'><b>OK</b></span>";
            else
                return "<span class='btn yellow btn-outline btn-circle btn-sm active'><b>NOT OK</b></span>";

        }
        public static string GetMissingSR(string ms)
        {
            string[] cargos = new string[]
            {  "Cargo on hand for 14 days on longer",
               "No HAWB attached",
               "Manual missing cargo",
               "Manual found cargo",
               "Import Dangerous Goods Failure",
               "Cargo on hand for 07 days",
               "Missing AWB",
               "Found AWB",
               "Consignee does not exist or is not contactable",
               "Shipment refused by consignee",
               "Customs Seizure",
               "Service Management failure"

            };
            for (int i = 0; i < cargos.Length; i++)
                if (ms.Trim().ToUpper().Contains(cargos[i].ToUpper().Trim()))
                    return cargos[i];
            return "DMGD";

        }

        public static string GetMissingContent(string ms,string hawb)
        {
            try
            {
                ms = ms.Replace(" ", string.Empty);
                string SITA_T = @"((Pieces)\d{1,10})";
                string SITA_W = @"((Weight)((\d+)+(\.\d+)))|((Weight)\d{1,10})";
                string SITA_C = @"((Irregularity-)[a-z A-Z]+)";
                System.Text.RegularExpressions.Regex regexC = new System.Text.RegularExpressions.Regex(SITA_C);
                System.Text.RegularExpressions.Match matchC = regexC.Match(ms);

                System.Text.RegularExpressions.Regex regexT = new System.Text.RegularExpressions.Regex(SITA_T);
                System.Text.RegularExpressions.Match matchT = regexT.Match(ms);

                System.Text.RegularExpressions.Regex regexW = new System.Text.RegularExpressions.Regex(SITA_W);
                System.Text.RegularExpressions.Match matchW = regexW.Match(ms);

               

                return (!string.IsNullOrEmpty(matchT.Value.Trim())? "P" +matchT.Value.Replace("Pieces", "").Trim():string.Empty)
                        +(!string.IsNullOrEmpty(matchW.Value.Trim())? "K" + matchW.Value.Replace("Weight", "").Trim():string.Empty)
                        +(!string.IsNullOrEmpty(hawb.Trim()) ? " OF H-" + hawb : string.Empty)
                        +(!string.IsNullOrEmpty(matchC.Value.Trim())? matchC.Value.Replace("Irregularity-", " "):string.Empty);
            }
            catch(Exception)
            {
                
            }

            return string.Empty;

        }

        public static string GetMissingContent(string ms, string hawb,ref int pieces,ref string weight,ref string dameType,ref string detail)
        {
            try
            {
                ms = ms.Replace(" ", string.Empty);
                string SITA_T = @"((Pieces)\d{1,10})";
                string SITA_W = @"((Weight)((\d+)+(\.\d+)))|((Weight)\d{1,10})";
                string SITA_C = @"((Irregularity-)[a-zA-Z,]+)";
                string SITA_D = @"((packages:).+,)";
                System.Text.RegularExpressions.Regex regexC = new System.Text.RegularExpressions.Regex(SITA_C);
                System.Text.RegularExpressions.Match matchC = regexC.Match(ms);

                System.Text.RegularExpressions.Regex regexT = new System.Text.RegularExpressions.Regex(SITA_T);
                System.Text.RegularExpressions.Match matchT = regexT.Match(ms);

                System.Text.RegularExpressions.Regex regexW = new System.Text.RegularExpressions.Regex(SITA_W);
                System.Text.RegularExpressions.Match matchW = regexW.Match(ms);

                System.Text.RegularExpressions.Regex regexZ = new System.Text.RegularExpressions.Regex(SITA_D);
                System.Text.RegularExpressions.Match matchZ = regexZ.Match(ms);
                pieces = !string.IsNullOrEmpty(matchW.Value.Trim()) ? int.Parse(matchT.Value.Replace("Pieces", "").Trim()) : 0;
                weight = (!string.IsNullOrEmpty(matchW.Value.Trim()) ?  matchW.Value.Replace("Weight", "").Trim() : string.Empty);
                dameType = (!string.IsNullOrEmpty(matchC.Value.Trim()) ? matchC.Value.Replace("Irregularity-", " ") : string.Empty);
                detail = (!string.IsNullOrEmpty(matchZ.Value.Trim()) ? matchZ.Value.Replace("packages:", " ").Trim().TrimEnd(',') : string.Empty);
                return (!string.IsNullOrEmpty(matchT.Value.Trim()) ? "P" + matchT.Value.Replace("Pieces", "").Trim() : string.Empty)
                        + (!string.IsNullOrEmpty(matchW.Value.Trim()) ? "K" + matchW.Value.Replace("Weight", "").Trim() : string.Empty)
                        + (!string.IsNullOrEmpty(hawb.Trim()) ? " OF H-" + hawb : string.Empty)
                        + (!string.IsNullOrEmpty(matchC.Value.Trim()) ? matchC.Value.Replace("Irregularity-", " ") : string.Empty);
            }
            catch (Exception)
            {

            }

            return string.Empty;

        }
        public static void GetMissingContent(string ms, ref int pieces,ref double weigth,ref string output )
        {
            try
            {
                ms = ms.Replace(" ", string.Empty);
                string SITA_T = @"((Pieces)\d{1,10})";
                string SITA_W = @"((Weight)((\d+)+(\.\d+)))|((Weight)\d{1,10})";
                string SITA_C = @"((Irregularity-)[a-z A-Z]+)";
                System.Text.RegularExpressions.Regex regexC = new System.Text.RegularExpressions.Regex(SITA_C);
                System.Text.RegularExpressions.Match matchC = regexC.Match(ms);
                output = matchC.ToString().Split('-')[1];
                System.Text.RegularExpressions.Regex regexT = new System.Text.RegularExpressions.Regex(SITA_T);
                System.Text.RegularExpressions.Match matchT = regexT.Match(ms);
                pieces = int.Parse(matchT.ToString().Substring(6));
                System.Text.RegularExpressions.Regex regexW = new System.Text.RegularExpressions.Regex(SITA_W);
                System.Text.RegularExpressions.Match matchW = regexW.Match(ms);
                weigth = double.Parse(matchW.ToString().Substring(6));
            }
            catch (Exception)
            {

            }
        }
        public const string SITA_FSU = @"^\d{3}(-)\d{8}\D{3}(HAN)(/)(T)\d{1,10}(K)\d{1,10}";
        public const string SITA_FSU_EXP= @"^\d{3}(-)\d{8}(HAN)\D{3}(/)(T)\d{1,10}(K)\d{1,10}";
        public const string SITA_FSU_NFD= @"^(NFD)(/)\d{2}\D{3}\d{4}(/)(HAN)(/)(T)\d{1,10}(((K)((\d+)+(\.\d+)))|((K)\d{1,10}))(/)[0-9 a-z]";
        public const string SITA_FSU_NFD_NEXT = @"^(NFD)(/)\d{2}\D{3}\d{4}[-](N)(/)(HAN)(/)(T)\d{1,10}(((K)((\d+)+(\.\d+)))|((K)\d{1,10}))(/)[0-9 a-z]";
        public const string SITA_FSU_RCF = @"^(RCF)(/)\D{2}\d{1,5}(/)\d{2}\D{3}\d{4}(/)(HAN)(/)(T)\d{1,10}(((K)((\d+)+(\.\d+)))|((K)\d{1,10}))(//)[0-9 a-z]";
        public const string SITA_FSU_RCF_NEXT = @"^(RCF)(/)\D{2}\d{1,5}(/)\d{2}\D{3}\d{4}[-](N)(/)(HAN)(/)(T)\d{1,10}(((K)((\d+)+(\.\d+)))|((K)\d{1,10}))(//)[0-9 a-z]";
        public const string SITA_FSU_AWR = @"^(AWR)(/)\D{2}\d{1,5}(/)\d{2}\D{3}\d{4}(/)(HAN)(/)(T)\d{1,10}(((K)((\d+)+(\.\d+)))|((K)\d{1,10}))(//)[0-9 a-z]";
        public const string SITA_FSU_AWR_NEXT = @"^(AWR)(/)\D{2}\d{1,5}(/)\d{2}\D{3}\d{4}[-](N)(/)(HAN)(/)(T)\d{1,10}(((K)((\d+)+(\.\d+)))|((K)\d{1,10}))(//)[0-9 a-z]";
        public const string SITA_FSU_DLV = @"^(DLV)(/)\d{2}\D{3}\d{4}(/)(HAN)(/)(T)\d{1,10}(((K)((\d+)+(\.\d+)))|((K)\d{1,10}))(/)[0-9 a-z]";
        public const string SITA_FSU_RCS = @"^(RCS)(/)\d{2}\D{3}\d{4}(/)(HAN)(/)(T)\d{1,10}(((K)((\d+)+(\.\d+)))|((K)\d{1,10}))(/)[0-9 a-z]";
    }
}
