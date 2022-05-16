using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IAwbLogRepository : IRepository<AwbLog>
    {
    }

    public class AwbLogRepository : RepositoryBase<AwbLog>, IAwbLogRepository
    {
        public AwbLogRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
