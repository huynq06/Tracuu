using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;
using Web.Portal.Common.ViewModel;


namespace Web.Portal.Data.Repositories
{
    public interface IFlightConfigRepository : IRepository<FlightConfig>
    {
    }
    public class FlightConfigRepository : RepositoryFlightControlBase<FlightConfig>, IFlightConfigRepository
    {
        public FlightConfigRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
