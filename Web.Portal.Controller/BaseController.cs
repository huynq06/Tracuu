using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,KHOKEODAI,CUSTOMER,XEMUYQUYEN")]
    
    public class BaseController : System.Web.Mvc.Controller
    
    {
        
            public int CurrentUserId = 0;
            public Web.Portal.Sercurity.Member memberCurrent = new Web.Portal.Sercurity.Member();
            protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
                 CurrentUserId = WebMatrix.WebData.WebSecurity.CurrentUserId;
                memberCurrent = new Web.Portal.Sercurity.MemberAccess().GetByUserID(CurrentUserId);
                ViewBag.CurrentUserId = CurrentUserId;
                ViewBag.MemberCurrentId = memberCurrent != null ? memberCurrent.MemberId : 0;
                ViewBag.MemberCurrent = memberCurrent;
                ViewBag.UserName = memberCurrent.UserName != null ? memberCurrent.UserName.ToUpper() : string.Empty;
               
                base.Initialize(requestContext);

            }
       
    }
}
