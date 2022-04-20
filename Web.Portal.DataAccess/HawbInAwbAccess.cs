using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Model.Models;
using Web.Portal.Common.ViewModel;

namespace Web.Portal.DataAccess
{
    public class HawbInAwbAccess : DataBase.OracleProvider
    {
        private HawbInAwb GetProperties(OracleDataReader reader)
        {
            HawbInAwb hawb = new HawbInAwb();
            hawb.Lagi_Identity = Convert.ToInt32(GetValueField(reader, "LAGI_INDENT_NO", 0));
            hawb.HAWB = Convert.ToString(GetValueField(reader, "HAWB", string.Empty));
            return hawb;
        }
        public List<HawbInAwb> GetHawbInAwb(AWBByULD awb, Flight flight)
        {

            string sql = "SELECT l.lagi_ident_no as LAGI_INDENT_NO,l.LAGI_HAWB as HAWB FROM LAGI l " +
                "WHERE " +
               " l.lagi_flight_date_in =" + flight.FLUI_LANDED_DATE +
             " AND (l.lagi_mawb_prefix||l.lagi_mawb_no) = '" + awb.AWB + "'";
            List<HawbInAwb> hawbs = new List<HawbInAwb>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    HawbInAwb hawb = GetProperties(reader);
                    if (!string.IsNullOrEmpty(hawb.HAWB))
                    {
                        hawbs.Add(hawb);
                    }
                }
            }
            return hawbs;
        }

        public List<HawbIrr> GetIrrByHawb(string lagiId,string hawb)
        {
            List<string> remarks = new List<string>();
            List<HawbIrr> listHawbIrr = new List<HawbIrr>();
            string sql = "select ag.agen_remarks  REMARK, (select agen.agen_remarks from agen where agen.agen_ident_no = ag.agen_ident_no and agen.agen_status_external = 'GROUP ADDITIONAL INFO' and agen.agen_type = 'AWB' and agen.agen_remarks like CONCAT(CONCAT('Group ', SUBSTR(ag.agen_remarks, 11, 14)), ' update: ULD%') and rownum = 1) as ULD from agen ag " +
               
              "WHERE " +
             " ag.agen_status_external = 'DAMAGED CARGO'" +
           " AND ag.agen_ident_no = '" + lagiId + "'";
            StringBuilder content = new StringBuilder();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    string remark = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
                    string ULD = Convert.ToString(GetValueField(reader, "ULD", string.Empty));
                    if (!string.IsNullOrEmpty(remark))
                    {
                        int pieces = 0;
                        string weight = "";
                        string dameType = "";
                        string irrDetail = "";
                        HawbIrr hawbIrr = new HawbIrr();
                        GetMissingContent(remark, hawb, ref pieces, ref weight, ref dameType, ref irrDetail);

                        hawbIrr.IrrDetails = irrDetail;
                        if (dameType.Trim().ToUpper().Contains("CRUSHED"))
                        {
                            hawbIrr.IrrCrushed = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("TORN"))
                        {
                            hawbIrr.IrrTorn = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("WET"))
                        {
                            hawbIrr.IrrWet = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("MSCA"))
                        {
                            hawbIrr.IrrMsca = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("FDCA"))
                        {
                            hawbIrr.IrrFdca = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("BROKEN"))
                        {
                            hawbIrr.IrrBroken = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("LABEL"))
                        {
                            hawbIrr.IrrWithoutLabel = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("OVCD"))
                        {
                            hawbIrr.IrrOvcd = true;
                        }
                        if (dameType.Trim().ToUpper().Contains("OTHERS"))
                        {
                            hawbIrr.IrrOther = true;
                        }
                        hawbIrr.IrrPices = pieces;

                        double defaultValue = 0;
                        string str = weight;
                        bool success = double.TryParse(str, out defaultValue);
                        hawbIrr.IrrWeight = defaultValue;
                        hawbIrr.HawbDamge = dameType;

                        hawbIrr.Created = DateTime.Now;
                        hawbIrr.ULD = ULD.Contains("-") ? ULD.Split('-')[1] : "";

                        hawbIrr.Created = DateTime.Now;


                        hawbIrr.IrrTimeDuringULDBreakDown = true;
                        hawbIrr.IrrActionPhotoYes = true;
                        hawbIrr.IrrCustomsSealedNo = true;
                        hawbIrr.IrrRemarkCargoManifest = true;
                        hawbIrr.IrrCauseUnknown = true;
                        hawbIrr.IrrActionNo = true;



                        listHawbIrr.Add(hawbIrr);
                    }
                }
            }
            return listHawbIrr;
        }
        public static string GetMissingContent(string ms, string hawb, ref int pieces, ref string weight, ref string dameType, ref string detail)
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
                weight = (!string.IsNullOrEmpty(matchW.Value.Trim()) ? matchW.Value.Replace("Weight", "").Trim() : string.Empty);
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
    }

}

