using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IIssue_detailRepository : IRepository<Issue_detail>
    {
    }
    public class Issue_detailRepository : RepositoryBase<Issue_detail>, IIssue_detailRepository
    {
        public Issue_detailRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
