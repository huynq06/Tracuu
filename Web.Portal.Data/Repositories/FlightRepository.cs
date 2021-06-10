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
    public interface IFlightRepository : IRepository<Flight>
    {
        IEnumerable<RemainStatisticViewModel> GetRemainTotalStatistic();
    }
    public class FlightRepository : RepositoryFlightControlBase<Flight>, IFlightRepository
    {
        public FlightRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public IEnumerable<RemainStatisticViewModel> GetRemainTotalStatistic()
        {
            return fcDbContext.Database.SqlQuery<RemainStatisticViewModel>("GetRemainStatistic");
        }
    }
}
