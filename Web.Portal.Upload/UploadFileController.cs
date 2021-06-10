using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.IO;
using System.Security.Cryptography;
using System.Web;

namespace Web.Portal.Upload
{
    public class UploadFileController : System.Web.Mvc.Controller
    { //// private string UrlUploadFile = "/Files/Upload/";
        // private string UrlAvatar = "/Files/Avatar/";
        // //private static string DeleteFileUrl="/uploadfile/deletefile/";
        //// public static string LinkDownload = "<a href='/Files/Upload/{0}'>{1}</a>";

        private string GetMd5Sum(string str)
        {
            Encoder encoder = Encoding.Unicode.GetEncoder();
            byte[] array = new byte[str.Length * 2];
            encoder.GetBytes(str.ToCharArray(), 0, str.Length, array, 0, true);
            byte[] array2 = new MD5CryptoServiceProvider().ComputeHash(array);
            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 0; i < array2.Length; i++)
            {
                stringBuilder.Append(array2[i].ToString("X2"));
            }
            return stringBuilder.ToString();
        }

        private string uploadFile(Stream serverFileStream, string fileName, int id)
        {
            string text = base.Server.MapPath(id == 1 ? DisplayUrl.UrlUploadFile : DisplayUrl.UrlAvatar) + fileName;
            string result;
            try
            {
                int num = 256;
                byte[] buffer = new byte[num];
                using (FileStream fileStream = new FileStream(text, FileMode.Create))
                {
                    int num2;
                    do
                    {
                        num2 = serverFileStream.Read(buffer, 0, num);
                        fileStream.Write(buffer, 0, num2);
                    }
                    while (num2 == num);
                }
                serverFileStream.Dispose();
                result = text;
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }
        [HttpPost]
        public JsonResult SendFile(int id)
        {
            List<FileTem> fileJsonUpload = new List<FileTem>();
            List<string> urlFile = new List<string>();
            System.Text.StringBuilder iconRows = new StringBuilder();
            iconRows.AppendLine("<div class='kv-preview-data file-preview-other-frame'>");
            iconRows.AppendLine("<div class='file-preview-other'>");
            iconRows.AppendLine("<span class='file-other-icon'>");
            iconRows.AppendLine("{0}");
            iconRows.AppendLine("</span>");
            iconRows.AppendLine("</div>");
            iconRows.AppendLine("</div>");


            for (int i = 0; i < Request.Files.Count; i++)
            {

                HttpPostedFileBase file = Request.Files[i];
                FileTem objFs = new FileTem { caption = file.FileName, size = file.ContentLength, width = "120px" };

                string extension = Path.GetExtension(file.FileName).ToLower();
                string fileName = DateTime.Now.ToString("dd:MM:yyyy hh:mm:ss:ms") + file.FileName;
                fileName = this.GetMd5Sum(fileName) + extension;
                this.uploadFile(file.InputStream, fileName, id);
                // objFs.url = DeleteFileUrl + fileName;
                objFs.key = fileName;
                //extension = extension.ToUpper();
                objFs.type = "html";
                fileJsonUpload.Add(objFs);
                extension = extension.Trim().ToUpper();
                if (extension.Equals(".JPG") || extension.Equals(".JPEG") || extension.Equals(".GIF") || extension.Equals(".BMP")
               || extension.Equals(".PNG") || extension.Equals(".TIF") || extension.Equals(".PSD"))
                    urlFile.Add("<img src='" + (id == 1 ? DisplayUrl.UrlUploadFile : DisplayUrl.UrlAvatar) + fileName + "' style='width:130px;height:135px;'/>");
                else
                    urlFile.Add("<a href='" + (id == 1 ? DisplayUrl.UrlUploadFile : DisplayUrl.UrlAvatar) + fileName + "' target='_blank'>" + string.Format(iconRows.ToString(), DisplayIcon.ConvertPreviewIcon(extension.Trim().ToUpper())) + "</a>");

            }



            return Json(new { initialPreview = urlFile, initialPreviewConfig = fileJsonUpload, append = true }, JsonRequestBehavior.AllowGet);


        }

        public JsonResult AvatarFile(int id)
        {
            List<FileTem> fileJsonUpload = new List<FileTem>();
            List<string> urlFile = new List<string>();
            System.Text.StringBuilder iconRows = new StringBuilder();
            iconRows.AppendLine("<div class='kv-preview-data file-preview-other-frame'>");
            iconRows.AppendLine("<div class='file-preview-other'>");
            iconRows.AppendLine("<span class='file-other-icon'>");
            iconRows.AppendLine("{0}");
            iconRows.AppendLine("</span>");
            iconRows.AppendLine("</div>");
            iconRows.AppendLine("</div>");


            for (int i = 0; i < Request.Files.Count; i++)
            {

                HttpPostedFileBase file = Request.Files[i];

                FileTem objFs = new FileTem { caption = file.FileName, size = file.ContentLength, width = "120px" };

                string extension = Path.GetExtension(file.FileName).ToLower();
                string fileName = DateTime.Now.ToString("dd:MM:yyyy hh:mm:ss:ms") + file.FileName;
                fileName = this.GetMd5Sum(fileName) + extension;
                this.uploadFile(file.InputStream, fileName, id);
                // objFs.url = DeleteFileUrl + fileName;
                objFs.key = fileName;
                //extension = extension.ToUpper();
                objFs.type = "html";
                fileJsonUpload.Add(objFs);
                //urlFile.Add("<a href='" + (id == 1 ? UrlUploadFile : UrlAvatar) + fileName + "' target='_blank'>" + string.Format(iconRows.ToString(), DisplayIcon.ConvertPreviewIcon(extension.Trim().ToUpper())) + "</a>");
                urlFile.Add("<img src='" + (id == 1 ? DisplayUrl.UrlUploadFile : DisplayUrl.UrlAvatar) + fileName + "' style='width:130px;height:135px;'/>");
            }



            return Json(new { initialPreview = urlFile, initialPreviewConfig = fileJsonUpload, append = true }, JsonRequestBehavior.AllowGet);


        }


        [HttpPost]
        public JsonResult DeleteFile(string key)
        {
            return Json(new { Key = key });
            //if (!string.IsNullOrEmpty(key))
            //{
            //    string path = Server.MapPath(UrlUploadFile + key);
            //    System.IO.File.Delete(path);
            //    return Json(new { Key = key });
            //}
            //else
            //{
            //    return Json(new { Key = key });
            //}
        }

        [HttpPost]
        public JsonResult DeleteFileAvatar(string key)
        {
            if (!string.IsNullOrEmpty(key))
            {
                string path = Server.MapPath(DisplayUrl.UrlAvatar + key);
                System.IO.File.Delete(path);
                return Json(new { Key = key });
            }
            else
            {
                return Json(new { Key = key });
            }
        }
    }
}