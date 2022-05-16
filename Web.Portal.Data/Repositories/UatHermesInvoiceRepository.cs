using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models.UatEInvoice;
using Web.Portal.Common.ViewModel;

namespace Web.Portal.Data.Repositories
{
    public interface IUatHermesInvoiceRepository : IRepository<UatHermesInvoice>
    {
    }
    public class UatHermesInvoiceRepository : RepositoryUatEInvoiceControlBase<UatHermesInvoice>, IUatHermesInvoiceRepository
    {
        public UatHermesInvoiceRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
