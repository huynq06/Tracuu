using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Web.Portal.Service;
using Web.Portal.Model.Models;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC")]
    public class CustomController:BaseController
    {
        private DateTime? fromDate;
        private DateTime? toDate;
        ICargo_KVGSService _cargoService;
        public static IList<Layer.Flight> FlightList = new List<Layer.Flight>();
        public CustomController(ICargo_KVGSService cargoService)
        {
            this._cargoService = cargoService;
        }
        public ActionResult Index()
        {
            ViewData["WARHOUSES"] = System.Configuration.ConfigurationManager.AppSettings["WARHOUSE"].Split(',');

            FlightList = new DataAccess.FlightAccess().GetAllFlight();
            ViewData["CODE"] = FlightList.GroupBy(x => x.Code).Select(x => x.Key).ToList();

            return View();
        }
        public ActionResult Inventory()
        {
            

            return View();
        }
        public ActionResult InventCount()
        {


            return View();
        }
       
        [DocumentExport("EXCEL", "BAOCAO_HANGTON_SOLUONG")]
        public ActionResult ExInventCount()
        {
            string[] title_rp = Utils.Format.GetNullString(Request["ti"]).Split(',');
            string[] num_fr= Utils.Format.GetNullString(Request["st"]).Split(',');
            string[] num_to = Utils.Format.GetNullString(Request["ed"]).Split(',');
            fromDate = string.IsNullOrEmpty(Request["date"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["date"]);
            DataAccess.InventoryAccess inventoryAccess = new DataAccess.InventoryAccess();
            
            IList<Layer.Inventory> inventoryList = new List<Layer.Inventory>();
            for(int i=0;i<title_rp.Length;i++)
            {
                if(!string.IsNullOrEmpty(title_rp[i]))
                {
                    int Pieces = 0;
                    double Weight = 0;
                    int st = Convert.ToInt32(num_fr[i]); 
                    int ed = Convert.ToInt32(num_to[i]);
                    DateTime? dateStart =Utils.Format.ConvertDate( fromDate.Value.AddDays(-ed ).ToString("dd/MM/yyyy 00:00"));
                    DateTime? dateEnd = Utils.Format.ConvertDate(fromDate.Value.AddDays(-st).ToString("dd/MM/yyyy 23:59"));

                    inventoryAccess.GetInventory(dateStart,dateEnd, fromDate, ref Pieces, ref Weight);

                    inventoryList.Add(new Layer.Inventory()
                    {
                        Title = title_rp[i].Trim(),
                        Pieces = Pieces.ToString(),
                        Weight = Weight.ToString()

                    });

                }

            }
            ViewData["InventoryList"] = inventoryList;
            return View();
        }
        
        public ActionResult List()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
           // string code = string.IsNullOrEmpty(Request["ty"]) ? "ALL" : Request["ty"].Trim();

           // string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] );
            int totalPices = 0;
            double totalWeight = 0;
            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetCustom(page,
                                                                                  Int32.MaxValue,
                                                                                  fromDate,
                                                                                  toDate,                                                                                  
                                                                                  ref total,ref totalPices,ref totalWeight);

            IList<Layer.ImpAWB> impAwbsReal = new List<Layer.ImpAWB>();
            foreach (var item in impAwbs)
            {
                List<Layer.ImpAWB> item_check = impAwbs.Where(x => x.AWB.Equals(item.AWB) && x.HAWB.Equals(item.HAWB)).OrderByDescending(x => x.FlightDate).ToList();
                if (item_check.Count > 1)
                {
                    if (impAwbsReal.Count(x => x.AWB.Equals(item.AWB) && x.HAWB.Equals(item.HAWB)) == 0)
                    {
                        impAwbsReal.Add(item_check[0]);
                    }
                }
                else
                    impAwbsReal.Add(item);
            }
            ViewData["impAWBLists"] = impAwbsReal;
            ViewBag.TotalRecord = total;
            ViewBag.PageCurrent = (page - 1) * pageSize;
            ViewBag.SumPCS = totalPices;
            ViewBag.SumGW = totalWeight;
            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingcusimp", total, page, pageSize);
            return View();
        }

        public ActionResult ListFL()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            // string code = string.IsNullOrEmpty(Request["ty"]) ? "ALL" : Request["ty"].Trim();

             string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]+" 00:00");
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]+" 23:59");
            int totalPices = 0;
            double totalWeight = 0;
            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetCustomByFL(page,
                                                                                  pageSize,no,
                                                                                  fromDate,
                                                                                  toDate,
                                                                                  ref total, ref totalPices, ref totalWeight);
            ViewData["impAWBLists"] = impAwbs;
            ViewBag.TotalRecord = total;
            ViewBag.PageCurrent = (page - 1) * pageSize;
            ViewBag.SumPCS = totalPices;
            ViewBag.SumGW = totalWeight;
            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingcusfl", total, page, pageSize);
            return View();
        }
        [DocumentExport("TEXT", "SITA_NONDELIVERY")]
        public ActionResult ExportSita()
        {
            string mawb = string.IsNullOrEmpty(Request["mawb"]) ? "ALL" : Request["mawb"].Trim();
            string fno = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            DateTime? fdate = string.IsNullOrEmpty(Request["fdate"]) ? DateTime.Now : Web.Portal.Utils.Format.ConvertDate(Request["fdate"].Trim());
            string origin= string.IsNullOrEmpty(Request["ori"]) ? "ALL" : Request["ori"].Trim();
           
            IList<Web.Portal.Layer.ImpHAWB> ImpHAWBList = new Web.Portal.DataAccess.ImpHAWBAccess().GetByHawbByMawb(mawb.Replace(" ",""));
            var mq = ImpHAWBList.FirstOrDefault(x => string.IsNullOrEmpty(x.HAWB.Trim()));
            int hq = ImpHAWBList.Sum(x => Convert.ToInt32(x.QuantityDelivered));
            IList<Web.Portal.Layer.ImpHAWB> ImpReal = new List<Web.Portal.Layer.ImpHAWB>();

            if (ImpHAWBList.Count>2&& Convert.ToInt32(mq.QuantityDelivered)<Convert.ToInt32(mq.QuantityReceived))
            {
                foreach (var item in ImpHAWBList)
                    if (!string.IsNullOrEmpty(item.HAWB.Trim()) && Convert.ToInt32(item.QuantityDelivered) < Convert.ToInt32(item.QuantityReceived))
                        ImpReal.Add(item);

            }



            string expected = "T" + mq.QuantityExpected + "K" + mq.WeightExpected;
            ViewData["HAWBList"] = ImpReal;
            ViewBag.MAWB = mawb;
            ViewBag.Dest = origin+"HAN";
            ViewBag.Flight = fno + "/" + Web.Portal.Utils.Format.GetMonthName(fdate);
            ViewBag.Expected = expected;

            return View();

        }
        private void ShowNDL()
        {
            string no = string.IsNullOrEmpty(Request["no"]) ? "ALL" : Request["no"].Trim();
            string fl = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();
            bool ch= string.IsNullOrEmpty(Request["wh"]) ? false : Convert.ToBoolean(Request["wh"].Trim());
            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetNonDelivery(no, fl, ch);
            List<Layer.ImpAWB> impReals = new List<Layer.ImpAWB>();
            DateTime? dateCheck = string.IsNullOrEmpty(Request["tda"]) ? DateTime.Now : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            foreach (var item in impAwbs)
            {
               
                    int r = impAwbs.Count(x => x.AWB.Trim().Equals(item.AWB.Trim()));
                    if (item.AWB.Contains("TKZ") == false && (r == 1 || (r > 1 && !string.IsNullOrEmpty(item.HAWB.Trim()))))
                    {

                        if (item.FlightDate.Value.Date.AddDays(5).CompareTo(dateCheck.Value.Date) == 0
                            || item.FlightDate.Value.Date.AddDays(13).CompareTo(dateCheck.Value.Date) == 0)
                            impReals.Add(item);
                        /* }
                         else
                         {
                             if (item.FlightDate.Value.Date.AddDays(13).CompareTo(dateCheck.Value.Date) == 0)
                                 impReals.Add(item);
                         }*/
                    }
                

            }

            //  var impAWBLists = impReals.GroupBy(c => c.AWB).Select(grp => grp.ToList()).ToList();
            ViewBag.Checks = ch;
            ViewData["impAWBLists"] = impReals;
        }
        public ActionResult ListNDL()
        {

            ShowNDL();
            return View();
        }
        [DocumentExport("EXCEL", "BAOCAO_CHUAGIAOHANG")]
        public ActionResult ExportNDL()
        {

            ShowNDL();
            return View();
        }
        public ActionResult ListIV()
        {
            fromDate = string.IsNullOrEmpty(Request["date"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["date"]);
            //toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] );
            int st = string.IsNullOrEmpty(Request["st"]) ? 0 : Convert.ToInt32(Request["st"].Trim());
            int ed = string.IsNullOrEmpty(Request["ed"]) ? 90 : Convert.ToInt32(Request["ed"].Trim());
            DateTime? dateStart = Utils.Format.ConvertDate(fromDate.Value.AddDays(-ed).ToString("dd/MM/yyyy 00:00:00"));
            DateTime? dateEnd = Utils.Format.ConvertDate(fromDate.Value.AddDays(-st).ToString("dd/MM/yyyy 23:59:59"));

            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetInventory(dateStart, dateEnd, fromDate).OrderBy(x=>x.FlightDate).ToList();

            var groupImpAwbs = impAwbs.GroupBy(x => new {
                GoodsContent = x.GoodsContent,
                QuantityReceived = x.QuantityReceived,
                WeightReceived = x.WeightReceived,
                Shipper = x.Shipper,
                ShipperAddr = x.ShipperADDR,
                Consignee = x.Consignee,
                ConsigneeAddr = x.ConsignADDR,
                MAWB = x.AWB,
                PREFIX = x.Prefix,
                HAWB = x.HAWB
            });
            IList<Layer.ImpAWB> impAWBsReal = new List<Layer.ImpAWB>();
            foreach (var item in groupImpAwbs)
            {
                var itemFL = impAwbs.FirstOrDefault(x => (x.Prefix + x.AWB.Trim()).Equals(item.Key.PREFIX + item.Key.MAWB.Trim()) && x.HAWB.Trim().Equals(item.Key.HAWB.Trim()));
                impAWBsReal.Add(new Layer.ImpAWB()
                {
                    Prefix = item.Key.PREFIX,
                    AWB = item.Key.MAWB,
                    HAWB = item.Key.HAWB,
                    Shipper = item.Key.Shipper,
                    ShipperADDR = item.Key.ShipperAddr,
                    Consignee = item.Key.Consignee,
                    ConsignADDR = item.Key.ConsigneeAddr,
                    GoodsContent = item.Key.GoodsContent,
                    QuantityReceived = item.Key.QuantityReceived,
                    WeightReceived = item.Key.WeightReceived,
                    FlightDate = itemFL.FlightDate,
                    FlightNo = itemFL.FlightNo

                });
            }

            ViewData["impAWBLists"] = impAWBsReal;
            ViewBag.TotalRecord = impAWBsReal.Count;
            ViewBag.TitleReport = "BÁO CÁO HÀNG TỒN ĐẾN NGÀY" + Request["date"];
            ViewBag.SumPCS = impAWBsReal.Sum(x => Convert.ToInt32(x.QuantityReceived));
            ViewBag.SumGW = impAWBsReal.Sum(x => Convert.ToDouble(x.WeightReceived));
            return View();
        }
        [DocumentExport("EXCEL", "BAOCAO_HANGTON")]
        public ActionResult ExportIV()
        {
           
            //int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            // int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            //fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            //toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] );
            fromDate = string.IsNullOrEmpty(Request["date"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["date"]);
            //toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] );
            int st = string.IsNullOrEmpty(Request["st"]) ? 0 : Convert.ToInt32(Request["st"].Trim());
            int ed = string.IsNullOrEmpty(Request["ed"]) ? 90 : Convert.ToInt32(Request["ed"].Trim());
            DateTime? dateStart = Utils.Format.ConvertDate(fromDate.Value.AddDays(-ed).ToString("dd/MM/yyyy 00:00:00"));
            DateTime? dateEnd = Utils.Format.ConvertDate(fromDate.Value.AddDays(-st).ToString("dd/MM/yyyy 23:59:59"));
            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetInventory(dateStart, dateEnd,fromDate).OrderBy(x => x.FlightDate).ToList();
             List<Layer.ImpAWB> listImpAwbs = new List<Layer.ImpAWB>();
            foreach (var awb in impAwbs)
            {
                Layer.ImpAWB objImpAwb = new Layer.ImpAWB();
                //neu chua ton tai
                if (!listImpAwbs.Any(c => c.HAWB == awb.HAWB && c.AWB==awb.AWB))
                {
                    listImpAwbs.Add(awb);
                }
                else
                {
                    var obj = listImpAwbs.FirstOrDefault(c => c.HAWB == awb.HAWB);
                    obj.Location += ";" + awb.Location;
                }
            }
            var groupImpAwbs = listImpAwbs.GroupBy(x => new {GoodsContent=x.GoodsContent,
                                                         QuantityReceived =x.QuantityReceived,
                                                         WeightReceived=x.WeightReceived,
                                                         Shipper=x.Shipper,
                                                         ShipperAddr=x.ShipperADDR,
                                                         Consignee=x.Consignee,
                                                        ConsigneeAddr=x.ConsignADDR,
                                                        MAWB=x.AWB,PREFIX=x.Prefix,HAWB=x.HAWB,
            Location = x.Location});
            IList<Layer.ImpAWB> impAWBsReal = new List<Layer.ImpAWB>();
            foreach(var item in groupImpAwbs)
            {
                var itemFL = listImpAwbs.FirstOrDefault(x => (x.Prefix + x.AWB.Trim()).Equals(item.Key.PREFIX + item.Key.MAWB.Trim()) && x.HAWB.Trim().Equals(item.Key.HAWB.Trim()));
                impAWBsReal.Add(new Layer.ImpAWB()
                {
                    Prefix=item.Key.PREFIX,
                    AWB=item.Key.MAWB,
                    HAWB=item.Key.HAWB,
                    Shipper=item.Key.Shipper,
                    ShipperADDR=item.Key.ShipperAddr,
                    Consignee=item.Key.Consignee,
                    ConsignADDR=item.Key.ConsigneeAddr,
                    GoodsContent=item.Key.GoodsContent,
                    QuantityReceived = item.Key.QuantityReceived,
                    WeightReceived = item.Key.WeightReceived,
                    FlightDate = itemFL.FlightDate,
                    FlightNo=itemFL.FlightNo,
                    Location = item.Key.Location
                });
            }

            ViewData["impAWBLists"] = impAWBsReal;
            ViewBag.TotalRecord = impAWBsReal.Count;
            ViewBag.TitleReport = "BÁO CÁO HÀNG TỒN ĐẾN NGÀY"+ Request["date"];
            ViewBag.SumPCS = impAWBsReal.Sum(x=>Convert.ToInt32(x.QuantityReceived));
            ViewBag.SumGW = impAWBsReal.Sum(x => Convert.ToDouble(x.WeightReceived));

            return View();
        }
        public ActionResult ListHK()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
           
            
            string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"] );
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] );
            int totalPices = 0;
            double totalWeight = 0;
            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetCustom(page,
                                                                                  Int32.MaxValue,                                                                                 
                                                                                  no,
                                                                                  fromDate,
                                                                                  toDate,
                                                                                  ref total, ref totalPices, ref totalWeight);
            IList<Layer.ImpAWB> impAwbsReal = new List<Layer.ImpAWB>();
           foreach(var item in impAwbs)
            {
                Cargo_KVGS ck = _cargoService.GetByMawbHawb((item.Prefix + item.AWB.PadLeft(8,'0')), item.HAWB);
                if(ck != null)
                {
                    item.SDD = ck.EQ_CARGOCTRLNO;
                    item.STK = ck.EQ_CUSTOMSREFERENCE;
                }
                else
                {
                    item.SDD = "";
                    item.STK = "";
                }
                List<Layer.ImpAWB> item_check = impAwbs.Where(x => x.AWB.Equals(item.AWB) && x.HAWB.Equals(item.HAWB)).ToList();
                if (item_check.Count > 1 )
                {
                    if(impAwbsReal.Count(x => x.AWB.Equals(item.AWB) && x.HAWB.Equals(item.HAWB)) == 0)
                    {

                        item_check[0].SDD = item.SDD;
                        item_check[0].STK = item.STK;
                        impAwbsReal.Add(item_check[0]);
                    }
                }
                else
                {
                    item.SDD = item.SDD;
                    item.STK = item.STK;
                    impAwbsReal.Add(item);
                }
                   
            }
            ViewData["impAWBLists"] = impAwbsReal.OrderBy(x=>x.AgenCreated).ToList();
            ViewBag.TotalRecord = impAwbsReal.Count();
            ViewBag.PageCurrent = 0;// (page - 1) * pageSize;
            ViewBag.SumPCS = totalPices;
            ViewBag.SumGW = totalWeight;
           // ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingwhimp", total, page, pageSize);
            return View();
        }
        [DocumentExport("EXCEL", "BAOCAO_TRAHANG_TAINOIBAI")]
        public ActionResult Export()
        {
            int total = 0;
          
            //string code = string.IsNullOrEmpty(Request["ty"]) ? "ALL" : Request["ty"].Trim();

            //string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"] );
            int totalPices = 0;
            double totalWeight = 0;


            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetCustom(1,Int32.MaxValue,
                                                                                  fromDate,
                                                                                  toDate,
                                                                                  ref total,
                                                                                  ref totalPices,
                                                                                  ref totalWeight);
            IList<Layer.ImpAWB> impAwbsReal = new List<Layer.ImpAWB>();
            foreach (var item in impAwbs)
            {
                List<Layer.ImpAWB> item_check = impAwbs.Where(x => x.AWB.Equals(item.AWB) && x.HAWB.Equals(item.HAWB)).OrderByDescending(x => x.FlightDate).ToList();
                if (item_check.Count > 1)
                {
                    if (impAwbsReal.Count(x => x.AWB.Equals(item.AWB) && x.HAWB.Equals(item.HAWB)) == 0)
                    {
                        impAwbsReal.Add(item_check[0]);
                    }
                }
                else
                    impAwbsReal.Add(item);
            }
            ViewData["impAWBLists"] = impAwbsReal.OrderBy(x => Utils.Format.ConvertDate(x.FlightDate.Value.ToString("dd/MM/yyyy") + " " + x.ATATIME)).ToList();
            ViewBag.TotalRecord = total;
            ViewBag.FromDate = fromDate.Value.ToString("dd/MM/yyyy HH:mm");
            ViewBag.ToDate = toDate.Value.ToString("dd/MM/yyyy HH:mm");
            ViewBag.SumPCS = totalPices;
            ViewBag.SumGW = totalWeight;
           
            return View();
        }
        [DocumentExport("EXCEL", "BAOCAO_TRAHANG_TAINOIBAI")]
        public ActionResult ExportFL()
        {
            int total = 0;

            //string code = string.IsNullOrEmpty(Request["ty"]) ? "ALL" : Request["ty"].Trim();

            string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"] +" 00:00");
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]+" 23:59");
            int totalPices = 0;
            double totalWeight = 0;


            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetCustomByFL(1, Int32.MaxValue,no,
                                                                                  fromDate,
                                                                                  toDate,
                                                                                  ref total,
                                                                                  ref totalPices,
                                                                                  ref totalWeight);
            ViewData["impAWBLists"] = impAwbs.OrderBy(x => Utils.Format.ConvertDate(x.FlightDate.Value.ToString("dd/MM/yyyy") + " " + x.ATATIME)).ToList(); 
            ViewBag.TotalRecord = total;
            ViewBag.FromDate = fromDate.Value.ToString("dd/MM/yyyy HH:mm");
            ViewBag.ToDate = toDate.Value.ToString("dd/MM/yyyy HH:mm");
            ViewBag.SumPCS = totalPices;
            ViewBag.SumGW = totalWeight;

            return View();
        }


        [DocumentExport("EXCEL", "TRA_HANG_KHO_KEO_DAI")]
        public ActionResult ExportHK()
        {
            int total=0;        

            string no = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            int totalPices = 0;
            double totalWeight = 0;
            IList<Layer.ImpAWB> impAwbs = new DataAccess.ImpAWBAccess().GetCustom(1,
                                                                                  Int32.MaxValue,                                                                                  
                                                                                  no,
                                                                                  fromDate,
                                                                                  toDate,                                                                                  
                                                                                  ref total, ref totalPices, ref totalWeight);
            IList<Layer.ImpAWB> impAwbsReal = new List<Layer.ImpAWB>();
            try
            {
                foreach (var item in impAwbs)
                {
                    Cargo_KVGS ck = _cargoService.GetByMawbHawb((item.Prefix + item.AWB.PadLeft(8, '0')), item.HAWB);
                    if (ck != null)
                    {
                        item.SDD = ck.EQ_CARGOCTRLNO;
                        item.STK = ck.EQ_CUSTOMSREFERENCE;
                    }
                    else
                    {
                        item.SDD = "";
                        item.STK = "";
                    }
                    List<Layer.ImpAWB> item_check = impAwbs.Where(x => x.AWB.Equals(item.AWB) && x.HAWB.Equals(item.HAWB)).ToList();
                    if (item_check.Count > 1)
                    {
                        if (impAwbsReal.Count(x => x.AWB.Equals(item.AWB) && x.HAWB.Equals(item.HAWB)) == 0)
                        {
                            item_check[0].SDD = item.SDD;
                            item_check[0].STK = item.STK;
                            impAwbsReal.Add(item_check[0]);
                        }
                    }
                    else
                    {
                        item.SDD = item.SDD;
                        item.STK = item.STK;
                        impAwbsReal.Add(item);
                    }

                }
            }
            catch (Exception ex)
            {

                throw;
            }
           
            ViewData["impAWBLists"] = impAwbsReal;
            ViewBag.TotalRecord = impAwbsReal.Count();
            ViewBag.WareHouse = no.Equals("ALL")?string.Empty:no;
            ViewBag.SumPCS = totalPices;
            ViewBag.SumGW = totalWeight;
            ViewBag.FromDate = fromDate.Value.ToString("dd/MM/yyyy HH:mm");
            ViewBag.ToDate = toDate.Value.ToString("dd/MM/yyyy HH:mm");

            return View();
        }
        public ActionResult Import()
        {
            return View();
        }
        [DocumentExport("EXCEL", "BAOCAO_HANGHOA_NHAP")]
        public ActionResult ExportImp()
        {
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            DataAccess.ReportImpAccess reportImpAccess = new DataAccess.ReportImpAccess();
            Layer.ReportImp reportImp = reportImpAccess.GetCustom(fromDate, toDate);
            Layer.ReportImp reportImpCustomer = reportImpAccess.GetCustomer(fromDate, toDate);
            Layer.ReportImp reportImpWareHouse = reportImpAccess.GetWarhouse(fromDate, toDate);
            reportImp.QuantityDelivery = reportImpCustomer.QuantityDelivery + reportImpWareHouse.QuantityDelivery;
            reportImp.WeightDelivery = reportImpCustomer.WeightDelivery + reportImpWareHouse.WeightDelivery;
            ViewBag.FromDate = fromDate.Value.ToString("dd/MM/yyyy HH:mm");
            ViewBag.ToDate = toDate.Value.ToString("dd/MM/yyyy HH:mm");
            return View(reportImp);
        }
        public ActionResult ListImp()
        {
            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            DataAccess.ReportImpAccess reportImpAccess = new DataAccess.ReportImpAccess();
            Layer.ReportImp reportImp = reportImpAccess.GetCustom(fromDate, toDate);
            Layer.ReportImp reportImpCustomer = reportImpAccess.GetCustomer(fromDate, toDate);
            Layer.ReportImp reportImpWareHouse = reportImpAccess.GetWarhouse(fromDate, toDate);
            reportImp.QuantityDelivery = reportImpCustomer.QuantityDelivery + reportImpWareHouse.QuantityDelivery;
            reportImp.WeightDelivery= reportImpCustomer.WeightDelivery + reportImpWareHouse.WeightDelivery;
            return View(reportImp);
        }
        
    }


    
}
