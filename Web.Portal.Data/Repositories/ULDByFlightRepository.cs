using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IULDByFlightRepository : IRepository<ULDByFlight>
    {

    }
    public class ULDByFlightRepository : RepositoryFlightControlBase<ULDByFlight>, IULDByFlightRepository
    {
        public ULDByFlightRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
