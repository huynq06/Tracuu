using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Sercurity
{
    [AuthorizedBase(Roles = "ADMIN")]
    public class SercurityController : System.Web.Mvc.Controller
    {


    }
}
