using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using Web.Portal.Model.Models.UatEInvoice;
namespace Web.Portal.Data
{
    public class UatEInvoiceDbContext : DbContext
    {
        public UatEInvoiceDbContext() : base("UAT_ALSC_EInvoice")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<UatHermesInvoice> UatHermesInvoices { set; get; }
        public DbSet<UatHermesInvoiceDetail> UatHermesInvoiceDetails { set; get; }
        public DbSet<UatResponseMessage> UatResponseMessages { set; get; }

        public static UatEInvoiceDbContext Create()
        {
            return new UatEInvoiceDbContext();
        }
    }
}
