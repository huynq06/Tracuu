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
    public interface IFlightFavouriteRepository : IRepository<FlightFavourite>
    {
    }
    public class FlightFavouriteRepository : RepositoryFlightControlBase<FlightFavourite>, IFlightFavouriteRepository
    {
        public FlightFavouriteRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

    }
}
