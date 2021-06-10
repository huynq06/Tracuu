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
    public interface IConditionService
    {
        IEnumerable<Condition> GetAll();
        void Save();
    }
    public class ConditionService : IConditionService
    {
        IConditionRepository _conditionRepository;
        IUnitOfWork _unitOfWork;
        public ConditionService(IConditionRepository conditionRepository, IUnitOfWork unitOfWork)
        {
            this._conditionRepository = conditionRepository;
            this._unitOfWork = unitOfWork;
        }


        public IEnumerable<Condition> GetAll()
        {
            return _conditionRepository.GetAll();
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }
    }
}
