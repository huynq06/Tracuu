using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IUldLogRepository : IRepository<UldLog>
    {
    }

    public class UldLogRepository : RepositoryBase<UldLog>, IUldLogRepository
    {
        public UldLogRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
