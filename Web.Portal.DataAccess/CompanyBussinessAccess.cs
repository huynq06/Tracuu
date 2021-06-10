using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
namespace Web.Portal.DataAccess
{
    public class CompanyBussinessAccess : DataBase.DataProvider
    {
        private string SQL_SELECT = "select CompanyId,Code,Name,Address,IDNo,Year,Created,CreatedName from CompanyBussiness";
        public int Add(Web.Portal.Layer.CompanyBussiness objCompanyBussiness)
        {
            return CommandStore32("CompanyBussiness_Add", objCompanyBussiness.Code,
                                            objCompanyBussiness.Name,
                                            objCompanyBussiness.Address,
                                            objCompanyBussiness.IdNo,
                                            objCompanyBussiness.Year,
                                            objCompanyBussiness.CreatedName,
                                             DateTime.Now
                                             );
        }
        public string GenCode()
        {
            string code = "0000000001";
            using (System.Data.IDataReader reader = CommandScriptDataReader("select max(Convert(bigint, CODE)+1) CODE from CompanyBussiness"))
            {

                if (reader.Read())
                {
                    code = Convert.ToString(GetValueField(reader, "CODE", "1"));
                    while (code.Length < 10)
                    {
                        code = "0" + code;
                    }
                }

            }
            return code;
        }
       
        public void Update(Web.Portal.Layer.CompanyBussiness objCompanyBussiness)
        {
             CommandStore32("CompanyBussiness_Update",objCompanyBussiness.CompanyId,
                                            objCompanyBussiness.Code,
                                           objCompanyBussiness.Name,
                                            objCompanyBussiness.Address,
                                            objCompanyBussiness.IdNo,
                                            objCompanyBussiness.Year,
                                          objCompanyBussiness.CreatedName,
                                             DateTime.Now);
        }

