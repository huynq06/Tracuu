using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IHawbManagementRepository : IRepository<HawbManagement>
    { }
    public class HawbManagementRepository : RepositoryFlightControlBase<HawbManagement>, IHawbManagementRepository
    {
        public HawbManagementRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
