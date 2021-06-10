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
    public interface IHermesInvoiceDetailRepository : IRepository<HermesInvoiceDetail>
    {
    }
    public class HermesInvoiceDetailRepository : RepositoryEInvoiceControlBase<HermesInvoiceDetail>, IHermesInvoiceDetailRepository
    {
        public HermesInvoiceDetailRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
