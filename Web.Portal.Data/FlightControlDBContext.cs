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
    public class FlightControlDBContext : DbContext
    {
        public FlightControlDBContext() : base("ALSC_FlightControl")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<Flight> Flights { set; get; }
        public DbSet<ULDByFlight> ULDByFlights { set; get; }
        public DbSet<Location> Locations { set; get; }
        public DbSet<ULD_TYPE> ULD_TYPEs { set; get; }
        public DbSet<FlightConfig> FlightConfigs { set; get; }
        public DbSet<AWBByULD> AWBByULDs { set; get; }
        public DbSet<NotifyAWB> NotifyAWBs { set; get; }
        public DbSet<HawbInAwb> HawbInAwbs { set; get; }
        public DbSet<HawbManagement> HawbManagements { set; get; }
        public DbSet<FlightIrr> FlightIrrs { set; get; }
        public DbSet<AwbIrr> AwbIrrs { set; get; }
        public DbSet<HawbIrr> HawbIrrs { set; get; }
        public DbSet<OrderLagi> OrderLagis { set; get; }
        public DbSet<OrderLagiDetail> OrderLagiDetails { set; get; }
        public DbSet<FlightFavourite> FlightFavourites { set; get; }
        public static FlightControlDBContext Create()
        {
            return new FlightControlDBContext();
        }
    }
}
