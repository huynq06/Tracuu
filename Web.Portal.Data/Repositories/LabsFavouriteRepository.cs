﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;


namespace Web.Portal.Data.Repositories
{
    public interface ILabsFavouriteRepository : IRepository<LabsFavourite>
    {
    }

    public class LabsFavouriteRepository : RepositoryBase<LabsFavourite>, ILabsFavouriteRepository
    {
        public LabsFavouriteRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
