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
    public interface IHawbIrrRepository : IRepository<HawbIrr>
    {
    }
    public class HawbIrrRepository : RepositoryFlightControlBase<HawbIrr>, IHawbIrrRepository
    {
        public HawbIrrRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
