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
    public interface IFLUPService
    {
        FLUP GetByID(string id);
        void Update(FLUP flup);
        void Save();
    }
    public class FLUPService : IFLUPService
    {
        IFLUPRepository _flupRepository;
        IUnitOfWork _unitOfWork;
        public FLUPService(IFLUPRepository _flupRepository, IUnitOfWork unitOfWork)
        {
            this._flupRepository = _flupRepository;
            this._unitOfWork = unitOfWork;
        }

        public FLUP GetByID(string id)
        {
            return _flupRepository.GetSingleByCondition(c=>c.FLUP_INT_NUMBER==id);
        }

        public void Save()
        {
            _unitOfWork.CommitHermes();
        }

        public void Update(FLUP flup)
        {
            _flupRepository.Update(flup);
        }
    }
}
