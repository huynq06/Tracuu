using System;
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
    public interface ICargo_KVGSService
    {
        IEnumerable<Cargo_KVGS> GetListCargo_KVGSBySDD(string sdd);
        IEnumerable<Cargo_KVGS> GetListCargo_KVGSBySTK(string stk);
        IEnumerable<Cargo_KVGS> GetByDay();
        IEnumerable<Cargo_KVGS> GetByAWB(string awb);
        Cargo_KVGS GetByMawbHawb(string awb, string hawb);
        Cargo_KVGS GetBySdd(string sdd, string stk);

    }
    public class Cargo_KVGSService : ICargo_KVGSService
    {
        ICargo_KVGSRepository _cargoRepository;
        IUnitOfWork _unitOfWork;
        public Cargo_KVGSService(ICargo_KVGSRepository cargoRepository, IUnitOfWork unitOfWork)
        {
            this._cargoRepository = cargoRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<Cargo_KVGS> GetByAWB(string awb)
        {
            return _cargoRepository.GetMulti(c => c.EQ_MASTERBILLOFLADING == awb);
        }

        public IEnumerable<Cargo_KVGS> GetByDay()
        {
            return _cargoRepository.GetMulti(c => c.DEC_ISSUE.Day == DateTime.Now.Day
                      && c.DEC_ISSUE.Month == DateTime.Now.Month
                      && c.DEC_ISSUE.Year == DateTime.Now.Year);
        }

        public Cargo_KVGS GetByMawbHawb(string awb, string hawb)
        {
            return _cargoRepository.GetSingleByCondition(c => c.EQ_MASTERBILLOFLADING == awb && c.EQ_HOUSEBILLOFLADING == hawb); 
        }

        public Cargo_KVGS GetBySdd(string sdd, string stk)
        {
            return _cargoRepository.GetSingleByCondition(c => c.EQ_CARGOCTRLNO == sdd && c.EQ_CUSTOMSREFERENCE == stk);
        }

        public IEnumerable<Cargo_KVGS> GetListCargo_KVGSBySDD(string sdd)
        {
            return _cargoRepository.GetMulti(c => c.EQ_CARGOCTRLNO == sdd);
        }
        public IEnumerable<Cargo_KVGS> GetListCargo_KVGSBySTK(string stk)
        {
            return _cargoRepository.GetMulti(c => c.EQ_CUSTOMSREFERENCE == stk);
        }

    }
}
