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
    public interface IHawbInAwbService
    {
        IEnumerable<HawbInAwb> GetColHAWB();
        IEnumerable<HawbInAwb> GetByFlight(Flight flight);
        HawbInAwb GetByID(int id);
        void UpdateFast(HawbInAwb hawb);
        void Add(HawbInAwb hawb);
        void Save();
    }
    public class HawbInAwbService : IHawbInAwbService
    {
        IHawbInAwbRepository _hawbByULDRepository;
        IUnitOfWork _unitOfWork;
        public HawbInAwbService(IHawbInAwbRepository hawbByULDRepository, IUnitOfWork unitOfWork)
        {
            this._hawbByULDRepository = hawbByULDRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(HawbInAwb hawb)
        {
            _hawbByULDRepository.Add(hawb);
        }

        public IEnumerable<HawbInAwb> GetByFlight(Flight flight)
        {
            return _hawbByULDRepository.GetMulti(c => c.FlightID == flight.FlightID);
        }

        public HawbInAwb GetByID(int id)
        {
            return _hawbByULDRepository.GetSingleById(id);
        }

        public IEnumerable<HawbInAwb> GetColHAWB()
        {
            return _hawbByULDRepository.GetMulti(c => c.CheckValue == 1 && c.Process != 2 && !string.IsNullOrEmpty(c.HAWB));
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void UpdateFast(HawbInAwb hawb)
        {
            _hawbByULDRepository.Update(hawb);
        }
    }
}
