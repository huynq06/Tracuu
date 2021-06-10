using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Utils
{
    public class PagingUtil
    {
        public const int PageSize = 10;
        public static string CreatePaging(string id, int total, int page, int step)
        {
            System.Text.StringBuilder paging = new StringBuilder();
            int totalPage = total / step;
            totalPage = total % step != 0 ? totalPage + 1 : totalPage;
            paging.AppendLine(total == 0 ? (string.Format(DisplayMessage.MessageWarning, "Không tìm thấy bản ghi nào")) : string.Empty);
            paging.AppendLine("<div class='col-md-2 col-xs-4 margin-top-10'>");

            //paging.AppendLine("<label  class='control-label'><b>Tổng số: " + total + "</b></label>");
            paging.AppendLine("</div>");

            paging.AppendLine("<div class='col-md-4 col-xs-8 margin-top-10'" + (total <= 10 ? "style='display:none'" : string.Empty) + ">");
            paging.AppendLine("<label  class='control-label col-md-4 col-xs-7 text-right'><b>Hiển thị:</b></label>");
            paging.AppendLine("<div class='col-md-5 col-xs-5' style='margin-left:-25px;'>");
            paging.AppendLine("<select  id='" + id + "_step' class='bs-select col-md-12'>");
            paging.AppendLine("<option value='10'>10</option>");
            paging.AppendLine("<option value='20'>20</option>");
            paging.AppendLine("<option value='50'>50</option>");
            paging.AppendLine("<option value='100'>100</option>");
            paging.AppendLine("<option value='" + int.MaxValue + "'>Tất cả</option>");
            paging.AppendLine("</select>");

            paging.AppendLine("</div></div>");
            paging.AppendLine("<div class='col-md-6 pull-right'  " + (total <= step ? "style='display:none'" : string.Empty) + ">");

            paging.AppendLine("<div class='dataTables_filter' id='" + id + "_pgpage'>");
            paging.AppendLine("</div></div>");
            paging.AppendLine("<script>");
            paging.AppendLine("var " + id + "=egovutil.createPaging('#" + id + "_pgpage'," + totalPage + "," + page + ");");
            paging.AppendLine("$('#" + id + "_step').val('" + step + "').attr('selected',true);$('.bs-select').selectpicker();");
            paging.AppendLine("</script>");

            return paging.ToString();





        }
    }
}
