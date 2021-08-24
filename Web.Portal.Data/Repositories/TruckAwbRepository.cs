﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Model.Models;
using Web.Portal.Common.ViewModel;
using Web.Portal.Model;

namespace Web.Portal.Data.Repositories
{
    public interface ITruckAwbRepository : IRepository<TruckAwb>
    {
    }
    public class TruckAwbRepository : RepositoryPXKControlBase<TruckAwb>, ITruckAwbRepository
    {
        public TruckAwbRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
