using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IAWBByULDRepository : IRepository<AWBByULD>
    {
    }
    public class AWBByULDRepository : RepositoryFlightControlBase<AWBByULD>, IAWBByULDRepository
    {
        public AWBByULDRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
