using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IFLUPRepository :  IRepository<FLUP>
    { }
    public class FLUPRepository : RepositoryHermesBase<FLUP>, IFLUPRepository
    {
        public FLUPRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
