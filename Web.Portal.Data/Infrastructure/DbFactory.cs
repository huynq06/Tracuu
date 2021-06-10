using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        private CMSDbContext dbContext;
        private FlightControlDBContext fcDbContext;
        private EInvoiceDbContext eInvoiceContext;
        private PXKControlDBContext pxkDbContext;
        private HermesDBContext dbHermesContext;
        private CustomServiceDBContext dbCustomServiceContext;
        private AlsConnectDbContext alsContext;
        public CMSDbContext Init()
        {
            return dbContext ?? (dbContext = new CMSDbContext());
        }
        public HermesDBContext InitHermes()
        {
            return dbHermesContext ?? (dbHermesContext = new HermesDBContext());
        }
        public CustomServiceDBContext InitCustomService()
        {
            return dbCustomServiceContext ?? (dbCustomServiceContext = new CustomServiceDBContext());
        }
        public FlightControlDBContext InitflightControl()
        {
            return fcDbContext ?? (fcDbContext = new FlightControlDBContext());
        }
        public PXKControlDBContext InitpxkControl()
        {
            return pxkDbContext ?? (pxkDbContext = new PXKControlDBContext());
        }
        public EInvoiceDbContext InitEInvoice()
        {
            return eInvoiceContext ?? (eInvoiceContext = new EInvoiceDbContext());
        }
        public AlsConnectDbContext InitAls()
        {
            return alsContext ?? (alsContext = new AlsConnectDbContext());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}
