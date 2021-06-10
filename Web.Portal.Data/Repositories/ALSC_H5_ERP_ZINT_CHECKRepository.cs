using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;
namespace Web.Portal.Data.Repositories
{
    public interface IALSC_H5_ERP_ZINT_CHECKRepository : IRepository<ALSC_H5_ERP_ZINT_CHECK>
    {
    }
    public class ALSC_H5_ERP_ZINT_CHECKRepository :  RepositoryHermesBase<ALSC_H5_ERP_ZINT_CHECK>, IALSC_H5_ERP_ZINT_CHECKRepository
    {
        public ALSC_H5_ERP_ZINT_CHECKRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
