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
    public interface ICARGO_INOUTService
    {
        CARGO_INOUT GetBySdd(string sdd);
    }
    public class CARGO_INOUTService : ICARGO_INOUTService
    {
        ICARGO_INOUTRepository _cargoInOutRepository;
        IUnitOfWork _unitOfWork;
        public CARGO_INOUTService(ICARGO_INOUTRepository cargoInOutRepository, IUnitOfWork unitOfWork)
        {
            this._cargoInOutRepository = cargoInOutRepository;
            this._unitOfWork = unitOfWork;
        }

        public CARGO_INOUT GetBySdd(string sdd)
        {
            return _cargoInOutRepository.GetSingleByCondition(c => c.TEQUIP_CARGOCTRLNO == sdd);
        }
    }
}