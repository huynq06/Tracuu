using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IALSC_VCT_TO_DLV_BY_XMLRepository : IRepository<ALSC_VCT_TO_DLV_BY_XML>
    {
    }
    public class ALSC_VCT_TO_DLV_BY_XMLRepository : RepositoryHermesBase<ALSC_VCT_TO_DLV_BY_XML>, IALSC_VCT_TO_DLV_BY_XMLRepository
    {
        public ALSC_VCT_TO_DLV_BY_XMLRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
