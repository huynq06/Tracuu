using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models.QLT;
namespace Web.Portal.Data.Repositories
{
    public interface IOrganizationRepository : IRepository<Organization>
    {
    }

    public class OrganizationRepository : RepositoryBase<Organization>, IOrganizationRepository
    {
        public OrganizationRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
