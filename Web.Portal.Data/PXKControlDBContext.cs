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
    public class PXKControlDBContext : DbContext
    {
        public PXKControlDBContext() : base("ALSC_PXKControl")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<tblPXK> PXKs { set; get; }
        public DbSet<tblDangKyGoiXe> tblDangKyGoiXes { set; get; }
        public DbSet<tblDangKyVaoRa> tblDangKyVaoRas { set; get; }
        public DbSet<LocationConfig> LocationConfigs { set; get; }
        public DbSet<tblTicket> tblTickets { set; get; }
        public DbSet<tblCompany> tblCompanys { set; get; }
        public DbSet<CallTruck> CallTrucks { set; get; }
        public DbSet<tblMission> tblMissions { set; get; }
        public DbSet<tblTicketStatus> tblTicketStatuss { set; get; }
        public static PXKControlDBContext Create()
        {
            return new PXKControlDBContext();
        }
    }
}
