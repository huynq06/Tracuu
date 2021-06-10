using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,MEMBER,HAIQUAN,KHOKEODAI,CUSTOMER")]
    public class ExpAWBController : BaseController
    {
        private DateTime? fromDate;
        private DateTime? toDate;
        public static IList<Layer.Flight> FlightList = new List<Layer.Flight>();
        public ActionResult ULD()
        {
            return View();
        }
        public ActionResult Index()
        {
            FlightList = new DataAccess.FlightAccess().GetAllFlightExp();
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
            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();

            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            string hawb = string.IsNullOrEmpty(Request["hawb"]) ? "ALL" : Request["hawb"].Trim();


            IList<Layer.ExpAWB> ExpAWBs = new DataAccess.ExpAWBAccess().GetPaging(page,
                                                                                  pageSize, code,
                                                                                  flightNo,
                                                                                  fromDate,
                                                                                  toDate,
                                                                                  hawb,


                                                                                  ref total);
            ViewData["ExpAWBLists"] = ExpAWBs;
            ViewBag.TotalRecord = total;
            ViewBag.PageCurrent = (page - 1) * pageSize;

            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingexpawb", total, page, pageSize);
            return View();
        }
        [DocumentExport("EXCEL", "IMP_AWB")]
        public ActionResult Export()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);
            string code = string.IsNullOrEmpty(Request["cd"]) ? "ALL" : Request["cd"].Trim();

            string flightNo = string.IsNullOrEmpty(Request["fno"]) ? "ALL" : Request["fno"].Trim();

            fromDate = string.IsNullOrEmpty(Request["fda"]) ? fromDate : Web.Portal.Utils.Format.ConvertDate(Request["fda"]);
            toDate = string.IsNullOrEmpty(Request["tda"]) ? toDate : Web.Portal.Utils.Format.ConvertDate(Request["tda"]);
            string hawb = string.IsNullOrEmpty(Request["hawb"]) ? "ALL" : Request["hawb"].Trim();



            IList<Layer.ExpAWB> ExpAWBs = new DataAccess.ExpAWBAccess().GetPaging(1,
                                                                                  Int32.MaxValue,
                                                                                  code,
                                                                                  flightNo,
                                                                                  fromDate,
                                                                                  toDate,
                                                                                  hawb,



                                                                                  ref total);
            ViewData["ExpAWBLists"] = ExpAWBs;


            return View();
        }
        [DocumentExport("EXCEL", "EXPORT_ULD")]
        public ActionResult ExportUld()
        {
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
                string pathFile = Server.MapPath(Upload.DisplayUrl.UrlUploadFile + fileImport);
                List<Layer.ULD> ulds = GetExcelULD(pathFile);
                List<Layer.ULD> uldsList = new List<Layer.ULD>();
                List<Layer.ULDDETAILS> uldsDetails = new List<Layer.ULDDETAILS>();
                GetULD(ulds, ref uldsList, ref uldsDetails);
                ViewData["ulds"] = ulds;
                ViewData["uldsList"] = uldsList;
                ViewData["uldsDetails"] = uldsDetails;

            }
            return View();
        }
        private void GetULD(List<Layer.ULD> ULDList,ref List<Layer.ULD> ULDITEM,ref List<Layer.ULDDETAILS> ULDDETAILS)
        {
            List<Layer.ULD> ULD = new List<Layer.ULD>();
            DataAccess.ULDDataAccess uldAccess = new DataAccess.ULDDataAccess();
            foreach(var item in ULDList)
            {
                string fno = item.FLIGHTNO.Split('/')[0];
                List<Layer.ULD> ulds = uldAccess.GetByID(item.AWB, fno, item.DATEULD);
                ULDITEM.AddRange(ulds);
                foreach (var item_ds in ulds)
                {
                    ULDDETAILS.AddRange(uldAccess.GetByULD(item_ds.FCODE,item.AWB, item_ds.ULDID, fno, item.DATEULD));
                }
                
                
            }

        }
        private List<Layer.ULD> GetExcelULD(string pathFile)
        {
            List<Layer.ULD> ULDList = new List<Layer.ULD>();
            try
            {
                string connectionExcel = "Provider=Microsoft.Jet.OLEDB.4.0; Data Source=" + pathFile + ";Extended Properties='Excel 8.0;HDR=Yes;IMEX=1'";
                System.Data.OleDb.OleDbConnection connExcel = new System.Data.OleDb.OleDbConnection(connectionExcel);
                System.Data.OleDb.OleDbCommand cmdExcel = new System.Data.OleDb.OleDbCommand();
                connExcel.Open();
                System.Data.DataTable dataTable = connExcel.GetOleDbSchemaTable(System.Data.OleDb.OleDbSchemaGuid.Tables, null);
                System.Text.StringBuilder messageError = new StringBuilder();
                int row = 1;
                DataAccess.ULDDataAccess uldAccess = new DataAccess.ULDDataAccess();
                

                foreach (System.Data.DataRow dataRows in dataTable.Rows)
                {


                    if (dataRows["TABLE_NAME"].ToString().Trim().Equals("ULD$"))
                    {
                        string query = "SELECT * FROM [" + dataRows["TABLE_NAME"] + "]";

                        cmdExcel = new System.Data.OleDb.OleDbCommand(query, connExcel);
                        System.Data.OleDb.OleDbDataReader reader = cmdExcel.ExecuteReader();
                        while (reader.Read())
                        {
                            row += 1;
                            ULDList.Add(new Layer.ULD()
                            {
                                DATEULD=reader[0].ToString(),
                                FLIGHTNO=reader[1].ToString(),
                                AWB=reader[2].ToString().Replace(" ",string.Empty)
                                

                            });

                        }



                        reader.Dispose();

                        break;
                    }


                }

            }
            catch(Exception ex)
            {

            }
            return ULDList;

        }
        
    }
}

