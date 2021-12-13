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
    public interface IFlightService
    {
        IEnumerable<Flight> GetAll();
        IEnumerable<Flight> GetAllByDate(DateTime frmDate,DateTime toDate);
        Flight GetById(Guid id);
        Flight GetSingleByID(int id);
        Flight GetSingleByIns(string id);
        void Update(Flight flight);
        void Save();
    }
    public class FlightService : IFlightService
    {
        IFlightRepository _flightRepository;
        IUnitOfWork _unitOfWork;
        public FlightService(IFlightRepository flightRepository, IUnitOfWork unitOfWork)
        {
            this._flightRepository = flightRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<Flight> GetAll()
        {
            return _flightRepository.GetAll();
        }

        public IEnumerable<Flight> GetAllByDate(DateTime frmDate, DateTime toDate)
        {
            return _flightRepository.GetMulti(c => c.Schedule >= frmDate && c.Schedule <= toDate);
        }

        public Flight GetById(Guid id)
        {
            return _flightRepository.GetSingleByCondition(c => c.FlightID == id);
        }

        public Flight GetSingleByID(int id)
        {
            return _flightRepository.GetSingleById(id);
        }

        public Flight GetSingleByIns(string id)
        {
            return _flightRepository.GetSingleByCondition(c => c.Flight_Int_Number == id);
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void Update(Flight flight)
        {
            _flightRepository.Update(flight);
        }
    }
}
