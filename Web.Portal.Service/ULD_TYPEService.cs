using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model.Models;

namespace Web.Portal.Service
{
    public interface IULD_TYPEService
    {
        IEnumerable<ULD_TYPE> GetAll();
        ULD_TYPE GetById(int id);
        void Update(ULD_TYPE uldType);
        void Add(ULD_TYPE uldType);
        void Delete(int id);
        void Save();
    }
    public class ULD_TYPEService : IULD_TYPEService
    {
        IULD_TYPERepository _uld_TypeRepository;
        IUnitOfWork _unitOfWork;
        public ULD_TYPEService(IULD_TYPERepository uld_TypeRepository, IUnitOfWork unitOfWork)
        {
            this._uld_TypeRepository = uld_TypeRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(ULD_TYPE uldType)
        {
            _uld_TypeRepository.Add(uldType);
        }

        public void Delete(int id)
        {
            _uld_TypeRepository.Delete(id);
        }

        public IEnumerable<ULD_TYPE> GetAll()
        {
            return _uld_TypeRepository.GetAll();
        }

        public ULD_TYPE GetById(int id)
        {
            return _uld_TypeRepository.GetSingleById(id);
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void Update(ULD_TYPE uldType)
        {
            _uld_TypeRepository.Update(uldType);
        }
    }
}
