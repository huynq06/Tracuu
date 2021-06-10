using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Model.Models;
namespace Web.Portal.Common.ApiViewModel
{
    public class TruckApiViewModel
    {
        public int ID { set; get; }
        public tblTicketStatus Ticket { set; get; }
    }
}
