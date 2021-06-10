using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IVCTRepository : IRepository<VCT>
    {
    }
 
    public class VCTRepository : RepositoryBase<VCT>, IVCTRepository
    {
        public VCTRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
