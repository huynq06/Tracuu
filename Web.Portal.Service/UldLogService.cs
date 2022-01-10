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
    public interface IUldLogService
    {
        UldLog GetByID(int id);
        UldLog GetByUldIns(string uldIns);
        void Add(UldLog uld);
        void Update(UldLog uld);

        void Save();
    }
    public class UldLogService : IUldLogService
    {
        IUldLogRepository _uldLogRepository;
        IUnitOfWork _unitOfWork;
        public UldLogService(IUldLogRepository uldLogRepository, IUnitOfWork unitOfWork)
        {
            this._uldLogRepository = uldLogRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(UldLog uld)
        {
            _uldLogRepository.Add(uld);
        }

        public UldLog GetByID(int id)
        {
            return _uldLogRepository.GetSingleById(id);
        }

        public UldLog GetByUldIns(string uldIns)
        {
            return _uldLogRepository.GetSingleByCondition(c => c.UldIns == uldIns);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(UldLog uld)
        {
            _uldLogRepository.Update(uld);
        }
    }
}
