using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Data.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDbFactory dbFactory;
        private CMSDbContext dbContext;
        private FlightControlDBContext fcDBContext;
        private EInvoiceDbContext eInvoiceContext;
        private PXKControlDBContext pxkDBContext;
        HermesDBContext dbHermesContext;
        private CustomServiceDBContext dbCustomServiceContext;
        private AlsConnectDbContext alsDBContext;
        public UnitOfWork(IDbFactory dbFactory)
        {
            this.dbFactory = dbFactory;
        }

        public CMSDbContext DbContext
        {
            get { return dbContext ?? (dbContext = dbFactory.Init()); }
        }
        public PXKControlDBContext PXKDbContext
        {
            get { return pxkDBContext ?? (pxkDBContext = dbFactory.InitpxkControl()); }
        }
        public FlightControlDBContext FCDbContext
        {
            get { return fcDBContext ?? (fcDBContext = dbFactory.InitflightControl()); }
        }
        public EInvoiceDbContext EInvoiceContext
        {
            get { return eInvoiceContext ?? (eInvoiceContext = dbFactory.InitEInvoice()); }
        }
        public HermesDBContext HermesContext
        {
            get { return dbHermesContext ?? (dbHermesContext = dbFactory.InitHermes()); }
        }
        public CustomServiceDBContext CustomServiceContext
        {
            get { return dbCustomServiceContext ?? (dbCustomServiceContext = dbFactory.InitCustomService()); }
        }
        public AlsConnectDbContext AlsContext
        {
            get { return alsDBContext ?? (alsDBContext = dbFactory.InitAls()); }
        }
        public void Commit()
        {
            DbContext.SaveChanges();
        }
        public void CommitFlight()
        {
            FCDbContext.SaveChanges();
        }

        public void CommitEInvoice()
        {
            EInvoiceContext.SaveChanges();
        }

        public void CommitPXK()
        {
            PXKDbContext.SaveChanges();
        }
        public void CommitHermes()
        {
            HermesContext.SaveChanges();
        }
        public void CommitCustomService()
        {
            CustomServiceContext.SaveChanges();
        }

        public void CommitAls()
        {
            AlsContext.SaveChanges();
        }
    }
}
