using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IIssueRepository : IRepository<Issue>
    {
    }
    public class IssueRepository : RepositoryBase<Issue>, IIssueRepository
    {
        public IssueRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
