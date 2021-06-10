using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;
namespace Web.Portal.Data.Repositories
{
    public interface IFLightFluprepository : IRepository<FLightFlup>
    {
    }

    public class FLightFlupRepository : RepositoryBase<FLightFlup>, IFLightFluprepository
    {
        public FLightFlupRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
