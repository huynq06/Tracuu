using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using Web.Portal.Model.Models;
using Web.Portal.Model.Models.QLT;

namespace Web.Portal.Data
{
    public class CMSDbContext : DbContext
    {
        public CMSDbContext() : base("ALSC_SyncData")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<FLightFlup> FLightFlups { set; get; }
        public DbSet<VCT> VCTs { set; get; }
        public DbSet<AwbLog> AwbLogs { set; get; }
        public DbSet<UldLog> UldLogs { set; get; }
        public DbSet<Issue> Errors { set; get; }
        public DbSet<Condition> Conditions { set; get; }
        public DbSet<form> Forms { set; get; }
        public DbSet<Issue_detail> Issue_details { set; get; }
        public DbSet<FlightServiceConfig> FlightServiceConfigs { set; get; }
        public DbSet<User> Users { set; get; }
        public DbSet<UserCard> UserCards { set; get; }
        public DbSet<Organization> Organizations { set; get; }
        public DbSet<LabsFavourite> LabsFavourites { set; get; }

        public static CMSDbContext Create()
        {
            return new CMSDbContext();
        }
        protected override void OnModelCreating(DbModelBuilder builder)
        {
            builder.Entity<IdentityUserRole>().HasKey(i => new { i.UserId, i.RoleId });
            builder.Entity<IdentityUserLogin>().HasKey(i => i.UserId);
        }
    }
}
