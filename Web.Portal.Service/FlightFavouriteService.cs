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
    public interface IFlightFavouriteService
    {
        IEnumerable<FlightFavourite> GetAll(Guid userId);
        FlightFavourite GetById(int id);
        FlightFavourite GetByFlightId(string flightId);
        void Update(FlightFavourite flight);
        void Add(FlightFavourite flight);
        void Delete(int id);
        void Save();
    }
    public class FlightFavouriteService : IFlightFavouriteService
    {
        IFlightFavouriteRepository _flightRepository;
        IUnitOfWork _unitOfWork;
        public FlightFavouriteService(IFlightFavouriteRepository flightRepository, IUnitOfWork unitOfWork)
        {
            this._flightRepository = flightRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(FlightFavourite flight)
        {
            _flightRepository.Add(flight);
        }

        public void Delete(int id)
        {
            _flightRepository.Delete(id);
        }

        public IEnumerable<FlightFavourite> GetAll(Guid userId)
        {
            return _flightRepository.GetMulti(c => c.UserID == userId && c.FlightActive==true);
        }

        public FlightFavourite GetByFlightId(string flightId)
        {
            return _flightRepository.GetSingleByCondition(c => c.FlightID == flightId);
        }

        public FlightFavourite GetById(int id)
        {
            return _flightRepository.GetSingleById(id);
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void Update(FlightFavourite flight)
        {
            _flightRepository.Update(flight);
        }
    }
}
