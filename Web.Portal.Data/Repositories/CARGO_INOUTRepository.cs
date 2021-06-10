using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface ICARGO_INOUTRepository : IRepository<CARGO_INOUT>
    {
    }
    public class CARGO_INOUTRepository : RepositoryCustomServiceBase<CARGO_INOUT>, ICARGO_INOUTRepository
    {
        public CARGO_INOUTRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
