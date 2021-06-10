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
    public class CustomServiceDBContext : DbContext
    {
        public CustomServiceDBContext() : base("OracleConnection")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<CARGO_OUT> CARGO_TTTKs { set; get; }
        public DbSet<CARGO_INOUT> CARGO_INOUTs { set; get; }
        public DbSet<Cargo_KVGS> Cargo_KVGS { set; get; }
        public static CustomServiceDBContext Create()
        {
            return new CustomServiceDBContext();
        }
        protected override void OnModelCreating(DbModelBuilder builder)
        {
            builder.HasDefaultSchema("CUSTOMSERVICE");
            builder.Entity<Cargo_KVGS>().HasKey(e => new { e.EQ_CARGOCTRLNO, e.EQ_CUSTOMSREFERENCE });
            builder.Entity<CARGO_INOUT>().HasKey(e => new { e.TEQUIP_CARGOCTRLNO });
            builder.Entity<CARGO_OUT>().HasKey(e => new { e.TEQUIP_CARGOCTRLNO });


        }
    }
}
