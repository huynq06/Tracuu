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
    public interface IFlightServiceConfigService
    {

        FlightServiceConfig GetByID(int id);
        IEnumerable<FlightServiceConfig> GetAll();
        void Update(FlightServiceConfig flight);
        void Save();
    }
    public class FlightServiceConfigService : IFlightServiceConfigService
    {
        IFlightServiceConfigRepository _flightRepository;
        IUnitOfWork _unitOfWork;
        public FlightServiceConfigService(IFlightServiceConfigRepository flightRepository, IUnitOfWork unitOfWork)
        {
            this._flightRepository = flightRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<FlightServiceConfig> GetAll()
        {
            return _flightRepository.GetAll();
        }

        public FlightServiceConfig GetByID(int id)
        {
            return _flightRepository.GetSingleById(id);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(FlightServiceConfig flight)
        {
            _flightRepository.Update(flight);
        }
    }
}
