using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Web.Portal.Utils;

namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC")]
    public class DamageController:BaseController
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
            string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            string cd = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();
            fromDate = string.IsNullOrEmpty(Request["tda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 00:00");
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 23:59");
            int totalPices = 0;
            double totalWeight = 0;
            List<Layer.ImpAWB> impAwbs = new List<Layer.ImpAWB>();
            impAwbs.AddRange(new DataAccess.ImpAWBAccess().GetCustomByStatus(page,
                                                                                  Int32.MaxValue,
                                                                                  cd,no,
                                                                                  fromDate,
                                                                                  toDate, "DAMAGED CARGO",
                                                                                  ref total, ref totalPices, ref totalWeight));

            impAwbs.AddRange(new DataAccess.ImpAWBAccess().GetCustomByStatus(page,
                                                                                  Int32.MaxValue,
                                                                                  cd,no,
                                                                                  fromDate,
                                                                                  toDate, "MOVED TO SERVICE RECOVERY",
                                                                                  ref total, ref totalPices, ref totalWeight));

            ViewData["DamageList"] = impAwbs;
            return View();
        }
        [DocumentExport("EXCEL", "DANHSACHSITA")]
        public ActionResult ExportFlight()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            string cd = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();
            fromDate = string.IsNullOrEmpty(Request["tda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 00:00");
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 23:59");
            int totalPices = 0;
            double totalWeight = 0;
            List<Layer.ImpAWB> impAwbs = new List<Layer.ImpAWB>();
            List<Layer.ImpAWB> impAwbsFlight = new List<Layer.ImpAWB>();
            impAwbsFlight = new DataAccess.ImpAWBAccess().GetCustomByStatus_TT(cd, no,
                                                                                  fromDate,
                                                                                  toDate).Where(x => x.AWB.Contains("Z") == false && x.GoodsContent.Contains("MAIL") == false).ToList();          
            IList<Layer.ImpAWB> imps = new DataAccess.ImpAWBAccess().GetCustomByStatus(page,
                                                                                Int32.MaxValue,
                                                                                cd, no,
                                                                                fromDate,
                                                                                toDate, "DAMAGED CARGO",
                                                                                ref total, ref totalPices, ref totalWeight);
            
            foreach (var im in imps)
            {
                im.LAGI_REMARK = "DMGD";
                impAwbs.Add(im);
            }
            List<Layer.ImpAWB> impAwbsDocument = new DataAccess.ImpAWBAccess().GetCustomByStatus(page,
                                                                                  Int32.MaxValue,
                                                                                  cd, no,
                                                                                  fromDate,
                                                                                  toDate, "MOVED TO SERVICE RECOVERY",
                                                                                  ref total, ref totalPices, ref totalWeight).ToList();
            impAwbs.AddRange(impAwbsDocument);

            List<Layer.ImpAWB> impAwbMiss = new List<Layer.ImpAWB>();
            foreach(var item in impAwbsFlight)
            {
                
                var em = impAwbs.FirstOrDefault(x => x.ID == item.ID);
                if(em!=null && impAwbMiss.Count(x=>x.AWB.Trim().Equals(em.AWB))==0)
                {
                    
                        item.LAGI_REMARK = em.LAGI_REMARK;
                        List<Layer.ImpAWB> HawbRemark = impAwbs.Where(x => x.AWB.Equals(item.AWB) && x.Remarks.Contains("Moved to Service Recovery") && !x.Remarks.Contains("Moved to Service Recovery by the Handheld")).ToList();
                        string remark = "";
                        foreach(var obj in HawbRemark)
                        {
                            remark += obj.Remarks.Replace("Moved to Service Recovery manually", "").Trim() + ";";
                        }
                        item.Remarks = remark;
                        item.HAWB = string.Join(System.Environment.NewLine, impAwbsFlight.Where(x => x.AWB.Equals(item.AWB) && !string.IsNullOrEmpty(item.HAWB.Trim()) && impAwbs.Count(y => y.ID == x.ID) > 0).Select(x => x.HAWB).ToArray());
                        Layer.ImpHAWB impH = new DataAccess.ImpHAWBAccess().GetMAWB(item.Prefix + item.AWB.Trim());
                        item.QuantityReceived = impH.QuantityReceived;
                        item.WeightReceived = impH.WeightReceived;
                        item.QuantityExpected = impH.QuantityExpected;
                        item.WeightExpected = impH.WeightExpected;
                        impAwbMiss.Add(item);
                    
                 
                }
            }

            ViewData["DamageList"] = impAwbMiss.OrderBy(c => c.AWB.Substring(c.AWB.Length - 1)).ToList();
            ViewBag.Flight = cd + no;
            ViewBag.Date = Request["tda"];
            ViewBag.ETA = impAwbsFlight.Count>0?impAwbsFlight[0].ScheTime:string.Empty;
            ViewBag.ATA = impAwbsFlight.Count > 0 ? impAwbsFlight[0].ATATIME : string.Empty;
            ViewBag.TotalMAWB = impAwbsFlight.GroupBy(x => x.AWB.Trim()).Count();
            ViewBag.TotalHAWB = impAwbsFlight.Count(x=>!string.IsNullOrEmpty(x.HAWB.Trim()));
            double SumPicesNoMail = 0;
            double SumWeightNoMail = 0;
            double SumPicesMail = 0;
            double SumWeigthMail = 0;
            GetSumGrai(cd, no,ref SumPicesNoMail,ref SumPicesMail,ref SumWeightNoMail, ref SumWeigthMail);
            ViewBag.TotalQuantityReceive = SumPicesNoMail;
            ViewBag.TotalWeightReceive = SumWeightNoMail.ToString("N2"); 
            ViewBag.TotalQuantityMP = SumPicesMail;
            ViewBag.TotalWeightMP = SumWeigthMail.ToString("N2");
            ViewBag.TotalQuantity = SumPicesNoMail + SumPicesMail;
            ViewBag.TotalWeight = (SumWeightNoMail + SumWeigthMail).ToString("N2"); 
            return View();
        }
        [DocumentExport("TEXT", "DANHSACHBATTHUONG")]
        public ActionResult Export()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            string cd = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();
            fromDate = string.IsNullOrEmpty(Request["tda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 00:00");
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 23:59");
            int totalPices = 0;
            double totalWeight = 0;
            List<Layer.ImpAWB> impAwbs = new List<Layer.ImpAWB>();
            IList<Layer.ImpAWB> imps = new DataAccess.ImpAWBAccess().GetCustomByStatus(page,
                                                                                  Int32.MaxValue,
                                                                                  cd, no,
                                                                                  fromDate,
                                                                                  toDate, "DAMAGED CARGO",
                                                                                  ref total, ref totalPices, ref totalWeight);
            foreach (var im in imps)
            {
                im.GoodsContent =im.Remarks;
                im.Remarks = "DMGD";

                impAwbs.Add(im);
            }
            impAwbs.AddRange(new DataAccess.ImpAWBAccess().GetCustomByStatus(page,
                                                                                  Int32.MaxValue,
                                                                                  cd, no,
                                                                                  fromDate,
                                                                                  toDate, "MOVED TO SERVICE RECOVERY",
                                                                               ref total, ref totalPices, ref totalWeight));
            List<Layer.ImpAWB> impAwbsReal = new List<Layer.ImpAWB>();
            List<Layer.ImpAWB> imAwbsCheck = new List<Layer.ImpAWB>();
            foreach (var item in impAwbs)
            {
                if (imAwbsCheck.Count(x => x.AWB.Trim().Equals(item.AWB.Trim()) && x.HAWB.Trim().Equals(item.HAWB.Trim())) == 0)
                {

                  
                    imAwbsCheck.Add(item);
                }
            }
              foreach (var item in imAwbsCheck)
            {
                if (impAwbsReal.Count(x => x.AWB.Trim().Equals(item.AWB.Trim()) ) == 0)
                {
                    Layer.ImpHAWB impH = new DataAccess.ImpHAWBAccess().GetMAWB(item.Prefix+item.AWB.Trim());
                    var dm = imAwbsCheck.Where(x => x.AWB.Trim().Equals(item.AWB.Trim())).ToList();
                    var rs = dm.Select(x => (dm.Count > 1 ? System.Environment.NewLine+"-" : "/") + Utils.Constants.GetMissingContent(x.GoodsContent, x.HAWB).ToUpper()).ToArray();
                    item.GoodsContent = string.Join("", rs);
                    item.QuantityReceived = impH.QuantityReceived;
                    item.WeightReceived = impH.WeightReceived;
                    item.QuantityExpected = impH.QuantityExpected;
                    item.WeightExpected = impH.WeightExpected;
                    impAwbsReal.Add(item);
                }
                    
            }

            ViewData["DamageList"] = impAwbsReal;
            
            ViewBag.FlightNo = cd + no+"/" + Utils.Format.GetMonthName(fromDate)+"/"+(impAwbs.Count()>0?(impAwbs[0].LOADING +"-"+ impAwbs[0].DEST):string.Empty);
            return View();
        }
        [DocumentExport("EXCEL", "BATTHUONG")]
        public ActionResult ExportData()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            string cd = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"] + " 00:00");
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] + " 23:59");
            int totalPices = 0;
            double totalWeight = 0;
            List<Layer.ImpAWB> impAwbs = new List<Layer.ImpAWB>();
            IList<Layer.ImpAWB> imps = new DataAccess.ImpAWBAccess().GetCustomByStatus(page,
                                                                                  Int32.MaxValue,
                                                                                  cd, no,
                                                                                  fromDate,
                                                                                  toDate, "DAMAGED CARGO",
                                                                                  ref total, ref totalPices, ref totalWeight);
            foreach (var im in imps)
            {
                im.GoodsContent = im.Remarks;
                im.Remarks = "DMGD";

                impAwbs.Add(im);
            }
            impAwbs.AddRange(new DataAccess.ImpAWBAccess().GetCustomByStatus(page,
                                                                                  Int32.MaxValue,
                                                                                  cd, no,
                                                                                  fromDate,
                                                                                  toDate, "MOVED TO SERVICE RECOVERY",
                                                                               ref total, ref totalPices, ref totalWeight));
            List<Layer.ImpAWB> impAwbsReal = new List<Layer.ImpAWB>();
            List<Layer.ImpAWB> imAwbsCheck = new List<Layer.ImpAWB>();
            foreach (var item in impAwbs)
            {
                if (imAwbsCheck.Count(x => x.AWB.Trim().Equals(item.AWB.Trim()) && x.HAWB.Trim().Equals(item.HAWB.Trim())) == 0)
                {
                    if (!string.IsNullOrEmpty(item.GoodsContent))
                    {
                        string output = "";
                        int pieces = 0;
                        double weight = 0;
                        Utils.Constants.GetMissingContent(item.GoodsContent, ref pieces, ref weight, ref output);
                        item.Msg = output;
                        item.PiecesIrr = pieces;
                        item.WeightIrr = weight;
                    }
                    else
                    {
                        item.Remarks = item.Remarks.Replace("Moved to Service Recovery manually", "").Trim();
                        //item.Remarks = new SHCUtils().ChechCODE(item.Remarks.Replace("Moved to Service Recovery manually", "").Trim());
                    }
                    imAwbsCheck.Add(item);
                }
            }
            //foreach (var item in imAwbsCheck)
            //{
            //    if (impAwbsReal.Count(x => x.AWB.Trim().Equals(item.AWB.Trim())) == 0)
            //    {
            //        Layer.ImpHAWB impH = new DataAccess.ImpHAWBAccess().GetMAWB(item.Prefix + item.AWB.Trim());
            //        var dm = imAwbsCheck.Where(x => x.AWB.Trim().Equals(item.AWB.Trim())).ToList();
            //        var rs = dm.Select(x => (dm.Count > 1 ? System.Environment.NewLine + "-" : "/") + Utils.Constants.GetMissingContent(x.GoodsContent, x.HAWB).ToUpper()).ToArray();
            //        item.GoodsContent = string.Join("", rs);
            //        item.QuantityReceived = impH.QuantityReceived;
            //        item.WeightReceived = impH.WeightReceived;
            //        item.QuantityExpected = impH.QuantityExpected;
            //        item.WeightExpected = impH.WeightExpected;
            //        impAwbsReal.Add(item);
            //    }

            //}

            ViewData["DamageList"] = imAwbsCheck.OrderBy(c=>c.AWB).ToList();

            ViewBag.FlightNo = cd + no + "/" + Utils.Format.GetMonthName(fromDate) + "/" + (impAwbs.Count() > 0 ? (impAwbs[0].LOADING + "-" + impAwbs[0].DEST) : string.Empty);
            return View();
        }
        private void GetSumGrai(string code, string flightNo, ref double SumPicesNoMail, ref double SumPicesMail, ref double SumWeightNoMail, ref double SumWeigthMail)
        {
            IList<Layer.GraiInfo> grais = new DataAccess.GraiInfoAccess().GetCustomByGrai(code,
                                                                                 flightNo,
                                                                                 fromDate,
                                                                                 toDate
                                                                                 );
            var graisCheck = grais.Where(x => x.Type.Trim().Equals("PIECES") && x.Code.Trim().Equals("RECEIVED")).GroupBy(x => new { x.Group,x.GoodsContent }).ToList();
            
            foreach (var item in graisCheck)
            {
                var itemChecks = grais.Where(x => x.Group.Trim().Equals(item.Key.Group.Trim()));
                var flight = itemChecks.FirstOrDefault(x => x.Type.Trim().Equals("FLIGHT"));
               // var date= itemChecks.FirstOrDefault(x => x.Type.Trim().Equals("DATE"));
                if(flight!=null && flight.Value.Trim().Equals(flight.INTERNAL_NUMBER.Trim())
                  //  && date!=null && (Convert.ToDateTime(date.Value).CompareTo(fromDate)==1 && Convert.ToDateTime(date.Value).CompareTo(toDate) <0)
                    )
                {
                    double weight= itemChecks.Where(x =>x.Type.Trim().Equals("WEIGHT") && x.Code.Trim().Equals("RECEIVED")).Sum(x=>Convert.ToDouble(x.Value.Replace(",",".")));
                    double pieces= itemChecks.Where(x => x.Type.Trim().Equals("PIECES") && x.Code.Trim().Equals("RECEIVED")).Sum(x => Convert.ToDouble(x.Value.Replace(",", ".")));
                    
                    if (item.Key.GoodsContent.Contains("POST") == false && item.Key.GoodsContent.Contains("MAIL") == false)
                    {
                        SumPicesNoMail += pieces;
                        SumWeightNoMail += weight;
                    }
                    else
                    {
                        SumPicesMail += pieces;
                        SumWeigthMail += weight;
                    }
                    
                }


            }
           
            ViewBag.SUMPCS =SumPicesNoMail;// flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
            ViewBag.SumGW = Math.Round(SumWeightNoMail,1); //flights.Where(x => x.GoodsContent.Contains("POST") == false && x.GoodsContent.Contains("MAIL") && x.AgenRemark.Contains(tem_weight) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_weight) + tem_weight.Length)));
            ViewBag.SUMPCSMAIL = SumPicesMail; //flights.Where(x => (x.GoodsContent.Contains("POST") == true || x.GoodsContent.Contains("MAIL") == true) && x.AgenRemark.Contains(tem_pcs) == true).ToList().Sum(x => Convert.ToDouble(x.AgenRemark.Substring(x.AgenRemark.LastIndexOf(tem_pcs) + tem_pcs.Length)));
            ViewBag.SumGWMail = Math.Round(SumWeigthMail,1);
        }
        public ActionResult ViewImage()
        {
            try
            {
                string awb = Request["awb"];
                string pathFile = @"\\10.10.1.5\kt_nhap\" + awb;
                System.Net.NetworkCredential readCredentials = new System.Net.NetworkCredential(@"ALSC_DATA\ktnhap", "#123@123*");
                List<string> listFile = new List<string>();
                using (new Web.Portal.Sercurity.NetworkConnection(pathFile, readCredentials))
                {
                    string[] folders = System.IO.Directory.GetDirectories(pathFile);
                    listFile.AddRange(GetFileByFolder(pathFile, readCredentials));
                    foreach (var item in folders)
                    {
                        listFile.AddRange(GetFileByFolder(item, readCredentials));
                    }
                }
               
                ViewData["ImageList"] = listFile;
                return View();
            }catch(Exception)
            {
                return View("Không tồn tại đường dẫn này");
            }
        }
        private List<string> GetFileByFolder(string pathFolder, System.Net.NetworkCredential readCredentials)
        {
            List<string> listFiles = new List<string>();
            using (new Web.Portal.Sercurity.NetworkConnection(pathFolder, readCredentials))
            {
                System.IO.DirectoryInfo dinfo = new System.IO.DirectoryInfo(pathFolder);
                var files = dinfo.GetFiles("*.jpg")
                      .Concat(dinfo.GetFiles("*.png"))
                      .Concat(dinfo.GetFiles("*.gif")); ;
                foreach (System.IO.FileInfo fileImage in files)
                {
                    listFiles.Add(fileImage.FullName);
                }
                
            }
            return listFiles;
        }
        public ActionResult ShowImage()
        {
            
            string pathFile = Request["file"];
           
            System.Net.NetworkCredential readCredentials = new System.Net.NetworkCredential(@"ALSC_DATA\ktnhap", "#123@123*");

            using (new Web.Portal.Sercurity.NetworkConnection(pathFile, readCredentials))
            {
                try
                {
                    System.IO.FileInfo file = new System.IO.FileInfo(pathFile);
                    byte[] fileBytes = System.IO.File.ReadAllBytes(pathFile);
                    string fileName = file.Name;
                    return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);

                    
                }
                catch (Exception)
                {
                }

            }
            return View();
        }
    }
}
