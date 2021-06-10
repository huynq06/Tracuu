using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;


namespace Web.Portal.Data.Repositories
{
    public interface IULD_TYPERepository : IRepository<ULD_TYPE>
    { }
    public class ULD_TYPERepository : RepositoryFlightControlBase<ULD_TYPE>, IULD_TYPERepository
    {
        public ULD_TYPERepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
