using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Upload
{
    public class DisplayIcon
    {
        public static string ConvertPreviewIcon(string extension)
        {
            if (extension.Equals(".DOC") || extension.Equals(".DOCX"))
                return "<i class='fa fa-file-word-o text-primary'></i>";
            if (extension.Equals(".XLS") || extension.Equals(".XLSX"))
                return "<i class='fa fa-file-excel-o text-success'></i>";
            if (extension.Equals(".PPT") || extension.Equals(".PPTX"))
                return "<i class='fa fa-file-powerpoint-o text-danger'></i>";
            if (extension.Equals(".JPG") || extension.Equals(".JPEG") || extension.Equals(".GIF") || extension.Equals(".BMP")
                 || extension.Equals(".PNG") || extension.Equals(".TIF") || extension.Equals(".PSD"))
                return "<i class='fa fa-file-photo-o text-warning'></i>";
            if (extension.Equals(".PDF"))
                return "<i class='fa fa-file-pdf-o text-danger'></i>";
            if (extension.Equals(".ZIP") || extension.Equals(".RAR") || extension.Equals(".7Z") || extension.Equals(".ISO"))
                return "<i class='fa fa-file-archive-o text-muted'></i>";
            if (extension.Equals(".HTML") || extension.Equals(".HTM"))
                return "<i class='fa fa-file-code-o text-info'></i>";
            if (extension.Equals(".TXT"))
                return "<i class='fa fa-file-text-o text-info'></i>";
            if (extension.Equals(".AVI") || extension.Equals(".WMV") || extension.Equals(".FLV") || extension.Equals(".MP4")
                  || extension.Equals(".FLAC") || extension.Equals(".FLAC"))
                return "<i class='fa fa-file-movie-o text-warning'></i>";
            if (extension.Equals(".MP3") || extension.Equals(".WMA"))
                return "<i class='fa fa-file-audio-o text-warning'></i>";
            return "<i class='fa fa-file'></i>";

        }

        public static string CreateUrlDownload(string temp, string fserver, string title, string extension)
        {
            System.Text.StringBuilder iconRows = new StringBuilder();
            iconRows.AppendLine("<div class='kv-preview-data file-preview-other-frame'>");
            iconRows.AppendLine("<div class='file-preview-other'>");
            iconRows.AppendLine("<span class='file-other-icon'>");
            iconRows.AppendLine("{0}");
            iconRows.AppendLine("</span>");
            iconRows.AppendLine("</div>");
            iconRows.AppendLine("</div>");
            return string.Format(temp, fserver, title, string.Format(iconRows.ToString(), ConvertPreviewIcon(extension.ToUpper().Trim())));
        }
    }
}
