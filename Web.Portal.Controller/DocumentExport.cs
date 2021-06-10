using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    public class DocumentExportAttribute : System.Web.Mvc.ActionFilterAttribute
    {
        private string typeDocument = "WORD";
        private string fileName = "work_document";
        private bool MultiTab = false;

        public DocumentExportAttribute(string type, string file)
        {
            typeDocument = type;
            fileName = file + DateTime.Now.ToShortDateString();
        }
        public DocumentExportAttribute(string type, string file, bool multiTab)
        {
            typeDocument = type;
            fileName = file + DateTime.Now.ToShortDateString();
            MultiTab = multiTab;

        }
        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            if (typeDocument.ToUpper().Trim().Equals("EXCEL"))
            {
                filterContext.HttpContext.Response.Write("<style>td {mso-number-format:\"\\@" + "\";} </style>");
            }
            base.OnResultExecuting(filterContext);
        }
        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            string contentType = "application/msword";
            string extension = ".doc";


            if (MultiTab == true)
            {
                string multiTab = filterContext.Controller.ViewBag.MultiTab;
                string multiValue = filterContext.Controller.ViewBag.MultiValue;
                ExportTabSheet(filterContext, multiTab, multiValue);
            }
            else
            {
                if (typeDocument.ToUpper().Trim().Equals("EXCEL"))
                {
                    extension = ".xls";
                    contentType = "application/vnd.ms-excel";
                }
                if(typeDocument.ToUpper().Trim().Equals("TEXT"))
                {
                    extension = ".txt";
                    contentType = "application/*";
                }

                filterContext.HttpContext.Response.AppendHeader("Content-Disposition", string.Format("filename={0}", fileName + extension));

                filterContext.HttpContext.Response.ContentType = contentType;
                filterContext.HttpContext.Response.Charset = "UTF-8";

                if (!typeDocument.ToUpper().Trim().Equals("TEXT"))                  
                    filterContext.HttpContext.Response.Write("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>");





                filterContext.HttpContext.Response.Flush();
                filterContext.HttpContext.Response.End();
            }

            base.OnResultExecuted(filterContext);
        }

        private void ExportTabSheet(ResultExecutedContext filterContext, string url_item, string values_item)
        {
            try
            {
                string[] url = url_item.Split(',');
                string[] values = values_item.Split(',');
                filterContext.HttpContext.Response.Clear();
                filterContext.HttpContext.Response.Buffer = true;
                filterContext.HttpContext.Response.AddHeader("content-disposition", "attachment;filename=\"" + fileName.Trim() + ".xls\"");
                filterContext.HttpContext.Response.Charset = "";
                filterContext.HttpContext.Response.ContentType = "application/vnd.ms-excel";
                filterContext.HttpContext.Response.Write("<html xmlns:x=\"urn:schemas-microsoft-com:office:excel\">");
                filterContext.HttpContext.Response.Write("<head>");

                filterContext.HttpContext.Response.Write(" <meta name=\"Excel Workbook Frameset\">");
                filterContext.HttpContext.Response.Write("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>");
                filterContext.HttpContext.Response.Write("<style>  td {mso-number-format:\"\\@" + "\";} </style>");
                filterContext.HttpContext.Response.Write("<meta content=\"Excel.Sheet\" name=\"ProgId\">");
                filterContext.HttpContext.Response.Write("<meta content=\"Microsoft Excel 11\" name=\"Generator\">");
                filterContext.HttpContext.Response.Write("<!--[if gte mso 9]><xml>");
                filterContext.HttpContext.Response.Write("<x:ExcelWorkbook>");
                filterContext.HttpContext.Response.Write("<x:ExcelWorksheets>");

                for (int i = 0; i < url.Length; i++)
                {
                    filterContext.HttpContext.Response.Write("<x:ExcelWorksheet>");
                    filterContext.HttpContext.Response.Write("<x:Name>" + values[i] + "</x:Name>");

                    filterContext.HttpContext.Response.Write("<x:WorksheetSource HRef='http://" + filterContext.HttpContext.Request.Url.Host + ":" + filterContext.HttpContext.Request.Url.Port + url[i] + "'>");
                    filterContext.HttpContext.Response.Write("</x:WorksheetSource>");
                    filterContext.HttpContext.Response.Write("<x:WorksheetOptions>");
                    filterContext.HttpContext.Response.Write("<x:Print>");
                    filterContext.HttpContext.Response.Write("<x:ValidPrinterInfo/>");
                    filterContext.HttpContext.Response.Write("</x:Print>");
                    filterContext.HttpContext.Response.Write("</x:WorksheetOptions>");
                    filterContext.HttpContext.Response.Write("</x:ExcelWorksheet>");
                }




                filterContext.HttpContext.Response.Write("</x:ExcelWorksheets>");
                filterContext.HttpContext.Response.Write("</x:ExcelWorkbook>");
                filterContext.HttpContext.Response.Write("</xml>");
                filterContext.HttpContext.Response.Write("<![endif]--> ");
                filterContext.HttpContext.Response.Write("</head>");
                filterContext.HttpContext.Response.Write("<body>");

                filterContext.HttpContext.Response.Write("</body>");

                filterContext.HttpContext.Response.Write("</html>");



                filterContext.HttpContext.Response.Flush();
                filterContext.HttpContext.Response.End();

            }
            catch (Exception ex)
            {
                filterContext.HttpContext.Response.Write(ex.StackTrace);
            }
        }

    }
}

