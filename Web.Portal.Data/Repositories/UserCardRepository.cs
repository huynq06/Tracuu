using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models.QLT;
namespace Web.Portal.Data.Repositories
{
    public interface IUserCardRepository : IRepository<UserCard>
    {
    }

    public class UserCardRepository : RepositoryBase<UserCard>, IUserCardRepository
    {
        public UserCardRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
