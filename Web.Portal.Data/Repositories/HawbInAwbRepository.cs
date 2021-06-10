using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;


namespace Web.Portal.Data.Repositories
{
    public interface IHawbInAwbRepository : IRepository<HawbInAwb>
    {
    }
    public class HawbInAwbRepository : RepositoryFlightControlBase<HawbInAwb>, IHawbInAwbRepository
    {
        public HawbInAwbRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