        public void Delete(int CompanyId)
        {
            CommandScript(string.Format("delete from CompanyBussiness where CompanyId='{0}'", CompanyId));
        }
        public void DeleteChildMap(int CompanyId, int CompanyParentId)
        {
            CommandScript(string.Format("delete from CompanyChild where CompanyId='{0}' AND ParentId='{1}'", CompanyId, CompanyParentId));
        }
        private Web.Portal.Layer.CompanyBussiness GetProperties(System.Data.IDataReader reader)
        {
            Web.Portal.Layer.CompanyBussiness objCompanyBussiness = new Web.Portal.Layer.CompanyBussiness();
            objCompanyBussiness.CompanyId = Convert.ToInt32(GetValueField(reader, "CompanyId", 0));
            objCompanyBussiness.Code = Convert.ToString(GetValueField(reader, "Code", string.Empty)).ToUpper();
            objCompanyBussiness.Name = Convert.ToString(GetValueField(reader, "Name", string.Empty)).ToUpper();
            objCompanyBussiness.Address = Convert.ToString(GetValueField(reader, "Address", string.Empty)).ToUpper();
            objCompanyBussiness.IdNo = Convert.ToString(GetValueField(reader, "IdNo", string.Empty)).ToUpper();
            objCompanyBussiness.Year = Convert.ToInt32(GetValueField(reader, "Year", DateTime.Now.Year));
            objCompanyBussiness.ParentId = Convert.ToInt32(GetValueField(reader, "ParentId", 0));
            objCompanyBussiness.TypeDoc = Convert.ToString(GetValueField(reader, "TypeDoc", string.Empty)).ToUpper();
            objCompanyBussiness.Description = Convert.ToString(GetValueField(reader, "Description", string.Empty)).ToUpper();
            objCompanyBussiness.Created = GetValueDateTimeField(reader, "Created", objCompanyBussiness.Created);
            objCompanyBussiness.CreatedName = Convert.ToString(GetValueField(reader, "CreatedName", string.Empty)).ToUpper();
            objCompanyBussiness.TableContentOrder = Convert.ToString(GetValueField(reader, "TableContentOrder", string.Empty)).ToUpper();
            return objCompanyBussiness;
        }
        public Web.Portal.Layer.CompanyBussiness GetByID(int CompanyId)
        {
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where CompanyId='{0}'", CompanyId)))
            {

                if (reader.Read())
                    return GetProperties(reader);

            }
            return new Web.Portal.Layer.CompanyBussiness();
        }
        public IList<Layer.CompanyBussiness> GetPaging(int Year, string code, string name, string nameChild, string idno)
        {
            IList<Layer.CompanyBussiness> CompanyBussinessList = new List<Layer.CompanyBussiness>();
            using (System.Data.IDataReader reader = CommandDataReader("CompanyBussiness_GetPaging", Year,
                code, name, nameChild, idno
                ))
            {
                while (reader.Read())
                {
                    
                    CompanyBussinessList.Add(GetProperties(reader));

                }
            }
            return CompanyBussinessList;

        }
        public IList<Layer.CompanyBussiness> GetByParent(int CompanyId)
        {
            IList<Layer.CompanyBussiness> CompanyBussinessList = new List<Layer.CompanyBussiness>();
            using (System.Data.IDataReader reader = CommandDataReader("CompanyBussiness_GetByParent", 
               CompanyId
                ))
            {
                while (reader.Read())
                {

                    CompanyBussinessList.Add(GetProperties(reader));

                }
            }
            return CompanyBussinessList;

        }
        public IList<Layer.CompanyBussiness> GetTableContent(int year, int AuthorityTypeId)
        {
            IList<Layer.CompanyBussiness> CompanyBussinessList = new List<Layer.CompanyBussiness>();
            using (System.Data.IDataReader reader = CommandDataReader("CompanyBussiness_TableContent",
               year, AuthorityTypeId
                ))
            {
                while (reader.Read())
                {

                    CompanyBussinessList.Add(GetProperties(reader));

                }
            }
            return CompanyBussinessList;

        }
        public IList<Layer.CompanyBussiness> SearchBy(int Year,string name)
        {
            IList<Layer.CompanyBussiness> CompanyBussinessList = new List<Layer.CompanyBussiness>();
            using (System.Data.IDataReader reader = CommandDataReader("CompanyBussiness_SearchByYearName",
               Year,name
                ))
            {
                while (reader.Read())
                {

                    CompanyBussinessList.Add(GetProperties(reader));

                }
            }
            return CompanyBussinessList;

        }
        public Stream GetMucLuc(int year, int AuthorityTypeId)
        {
            Stream streamReport;
            IList<Layer.CompanyBussiness> CompanyBussinessList = GetTableContent(year, AuthorityTypeId);

            Layer.CompanyChild_AuthorityType companyChild_AuthorityType = new CompanyChild_AuthorityTypeAccess().GetById(AuthorityTypeId);
            if(companyChild_AuthorityType.AuthorityType == null)
            {
                companyChild_AuthorityType.AuthorityType = "";
            }
            MemoryStream ms = new MemoryStream();
            try
            {
                FileStream stream = File.OpenRead(HttpContext.Current.Server.MapPath("~\\Files\\Template\\" + "FM-SQM-2032.xlsx"));
                //newFileData = new byte[stream.Length];
                stream.CopyTo(ms);
            }
            catch (WebException e)
            {
                // Do something such as log error, but this is based on OP's original code
                // so for now we do nothing.
            }
            using (var excelPackage = new ExcelPackage(ms))
            {
                excelPackage.Workbook.Properties.Author = "KENJI";
                excelPackage.Workbook.Properties.Title = "";
                excelPackage.Workbook.Properties.Comments = "";
                var workSheet = excelPackage.Workbook.Worksheets[1];
                int crow = 7;
                int stt = 1;
                int lengthName = 0;
                foreach (Layer.CompanyBussiness companyBussiness in CompanyBussinessList)
                {
                    workSheet.Cells["A" + crow.ToString()].Value = stt;
                    workSheet.Cells["B" + crow.ToString()].Value = companyBussiness.TableContentOrder + "-" + companyBussiness.Name;
                    workSheet.Cells["B" + crow.ToString() + ":"+ "C" + crow.ToString()].Merge = true;
                    workSheet.Cells["B" + crow.ToString() + ":"+ "C" + crow.ToString()].Style.WrapText = true;
                    lengthName = companyBussiness.Name.Length;
                   

                    if (lengthName <= 53)
                    {
                        workSheet.Row(crow).Height = 25;
                    }
                    else if(lengthName > 53 && lengthName <= 106)
                    {
                        workSheet.Row(crow).Height = 30;
                    }
                    else if (lengthName > 106 && lengthName <= 159)
                    {
                        workSheet.Row(crow).Height = 40;
                    }
                    else if (lengthName > 159 && lengthName <= 212)
                    {
                        workSheet.Row(crow).Height = 50;
                    }
                    else if (lengthName > 212 && lengthName <= 265)
                    {
                        workSheet.Row(crow).Height = 60;
                    }
                    else if (lengthName > 265 && lengthName <= 318)
                    {
                        workSheet.Row(crow).Height = 70;
                    }
                    else
                    {
                        workSheet.Row(crow).Height = 25;

                    }
                    crow++;
                    stt++;
                }
                string tenCapHoSo = "Tên cặp hồ sơ: " + companyChild_AuthorityType.AuthorityType.ToUpper() + " (THỦ TỤC)";
                workSheet.Cells["A3"].Formula = "CONCATENATE(\""+ tenCapHoSo + "\",\"\")" ;
                workSheet.Cells["A4"].Value = "Đơn vị/Bộ phận: TÀI LIỆU NHẬP";
                workSheet.Cells["A3:A4"].Style.Font.Size = 12;

                if (CompanyBussinessList.Count <= 21)
                {
                    workSheet.Cells["A29"].Value = "Người lập: .........................................................................................";

                }
                else
                {
                    workSheet.Cells["A" + (crow + 2).ToString()].Value = "Người lập: .........................................................................................";

                }

                using (var ranger = workSheet.Cells["A7"  + ":D" + (crow -1).ToString()])
                {
                    ranger.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    ranger.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    ranger.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    ranger.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ranger.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ranger.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                }
                using (var ranger = workSheet.Cells["B7" + ":B" + (crow - 1).ToString()])
                {
                    ranger.Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                    
                }
                excelPackage.Save();
                streamReport = excelPackage.Stream;
            }

            return streamReport;
        }
    }
}
