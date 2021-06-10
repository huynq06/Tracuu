using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;
namespace Web.Portal.Data.Repositories
{
    public interface IIADR_INVOICE_EMAILRepository : IRepository<IADR_INVOICE_EMAIL>
    {
    }
    public class IADR_INVOICE_EMAILRepository : RepositoryHermesBase<IADR_INVOICE_EMAIL>, IIADR_INVOICE_EMAILRepository
    {
        public IADR_INVOICE_EMAILRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
