using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;


namespace Web.Portal.Data.Repositories
{
    public interface IIADR_INVOICE_ADDRESSESRepository : IRepository<IADR_INVOICE_ADDRESSES>
    {

    }
    public class IADR_INVOICE_ADDRESSESRepository : RepositoryHermesBase<IADR_INVOICE_ADDRESSES>, IIADR_INVOICE_ADDRESSESRepository
    {
        public IADR_INVOICE_ADDRESSESRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
