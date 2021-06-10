using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;


namespace Web.Portal.Data.Repositories
{
    public interface IConditionRepository : IRepository<Condition>
    {
    }
    public class ConditionRepository : RepositoryBase<Condition>, IConditionRepository
    {
        public ConditionRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
