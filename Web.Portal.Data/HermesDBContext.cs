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
    public class HermesDBContext : DbContext
    {
        public HermesDBContext() : base("HemrmesConnection")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<Lagi> Lagies { set; get; }
        public DbSet<Lab> Labs { set; get; }
        public DbSet<IADR_INVOICE_ADDRESSES> IADR_INVOICE_ADDRESSES { set; get; }
        public DbSet<IADR_INVOICE_EMAIL> IADR_INVOICE_EMAILs { set; get; }
        public DbSet<ALSC_H5_ERP_ZINT_CHECK> ALSC_H5_ERP_ZINT_CHECKs { set; get; }
        public DbSet<ALSC_VCT_TO_DLV_BY_XML> ALSC_VCT_TO_DLV_BY_XMLs { set; get; }
        public DbSet<FLUP> FLUPs { set; get; }
        public static HermesDBContext Create()
        {
            return new HermesDBContext();
        }
        protected override void OnModelCreating(DbModelBuilder builder)
        {
            builder.HasDefaultSchema("HAN_W1_HL");
        }
    }
}
