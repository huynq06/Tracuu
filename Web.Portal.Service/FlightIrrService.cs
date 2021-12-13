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
    public interface IFlightIrrService
    {
        IEnumerable<FlightIrr> GetbyDate(DateTime date );
        FlightIrr GetById(int id);
        FlightIrr GetSingleByID(string flightId);
        void Update(FlightIrr flight);
        void Add(FlightIrr flight);
        void Save();
    }
    public class FlightIrrService : IFlightIrrService
    {
        IFlightIrrRepository _flightRepository;
        IUnitOfWork _unitOfWork;
        public FlightIrrService(IFlightIrrRepository flightRepository, IUnitOfWork unitOfWork)
        {
            this._flightRepository = flightRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(FlightIrr flight)
        {
            _flightRepository.Add(flight);
        }

        public IEnumerable<FlightIrr> GetbyDate( DateTime date)
        {
            return _flightRepository.GetMulti(c => c.FlightDate.Value.Day == date.Day && c.FlightDate.Value.Month == date.Month && c.FlightDate.Value.Year == date.Year);
        }

        public FlightIrr GetById(int id)
        {
            return _flightRepository.GetSingleById(id);
        }

        public FlightIrr GetSingleByID(string flightId)
        {
            return _flightRepository.GetSingleByCondition(c => c.FlightID == flightId);
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void Update(FlightIrr flight)
        {
            _flightRepository.Update(flight);
        }
    }
}
