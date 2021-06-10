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
    public interface ILocationConfigService
    {
        LocationConfig GetLocation(int floor);
        IEnumerable<LocationConfig> GetAll();
        LocationConfig GetByID(int id);
        void Update(LocationConfig config);
        void Save();
    }
    public class LocationConfigService : ILocationConfigService
    {
        ILocationConfigRepository _locationRepository;
        IUnitOfWork _unitOfWork;
        public LocationConfigService(ILocationConfigRepository locationRepository, IUnitOfWork unitOfWork)
        {
            this._locationRepository = locationRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<LocationConfig> GetAll()
        {
            return _locationRepository.GetAll();
        }

        public LocationConfig GetByID(int id)
        {
            return _locationRepository.GetSingleById(id);
        }

        public LocationConfig GetLocation(int floor)
        {
            return _locationRepository.GetSingleByCondition(c => c.Floor == floor);
        }

        public void Save()
        {
            _unitOfWork.CommitPXK();
        }

        public void Update(LocationConfig config)
        {
            _locationRepository.Update(config);
        }
    }
}
