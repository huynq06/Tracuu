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
    public interface ILocationService
    {
        IEnumerable<Location> GetAll();
        IEnumerable<Location> GetLocationFree();
        void LockLocation(int id);
        void UnLockLocation(int id);

        void Save();
    }
    public class LocationService : ILocationService
    {
        ILocationRepository _locationRepository;
        IUnitOfWork _unitOfWork;
        public LocationService(ILocationRepository locationRepository, IUnitOfWork unitOfWork)
        {
            this._locationRepository = locationRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<Location> GetAll()
        {
            return _locationRepository.GetAll();
        }

        public IEnumerable<Location> GetLocationFree()
        {
            return _locationRepository.GetMulti(c => c.Status == true);
        }

        public void LockLocation(int id)
        {
            var location = _locationRepository.GetSingleById(id);
            location.Status = false;
            _locationRepository.Update(location);
        }
        public void UnLockLocation(int id)
        {
            var location = _locationRepository.GetSingleById(id);
            location.Status = true;
            _locationRepository.Update(location);
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }
    }
}
