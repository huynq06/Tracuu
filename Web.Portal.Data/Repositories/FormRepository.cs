using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;

namespace Web.Portal.Data.Repositories
{
    public interface IFormRepository : IRepository<form>
    {
    }
    public class FormRepository : RepositoryBase<form>, IFormRepository
    {
        public FormRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
