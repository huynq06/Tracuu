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
    public interface IActionLogService
    {
        IEnumerable<ActionLog> GetAll();
        ActionLog GetByID(int id);
        void Add(ActionLog action);
        void Save();
    }
    public class ActionLogService : IActionLogService
    {
        IActionLogRepository _iActionLogRepository;
        IUnitOfWork _unitOfWork;
        public ActionLogService(IActionLogRepository iActionLogRepository, IUnitOfWork unitOfWork)
        {
            this._iActionLogRepository = iActionLogRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(ActionLog action)
        {
            _iActionLogRepository.Add(action);
        }

        public IEnumerable<ActionLog> GetAll()
        {
            return _iActionLogRepository.GetAll();
        }

        public ActionLog GetByID(int id)
        {
            return _iActionLogRepository.GetSingleById(id);
        }

        public void Save()
        {
            _unitOfWork.CommitEInvoice();
        }
    }
}
