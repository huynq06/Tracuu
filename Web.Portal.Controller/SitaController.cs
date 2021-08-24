using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KTN")]
    public class SitaController: BaseController
    {
        private DateTime? fromDate;
        private DateTime? toDate;
        public static IList<Layer.Flight> FlightList = new List<Layer.Flight>();
        public ActionResult Index()
        {
            FlightList = new DataAccess.FlightAccess().GetAllFlight();
            ViewData["CODE"] = FlightList.GroupBy(x => x.Code).Select(x => x.Key).ToList();

            return View();
        }
        public ActionResult GetNo(string id)
        {
            StringBuilder row = new StringBuilder();

            var Child = FlightList.Where(x => x.Code.Equals(id)).ToList();
            row.AppendLine("<option value='ALL'></option>");
            foreach (var item in Child)
            {
                row.AppendLine("<option value='" + item.FlightNo + "'>" + item.FlightNo + "</option>");

            }
            return Content(row.ToString());
        }

        public ActionResult List()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            // string code = string.IsNullOrEmpty(Request["ty"]) ? "ALL" : Request["ty"].Trim();

            // string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            int totalSita = 0;
            IList<Layer.Sita> sitaLists = new DataAccess.SitaAccess().ReportSita(page,
                                                                                  pageSize,
                                                                                  "DLV",
                                                                                  fromDate,
                                                                                  toDate,
                                                                                  ref total, ref totalSita);
            ViewData["SitaLists"] = sitaLists;
            ViewBag.TotalRecord = total;
            ViewBag.PageCurrent = (page - 1) * pageSize;
            ViewBag.SumSita = totalSita;
            
            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingsita", total, page, pageSize);
            return View();
        }
        [DocumentExport("EXCEL", "THONGKE_DIEN_DLV")]
        public ActionResult Export()
        {
            int total = 0;

            // string code = string.IsNullOrEmpty(Request["ty"]) ? "ALL" : Request["ty"].Trim();

            // string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            string st = string.IsNullOrEmpty(Request["st"]) ? "DLV" : Request["st"].Trim();
            int totalSita = 0;
            string id = Request["file"];
            string fileImport = string.Empty;

            if (!string.IsNullOrEmpty(id))
            {
                List<Web.Portal.Upload.FileTem> fileJsonUpload = new List<Upload.FileTem>();

                fileJsonUpload = Web.Portal.Upload.ConvertFileTem.ConvertJsonToList(id);
                foreach (var item in fileJsonUpload)
                {
                    fileImport = item.key;
                }

            }

            IList<Layer.SitaError> sitaChecks = new List<Layer.SitaError>();
            if (!string.IsNullOrEmpty(fileImport))
                sitaChecks = GetSitaError(Server.MapPath(Upload.DisplayUrl.UrlUploadFile + fileImport),st.Trim());
            IList<Layer.Sita> sitaLists = new List<Layer.Sita>();
            if (st.Equals("DLV"))
            {
                sitaLists = new DataAccess.SitaAccess().ReportSita(1,
                                                                                      Int32.MaxValue,
                                                                                      "RELEASE BY DRIVER",
                                                                                      fromDate,
                                                                                      toDate,
                                                                                      ref total, ref totalSita);
            }
            if (st.Equals("RCF") || st.Equals("NFD") || st.Equals("AWR"))
            {
                string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();
                string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
                sitaLists = new DataAccess.SitaAccess().ReportSita(code, flightNo, fromDate, toDate);
                total = sitaLists.Sum(x => x.Quantity);
                totalSita = total;
            }

            IList<Layer.Sita> sitaSuccess = new List<Layer.Sita>();
            IList<Layer.Sita> sitaError = new List<Layer.Sita>();
            IList<Layer.Sita> sitaSplus = new List<Layer.Sita>();
            IList<Layer.SitaError> sitaFormatError = new List<Layer.SitaError>();
            sitaFormatError = sitaChecks.Where(x => x.Status == false).ToList();
            foreach (var row in sitaLists)
            {
                int st_chk = sitaChecks.Count(x => x.MAWB.Equals(row.MAWB.Trim())&& x.Status==true);
                row.SitaSend = st_chk;
                if (st_chk == row.Quantity)
                    sitaSuccess.Add(row);
                else
                if (st_chk > row.Quantity)
                    sitaSplus.Add(row);
                if(sitaChecks.Count(x => x.MAWB.Equals(row.MAWB.Trim()))==0)
                 sitaError.Add(row);
            }
            if (st.Equals("DLV"))
            {
                foreach (var row in sitaChecks)
                {
                    int ct = sitaLists.Count(x =>row.Status==true && x.MAWB.Equals(row.MAWB.ToString().Trim()));
                    if (ct == 0)
                    {
                        sitaSplus.Add(new Layer.Sita()
                        {
                            MAWB = row.MAWB,
                            Quantity = 0,
                            SitaSend = 1
                        });
                    }
                }
            } 
            ViewData["SitaSuccess"] = sitaSuccess;
            ViewData["SitaError"] = sitaError;
            ViewData["SitaSplus"] = sitaSplus;
            ViewData["SitaFormatError"] = sitaFormatError;
            ViewBag.ReportSita = st;
            ViewBag.TotalRecord = total;
            ViewBag.SumDelivery = totalSita;
            ViewBag.PageCurrent = 0;
            ViewBag.TotalSitaSuccess = sitaSuccess.Sum(x => x.SitaSend);
            ViewBag.TotalSitaError= sitaError.Sum(x => x.Quantity-x.SitaSend);
            ViewBag.TotalSitaPlus = sitaSplus.Sum(x => x.SitaSend);
            ViewBag.SumSita = sitaChecks.Count(x=>x.Status== true);
            ViewBag.SumSitaError = sitaChecks.Count(x => x.Status == false);
            ViewBag.FromDate = Request["fda"];
            ViewBag.ToDate = Request["tda"];
            return View();
        }


        private IList<string>GetSitaImport(string pathFile)
        {
            IList<string> SitaList = new List<string>();
            try
            {
                string pattern = @"^(FSU)/\d{1,2}$";
                string[] lines_sita = System.IO.File.ReadAllLines(pathFile);
                int index = -1;
                do
                {
                    index = Array.FindIndex(lines_sita, index + 1, x => System.Text.RegularExpressions.Regex.IsMatch(x.Trim(), pattern, System.Text.RegularExpressions.RegexOptions.IgnoreCase));
                    if (index != -1 && index + 2 < lines_sita.Length)
                    {
                        SitaList.Add(lines_sita[index + 1].Substring(0, 12));
                    }



                } while (-1 != index);

            }
            catch(Exception)
            {

            }
            return SitaList;

        }


        private IList<Layer.SitaError> GetSitaError(string pathFile,string type)
        {
            IList<Layer.SitaError> SitaList = new List<Layer.SitaError>();
            try
            {
                string pattern = @"^(FSU)/\d{1,2}$";
                
                string[] lines_sita = System.IO.File.ReadAllLines(pathFile);
                int index = -1;
                do
                {
                    index = Array.FindIndex(lines_sita, index + 1, x => System.Text.RegularExpressions.Regex.IsMatch(x.Trim(), pattern, System.Text.RegularExpressions.RegexOptions.IgnoreCase));
                    if (index != -1 && index + 2 < lines_sita.Length)
                    {
                        Layer.SitaError sitaItem = new Layer.SitaError();
                        string error = string.Empty;
                        sitaItem.MAWB = lines_sita[index + 1].Substring(0, 12);                       
                        sitaItem.Status= (!type.Equals("DLV"))?Check(index+2,index+3,lines_sita[index + 1].Replace(" ",string.Empty), lines_sita[index + 2].Replace(" ",string.Empty), type,ref error):true;                                             
                        sitaItem.Error = error;               
                        SitaList.Add(sitaItem);
                    }



                } while (-1 != index);

            }
            catch (Exception)
            {

            }
            return SitaList;

        }
        private IList<Layer.SitaError> GetSitaExpError(string pathFile, string type)
        {
            IList<Layer.SitaError> SitaList = new List<Layer.SitaError>();
            try
            {
                string pattern = @"^(FSU)/\d{1,2}$";

                string[] lines_sita = System.IO.File.ReadAllLines(pathFile);
                int index = -1;
                do
                {
                    index = Array.FindIndex(lines_sita, index + 1, x => System.Text.RegularExpressions.Regex.IsMatch(x.Trim(), pattern, System.Text.RegularExpressions.RegexOptions.IgnoreCase));
                    if (index != -1 && index + 2 < lines_sita.Length)
                    {
                        Layer.SitaError sitaItem = new Layer.SitaError();
                        string error = string.Empty;
                        sitaItem.MAWB = lines_sita[index + 1].Substring(0, 12);
                        sitaItem.Status = CheckExp(index + 2, index + 3, lines_sita[index + 1].Replace(" ", string.Empty), lines_sita[index + 2].Replace(" ", string.Empty), type, ref error) ;
                        sitaItem.Error = error;
                        SitaList.Add(sitaItem);
                    }



                } while (-1 != index);

            }
            catch (Exception)
            {

            }
            return SitaList;

        }
        private bool Check(int r1,int r2,string row1,string row2,string type,ref string error)
        {
            try
            {
                bool st_row1 = System.Text.RegularExpressions.Regex.IsMatch(row1, Utils.Constants.SITA_FSU, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                bool st_row2 = (type.Equals("NFD") &&
                    (System.Text.RegularExpressions.Regex.IsMatch(row2, Utils.Constants.SITA_FSU_NFD, System.Text.RegularExpressions.RegexOptions.IgnoreCase)
                    ||
                    System.Text.RegularExpressions.Regex.IsMatch(row2, Utils.Constants.SITA_FSU_NFD_NEXT, System.Text.RegularExpressions.RegexOptions.IgnoreCase))
                    )
                    ||
                    (type.Equals("RCF") && (System.Text.RegularExpressions.Regex.IsMatch(row2, Utils.Constants.SITA_FSU_RCF, System.Text.RegularExpressions.RegexOptions.IgnoreCase)
                    || System.Text.RegularExpressions.Regex.IsMatch(row2, Utils.Constants.SITA_FSU_RCF_NEXT, System.Text.RegularExpressions.RegexOptions.IgnoreCase))
                    )
                    ||
                    (type.Equals("AWR") && (System.Text.RegularExpressions.Regex.IsMatch(row2, Utils.Constants.SITA_FSU_AWR, System.Text.RegularExpressions.RegexOptions.IgnoreCase)
                    || System.Text.RegularExpressions.Regex.IsMatch(row2, Utils.Constants.SITA_FSU_AWR_NEXT, System.Text.RegularExpressions.RegexOptions.IgnoreCase))
                    )

                    ;
                if (st_row1==true && st_row2==true)
                {
                    string[] r_1 = row1.Split('/');
                    int p = Convert.ToInt32(r_1[1].Substring(r_1[1].IndexOf('T') + 1, r_1[1].IndexOf('K') - 1));
                    float w = float.Parse(r_1[1].Substring(r_1[1].IndexOf('K') + 1));
                    if (p == 0 || w == 0)
                    {
                        error = "Sai dòng "+r1+". Số cân kiện không đúng";
                        return false;
                    }
                        
                    int id = 3;
                   
                    
                    if(type.Equals("RCF") || type.Equals("AWR"))                   
                        id = 4;

                        string[] r_2 = row2.Split('/');
                        int p_2 = Convert.ToInt32(r_2[id].Substring(r_2[id].IndexOf('T') + 1, r_2[id].IndexOf('K') - 1));
                        float w_2 = float.Parse(r_2[id].Substring(r_2[id].IndexOf('K') + 1));
                    if (p_2 == 0 || w_2 == 0 || (p != p_2) || w != w_2)
                    {
                        error = "Sai dòng " + r2 + ". Số cân kiện không đúng";
                        return false;
                    }
                        
                    return true;

                }else
                {
                    error =((st_row1==false)?"Dòng "+(r1)+". Sai format điện.":string.Empty) 
                           +((st_row2 == false) ?"Dòng "+(r2)+". Sai format điện." : string.Empty);
                }

            }catch(Exception)
            {


            }
            return false;
        }
        private bool CheckExp(int r1, int r2, string row1, string row2, string type, ref string error)
        {
            try
            {
                bool st_row1 = System.Text.RegularExpressions.Regex.IsMatch(row1, Utils.Constants.SITA_FSU_EXP, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                bool st_row2 = (type.Equals("RCS") && System.Text.RegularExpressions.Regex.IsMatch(row2, Utils.Constants.SITA_FSU_RCS, System.Text.RegularExpressions.RegexOptions.IgnoreCase));
                    
                if (st_row1 == true && st_row2 == true)
                {
                    string[] r_1 = row1.Split('/');
                    int p = Convert.ToInt32(r_1[1].Substring(r_1[1].IndexOf('T') + 1, r_1[1].IndexOf('K') - 1));
                    float w = float.Parse(r_1[1].Substring(r_1[1].IndexOf('K') + 1));
                    if (p == 0 || w == 0)
                    {
                        error = "Sai dòng " + r1 + ". Số cân kiện không đúng";
                        return false;
                    }

                    int id = 3;                 

                    string[] r_2 = row2.Split('/');
                    int p_2 = Convert.ToInt32(r_2[id].Substring(r_2[id].IndexOf('T') + 1, r_2[id].IndexOf('K') - 1));
                    float w_2 = float.Parse(r_2[id].Substring(r_2[id].IndexOf('K') + 1));
                    if (p_2 == 0 || w_2 == 0 || (p != p_2) || w != w_2)
                    {
                        error = "Sai dòng " + r2 + ". Số cân kiện không đúng";
                        return false;
                    }

                    return true;

                }
                else
                {
                    error = ((st_row1 == false) ? "Dòng " + (r1) + ". Sai format điện." : string.Empty)
                           + ((st_row2 == false) ? "Dòng " + (r2) + ". Sai format điện." : string.Empty);
                }

            }
            catch (Exception)
            {


            }
            return false;
        }
        public ActionResult Exp()
        {
            // FlightList = new DataAccess.FlightAccess().GetAllFlight();
            // ViewData["CODE"] = FlightList.GroupBy(x => x.Code).Select(x => x.Key).ToList();

           
            return View();
        }
        [DocumentExport("EXCEL", "THONGKE_DIEN_RCS")]
        public ActionResult ExportExp()
        {
            string st = string.IsNullOrEmpty(Request["st"]) ? "RCS" : Request["st"].Trim();
            string id = Request["file"];
            string fileImport = string.Empty;

            if (!string.IsNullOrEmpty(id))
            {
                List<Web.Portal.Upload.FileTem> fileJsonUpload = new List<Upload.FileTem>();

                fileJsonUpload = Web.Portal.Upload.ConvertFileTem.ConvertJsonToList(id);
                foreach (var item in fileJsonUpload)
                {
                    fileImport = item.key;
                }

            }
            ViewBag.ReportSita = st;
            IList<Layer.SitaError> sitaChecks = new List<Layer.SitaError>();
            if (!string.IsNullOrEmpty(fileImport))
                sitaChecks = GetSitaExpError(Server.MapPath(Upload.DisplayUrl.UrlUploadFile + fileImport), st.Trim());
            ViewData["SitaExpList"] = sitaChecks;
            ViewBag.SumSita = sitaChecks.Count(x => x.Status == true);
            ViewBag.SumSitaError = sitaChecks.Count(x => x.Status == false);
            return View();
        }
    }
}
