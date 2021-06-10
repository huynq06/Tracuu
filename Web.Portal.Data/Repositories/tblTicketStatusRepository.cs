using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;
using Web.Portal.Common.ViewModel;
using Web.Portal.Model;


namespace Web.Portal.Data.Repositories
{
    public interface ItblTicketStatusRepository : IRepository<tblTicketStatus>
    {
    }
    public class tblTicketStatusRepository : RepositoryPXKControlBase<tblTicketStatus>, ItblTicketStatusRepository
    {
        public tblTicketStatusRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
