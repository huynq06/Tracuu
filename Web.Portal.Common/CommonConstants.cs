using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common
{
    public class CommonConstants
    {
        public const int StartProcess = 1;
        public const int FinishProcess = 2;
        public const string StatusStart = "BẮT ĐẦU KHAI THÁC";
        public const string StatusFinish = "HOÀN THÀNH";
        public const int NotifyStart = 1;
        public const int NotifyLimit = 2;
        public const int NotifyOver = 3;
        public const string NotifyStartMessage = "BẮT ĐẦU KHAI THÁC";
        public const string NotifyLimitmMesage = "SẮP TỚI GIỜ KẾT THÚC KHAI THÁC";
        public const string NotifyOverMessage = "ĐÃ QUÁ GIỜ KẾT THÚC KHAI THÁC";
        public const string SessionAdmin = "SessionAdmin";
        public const string ACTIONUPDATE = "UPDATE";
        public const string ACTIONEDIT = "EDIT";
        public const string ACTIONCANCEL = "CANCEL";
        public const string ACTIONDOWNLOAD = "DOWNLOAD";
        public const string MST = "";
        public const int INVOICEINITIAL = 0;
        public const int INVOICECREATED = 1;
        public const int INVOICEAPROVE = 2;
        public const int INVOICECANCEL = 3;
        public const string INITIAL = "KHỞI TẠO";
        public const string CREATED = "CHỜ DUYỆT";
        public const string APPROVE = "PHÊ DUYỆT";
        public const string CANCEL = "HỦY";
    }
}
