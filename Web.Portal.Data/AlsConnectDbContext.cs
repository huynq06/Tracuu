using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using Web.Portal.Model.Models;
using Web.Portal.Model;

namespace Web.Portal.Data
{
    public class AlsConnectDbContext : DbContext
    {
        public AlsConnectDbContext() : base("ALSConnect")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<IMP_AWB> IMP_AWBs { set; get; }
        public DbSet<EXP_AWB> EXP_AWBs { set; get; }

        public static AlsConnectDbContext Create()
        {
            return new AlsConnectDbContext();
        }
    }
}
