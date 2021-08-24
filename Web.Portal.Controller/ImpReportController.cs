using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using Web.Portal.DataAccess;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KTN")]
    public class ImpReportController : BaseController
    {
        string sql = "";
        string[] find;
        string[] column;
        string des = "";
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Report()
        {
            string id = Request["id"];
            string des = Request["des"];
            string paging = Request["paging"];
            string fromDate = Request["fromDate"];
            string toDate = Request["toDate"];
            string flightNumber = Request["flightNumber"];
            string shc = Request["shc"];
            string mawb = Request["mawb"];
            string total = Request["total"];
            ViewBag.Des = des;
            ViewBag.ID = id;
            ViewBag.Paging = paging;
            ViewBag.FromDate = fromDate;
            ViewBag.ToDate = toDate;
            ViewBag.FlightNumber = flightNumber;
            ViewBag.SHC = shc;
            ViewBag.Mawb = mawb;
            ViewBag.Total = total;
            return View("~/Views/ImpReport/DailyExport.cshtml");
        }

        public ActionResult ReportList()
        {
            string id = Request["id"];
            bool paging = Boolean.Parse(Request["paging"]);
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLTLN.xml"), id, ref sql, ref find, ref column, ref des);
            string[] prRequest = new string[find.Length];
            for (int i = 0; i < find.Length; i++)
            {
                prRequest[i] = string.IsNullOrEmpty(Request[find[i]]) ? string.Empty : Request[find[i]].Trim();
            }
           
            string sqlComplete = string.Format(sql, prRequest);
            if(id =="TLN06")
            {
                sqlComplete = string.Format(sql, int.Parse(Request["Total"])-1);
            }
            System.Data.DataTable table = reportAccess.GetData(sqlComplete).Tables[0];

            if (id == "TLN05")
            {
                ViewBag.FlightNumber = prRequest[1] + "/" + prRequest[0];
                List<Layer.CargoSpecial> cargoSpecialList = new List<Layer.CargoSpecial>();
                string[] arrcheck = new string[] { "99A", "99D", "99F", "99N", "99P", "99V", "99W" };
                string[] posClear = new string[] { "TRS", "IDA", "CUS" };

                for (int i = 0; i < table.Rows.Count; i++)
                {
                    bool check = new Utils.SHCUtils().CheckSHC(table.Rows[i][7].ToString());
                    if (check)
                    {
                        Layer.CargoSpecial cs = new Layer.CargoSpecial();
                        cs.MAWB = table.Rows[i][0].ToString();
                        cs.HAWB = table.Rows[i][1].ToString();
                        cs.PIECES = table.Rows[i][2].ToString();
                        cs.WEIGHT = table.Rows[i][3].ToString();
                        cs.POSITION = table.Rows[i][4].ToString();
                        cs.ID = table.Rows[i][5].ToString();
                        cs.GROUPID = table.Rows[i][6].ToString();
                        cs.PIECES_RECEIVED = table.Rows[i][8].ToString();
                        cs.WEIGHT_RECEIVED = table.Rows[i][9].ToString();
                        cs.SHC = table.Rows[i][7].ToString();
                        cs.SUM_PIECES_RECEIVED = int.Parse(cs.PIECES_RECEIVED);
                        cs.SUM_WEIGHT_RECEIVED = double.Parse(cs.WEIGHT_RECEIVED);
                        if (cargoSpecialList.Any(c=>c.MAWB==cs.MAWB))
                        {
                            int count = cargoSpecialList.Where(c => c.ID == cs.ID).Sum(c => int.Parse(c.PIECES_RECEIVED));
                            cs.MAWB = "";
                            cs.PIECES = "";
                            cs.WEIGHT = "";
                          cs.SUM_PIECES_RECEIVED = count+ int.Parse(cs.PIECES_RECEIVED);
                        //    cs.SUM_WEIGHT_RECEIVED += double.Parse(cs.WEIGHT_RECEIVED);
                        }
                        cargoSpecialList.Add(cs);
                    }
                }
                    ViewData["ListCargoSepecial"] = cargoSpecialList;
            }
            #region TLN04
            if (id == "TLN04")
            {
                ViewBag.FlightNumber = prRequest[1] + "/" + prRequest[0];
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    int delivery = int.Parse(table.Rows[i][9].ToString());
                    int pxk = int.Parse(table.Rows[i][10].ToString());
                    int received = int.Parse(table.Rows[i][8].ToString());
                    if (delivery > 0)
                    {
                        table.Rows[i][6] = 3;
                    }
                    else if (pxk > 0)
                    {
                        table.Rows[i][6] = 2;
                    }
                    else if (received > 0)
                    {
                        table.Rows[i][6] = 1;
                    }
                    else
                    {
                        table.Rows[i][6] = 0;
                    }
                }
            }
            #endregion

            #region TLN01
            if (id == "TLN01")
            {
                ViewBag.FlightNumber = prRequest[1];
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    table.Rows[i][8] = new Utils.SHCUtils().GetSHC(table.Rows[i][8].ToString());
                    int a = int.Parse(table.Rows[i][1].ToString());
                    int b = int.Parse(string.IsNullOrEmpty(table.Rows[i][3].ToString()) ? "0" : table.Rows[i][3].ToString());
                    //    int c = int.Parse(table.Rows[i][5].ToString());
                    double x = double.Parse(table.Rows[i][2].ToString());
                    double y = double.Parse(string.IsNullOrEmpty(table.Rows[i][4].ToString()) ? "0" : table.Rows[i][4].ToString());
                    //   double z = double.Parse(table.Rows[i][6].ToString());
                    if (table.Rows[i][7].ToString().Trim() == "CONSOL")
                    {
                        int c = string.IsNullOrEmpty(table.Rows[i][5].ToString()) ?0 : int.Parse(table.Rows[i][5].ToString());
                        double z = string.IsNullOrEmpty(table.Rows[i][6].ToString()) ? 0 : double.Parse(table.Rows[i][6].ToString());
                        if (a == b && b == c)
                        {
                            table.Rows[i][10] = 1;
                        }
                        if (x == y && y == z)
                        {
                            table.Rows[i][10] = 1;
                        }
                        else
                        {
                            table.Rows[i][10] = 0;
                        }

                    }
                    else
                    {
                        if (a == b)
                        {
                            table.Rows[i][10] = 1;
                        }
                        if (x == y)
                        {
                            table.Rows[i][10] = 1;
                        }
                        else
                        {
                            table.Rows[i][10] = 0;
                        }
                    }
                }
                List<AWBPlanOnFlightViewModel> listAwb = new List<AWBPlanOnFlightViewModel>();
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    AWBPlanOnFlightViewModel awb = new AWBPlanOnFlightViewModel();
                    awb.AWB = table.Rows[i][0].ToString();
                    awb.PIECES_FWB = table.Rows[i][1].ToString();
                    awb.WEIGHT_FWB = table.Rows[i][2].ToString();
                    awb.PIECES_FFM = table.Rows[i][3].ToString();
                    awb.WEIGHT_FFM = table.Rows[i][4].ToString();
                    awb.PIECES_FHL = table.Rows[i][5].ToString();
                    awb.WEIGHT_FHL = table.Rows[i][6].ToString();
                    awb.Nature = table.Rows[i][7].ToString();
                    awb.SHC = table.Rows[i][8].ToString();
                    awb.Remark = table.Rows[i][9].ToString();
                    awb.CheckCondition = table.Rows[i][10].ToString();
                    awb.Lagi_Master_Ident = table.Rows[i][11].ToString();
                    if (listAwb.Count(c => c.AWB == awb.AWB) == 0)
                        listAwb.Add(awb);
                    else
                    {
                        var awbSelect = listAwb.Where(c => c.AWB == awb.AWB).First();
                        if (awbSelect.Lagi_Master_Ident != "0")
                        {
                            int totalPieces = int.Parse(awbSelect.PIECES_FWB) + int.Parse(awb.PIECES_FWB);
                            awbSelect.PIECES_FWB = totalPieces.ToString();
                            double totalWeight = double.Parse(awbSelect.WEIGHT_FWB) + double.Parse(awb.WEIGHT_FWB);
                            awbSelect.WEIGHT_FWB = totalWeight.ToString();
                        }
                    }
                }
                foreach (var item in listAwb)
                {
                    string pices = "";
                    string weight = "";
                    if (item.Lagi_Master_Ident != "0")
                    {
                        new GetImformationManifestAccess().GetDetail(ref pices, ref weight, prRequest[1], item.Lagi_Master_Ident, prRequest[0]);
                        item.PIECES_FFM = pices;
                        item.WEIGHT_FFM = weight;
                    }
                }
                ViewBag.TotalPiceAwb = listAwb.Sum(c => int.Parse(string.IsNullOrEmpty(c.PIECES_FWB.Trim()) ? "0" : c.PIECES_FWB));
                ViewBag.TotalWeightAwb = listAwb.Sum(c => double.Parse(string.IsNullOrEmpty(c.WEIGHT_FWB.Trim()) ? "0" : c.WEIGHT_FWB));
                ViewBag.TotalPiceFfm = listAwb.Sum(c => int.Parse(string.IsNullOrEmpty(c.PIECES_FFM.Trim()) ? "0" : c.PIECES_FFM));
                ViewBag.TotalWeightFfm = listAwb.Sum(c => double.Parse(string.IsNullOrEmpty(c.WEIGHT_FFM.Trim()) ? "0" : c.WEIGHT_FFM));
                ViewBag.TotalPiceFhl = listAwb.Sum(c => int.Parse(string.IsNullOrEmpty(c.PIECES_FHL.Trim()) ? "0" : c.PIECES_FHL));
                ViewBag.TotalWeightFhl = listAwb.Sum(c => double.Parse(string.IsNullOrEmpty(c.WEIGHT_FHL.Trim()) ? "0" : c.WEIGHT_FHL));
                ViewData["listAWB"] = listAwb.OrderBy(c => c.LastAwb).ToList();
            }
            #endregion


            if (paging)
            {
                string total = table.Rows[2][1].ToString();
                ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingexpawb", int.Parse(total), int.Parse(prRequest[find.Length - 2]), int.Parse(prRequest[find.Length - 1]));
            }
            ViewData["DataList"] = table;
            ViewData["Column"] = column;
            ViewBag.TotalRecord = table.Rows.Count;
          
            if(id=="TLN01")
            {
                return View();
            }
            else if(id=="TLN04")
            {
                return View("~/Views/ImpReport/ReportListTLN04.cshtml");
            }
            else if(id=="TLN05")
            {
                return View("~/Views/ImpReport/ReportListTLN05.cshtml");
            }
            else if (id == "TLN06")
            {
                return View("~/Views/ImpReport/ReportListTLN06.cshtml");
            }
            else
            {
                return View("~/Views/ImpReport/ReportListTLN02.cshtml");
            }
           
        }
        [DocumentExport("EXCEL", "TLN_")]
        public ActionResult Export()
        {
            string id = Request["id"];
            string fileTem = Request["fn"].Trim();
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLTLN.xml"), id, ref sql, ref find, ref column, ref des);
            string[] prRequest = new string[find.Length];
            for (int i = 0; i < find.Length; i++)
            {
                if (i == 3)
                    prRequest[i] = Int32.MaxValue.ToString();
                else
                    prRequest[i] = string.IsNullOrEmpty(Request[find[i]]) ? string.Empty : Request[find[i]].Trim();
            }
            string sqlComplete = string.Format(sql, prRequest);
            if (id == "TLN06")
            {
                sqlComplete = string.Format(sql, int.Parse(Request["Total"]));
            }
            System.Data.DataTable table = reportAccess.GetData(sqlComplete).Tables[0];
            if (id == "TLN05")
            {
                ViewBag.FlightNumber = prRequest[1] + "-" + prRequest[0];
                List<Layer.CargoSpecial> cargoSpecialList = new List<Layer.CargoSpecial>();
                string[] arrcheck = new string[] { "99A", "99D", "99F", "99N", "99P", "99V", "99W" };
                string[] posClear = new string[] { "TRS", "IDA", "CUS" };

                for (int i = 0; i < table.Rows.Count; i++)
                {
                    bool check = new Utils.SHCUtils().CheckSHC(table.Rows[i][7].ToString());
                    if (check)
                    {
                        Layer.CargoSpecial cs = new Layer.CargoSpecial();
                        cs.MAWB = table.Rows[i][0].ToString();
                        cs.HAWB = table.Rows[i][1].ToString();
                        cs.PIECES = table.Rows[i][2].ToString();
                        cs.WEIGHT = table.Rows[i][3].ToString();
                        cs.POSITION = table.Rows[i][4].ToString();
                        cs.ID = table.Rows[i][5].ToString();
                        cs.GROUPID = table.Rows[i][6].ToString();
                        cs.PIECES_RECEIVED = table.Rows[i][8].ToString();
                        cs.WEIGHT_RECEIVED = table.Rows[i][9].ToString();
                        cs.SHC = table.Rows[i][7].ToString();
                        cs.SUM_PIECES_RECEIVED = int.Parse(cs.PIECES_RECEIVED);
                        cs.SUM_WEIGHT_RECEIVED = double.Parse(cs.WEIGHT_RECEIVED);
                        if (cargoSpecialList.Any(c => c.MAWB == cs.MAWB))
                        {
                            int count = cargoSpecialList.Where(c => c.ID == cs.ID).Sum(c => int.Parse(c.PIECES_RECEIVED));
                            cs.MAWB = "";
                            if(string.IsNullOrEmpty(cs.HAWB.Trim()))
                            {
                                cs.PIECES = "";
                                cs.WEIGHT = "";
                            }
                           
                            cs.SUM_PIECES_RECEIVED = count + int.Parse(cs.PIECES_RECEIVED);
                            //    cs.SUM_WEIGHT_RECEIVED += double.Parse(cs.WEIGHT_RECEIVED);
                        }
                        cargoSpecialList.Add(cs);
                    }
                }
                ViewData["ListCargoSepecial"] = cargoSpecialList;
            }
            if (id == "TLN04")
            {
                ViewBag.FlightNumber = prRequest[1] + "-" + prRequest[0];
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    int delivery = int.Parse(table.Rows[i][9].ToString());
                    int pxk = int.Parse(table.Rows[i][10].ToString());
                    int received = int.Parse(table.Rows[i][8].ToString());
                    if (delivery > 0)
                    {
                        table.Rows[i][6] = 3;
                    }
                    else if (pxk > 0)
                    {
                        table.Rows[i][6] = 2;
                    }
                    else if (received > 0)
                    {
                        table.Rows[i][6] = 1;
                    }
                    else
                    {
                        table.Rows[i][6] = 0;
                    }
                }
            }
            if (id == "TLN01")
            {
                ViewBag.FlightNumber = prRequest[1] + "-" + prRequest[0];
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    table.Rows[i][8] = new Utils.SHCUtils().GetSHC(table.Rows[i][8].ToString());
                    int a = int.Parse(table.Rows[i][1].ToString());
                    int b = int.Parse(string.IsNullOrEmpty(table.Rows[i][3].ToString()) ? "0" : table.Rows[i][3].ToString());
                    //    int c = int.Parse(table.Rows[i][5].ToString());
                    double x = double.Parse(table.Rows[i][2].ToString());
                    double y = double.Parse(string.IsNullOrEmpty(table.Rows[i][4].ToString()) ? "0" : table.Rows[i][4].ToString());
                    //   double z = double.Parse(table.Rows[i][6].ToString());
                    if (table.Rows[i][7].ToString().Trim() == "CONSOL")
                    {
                        int c = string.IsNullOrEmpty(table.Rows[i][5].ToString()) ? 0 : int.Parse(table.Rows[i][5].ToString());
                        double z = string.IsNullOrEmpty(table.Rows[i][6].ToString()) ? 0 : double.Parse(table.Rows[i][6].ToString());
                        if (a == b && b == c)
                        {
                            if (x == y && y == z)
                            {
                                table.Rows[i][10] = 1;
                            }
                            else
                            {
                                table.Rows[i][10] = 0;
                            }

                        }
                        else
                        {
                            table.Rows[i][10] = 0;
                        }
                     
                    }
                    else
                    {
                        if (a == b)
                        {
                            if (x == y)
                            {
                                table.Rows[i][10] = 1;
                            }
                            else
                            {
                                table.Rows[i][10] = 0;
                            }
                        }
                        else
                        {
                            table.Rows[i][10] = 0;
                        }
                    }
                }
                List<AWBPlanOnFlightViewModel> listAwb = new List<AWBPlanOnFlightViewModel>();
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    AWBPlanOnFlightViewModel awb = new AWBPlanOnFlightViewModel();
                    awb.AWB = table.Rows[i][0].ToString();
                    awb.PIECES_FWB = table.Rows[i][1].ToString();
                    awb.WEIGHT_FWB = table.Rows[i][2].ToString();
                    awb.PIECES_FFM = table.Rows[i][3].ToString();
                    awb.WEIGHT_FFM = table.Rows[i][4].ToString();
                    awb.PIECES_FHL = table.Rows[i][5].ToString();
                    awb.WEIGHT_FHL = table.Rows[i][6].ToString();
                    awb.Nature = table.Rows[i][7].ToString();
                    awb.SHC = table.Rows[i][8].ToString();
                    awb.Remark = table.Rows[i][9].ToString();
                    awb.CheckCondition = table.Rows[i][10].ToString();
                    awb.Lagi_Master_Ident = table.Rows[i][11].ToString();
                    if (listAwb.Count(c => c.AWB == awb.AWB) == 0)
                        listAwb.Add(awb);
                    else
                    {
                        var awbSelect = listAwb.Where(c => c.AWB == awb.AWB).First();
                        if (awbSelect.Lagi_Master_Ident != "0")
                        {
                            int totalPieces = int.Parse(awbSelect.PIECES_FWB) + int.Parse(awb.PIECES_FWB);
                            awbSelect.PIECES_FWB = totalPieces.ToString();
                            double totalWeight = double.Parse(awbSelect.WEIGHT_FWB) + double.Parse(awb.WEIGHT_FWB);
                            awbSelect.WEIGHT_FWB = totalWeight.ToString();
                        }
                    }

                }
                foreach (var item in listAwb)
                {
                    string pices = "";
                    string weight = "";
                    if (item.Lagi_Master_Ident != "0")
                    {
                        new GetImformationManifestAccess().GetDetail(ref pices, ref weight, prRequest[1], item.Lagi_Master_Ident, prRequest[0]);
                        item.PIECES_FFM = pices;
                        item.WEIGHT_FFM = weight;
                    }
                }
                ViewBag.TotalPiceAwb = listAwb.Sum(c => int.Parse(string.IsNullOrEmpty(c.PIECES_FWB.Trim()) ? "0" : c.PIECES_FWB));
                ViewBag.TotalWeightAwb = listAwb.Sum(c => double.Parse(string.IsNullOrEmpty(c.WEIGHT_FWB.Trim()) ? "0" : c.WEIGHT_FWB));
                ViewBag.TotalPiceFfm = listAwb.Sum(c => int.Parse(string.IsNullOrEmpty(c.PIECES_FFM.Trim()) ? "0" : c.PIECES_FFM));
                ViewBag.TotalWeightFfm = listAwb.Sum(c => double.Parse(string.IsNullOrEmpty(c.WEIGHT_FFM.Trim()) ? "0" : c.WEIGHT_FFM));
                ViewBag.TotalPiceFhl = listAwb.Sum(c => int.Parse(string.IsNullOrEmpty(c.PIECES_FHL.Trim()) ? "0" : c.PIECES_FHL));
                ViewBag.TotalWeightFhl = listAwb.Sum(c => double.Parse(string.IsNullOrEmpty(c.WEIGHT_FHL.Trim()) ? "0" : c.WEIGHT_FHL));
                ViewData["listAWB"] = listAwb.OrderBy(c => c.LastAwb).ToList();
            }
            if (id == "TLN02")
            {
                ViewBag.Date = prRequest[0];
            }
            ViewData["DataList"] = table;
            ViewData["Column"] = column;
            ViewBag.Des = des;
            ViewBag.TotalRecord = table.Rows.Count;
            if(id == "TLN01")
            {
                return View("~/Views/ImpReport/ExpReport.cshtml");
            }
            else if (id == "TLN04")
            {
                return View("~/Views/ImpReport/ExpReportTLN04.cshtml");
            }
            else if(id== "TLN02")
            {
                return View("~/Views/ImpReport/ExpReportTLN02.cshtml");
            }
            else if (id == "TLN05")
            {
                return View("~/Views/ImpReport/ExpReportTLN05.cshtml");
            }
            else if (id == "TLN06")
            {
                ViewBag.TitleReport = "BÁO CÁO HÀNG TỒN ĐẾN NGÀY " + DateTime.Now.AddDays(-int.Parse(Request["Total"])).ToString("dd/MM/yyyy");
                return View("~/Views/ImpReport/ExpReportTLN06.cshtml");
            }
            else
            {
                ViewBag.Fda = prRequest[0];
                ViewBag.Tda = prRequest[1];
                return View("~/Views/ImpReport/ExpReportTLN03.cshtml");
            }
        }
        public ActionResult Print()
        {
            string id = Request["id"];
            string fileTem = Request["fn"].Trim();
            DataAccess.ReportAccess reportAccess = new DataAccess.ReportAccess();
            Utils.SQLUtils.GetSQLDes(Server.MapPath("/SitaTemplate/SQLTLN.xml"), id, ref sql, ref find, ref column, ref des);
            string[] prRequest = new string[find.Length];
            for (int i = 0; i < find.Length; i++)
            {
                if (i == 3)
                    prRequest[i] = Int32.MaxValue.ToString();
                else
                    prRequest[i] = string.IsNullOrEmpty(Request[find[i]]) ? string.Empty : Request[find[i]].Trim();
            }
            System.Data.DataTable table = reportAccess.GetData(string.Format(sql, prRequest)).Tables[0];
            if (id == "TLN01")
            {
                ViewBag.FlightNumber = prRequest[1];
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    table.Rows[i][8] = new Utils.SHCUtils().GetSHC(table.Rows[i][8].ToString());
                    int a = int.Parse(table.Rows[i][1].ToString());
                    int b = int.Parse(table.Rows[i][3].ToString());
                    //    int c = int.Parse(table.Rows[i][5].ToString());
                    double x = double.Parse(table.Rows[i][2].ToString());
                    double y = double.Parse(table.Rows[i][4].ToString());
                    //   double z = double.Parse(table.Rows[i][6].ToString());
                    if (table.Rows[i][7].ToString().Trim() == "CONSOL")
                    {
                        int c = int.Parse(table.Rows[i][5].ToString());
                        double z = double.Parse(table.Rows[i][6].ToString());
                        if (a == b && b == c)
                        {
                            table.Rows[i][10] = 1;
                        }
                        if (x == y && y == z)
                        {
                            table.Rows[i][10] = 1;
                        }
                        else
                        {
                            table.Rows[i][10] = 0;
                        }

                    }
                    else
                    {
                        if (a == b)
                        {
                            table.Rows[i][10] = 1;
                        }
                        if (x == y)
                        {
                            table.Rows[i][10] = 1;
                        }
                        else
                        {
                            table.Rows[i][10] = 0;
                        }
                    }
                }
            }
            if (id == "TLN02")
            {
                ViewBag.Date = prRequest[0];
            }
            ViewData["DataList"] = table;
            ViewData["Column"] = column;
            ViewBag.Des = des;
            ViewBag.TotalRecord = table.Rows.Count;
            if (id == "TLN01")
            {
                return View("~/Views/ImpReport/ExpPrint.cshtml");
            }
            else if (id == "TLN02")
            {
                return View("~/Views/ImpReport/ExpPrintTLN02.cshtml");
            }
            else
            {
                return View("~/Views/ImpReport/ExpPrintTLN03.cshtml");
            }
        }
    }
}
