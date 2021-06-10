using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    public class InOutController:BaseController
    {
        public ActionResult Index()
        {
            return View();
        }
       [DocumentExport("EXCEL", "DanhSachVaoRa")]
        public ActionResult Export()
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

            }
            IList<Layer.InOutCheck> InOutCheckList = GetAllByExcel(fileImport);           
            ViewData["InOutCheckList"] = InOutCheckList;
            return View();
        }

        private IList<Layer.InOutCheck> GetAllByExcel(string path)
        {
            IList<Layer.InOutCheck> InOutCheckList = new List<Layer.InOutCheck>();
            try
            {
                string extension = path.Substring(path.LastIndexOf('.')).ToUpper().Trim();
                string connection = string.Empty;
                if (extension.Equals(".XLS") || extension.Equals(".XLSX"))
                {
                    connection = extension.Equals(".XLS") ?
                            System.Configuration.ConfigurationManager.ConnectionStrings["CNSEXCEL03"].ConnectionString :
                            System.Configuration.ConfigurationManager.ConnectionStrings["CNSEXCEL07"].ConnectionString;
                    string connectionExcel = String.Format(connection, Server.MapPath(string.Format(Web.Portal.Utils.Constants.UPLOAD_URL, path)));                   
                    System.Data.OleDb.OleDbConnection connExcel = new System.Data.OleDb.OleDbConnection(connectionExcel);
                    System.Data.OleDb.OleDbCommand cmdExcel = new System.Data.OleDb.OleDbCommand();                    
                    connExcel.Open();
                    System.Data.DataTable dataTable = connExcel.GetOleDbSchemaTable(System.Data.OleDb.OleDbSchemaGuid.Tables, null);                  
                    int row = 1;
                    DataAccess.InOutDataAccess InOutDataAccess = new DataAccess.InOutDataAccess();
                    foreach (System.Data.DataRow dataRows in dataTable.Rows)
                    {
                        if (dataRows["TABLE_NAME"].ToString().Trim().Equals("VCT$"))
                        {  string query = "SELECT * FROM [" + dataRows["TABLE_NAME"] + "]";
                            cmdExcel = new System.Data.OleDb.OleDbCommand(query, connExcel);
                            System.Data.OleDb.OleDbDataReader reader = cmdExcel.ExecuteReader();
                            while (reader.Read())
                            {

                                row += 1;
                                if (!string.IsNullOrEmpty(reader[2].ToString().Trim()) && !string.IsNullOrEmpty(reader[5].ToString().Trim()))
                                {
                                    InOutCheckList.Add(new Layer.InOutCheck()
                                    {
                                        ChiTieuSLA = Convert.ToString(reader[1].ToString()),
                                        Ngay = Convert.ToString(reader[2].ToString()).Replace("12:00:00 AM", string.Empty),
                                        ChuyenBay = Convert.ToString(reader[3].ToString()),
                                       Hang = Convert.ToString(reader[4].ToString()),
                                        BienSoXe = Convert.ToString(reader[5].ToString()),
                                        ThoiGian = InOutDataAccess.GetByTime(Convert.ToString(reader[5].ToString()),Convert.ToString(reader[2].ToString()).Replace("12:00:00 AM", string.Empty)),
                                        ThoiGianKetThuc = Convert.ToString(reader[7].ToString()).Replace("12/30/1899",string.Empty),
                                       TongThoiGian = Convert.ToString(reader[8].ToString())

                                    });
                               }

                            }



                            reader.Dispose();

                            break;
                        }


                    }

                }

            }



            catch (Exception ex)
            {
                Response.Write("LỖI"+ex.Message);

            }
            
            return InOutCheckList;

        }
    }
}
