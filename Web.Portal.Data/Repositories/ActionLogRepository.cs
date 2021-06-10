using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;
using Web.Portal.Common.ViewModel;

namespace Web.Portal.Data.Repositories
{
    public interface IActionLogRepository : IRepository<ActionLog>
    {
    }
    public class ActionLogRepository : RepositoryEInvoiceControlBase<ActionLog>, IActionLogRepository
    {
        public ActionLogRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
