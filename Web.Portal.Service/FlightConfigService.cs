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
    public interface IFlightConfigService
    {
        IEnumerable<FlightConfig> GetAll();
        FlightConfig GetType(string flightNo, string flightType);
        FlightConfig GetById(int id);
        void Update(FlightConfig flightConfig);
        void Add(FlightConfig flightConfig);
        void Delete(int id);
        void Save();
    }
    public class FlightConfigService : IFlightConfigService
    {
        IFlightConfigRepository _flightConfigRepository;
        IUnitOfWork _unitOfWork;
        public FlightConfigService(IFlightConfigRepository flightConfigRepository, IUnitOfWork unitOfWork)
        {
            this._flightConfigRepository = flightConfigRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(FlightConfig flightConfig)
        {
            _flightConfigRepository.Add(flightConfig);
        }

        public void Delete(int id)
        {
            _flightConfigRepository.Delete(id);
        }

        public IEnumerable<FlightConfig> GetAll()
        {
            return _flightConfigRepository.GetAll();
        }

        public FlightConfig GetById(int id)
        {
            return _flightConfigRepository.GetSingleById(id);
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void Update(FlightConfig flightConfig)
        {
            _flightConfigRepository.Update(flightConfig);
        }

        public FlightConfig GetType(string flightNo,string flightType)
        {
            return _flightConfigRepository.GetAll().FirstOrDefault(c => c.FlightNumber == flightNo && c.FlightType == flightType);
        }
    }
}
