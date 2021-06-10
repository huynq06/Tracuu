using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using Web.Portal.Model.Models;
namespace Web.Portal.Data
{
    public class EInvoiceDbContext : DbContext
    {
        public EInvoiceDbContext() : base("ALSC_EInvoice")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<HermesInvoice> HermesInvoices { set; get; }
        public DbSet<HermesInvoiceDetail> HermesInvoiceDetails { set; get; }
        public DbSet<Print> Prints { set; get; }
        public DbSet<PrintConfig> PrintConfigs { set; get; }
        public DbSet<ActionLog> ActionLogs { set; get; }
        public DbSet<ResponseMessage> ResponseMessages { set; get; }
        public DbSet<HolidayConfig> HolidayConfigs { set; get; }

        public static EInvoiceDbContext Create()
        {
            return new EInvoiceDbContext();
        }
    }
}
