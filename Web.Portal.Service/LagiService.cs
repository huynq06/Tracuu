﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model;
using Web.Portal.Model.Models;


namespace Web.Portal.Service
{
    public interface ILagiService
    {
        Lagi GetByMH(string mawb, string hawb);
        Lagi GetByLagiIdentity(string lagi_ident);
        List<Lagi> GetByMawb(string mawb);
        List<string> GetGetByName(string name, DateTime dateCheck);
    }
    public class LagiService : ILagiService
    {
        ILagiRepository _lagiRepository;
        IUnitOfWork _unitOfWork;
        public LagiService(ILagiRepository lagiRepository, IUnitOfWork unitOfWork)
        {
            this._lagiRepository = lagiRepository;
            this._unitOfWork = unitOfWork;
        }

        public Lagi GetByLagiIdentity(string lagi_ident)
        {
            return _lagiRepository.GetSingleByCondition(c => c.LAGI_IDENT_NO == lagi_ident);
        }

        public List<Lagi> GetByMawb(string mawb)
        {
            return _lagiRepository.GetMulti(c => c.LAGI_MAWB_PREFIX == mawb.Substring(0,3) && c.LAGI_MAWB_NO == mawb.Substring(3,8)).ToList();
        }

        public Lagi GetByMH(string mawb, string hawb)
        {
            return _lagiRepository.GetSingleByCondition(c => (c.LAGI_MAWB_PREFIX + c.LAGI_MAWB_NO) == mawb && c.LAGI_HAWB == hawb);
        }

        public List<string> GetGetByName(string name, DateTime dateCheck)
        {
            return _lagiRepository.GetMulti(c => c.LAGI_MAWB_NO.Substring(c.LAGI_MAWB_NO.Length - 4) == name && c.LAGI_DATE_STATUS_0_SET > dateCheck && c.LAGI_MASTER_IDENT_NO=="0").Select(y => y.LAGI_MAWB_PREFIX + y.LAGI_MAWB_NO.PadLeft(8, '0') + "/" + y.LAGI_IDENT_NO).Distinct().ToList();
        }
    }
}
