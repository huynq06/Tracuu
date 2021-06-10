using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;
using Web.Portal.Common.ViewModel;
using Web.Portal.Model;
using System.Data.SqlClient;
using System.Data.Entity;

namespace Web.Portal.Data.Repositories
{
    public interface IDangKyVaoRaRepository : IRepository<tblDangKyVaoRa>
    {
        IEnumerable<tblDangKyVaoRa> GetCallTruck();
    }
    public class DangKyVaoRaRepository : RepositoryPXKControlBase<tblDangKyVaoRa>, IDangKyVaoRaRepository
    {
        public DangKyVaoRaRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public IEnumerable<tblDangKyVaoRa> GetCallTruck()
        {
          
            return pxkDbContext.Database.SqlQuery<tblDangKyVaoRa>("GetCallTruckIndoor");
        }
    }
    
}
