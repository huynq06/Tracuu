using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface ICARGO_OUTRepository : IRepository<CARGO_OUT>
    {
    }
    public class CARGO_OUTRepository : RepositoryCustomServiceBase<CARGO_OUT>, ICARGO_OUTRepository
    {
        public CARGO_OUTRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
