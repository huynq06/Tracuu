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
    public interface ICARGO_OUTService
    {
        IEnumerable<CARGO_OUT> GetAll();
        CARGO_OUT GetBySdd(string sdd);
    }
    public class CARGO_OUTService : ICARGO_OUTService
    {
        ICARGO_OUTRepository _cargoOutRepository;
        IUnitOfWork _unitOfWork;
        public CARGO_OUTService(ICARGO_OUTRepository cargoTTTKRepository, IUnitOfWork unitOfWork)
        {
            this._cargoOutRepository = cargoTTTKRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<CARGO_OUT> GetAll()
        {
            return _cargoOutRepository.GetAll();
        }

        public CARGO_OUT GetBySdd(string sdd)
        {
            return _cargoOutRepository.GetSingleByCondition(c => c.TEQUIP_CARGOCTRLNO == sdd);
        }
    }
}
