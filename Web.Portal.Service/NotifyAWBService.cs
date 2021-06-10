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
    public interface INotifyAWBService
    {
        int CountNotifyAWB(Guid flightID,int notifyPoint);
        void Add(NotifyAWB notify);
        void Save();
    }
    public class NotifyAWBService : INotifyAWBService
    {
        INotifyAWBRepository _notifyAWBRepository;
        IUnitOfWork _unitOfWork;
        public NotifyAWBService(INotifyAWBRepository notifyAWBRepository, IUnitOfWork unitOfWork)
        {
            this._notifyAWBRepository = notifyAWBRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(NotifyAWB notify)
        {
            _notifyAWBRepository.Add(notify);
        }

        public int CountNotifyAWB(Guid flightID, int notifyPoint)
        {
            return _notifyAWBRepository.GetMulti(c => c.Flight_ID == flightID && c.NotifyPoint == notifyPoint).ToList().Count();
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }
    }
}
