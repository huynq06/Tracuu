using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;
namespace Web.Portal.Data.Repositories
{
    public interface IFlightServiceConfigRepository : IRepository<FlightServiceConfig>
    {
    }
    public class FlightServiceConfigRepository : RepositoryBase<FlightServiceConfig>, IFlightServiceConfigRepository
    {
        public FlightServiceConfigRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
