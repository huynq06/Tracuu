using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model;
using Web.Portal.Model.Models;

namespace Web.Portal.Service
{
    public interface ICallTruckService
    {
       
        List<CallTruck> GetAll();
        List<CallTruck> GetByFloor(int id);
        void Save();
    }
    public class CallTruckService : ICallTruckService
    {
        ICallTruckRepository _callTruckRepository;
        IUnitOfWork _unitOfWork;
        public CallTruckService(ICallTruckRepository callTruckRepository, IUnitOfWork unitOfWork)
        {
            this._callTruckRepository = callTruckRepository;
            this._unitOfWork = unitOfWork;
        }
        public List<CallTruck> GetAll()
        {
            return _callTruckRepository.GetAll().ToList();
        }

        public List<CallTruck> GetByFloor(int id)
        {
            return _callTruckRepository.GetMulti(c => c.Floor == id).ToList();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }
    }
}
