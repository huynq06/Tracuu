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
    public interface IAwbIrrService
    {
        IEnumerable<AwbIrr> GetbyFlightID(string flightId);
        AwbIrr GetById(int id);
        AwbIrr GetSingleByID(string awbId, string flightID);
        AwbIrr GetSingleByIDAndFlight(string awbId,string flightID);
        void Delete(int id);
        void closeAwbIrr(string id);
        void Update(AwbIrr flight);
        void Add(AwbIrr awbIdd);
        void Save();
    }
    public class AwbIrrService : IAwbIrrService
    {
        IAwbIrrRepository _awbRepository;
        IUnitOfWork _unitOfWork;
        public AwbIrrService(IAwbIrrRepository awbRepository, IUnitOfWork unitOfWork)
        {
            this._awbRepository = awbRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(AwbIrr awbIdd)
        {
            _awbRepository.Add(awbIdd);
        }

        public void closeAwbIrr(string id)
        {
            AwbIrr awb = _awbRepository.GetSingleByCondition(c => c.AwbID == id && c.AwbMaster == 1);
            awb.AwbStatus = 1;
        }

        public void Delete(int id)
        {
            _awbRepository.Delete(id);
        }

        public IEnumerable<AwbIrr> GetbyFlightID(string flightId)
        {
            return _awbRepository.GetMulti(c => c.FlightID == flightId);
        }

        public AwbIrr GetById(int id)
        {
            return _awbRepository.GetSingleById(id);
        }

        public AwbIrr GetSingleByID(string awbId, string flightID)
        {
            return _awbRepository.GetSingleByCondition(c => c.AwbID == awbId && c.AwbMaster==1 && c.FlightID==flightID);
        }

        public AwbIrr GetSingleByIDAndFlight(string awbId, string flightID)
        {
            return _awbRepository.GetSingleByCondition(c => c.AwbID == awbId && c.AwbMaster == 1 && c.FlightID==flightID);
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void Update(AwbIrr flight)
        {
            _awbRepository.Update(flight);
        }
    }
}
