using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;
namespace Web.Portal.Data.Repositories
{
    public interface ICargo_KVGSRepository : IRepository<Cargo_KVGS>
    {
    }
    public class Cargo_KVGSRepository : RepositoryCustomServiceBase<Cargo_KVGS>, ICargo_KVGSRepository
    {
        public Cargo_KVGSRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
