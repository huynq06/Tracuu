using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface ILabRepository : IRepository<Lab>
    {
    }
    public class LabRepository : RepositoryHermesBase<Lab>, ILabRepository
    {
        public LabRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
