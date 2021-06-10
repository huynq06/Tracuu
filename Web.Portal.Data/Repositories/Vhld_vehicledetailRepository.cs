using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IVhld_vehicledetailRepository : IRepository<Vhld_vehicledetail>
    {
    }
    public class Vhld_vehicledetailRepository : RepositoryHermesBase<Vhld_vehicledetail>, IVhld_vehicledetailRepository
    {
        public Vhld_vehicledetailRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
